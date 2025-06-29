'use client'

import { useEffect } from 'react'
import { type ReactNode, type DetailedHTMLProps, type HTMLAttributes } from 'react'
import Prism from 'prismjs'
import 'prismjs/themes/prism.css'; // Light theme

import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-tsx'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-scss'
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-sql'

interface CodeProps extends DetailedHTMLProps<HTMLAttributes<HTMLPreElement>, HTMLPreElement> {
  children?: ReactNode
}

export function Code({ children, className, ...props }: CodeProps) {
  useEffect(() => {
    Prism.highlightAll()
  }, [children])

  // Extract text content from children
  const getTextContent = (node: ReactNode): string => {
    if (typeof node === 'string') return node
    if (typeof node === 'number') return node.toString()
    if (Array.isArray(node)) return node.map(getTextContent).join('')
    if (node && typeof node === 'object' && 'props' in node) {
      return getTextContent(node.props.children)
    }
    return ''
  }

  const textContent = getTextContent(children)
  
  // Extract language from className (e.g., "language-javascript")
  const language = className?.replace('language-', '') || 'text'
  
  return (
    <div className="relative my-6">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-100 text-gray-300 text-sm rounded-t-lg border border-gray-300">
        <span className="font-mono">{language || "bash"}</span>
        <button
          onClick={() => navigator.clipboard.writeText(textContent)}
          className="text-gray-400 hover:text-white transition-colors"
          title="Copy code"
        >
          Copy
        </button>
      </div>
      <pre className={`${className} !mt-0 !rounded-t-none`} {...props}>
        <code className={className}>{children}</code>
      </pre>
    </div>
  )
}

interface InlineCodeProps extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
  children?: ReactNode
}

export function InlineCode({ children, className, ...props }: InlineCodeProps) {
  return (
    <code 
      className={`bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded text-sm font-mono ${className || ''}`}
      {...props}
    >
      {children}
    </code>
  )
}
