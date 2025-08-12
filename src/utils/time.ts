import type { AvailableDaysFormat } from '@/types'

export function getDateLabel(dateStr: string, todayStr: string): AvailableDaysFormat {
  const date = new Date(dateStr)
  const today = new Date(todayStr)

  today.setHours(0, 0, 0, 0)
  const target = new Date(date)
  target.setHours(0, 0, 0, 0)

  const diffInDays = Math.floor((+target - +today) / (1000 * 60 * 60 * 24))

  let prefix = ''
  if (diffInDays === 0) {
    prefix = 'сегодня'
  } else if (diffInDays === 1) {
    prefix = 'завтра'
  } else {
    prefix = getWeekday(date)
  }

  return {
    date: dateStr,
    day: getDayMonth(date),
    prefix,
  }
}

function getDayMonth(date: Date): string {
  return date.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
  })
}

function getWeekday(date: Date): string {
  return date.toLocaleDateString('ru-RU', {
    weekday: 'long',
  })
}
