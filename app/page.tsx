import { getAllKits } from '@/lib/mdx'
import { KitCard } from '@/components/kit-card'
import { Package, Sparkles } from 'lucide-react'

export default function Home() {
  const kits = getAllKits()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Package className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Free Resources</h1>
              <p className="text-muted-foreground text-sm">
                Curated collection of development kits and resources
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-20">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-6">
            <Sparkles className="h-4 w-4" />
            Ready-to-use development kits
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
            Everything you need to{' '}
            <span className="text-primary">build faster</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Discover professionally crafted kits, templates, and resources 
            to accelerate your development workflow and ship better products.
          </p>
        </div>

        {/* Kits Grid */}
        {kits.length === 0 ? (
          <div className="text-center py-20">
            <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No kits available</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              We are working on bringing you the best kits possible.
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-semibold">
                Available Kits ({kits.length})
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {kits.map((kit) => (
                <KitCard key={kit.slug} kit={kit} />
              ))}
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t bg-white/50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-muted-foreground text-sm">
            <p>Built with ❤️ by <a href="https://pepeso.com" target="_blank" rel="noopener noreferrer">Pepeso</a></p>
          </div>
        </div>
      </footer>
    </div>
  )
}