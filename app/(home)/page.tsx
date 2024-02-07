import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { getServerSession } from 'next-auth'

import { Header } from '../_components/header'
import { authOptions } from '../_lib/auth'
import { db } from '../_lib/prisma'
import { BarbershopItem } from './_components/barbershop-item'
import { BookingItem } from './_components/booking-item'
import { Search } from './_components/search'

export default async function Home() {
  // sessão do usuário autenticado
  const session = await getServerSession(authOptions)

  const [barbershops, confirmedBookings] = await Promise.all([
    await db.barbershop.findMany({}),
    session?.user
      ? await db.booking.findMany({
          where: {
            userId: (session.user as any).id,
            date: {
              gte: new Date(),
            },
          },
          include: {
            service: true,
            barbershop: true,
          },
        })
      : Promise.resolve([]),
  ])

  return (
    <div>
      <Header />

      <div className="px-5 pt-5">
        <h2 className="text-xl font-bold">
          {session?.user
            ? `Olá, ${session.user.name?.split(' ')[0]}!`
            : 'Olá! Vamos agendar um corte hoje?'}
        </h2>

        <p className="capitalize">
          {format(new Date(), "EEEE',' dd 'de' MMMM", {
            locale: ptBR,
          })}
        </p>
      </div>

      <div className="mt-6 px-5">
        <Search />
      </div>

      <div className="mt-6">
        {confirmedBookings.length > 0 && (
          <>
            <h2 className="pl-5 text-xs uppercase text-gray-400 font-bold mb-3">
              Agendamentos
            </h2>
            <div className="px-5 flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden">
              {confirmedBookings.map((booking) => (
                <BookingItem key={booking.id} booking={booking} />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="mt-6">
        <h2 className="px-5 text-xs uppercase text-gray-400 font-bold mb-3">
          Recomendados
        </h2>

        <div className="flex px-5 gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop) => (
            <div key={barbershop.id} className="min-w-[167px] max-w-[167px]">
              <BarbershopItem barbershop={barbershop} />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 mb-[4.5rem]">
        <h2 className="px-5 text-xs uppercase text-gray-400 font-bold mb-3">
          Populares
        </h2>

        <div className="flex px-5 gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop) => (
            <div key={barbershop.id} className="min-w-[167px] max-w-[167px]">
              <BarbershopItem key={barbershop.id} barbershop={barbershop} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
