'use server'

import { db } from '@/app/_lib/prisma'

interface SaveBookingParams {
  barbershopId: string
  serviceId: string
  userId: string
  date: Date
}

export default async function saveBooking({
  barbershopId,
  serviceId,
  userId,
  date,
}: SaveBookingParams) {
  await db.booking.create({
    data: {
      serviceId,
      userId,
      date,
      barbershopId,
    },
  })
}
