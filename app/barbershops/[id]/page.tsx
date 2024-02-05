import { getServerSession } from 'next-auth'

import { db } from '@/app/_lib/prisma'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

import BarbershopInfo from './_components/barbershop-info'
import ServiceItem from './_components/service-item'

interface BarbershopDetailsPageProps {
  params: {
    id?: string
  }
}

export default async function BarbershopDetailsPage({
  params,
}: BarbershopDetailsPageProps) {
  const session = await getServerSession(authOptions)

  if (!params.id) {
    // TODO redirecionar para home page
    return null
  }

  const barbershop = await db.barbershop.findUnique({
    where: {
      id: params.id,
    },
    include: {
      services: true,
    },
  })

  if (!barbershop) {
    // TODO redirecionar para home page
    return null
  }

  return (
    <div>
      <BarbershopInfo barbershop={barbershop} />

      <div className="px-5 flex flex-col gap-4 py-6">
        {barbershop.services.map((service) => (
          <ServiceItem
            service={service}
            key={service.id}
            isAuthenticated={!!session?.user}
          />
        ))}
      </div>
    </div>
  )
}
