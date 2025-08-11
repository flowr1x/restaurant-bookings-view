import type { Reservation } from '@/types'

const CELL_WIDTH = 80
const WIDTH_FIRST_COLUMN = 32

function parseTimeToMinutes(time: string): number {
  const [hours, minutes] = time.split(':').map(Number)
  return hours * 60 + minutes
}

export function getTime(time: string): string {
  return time.slice(11, 16)
}

export function getReservationStyle(
  reservation: Reservation & {
    tableIndex: number
    column: number
    columnIndex: number
    offset: number
  },
  openingTime: string,
  closingTime: string,
) {
  const startTime = getTime(reservation.seating_time) // 'HH:mm' 15:50
  const endTime = getTime(reservation.end_time) // 17:50

  const openMinutes = parseTimeToMinutes(openingTime) // 660
  const closeMinutes = parseTimeToMinutes(closingTime) // 1380
  const totalMinutes = closeMinutes - openMinutes //  720

  const startMinutes = parseTimeToMinutes(startTime) - openMinutes // 850 - 660 = 190
  const endMinutes = parseTimeToMinutes(endTime) - openMinutes // 1070 - 660 = 410

  const topPercent = (startMinutes / totalMinutes) * 100
  const heightPercent = ((endMinutes - startMinutes) / totalMinutes) * 100

  const columnWidth = CELL_WIDTH / reservation.column
  const baseLeft = reservation.tableIndex * CELL_WIDTH + WIDTH_FIRST_COLUMN
  const left = baseLeft + columnWidth * reservation.columnIndex + reservation.offset

  const width = columnWidth - reservation.offset
  return {
    top: `${topPercent}%`,
    height: `${heightPercent}%`,
    left: `${left}px`, // 32px имеет первый столбец
    width: `${width}px`,
  }
}
