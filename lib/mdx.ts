import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const kitsDirectory = path.join(process.cwd(), 'content/kits')

export interface Kit {
  slug: string
  title: string
  description: string
  date: string
  author?: string
  tags?: string[]
  content: string
}

export function getAllKits(): Kit[] {
  // Create directory if it doesn't exist
  if (!fs.existsSync(kitsDirectory)) {
    fs.mkdirSync(kitsDirectory, { recursive: true })
    return []
  }

  const fileNames = fs.readdirSync(kitsDirectory)
  const allKits = fileNames
    .filter((name) => name.endsWith('.mdx'))
    .map((name) => {
      const slug = name.replace(/\.mdx$/, '')
      return getKitBySlug(slug)
    })
    .filter((kit): kit is Kit => kit !== null)

  return allKits.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getKitBySlug(slug: string): Kit | null {
  try {
    const fullPath = path.join(kitsDirectory, `${slug}.mdx`)
    
    if (!fs.existsSync(fullPath)) {
      return null
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      slug,
      title: data.title || slug,
      description: data.description || '',
      date: data.date || new Date().toISOString(),
      author: data.author,
      tags: data.tags || [],
      content,
    }
  } catch (error) {
    console.error(`Error reading kit ${slug}:`, error)
    return null
  }
}

export function getAllKitSlugs(): string[] {
  if (!fs.existsSync(kitsDirectory)) {
    return []
  }
  
  const fileNames = fs.readdirSync(kitsDirectory)
  return fileNames
    .filter((name) => name.endsWith('.mdx'))
    .map((name) => name.replace(/\.mdx$/, ''))
}