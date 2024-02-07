'use server'

import { revalidatePath } from 'next/cache'

import { db } from '../_lib/prisma'

export default async function cancelBooking(bookingId: string) {
  await db.booking.delete({
    where: {
      id: bookingId,
    },
  })

  revalidatePath('/')
  revalidatePath('/bookings')
}
