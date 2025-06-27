import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getKitBySlug, getAllKitSlugs } from '@/lib/mdx'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ArrowLeft, Calendar, User, Package } from 'lucide-react'
import { format } from 'date-fns'
import { MDXContent } from '@/components/mdx-content'

interface KitPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const slugs = getAllKitSlugs()
  return slugs.map((slug) => ({
    slug,
  }))
}

export async function generateMetadata({ params }: KitPageProps) {
  const kit = getKitBySlug(params.slug)
  
  if (!kit) {
    return {
      title: 'Kit Not Found',
    }
  }

  return {
    title: kit.title,
    description: kit.description,
  }
}

export default function KitPage({ params }: KitPageProps) {
  const kit = getKitBySlug(params.slug)

  if (!kit) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-2 hover:bg-primary/10 transition-colors">
                <ArrowLeft className="h-4 w-4" />
                Back to Kits
              </Button>
            </Link>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Package className="h-4 w-4" />
              <span className="text-sm">Kit Library</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Kit Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold tracking-tight mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            {kit.title}
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed mb-8 max-w-3xl">
            {kit.description}
          </p>
          
          {/* Metadata */}
          <div className="flex items-center gap-6 text-sm text-muted-foreground mb-6">
            <div className="flex items-center gap-2 px-3 py-1 bg-white/60 rounded-full">
              <Calendar className="h-4 w-4" />
              {format(new Date(kit.date), 'MMMM dd, yyyy')}
            </div>
            {kit.author && (
              <div className="flex items-center gap-2 px-3 py-1 bg-white/60 rounded-full">
                <User className="h-4 w-4" />
                {kit.author}
              </div>
            )}
          </div>

          {/* Tags */}
          {kit.tags && kit.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {kit.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="px-3 py-1 text-sm font-medium">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>

        <Separator className="mb-12" />

        {/* Content */}
        <article className="prose prose-lg prose-gray max-w-none">
          <div className="bg-white rounded-xl p-10 shadow-sm border border-gray-100">
            <div className="mdx-content">
              <MDXContent source={kit.content} />
            </div>
          </div>
        </article>

        {/* Navigation */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <Link href="/">
            <Button variant="outline" className="gap-2 hover:bg-primary/5 transition-colors">
              <ArrowLeft className="h-4 w-4" />
              Back to All Kits
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}