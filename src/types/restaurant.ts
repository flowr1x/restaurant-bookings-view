export type OrderStatus = 'New' | 'Bill' | 'Closed' | 'Banquet'
export type ReservationStatus = 'Живая очередь' | 'Новая' | 'Заявка' | 'Открыт' | 'Закрыт'
export type Zone = '1 этаж' | '2 этаж' | 'Банкетный зал'

export type Order = {
  id: string
  status: OrderStatus
  start_time: string // ISO string with timezone
  end_time: string
}

export type Reservation = {
  id: number
  name_for_reservation: string
  num_people: number
  phone_number: string
  status: ReservationStatus
  seating_time: string // ISO string with timezone
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
  opening_time: string // "HH:mm"
  closing_time: string // "HH:mm"
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

export type ReservationStatusShow = 'Живая очередь' | 'Ожидает подтверждения' | 'Ожидаем' | 'В зале' | 'Отменен'
export type ReservationStatusInfo = {
  text: ReservationStatusShow
  selector: string
}
export type StatusClasses = {
  [key in ReservationStatus]: ReservationStatusInfo
}
