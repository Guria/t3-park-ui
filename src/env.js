import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'
import { match } from 'ts-pattern'

const IS_SERVER = typeof window === 'undefined'
const NODE_ENV = process.env.NODE_ENV || 'development'

export const env = createEnv({
  shared: {
    IS_SERVER: z.boolean().default(false),
    TRPC_LOGGER_LINK_ENABLED: z.boolean().default(() => NODE_ENV === 'development'),
  },
  server: {
    NODE_ENV: z.enum(['development', 'test', 'production']),
    DATABASE_URL: z.string().url(),
    AUTH_SECRET: match(NODE_ENV)
      .with('production', () => z.string())
      .otherwise(() => z.string().optional()),
    PRISMA_LOG_LEVEL: z
      .preprocess((str) => toArray(str), z.array(z.enum(['info', 'query', 'warn', 'error'])))
      // .default runs before .preprocess
      .default(NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error']),
    CREDENTIALS_PROVIDER_DEFAULT_EMAIL: z.string().default(
      match(NODE_ENV)
        .with('development', () => 'test@example.com')
        .otherwise(() => '')
    ),
  },

  client: {
    // NEXT_PUBLIC_CLIENTVAR: z.string(),
  },

  runtimeEnv: {
    NODE_ENV,
    IS_SERVER,
    DATABASE_URL: process.env.DATABASE_URL,
    AUTH_SECRET: process.env.AUTH_SECRET,
    PRISMA_LOG_LEVEL: process.env.PRISMA_LOG_LEVEL,
    TRPC_LOGGER_LINK_ENABLED: process.env.TRPC_LOGGER_LINK_ENABLED,
    CREDENTIALS_PROVIDER_DEFAULT_EMAIL: process.env.CREDENTIALS_PROVIDER_DEFAULT_EMAIL,
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
  isServer: IS_SERVER,
})

/**
 * Converts a value to an array.
 * If the input is a string, it splits it by commas and trims each item.
 * If the input is an array, it returns the input as is.
 * Otherwise, it returns undefined.
 * @param {unknown} val - The value to convert to an array.
 * @returns {unknown[] | undefined} An array of trimmed strings if input is a string, otherwise undefined
 */
function toArray(val) {
  if (Array.isArray(val)) {
    /** @type {unknown[]} */
    const array = val
    return array
  }
  return typeof val === 'string' ? val.split(',').map((item) => item.trim()) : undefined
}
