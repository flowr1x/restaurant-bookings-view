import type { Reservation } from '@/types'

const CELL_WIDTH = 80
const WIDTH_FIRST_COLUMN = 32

function parseTimeToMinutes(time: string): number {
  const [hours, minutes] = time.split(':').map(Number)
  return hours * 60 + minutes
}

export function getReservationStyle(
  reservation: Reservation & { tableIndex: number },
  openingTime: string,
  closingTime: string,
) {
  const startTime = reservation.seating_time.slice(11, 16) // 'HH:mm' 15:50
  const endTime = reservation.end_time.slice(11, 16) // 17:50

  const openMinutes = parseTimeToMinutes(openingTime) // 660
  const closeMinutes = parseTimeToMinutes(closingTime) // 1380
  const totalMinutes = closeMinutes - openMinutes //  720

  const startMinutes = parseTimeToMinutes(startTime) - openMinutes // 850 - 660 = 190
  const endMinutes = parseTimeToMinutes(endTime) - openMinutes // 1070 - 660 = 410

  const topPercent = (startMinutes / totalMinutes) * 100
  const heightPercent = ((endMinutes - startMinutes) / totalMinutes) * 100

  const left = reservation.tableIndex * CELL_WIDTH + WIDTH_FIRST_COLUMN

  return {
    top: `${topPercent}%`,
    height: `${heightPercent}%`,
    left: `${left}px`, // 32px имеет первый столбец
    width: `${CELL_WIDTH}px`,
  }
}
