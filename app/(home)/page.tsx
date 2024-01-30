import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { Header } from '../_components/header'
import { BookingItem } from './_components/booking-item'
import { Search } from './_components/search'

export default function Home() {
  return (
    <div>
      <Header />

      <div className="px-5 pt-5">
        <h2 className="text-xl font-bold">Olá, Miguel!</h2>

        <p className="capitalize">
          {format(new Date(), "EEEE',' dd 'de' MMMM", {
            locale: ptBR,
          })}
        </p>
      </div>

      <div className="mt-6 px-5">
        <Search />
      </div>

      <div className="px-5 mt-6">
        <h2 className="text-xs uppercase text-gray-400 font-bold mb-3">
          Agendamentos
        </h2>
        <BookingItem />
      </div>
    </div>
  )
}
