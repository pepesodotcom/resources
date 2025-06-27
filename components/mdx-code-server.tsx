import { type ReactNode, type DetailedHTMLProps, type HTMLAttributes } from 'react'
import { CopyButton } from './copy-button'

interface CodeProps extends DetailedHTMLProps<HTMLAttributes<HTMLPreElement>, HTMLPreElement> {
  children?: ReactNode
}

export function Code({ children, className, ...props }: CodeProps) {
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
        <span className="font-mono">{language}</span>
        <CopyButton text={textContent} />
      </div>
      <pre 
        className={`${className} !mt-0 !rounded-t-none bg-gray-100 text-primary p-4 font-mono text-sm leading-relaxed`} 
        style={{ 
          whiteSpace: 'pre', 
          overflowX: 'auto',
          tabSize: 2,
          MozTabSize: 2,
          OTabSize: 2,
          fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
          background: '#fff !important'
        }}
        {...props}
      >
        <code 
          className={className}
          style={{ 
            whiteSpace: 'pre',
            display: 'block',
            fontFamily: 'inherit',
            background: 'transparent !important',
            color: '#e5e7eb' // Default light color for dark background
          }}
        >
          {children}
        </code>
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