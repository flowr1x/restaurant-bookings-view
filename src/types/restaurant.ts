export type OrderStatus = 'New' | 'Bill' | 'Closed' | 'Banquet'
export type ReservationStatus = 'Живая очередь' | 'Новая' | 'Заявка' | 'Открыт' | 'Отменен'
export type Zone = '1 этаж' | '2 этаж' | 'Банкетный зал'

export type Order = {
  id: string
  status: OrderStatus
  start_time: string
  end_time: string
}

export type Reservation = {
  id: number
  name_for_reservation: string
  num_people: number
  phone_number: string
  status: ReservationStatus
  seating_time: string
  end_time: string
}

export type Table = {
  id: string
  capacity: number
  number: string
  zone: Zone
  orders: Order[]
  reservations: Reservation[]
}

export type Restaurant = {
  id: number
  timezone: string
  restaurant_name: string
  opening_time: string
  closing_time: string
}

export type RestaurantData = {
  available_days: string[]
  current_day: string
  restaurant: Restaurant
  tables: Table[]
}

export type AvailableDaysFormat = {
  date: string
  day: string
  prefix: string
}

export type EventType = 'reservation' | 'order'
export interface TableEvent {
  id: string | number
  type: EventType
  tableIndex: number
  start: string
  end: string
  column: number
  columnIndex: number
  offset: number
  meta: Reservation | Order
}

export type ReservationStatusShow = 'Живая очередь' | 'Ожидает подтверждения' | 'Ожидаем' | 'В зале' | 'Отменен'
export type ReservationStatusInfo = {
  text: ReservationStatusShow
  selector: string
}
export type StatusClasses = {
  [key in ReservationStatus]: ReservationStatusInfo
}

export type OrderStatusShow = 'Новый' | 'Пречек' | 'Закрытый' | 'В зале' | 'Банкет'
export type OrderStatusInfo = {
  text: OrderStatusShow
  selector: string
}
export type StatusClassesOrder = {
  [key in OrderStatus]: OrderStatusInfo
}
