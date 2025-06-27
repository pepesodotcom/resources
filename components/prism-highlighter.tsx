'use client'

import { useEffect } from 'react'
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

export function PrismHighlighter() {
  useEffect(() => {
    // Highlight all code blocks
    Prism.highlightAll()
    
    // Ensure whitespace is preserved and backgrounds are clean after highlighting
    const codeBlocks = document.querySelectorAll('pre[class*="language-"]')
    codeBlocks.forEach((block) => {
      const pre = block as HTMLPreElement
      const code = pre.querySelector('code')
      if (pre) {
        pre.style.whiteSpace = 'pre'
        pre.style.tabSize = '2'
        pre.style.background = 'transparent'
      }
      if (code) {
        code.style.whiteSpace = 'pre'
        code.style.background = 'transparent'
        // Ensure default text color for unhighlighted text
        code.style.color = '#e5e7eb'
      }
      
      // Remove backgrounds from all tokens and ensure visibility
      const tokens = block.querySelectorAll('[class*="token"]')
      tokens.forEach((token) => {
        const element = token as HTMLElement
        element.style.background = 'transparent'
        
        // Ensure minimum visibility for all tokens
        const computedStyle = window.getComputedStyle(element)
        const currentColor = computedStyle.color
        
        // If color is too dark (close to black), make it lighter
        if (currentColor === 'rgb(0, 0, 0)' || currentColor === '#000000' || currentColor === 'black') {
          element.style.color = '#e5e7eb' // gray-200
        }
      })
    })
  }, [])

  return null
}