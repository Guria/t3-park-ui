'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { api } from '~/trpc/react'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { VStack } from '~/styled-system/jsx'

export function CreatePost() {
  const router = useRouter()
  const [name, setName] = useState('')

  const createPost = api.post.create.useMutation({
    onSuccess: () => {
      router.refresh()
      setName('')
    },
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        createPost.mutate({ name })
      }}
    >
      <VStack gap="4">
        <Input
          type="text"
          placeholder="Title"
          value={name}
          disabled={createPost.isPending}
          onChange={(e) => setName(e.target.value)}
        />
        <Button type="submit" width="full" loading={createPost.isPending}>
          Submit
        </Button>
      </VStack>
    </form>
  )
}
