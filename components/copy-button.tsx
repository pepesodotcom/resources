'use client'

import { useState } from 'react'

interface CopyButtonProps {
  text: string
}

export function CopyButton({ text }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  return (
    <button
      onClick={handleCopy}
      className="text-gray-400 hover:text-white transition-colors px-2 py-1 rounded text-xs"
      title="Copy code"
    >
      {copied ? 'Copied!' : 'Copy'}
    </button>
  )
}