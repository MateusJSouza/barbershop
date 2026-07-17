'use server'

import { endOfDay, startOfDay } from 'date-fns'
import { getServerSession } from 'next-auth'

import { authOptions } from '@/app/_lib/auth'
import { db } from '@/app/_lib/prisma'

export default async function getDayBookings(barbershopId: string, date: Date) {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    throw new Error('Unauthorized')
  }

  const bookings = await db.booking.findMany({
    where: {
      barbershopId,
      date: {
        lte: endOfDay(date),
        gte: startOfDay(date),
      },
    },
  })

  return bookings
}
