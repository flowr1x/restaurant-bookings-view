import type { Table } from '@/types'
import { computed } from 'vue'
import { type Ref } from 'vue'

export function useReservations(tables: Table[], selectedDate: Ref<string>, activesZone: Ref<string[]>) {
  const eventFilterCurrentDateAndZone = computed(() => {
    const CLOSE_WINDOW = 30 // мин — ±30 минут для кластеризации по старту
    const OVERLAY_OFFSET_PX = 4 // px — смещение при наложении
    const toMinute = (iso: string) => {
      const d = new Date(iso)
      return d.getHours() * 60 + d.getMinutes()
    }

    return tables
      .map((table, tableIndex) => {
        // 1) фильтрация + сортировка по старту
        const list = table.reservations
          .filter((reservation) => {
            const date = reservation.seating_time.split('T')[0]
            return date === selectedDate.value && activesZone.value.includes(table.zone)
          })
          .slice()
          .sort((a, b) => toMinute(a.seating_time) - toMinute(b.seating_time))

        if (!list.length) return []

        // Преобразуем в объекты с минутами для удобства
        type Item = (typeof list)[0] & { startMin: number; endMin: number; tableIndex: number }
        const items: Item[] = list.map((r) => ({
          ...r,
          startMin: toMinute(r.seating_time),
          endMin: toMinute(r.end_time),
          tableIndex,
        }))

        // 2) формируем кластеры по правилу "цепной ±30 минут по start"
        const clusters: Item[][] = []
        let currentCluster: Item[] = []
        let lastStart: number | null = null

        for (const it of items) {
          if (currentCluster.length === 0) {
            currentCluster.push(it)
            lastStart = it.startMin
          } else {
            if (lastStart !== null && it.startMin - lastStart <= CLOSE_WINDOW) {
              // цепное добавление в кластер
              currentCluster.push(it)
              lastStart = it.startMin
            } else {
              clusters.push(currentCluster)
              currentCluster = [it]
              lastStart = it.startMin
            }
          }
        }
        if (currentCluster.length) clusters.push(currentCluster)

        // 3) для каждого кластера делаем greedy-coloring и считаем offset
        const result: Array<
          (typeof list)[0] & {
            tableIndex: number
            column: number
            columnIndex: number
            offset: number
          }
        > = []

        for (const cluster of clusters) {
          // сортировка по start (на всякий случай)
          cluster.sort((a, b) => a.startMin - b.startMin)

          // greedy coloring: columnsEndTimes[c] = endMin of last event in column c
          const columnsEndTimes: number[] = []
          const assigns: { item: Item; col: number }[] = []

          for (const it of cluster) {
            let found = -1
            for (let c = 0; c < columnsEndTimes.length; c++) {
              if (columnsEndTimes[c] <= it.startMin) {
                found = c
                break
              }
            }
            if (found === -1) {
              columnsEndTimes.push(it.endMin)
              found = columnsEndTimes.length - 1
            } else {
              columnsEndTimes[found] = it.endMin
            }
            assigns.push({ item: it, col: found })
          }

          const colsCount = Math.max(1, columnsEndTimes.length)

          // baseOffset = число событий, начавшихся раньше самого раннего в кластере и ещё не закончившихся
          const clusterStart = cluster[0].startMin
          const activeBeforeCount = items.filter((it) => it.startMin < clusterStart && it.endMin > clusterStart).length
          const baseOffset = activeBeforeCount * OVERLAY_OFFSET_PX

          // Заполняем результат: каждому событию кластера добавляем tableIndex, column, columnIndex, offset
          for (const a of assigns) {
            const r = a.item
            result.push({
              ...((list.find((x) => toMinute(x.seating_time) === r.startMin && toMinute(x.end_time) === r.endMin) ||
                r) as any),
              tableIndex,
              column: colsCount,
              columnIndex: a.col,
              offset: baseOffset,
            })
          }
        }

        return result
      })
      .flat()
  })

  return { eventFilterCurrentDateAndZone }
}
