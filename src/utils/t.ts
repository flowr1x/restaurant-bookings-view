const eventsOverlap = computed(() => {
  type ReservationWithColumn = (typeof eventFilterCurrentDateAndZone.value)[0][0] & { columnIndex: number }
  const result: ReservationWithColumn[] = []
  eventFilterCurrentDateAndZone.value.forEach((reservations) => {
    for (let reservation of reservations) {
      const start = toMinute(reservation.seating_time)
      const end = toMinute(reservation.end_time)

      // Находим пересекающиеся или близкие (±30 мин)
      const overlap = result.filter((r) => {
        const rStart = toMinute(r.seating_time)
        const rEnd = toMinute(r.end_time)
        const overlap = start < rEnd && end > rStart
        const close = Math.abs(start - rStart) <= 30
        return overlap || close
      })

      let columnIndex = 0
      if (overlap.length) {
        const usedColumns = overlap.map((r) => r.columnIndex)
        while (usedColumns.includes(columnIndex)) {
          columnIndex++
        }
      }
      result.push({ ...reservation, columnIndex })
    }
  })
  return result
})
