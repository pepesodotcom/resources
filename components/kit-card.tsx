import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, User } from 'lucide-react'
import { format } from 'date-fns'
import type { Kit } from '@/lib/mdx'

interface KitCardProps {
  kit: Kit
}

export function KitCard({ kit }: KitCardProps) {
  return (
    <Link href={`/kit/${kit.slug}`}>
      <Card className="h-full transition-all duration-200 hover:shadow-lg hover:-translate-y-1 cursor-pointer group">
        <CardHeader>
          <CardTitle className="group-hover:text-primary transition-colors duration-200">
            {kit.title}
          </CardTitle>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {kit.description}
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {format(new Date(kit.date), 'MMM dd, yyyy')}
            </div>
            {kit.author && (
              <div className="flex items-center gap-1">
                <User className="h-3 w-3" />
                {kit.author}
              </div>
            )}
          </div>
          {kit.tags && kit.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {kit.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  )
}