import { addMinutes, format, setHours, setMinutes } from 'date-fns'

export function generateDayTimeList(date: Date) {
  const startTime = setMinutes(setHours(date, 9), 0) // o tempo inicial é 09:00
  const endTime = setMinutes(setHours(date, 21), 0) // o tempo final é 21:00

  const interval = 45 // intervalo em minutos
  const timeList: string[] = []

  let currentTime = startTime

  while (currentTime <= endTime) {
    timeList.push(format(currentTime, 'HH:mm'))
    currentTime = addMinutes(currentTime, interval)
  }

  return timeList
}
