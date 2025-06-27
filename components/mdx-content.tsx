import { MDXRemote } from 'next-mdx-remote/rsc'
import { Code, InlineCode } from '@/components/mdx-code-server'
import { PrismHighlighter } from '@/components/prism-highlighter'

interface MDXContentProps {
  source: string
}

export function MDXContent({ source }: MDXContentProps) {
  return (
    <>
      <MDXRemote 
        source={source} 
        components={{
          pre: Code,
          code: InlineCode,
        }}
      />
      <PrismHighlighter />
    </>
  )
}