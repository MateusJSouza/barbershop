import { isFuture, isPast } from 'date-fns'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'

import { Header } from '../_components/header'
import { db } from '../_lib/prisma'
import { BookingItem } from '../(home)/_components/booking-item'
import { authOptions } from '../api/auth/[...nextauth]/route'

export default async function BookingsPage() {
  // recuperar a sessão do usuário
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    redirect('/')
  }

  const bookings = await db.booking.findMany({
    where: {
      userId: (session.user as any).id,
    },
    include: {
      service: true,
      barbershop: true,
    },
  })

  const confirmedBookings = bookings.filter((booking) => isFuture(booking.date))
  const finishedBookings = bookings.filter((booking) => isPast(booking.date))

  return (
    <>
      <Header />

      <div className="px-5 py-6">
        <h1 className="font-bold text-sm">Agendamentos</h1>

        <h2 className="text-gray-400 uppercase font-bold text-sm mt-6 mb-3">
          Confirmados
        </h2>

        <div className="space-y-3">
          {confirmedBookings.map((booking) => (
            <BookingItem key={booking.id} booking={booking} />
          ))}
        </div>

        <h2 className="text-gray-400 uppercase font-bold text-sm mt-6 mb-3">
          Finalizados
        </h2>

        <div className="space-y-3">
          {finishedBookings.map((booking) => (
            <BookingItem key={booking.id} booking={booking} />
          ))}
        </div>
      </div>
    </>
  )
}
