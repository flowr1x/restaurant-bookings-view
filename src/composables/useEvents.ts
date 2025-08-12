import type { Table, TableEvent, Zone } from '@/types'
import { computed, type Ref } from 'vue'

function parseHoursMinutesFromISO(iso: string): { h: number; m: number } {
  const m = iso.match(/T(\d{2}):(\d{2})/)
  if (m) return { h: Number(m[1]), m: Number(m[2]) }
  const d = new Date(iso)
  return { h: d.getHours(), m: d.getMinutes() }
}

function toMinute(iso: string): number {
  const { h, m } = parseHoursMinutesFromISO(iso)
  return h * 60 + m
}

export function useEvents(tables: Table[], selectedDate: Ref<string>, activesZone: Ref<Zone[]>) {
  const ALL_EVENTS = computed(() => {
    const CLOSE_WINDOW = 30
    const OVERLAY_OFFSET_PX = 4

    const byTable: Record<
      number,
      {
        original: TableEvent
        startMin: number
        endMin: number
      }[]
    > = {}

    tables.forEach((table, tableIndex) => {
      if (!activesZone.value.includes(table.zone)) return

      table.reservations.forEach((r) => {
        if (!r.seating_time?.startsWith(selectedDate.value)) return
        const startMin = toMinute(r.seating_time)
        const endMin = toMinute(r.end_time)
        byTable[tableIndex] ??= []
        byTable[tableIndex].push({
          original: {
            id: r.id,
            type: 'reservation',
            tableIndex,
            start: r.seating_time,
            end: r.end_time,
            column: 0,
            columnIndex: 0,
            offset: 0,
            meta: r,
          },
          startMin,
          endMin,
        })
      })
      table.orders.forEach((o) => {
        if (!o.start_time?.startsWith(selectedDate.value)) return
        const startMin = toMinute(o.start_time)
        const endMin = toMinute(o.end_time)
        byTable[tableIndex] ??= []
        byTable[tableIndex].push({
          original: {
            id: o.id,
            type: 'order',
            tableIndex,
            start: o.start_time,
            end: o.end_time,
            column: 0,
            columnIndex: 0,
            offset: 0,
            meta: o,
          },
          startMin,
          endMin,
        })
      })
    })

    const out: TableEvent[] = []

    for (const tableIndexStr of Object.keys(byTable)) {
      const tableIndex = Number(tableIndexStr)
      const items = byTable[tableIndex] ?? []
      if (!items.length) continue

      items.sort((a, b) => a.startMin - b.startMin)

      const clusters: (typeof items)[] = []
      let currentCluster: typeof items = []
      let lastStart: number | null = null

      for (const it of items) {
        if (currentCluster.length === 0) {
          currentCluster.push(it)
          lastStart = it.startMin
        } else {
          if (lastStart !== null && it.startMin - lastStart <= CLOSE_WINDOW) {
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

      for (const cluster of clusters) {
        cluster.sort((a, b) => a.startMin - b.startMin)

        const columnsEndTimes: number[] = []
        const assigns: { item: (typeof cluster)[number]; col: number }[] = []

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

        const clusterStart = cluster[0].startMin
        const itemsAll = items
        const activeBeforeCount = itemsAll.filter((it) => it.startMin < clusterStart && it.endMin > clusterStart).length
        const baseOffset = activeBeforeCount * OVERLAY_OFFSET_PX

        for (const a of assigns) {
          const e = a.item.original
          out.push({
            ...e,
            tableIndex,
            column: colsCount,
            columnIndex: a.col,
            offset: baseOffset,
          })
        }
      }
    }

    out.sort((a, b) => {
      const ta = toMinute(a.start)
      const tb = toMinute(b.start)
      if (ta !== tb) return ta - tb
      return toMinute(a.end) - toMinute(b.end)
    })

    return out
  })

  return { allEvents: ALL_EVENTS }
}
