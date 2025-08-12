import type { TableEvent } from '@/types'

const CELL_WIDTH = 80
const WIDTH_FIRST_COLUMN = 32

function parseTimeToMinutes(time: string): number {
  const [hours, minutes] = time.split(':').map(Number)
  return hours * 60 + minutes
}

export function getTime(time: string): string {
  return time.slice(11, 16)
}

export function getReservationStyle(event: TableEvent, openingTime: string, closingTime: string) {
  const startTime = getTime(event.start)
  const endTime = getTime(event.end)

  const openMinutes = parseTimeToMinutes(openingTime)
  const closeMinutes = parseTimeToMinutes(closingTime)
  const totalMinutes = closeMinutes - openMinutes

  const startMinutes = parseTimeToMinutes(startTime) - openMinutes
  const endMinutes = parseTimeToMinutes(endTime) - openMinutes

  const topPercent = (startMinutes / totalMinutes) * 100
  const heightPercent = ((endMinutes - startMinutes) / totalMinutes) * 100

  const columnWidth = CELL_WIDTH / event.column
  const baseLeft = event.tableIndex * CELL_WIDTH + WIDTH_FIRST_COLUMN
  const left = baseLeft + columnWidth * event.columnIndex + event.offset

  const width = columnWidth - event.offset
  return {
    top: `${topPercent}%`,
    height: `${heightPercent}%`,
    left: `${left}px`,
    width: `${width}px`,
    zIndex: `${10 + event.column}`,
  }
}
