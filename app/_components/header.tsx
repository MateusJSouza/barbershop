'use client'

import { MenuIcon } from 'lucide-react'
import Image from 'next/image'

import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'

export function Header() {
  return (
    <Card>
      <CardContent className="p-5 flex items-center justify-between flex-row">
        <Image src="/logo.png" alt="FSW Barber" height={22} width={120} />
        <Button variant="outline" size="icon" className="w-8 h-8">
          <MenuIcon size={16} />
        </Button>
      </CardContent>
    </Card>
  )
}
