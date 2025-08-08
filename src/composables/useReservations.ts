import type { Reservation, Table } from '@/types'
import { computed } from 'vue'

export function useReservations(tables: Table[]) {
  return computed(() => {
    const reservation: Array<Reservation & { tableIndex: number }> = []
    tables.forEach((table, index) => {
      table.reservations.forEach((r) => {
        reservation.push({
          ...r,
          tableIndex: index,
        })
      })
    })

    return reservation
  })
}
