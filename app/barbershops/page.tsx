import { redirect } from 'next/navigation'

import { Header } from '../_components/header'
import { db } from '../_lib/prisma'
import { BarbershopItem } from '../(home)/_components/barbershop-item'
import { Search } from '../(home)/_components/search'

interface BarbershopPageProps {
  searchParams: {
    search?: string
  }
}

export default async function BarbershopPage({
  searchParams,
}: BarbershopPageProps) {
  if (!searchParams.search) {
    return redirect('/')
  }

  const barbershops = await db.barbershop.findMany({
    where: {
      name: {
        contains: searchParams.search,
        mode: 'insensitive',
      },
    },
  })

  return (
    <>
      <Header />

      <div className="px-5 py-6 flex flex-col gap-6">
        <Search
          defaultValues={{
            search: searchParams.search,
          }}
        />
        <h1 className="text-gray-400 font-bold text-xs uppercase">
          Resultados para &quot;{searchParams.search}&quot;
        </h1>

        <div className="grid grid-cols-2 gap-4">
          {barbershops.map((barbershop) => (
            <div key={barbershop.id} className="w-full">
              <BarbershopItem barbershop={barbershop} />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
