'use client'

import { Barbershop } from '@prisma/client'
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { Button } from '@/app/_components/ui/button'

interface BarbershopInfoProps {
  barbershop: Barbershop
}

export default function BarbershopInfo({ barbershop }: BarbershopInfoProps) {
  const router = useRouter()

  function handleBackClick() {
    router.back()
  }

  return (
    <div>
      <div className="h-[250px] w-full relative">
        <Button
          size="icon"
          variant="outline"
          className="z-50 top-4 left-4 absolute"
          onClick={handleBackClick}
        >
          <ChevronLeftIcon />
        </Button>

        <Button
          size="icon"
          variant="outline"
          className="z-50 top-4 right-4 absolute"
        >
          <MenuIcon />
        </Button>

        <Image
          src={barbershop.imageUrl}
          alt={barbershop.name}
          style={{ objectFit: 'cover' }}
          className="opacity-75"
          fill
        />
      </div>

      <div className="px-5 pt-3 pb-6 border-b border-solid border-secondary">
        <h1 className="text-xl font-bold">{barbershop.name}</h1>

        <div className="flex items-center gap-1 mt-2">
          <MapPinIcon className="text-primary" size={18} />
          <p className="text-sm">{barbershop.address}</p>
        </div>

        <div className="flex items-center gap-1 mt-2">
          <StarIcon className="text-primary" size={18} />
          <p className="text-sm">5,0 (899 avaliações)</p>
        </div>
      </div>
    </div>
  )
}