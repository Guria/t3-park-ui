import { PrismaAdapter } from '@auth/prisma-adapter'
import NextAuth from 'next-auth'
import { type Provider } from 'next-auth/providers'
import Credentials from 'next-auth/providers/credentials'
import { env } from '~/env'
import { db } from '~/server/db'

const adapter = PrismaAdapter(db)

const credentialsProvider = Credentials({
  name: 'credentials',
  credentials: {
    email: {
      label: 'Email',
      type: 'text',
      defaultValue: env.CREDENTIALS_PROVIDER_DEFAULT_EMAIL,
    },
  },
  async authorize(credentials) {
    if (typeof credentials?.email !== 'string') return null
    const user = await adapter.getUserByEmail!(credentials.email)

    return user
  },
})

const devProviders = env.CREDENTIALS_PROVIDER_DEFAULT_EMAIL ? [credentialsProvider] : []

const prodProviders = [] satisfies Provider[]

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [...devProviders, ...prodProviders],
  adapter: adapter,
  session: { strategy: 'jwt' },
  callbacks: {
    session: ({ session, token }) => {
      session.user.id = token.sub!
      return session
    },
  },
})
