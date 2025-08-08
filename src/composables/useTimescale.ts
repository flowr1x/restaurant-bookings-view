import { ref } from 'vue'

export function useTimescale(open: string, close: string, step: number = 30) {
  const parseTime = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number)
    return hours * 60 + minutes
  }
  const formatTime = (totalMinutes: number) => {
    const hours = Math.floor(totalMinutes / 60)
    const minutes = totalMinutes % 60
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`
  }

  const start = parseTime(open)
  const end = parseTime(close)
  const timescale = ref<string[]>([])

  for (let i = start; i <= end; i += step) {
    timescale.value.push(formatTime(i))
  }
  timescale.value.pop()
  return timescale
}
