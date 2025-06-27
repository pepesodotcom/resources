import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Package, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
      <div className="text-center">
        <div className="p-4 bg-primary/10 rounded-full w-fit mx-auto mb-6">
          <Package className="h-12 w-12 text-primary" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Kit Not Found
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-md mx-auto">
          The kit you're looking for doesn't exist or may have been moved.
        </p>
        <Link href="/">
          <Button className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Kit Library
          </Button>
        </Link>
      </div>
    </div>
  )
}