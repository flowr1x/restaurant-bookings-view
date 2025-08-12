import type { StatusClasses, ReservationStatus, ReservationStatusInfo } from '@/types'
import type { ComputedRef } from 'vue'
import { computed } from 'vue'

export function useStatusReservation(status: ReservationStatus): {
  currentStatus: ComputedRef<ReservationStatusInfo>
} {
  const statusClasses: StatusClasses = {
    Новая: {
      text: 'Ожидает подтверждения',
      selector: 'status-new',
    },
    Заявка: {
      text: 'Ожидаем',
      selector: 'status-request',
    },
    Открыт: {
      text: 'В зале',
      selector: 'status-open',
    },
    Отменен: {
      text: 'Отменен',
      selector: 'status-close',
    },
    'Живая очередь': {
      text: 'Живая очередь',
      selector: 'status-live',
    },
  }

  const currentStatus = computed(
    (): ReservationStatusInfo => statusClasses[status] || { text: 'Ошибка', selector: 'status-error' },
  )

  return { currentStatus }
}
