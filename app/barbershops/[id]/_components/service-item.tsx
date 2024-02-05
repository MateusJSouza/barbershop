import { Service } from '@prisma/client'
import Image from 'next/image'

import { Button } from '@/app/_components/ui/button'
import { Card, CardContent } from '@/app/_components/ui/card'

interface ServiceItemProps {
  service: Service
}

export default function ServiceItem({ service }: ServiceItemProps) {
  return (
    <Card>
      <CardContent className="p-3">
        <div className="flex gap-4 items-center">
          <div className="relative min-w-[110px] min-h-[110px] max-w-[110px] max-h-[110px]">
            <Image
              src={service.imageUrl}
              alt={service.name}
              style={{ objectFit: 'contain' }}
              className="rounded-lg"
              fill
            />
          </div>

          <div className="flex-col w-full">
            <h2 className="font-bold">{service.name}</h2>
            <p className="text-sm text-gray-400">{service.description}</p>

            <div className="flex items-center justify-between mt-3">
              <p className="text-primary font-bold">
                {Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(Number(service.price))}
              </p>
              <Button variant="secondary">Reservar</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
