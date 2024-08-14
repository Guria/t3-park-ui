import Link from 'next/link'

import { CreatePost } from '~/app/_components/create-post'
import { auth } from '~/server/auth'
import { api } from '~/trpc/server'
import { Button } from '~/components/ui/button'
import { Card } from '~/components/ui/card'
import { Text } from '~/components/ui/text'
import { VStack, Stack, HStack } from '~/styled-system/jsx'
import { Heading } from '~/components/ui/heading'

export default async function Home() {
  const hello = await api.post.hello({ text: 'from tRPC in Server Component' })
  const session = await auth()

  return (
    <Stack alignItems="center" justifyContent="center" minH="100vh" gap="12">
      <Heading size="4xl">T3 with Panda CSS and Park UI</Heading>
      <Card.Root minW="xl">
        <Card.Header>
          <Card.Title>{hello.greeting}</Card.Title>
        </Card.Header>
        <Card.Body hidden={!session}>{session && <CrudShowcase />}</Card.Body>
        <Card.Footer>
          <HStack gap="4">
            <Text>{session && <span>Logged in as {session.user?.name}</span>}</Text>
            <Button asChild>
              <Link href={session ? '/api/auth/signout' : '/api/auth/signin'}>
                {session ? 'Sign out' : 'Sign in'}
              </Link>
            </Button>
          </HStack>
        </Card.Footer>
      </Card.Root>
    </Stack>
  )
}

async function CrudShowcase() {
  const latestPost = await api.post.getLatest()

  return (
    <VStack gap="4" alignItems="stretch">
      <Text>
        {latestPost ? `Your most recent post: ${latestPost.name}` : 'You have no posts yet.'}
      </Text>

      <CreatePost />
    </VStack>
  )
}
