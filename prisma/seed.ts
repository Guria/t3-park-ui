import 'dotenv/config'
import { env } from '~/env'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.user.upsert({
    where: {
      email: env.CREDENTIALS_PROVIDER_DEFAULT_EMAIL,
    },
    update: {},
    create: {
      email: env.CREDENTIALS_PROVIDER_DEFAULT_EMAIL,
      name: 'John Doe',
    },
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
