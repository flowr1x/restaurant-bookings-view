import type { StatusClassesOrder, OrderStatus, OrderStatusInfo } from '@/types'
import type { ComputedRef } from 'vue'
import { computed } from 'vue'

export function useStatusOrder(status: OrderStatus): {
  currentStatus: ComputedRef<OrderStatusInfo>
} {
  const statusClasses: StatusClassesOrder = {
    New: {
      text: 'Новый',
      selector: 'status-new',
    },
    Bill: {
      text: 'Пречек',
      selector: 'status-bill',
    },
    Closed: {
      text: 'Закрытый',
      selector: 'status-closed',
    },
    Banquet: {
      text: 'Банкет',
      selector: 'status-banquet',
    },
  }

  const currentStatus = computed(
    (): OrderStatusInfo => statusClasses[status] || { text: 'Ошибка', selector: 'status-error' },
  )

  return { currentStatus }
}
