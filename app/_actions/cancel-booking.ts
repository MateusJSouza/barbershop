'use server'

import { revalidatePath } from 'next/cache'
import { getServerSession } from 'next-auth'

import { authOptions } from '../_lib/auth'
import { db } from '../_lib/prisma'

export default async function cancelBooking(bookingId: string) {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    throw new Error('Unauthorized')
  }

  const userId = (session.user as any).id as string

  const booking = await db.booking.findUnique({
    where: {
      id: bookingId,
    },
    select: {
      userId: true,
    },
  })

  if (!booking || booking.userId !== userId) {
    throw new Error('Forbidden')
  }

  await db.booking.delete({
    where: {
      id: bookingId,
    },
  })

  revalidatePath('/')
  revalidatePath('/bookings')
}
