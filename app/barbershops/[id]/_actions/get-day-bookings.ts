'use server'

import { endOfDay, startOfDay } from 'date-fns'

import { db } from '@/app/_lib/prisma'

export default async function getDayBookings(barbershopId: string, date: Date) {
  const bookings = await db.booking.findMany({
    where: {
      barbershopId,
      date: {
        lte: endOfDay(date), // menor que o final do dia
        gte: startOfDay(date), // menor que o final do dia
      },
    },
  })

  return bookings
}
