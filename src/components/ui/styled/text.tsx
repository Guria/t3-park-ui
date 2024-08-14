import { styled } from '~/styled-system/jsx'
import { type TextVariantProps, text } from '~/styled-system/recipes'
import type { ComponentProps, StyledComponent } from '~/styled-system/types'

type ParagraphProps = TextVariantProps & { as?: React.ElementType }

export type TextProps = ComponentProps<typeof Text>
export const Text: StyledComponent<'p', ParagraphProps> = styled('p', text)
