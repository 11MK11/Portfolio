import { defineStore } from 'pinia'

const uid = () =>
  (globalThis.crypto?.randomUUID?.() ||
    `e_${Date.now()}_${Math.random().toString(16).slice(2)}`)

const toDateTime = (yyyyMmDd, hhMm) => new Date(`${yyyyMmDd}T${hhMm}:00`)

const statusOf = (e) => {
  const now = new Date()
  const start = toDateTime(e.startDate, e.startTime)
  const end = toDateTime(e.endDate, e.endTime)

  if (now < start) return 'upcoming'
  if (now > end) return 'past'
  return 'ongoing'
}

export const useEventsStore = defineStore('events', {
  state: () => ({
    search: '',
    statusFilter: 'all',

    events: [
      {
        id: uid(),
        title: 'Ordonex Watch Party',
        type: 'watch_party', // watch_party | meetup | workshop | tournament_event | other
        location: 'Amman - Gaming Center',
        link: '',
        startDate: '2026-02-11',
        startTime: '21:00',
        endDate: '2026-02-11',
        endTime: '23:30',
        capacity: 80,
        attendees: 46,
        notes: 'Community night • snacks • prizes',
      },
      {
        id: uid(),
        title: 'Discord Community Meeting',
        type: 'meetup',
        location: 'Online (Discord)',
        link: 'https://discord.gg/your-invite',
        startDate: '2026-02-15',
        startTime: '22:00',
        endDate: '2026-02-15',
        endTime: '23:00',
        capacity: 300,
        attendees: 120,
        notes: 'Monthly updates + Q&A',
      },
      {
        id: uid(),
        title: 'Content Creator Workshop',
        type: 'workshop',
        location: 'PSUT - Lab 2',
        link: '',
        startDate: '2026-01-10',
        startTime: '18:00',
        endDate: '2026-01-10',
        endTime: '20:00',
        capacity: 40,
        attendees: 40,
        notes: 'Branding + thumbnails + shorts workflow',
      },
    ],
  }),

  getters: {
    computedEvents(state) {
      return state.events.map((e) => ({
        ...e,
        status: statusOf(e),
      }))
    },

    filteredEvents(state) {
      const q = state.search.trim().toLowerCase()
      const list = this.computedEvents

      return list.filter((e) => {
        if (state.statusFilter !== 'all' && e.status !== state.statusFilter) return false
        if (!q) return true

        const hay = `${e.title} ${e.type} ${e.location} ${e.link || ''}`.toLowerCase()
        return hay.includes(q)
      })
    },

    stats(state) {
      const list = this.computedEvents
      const total = list.length
      const upcoming = list.filter((e) => e.status === 'upcoming').length
      const ongoing = list.filter((e) => e.status === 'ongoing').length
      const past = list.filter((e) => e.status === 'past').length
      return { total, upcoming, ongoing, past }
    },
  },

  actions: {
    addEvent(payload) {
      const e = {
        id: uid(),
        title: String(payload.title || '').trim(),
        type: payload.type,
        location: String(payload.location || '').trim(),
        link: String(payload.link || '').trim(),
        startDate: String(payload.startDate || '').trim(),
        startTime: String(payload.startTime || '').trim(),
        endDate: String(payload.endDate || '').trim(),
        endTime: String(payload.endTime || '').trim(),
        capacity: Number(payload.capacity || 0),
        attendees: Number(payload.attendees || 0),
        notes: String(payload.notes || '').trim(),
      }

      if (!e.title || !e.type || !e.location || !e.startDate || !e.startTime || !e.endDate || !e.endTime) {
        throw new Error('Missing required fields')
      }

      if (e.attendees > e.capacity) e.attendees = e.capacity
      this.events.unshift(e)
    },

    updateEvent(id, patch) {
      const e = this.events.find((x) => x.id === id)
      if (!e) return

      e.title = String(patch.title || '').trim()
      e.type = patch.type
      e.location = String(patch.location || '').trim()
      e.link = String(patch.link || '').trim()
      e.startDate = String(patch.startDate || '').trim()
      e.startTime = String(patch.startTime || '').trim()
      e.endDate = String(patch.endDate || '').trim()
      e.endTime = String(patch.endTime || '').trim()
      e.capacity = Number(patch.capacity || 0)
      e.attendees = Number(patch.attendees || 0)
      e.notes = String(patch.notes || '').trim()

      if (!e.title || !e.type || !e.location || !e.startDate || !e.startTime || !e.endDate || !e.endTime) {
        throw new Error('Missing required fields')
      }
      if (e.attendees > e.capacity) e.attendees = e.capacity
    },

    removeEvent(id) {
      this.events = this.events.filter((e) => e.id !== id)
    },
  },
})
