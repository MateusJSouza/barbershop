'use client'

import { Barbershop } from '@prisma/client'
import { StarIcon } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { Badge } from '@/app/_components/ui/badge'
import { Button } from '@/app/_components/ui/button'
import { Card, CardContent } from '@/app/_components/ui/card'

interface BarbershopItemProps {
  barbershop: Barbershop
}

export function BarbershopItem({ barbershop }: BarbershopItemProps) {
  const router = useRouter()

  function handleBookingClick() {
    router.push(`/barbershops/${barbershop.id}`)
  }

  return (
    <Card className="min-w-[167px] max-w-[167px] rounded-2xl">
      <CardContent className="px-1 py-0">
        <div className="w-full h-[159px] relative">
          <div className="z-50 absolute top-2 left-2">
            <Badge
              variant="secondary"
              className="flex gap-1 opacity-90 items-center justify-center"
            >
              <StarIcon size={12} className="fill-primary text-primary" />
              <span className="text-xs">5,0</span>
            </Badge>
          </div>

          <Image
            src={barbershop.imageUrl}
            height={0}
            width={0}
            sizes="100vw"
            fill
            style={{ objectFit: 'cover' }}
            className="rounded-2xl"
            alt={barbershop.name}
          />
        </div>

        <div className="px-2 pb-3">
          <h2 className="font-bold mt-2 overflow-hidden text-ellipsis text-nowrap">
            {barbershop.name}
          </h2>

          <p className="text-sm text-gray-400 overflow-hidden text-ellipsis text-nowrap">
            {barbershop.address}
          </p>

          <Button
            onClick={handleBookingClick}
            className="w-full mt-3"
            variant="secondary"
          >
            Reservar
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
