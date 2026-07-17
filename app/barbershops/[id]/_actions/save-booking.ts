'use server'

import { revalidatePath } from 'next/cache'
import { getServerSession } from 'next-auth'

import { authOptions } from '@/app/_lib/auth'
import { db } from '@/app/_lib/prisma'

interface SaveBookingParams {
  barbershopId: string
  serviceId: string
  date: Date
}

export default async function saveBooking({
  barbershopId,
  serviceId,
  date,
}: SaveBookingParams) {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    throw new Error('Unauthorized')
  }

  const userId = (session.user as any).id as string

  await db.booking.create({
    data: {
      serviceId,
      userId,
      date,
      barbershopId,
    },
  })

  revalidatePath('/')
  revalidatePath('/bookings')
}
