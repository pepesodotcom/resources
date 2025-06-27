'use client'

interface CopyButtonProps {
  text: string
}

export function CopyButton({ text }: CopyButtonProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(text)
  }

  return (
    <button
      onClick={handleCopy}
      className="text-gray-400 hover:text-white transition-colors"
      title="Copy code"
    >
      Copy
    </button>
  )
}