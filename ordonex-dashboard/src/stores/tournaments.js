import { defineStore } from 'pinia'

const uid = () =>
  (globalThis.crypto?.randomUUID?.() ||
    `t_${Date.now()}_${Math.random().toString(16).slice(2)}`)

const toDate = (yyyyMmDd) => new Date(`${yyyyMmDd}T00:00:00`)

const todayStr = () => new Date().toISOString().slice(0, 10)

const calcStatus = (t) => {
  const now = new Date()
  const start = toDate(t.startDate)
  const end = toDate(t.endDate)

  if (now < start) return 'upcoming'
  if (now > end) return 'ended'
  return 'ongoing'
}

export const useTournamentsStore = defineStore('tournaments', {
  state: () => ({
    search: '',
    statusFilter: 'all',

    tournaments: [
      {
        id: uid(),
        title: 'Ordonex Valorant Night Cup',
        game: 'Valorant',
        region: 'Jordan',
        startDate: '2026-02-20',
        endDate: '2026-02-20',
        maxTeams: 16,
        registeredTeams: 10,
        prizePool: 300,
        notes: 'Single elimination • BO1 • Finals BO3',
      },
      {
        id: uid(),
        title: 'EA FC 25 Weekend League',
        game: 'EA FC 25',
        region: 'Jordan',
        startDate: '2026-02-10',
        endDate: '2026-02-11',
        maxTeams: 64,
        registeredTeams: 44,
        prizePool: 150,
        notes: 'Group stage + playoffs',
      },
      {
        id: uid(),
        title: 'CS2 Scrim Series',
        game: 'CS2',
        region: 'MENA',
        startDate: '2026-01-10',
        endDate: '2026-01-15',
        maxTeams: 8,
        registeredTeams: 8,
        prizePool: 0,
        notes: 'Invite only',
      },
      {
       id: uid(),
       title: 'Ordonex Community Cup',
       game: 'Valorant',
       region: 'Jordan',
       startDate: '2026-02-09', // started yesterday
       endDate: '2026-02-15',   // ends in a few days
       maxTeams: 16,
       registeredTeams: 14,
       prizePool: 500,
       notes: 'Community-only • BO1 • Semi-finals BO3',
       },
    ],
  }),

  getters: {
    computedTournaments(state) {
      return state.tournaments.map((t) => ({
        ...t,
        status: calcStatus(t),
      }))
    },

    filteredTournaments(state) {
      const q = state.search.trim().toLowerCase()
      const list = this.computedTournaments

      return list.filter((t) => {
        if (state.statusFilter !== 'all' && t.status !== state.statusFilter) return false
        if (!q) return true

        const hay = `${t.title} ${t.game} ${t.region}`.toLowerCase()
        return hay.includes(q)
      })
    },

    stats(state) {
      const list = this.computedTournaments
      const total = list.length
      const upcoming = list.filter((t) => t.status === 'upcoming').length
      const ongoing = list.filter((t) => t.status === 'ongoing').length
      const ended = list.filter((t) => t.status === 'ended').length
      return { total, upcoming, ongoing, ended }
    },
  },

  actions: {
    addTournament(payload) {
      const t = {
        id: uid(),
        title: String(payload.title || '').trim(),
        game: String(payload.game || '').trim(),
        region: String(payload.region || '').trim(),
        startDate: String(payload.startDate || '').trim(),
        endDate: String(payload.endDate || '').trim(),
        maxTeams: Number(payload.maxTeams || 0),
        registeredTeams: Number(payload.registeredTeams || 0),
        prizePool: Number(payload.prizePool || 0),
        notes: String(payload.notes || '').trim(),
      }

      if (!t.title || !t.game || !t.region || !t.startDate || !t.endDate) {
        throw new Error('Missing required fields')
      }

      // keep it safe
      if (t.registeredTeams > t.maxTeams) t.registeredTeams = t.maxTeams

      this.tournaments.unshift(t)
    },

    updateTournament(id, patch) {
      const t = this.tournaments.find((x) => x.id === id)
      if (!t) return

      t.title = String(patch.title || '').trim()
      t.game = String(patch.game || '').trim()
      t.region = String(patch.region || '').trim()
      t.startDate = String(patch.startDate || '').trim()
      t.endDate = String(patch.endDate || '').trim()
      t.maxTeams = Number(patch.maxTeams || 0)
      t.registeredTeams = Number(patch.registeredTeams || 0)
      t.prizePool = Number(patch.prizePool || 0)
      t.notes = String(patch.notes || '').trim()

      if (!t.title || !t.game || !t.region || !t.startDate || !t.endDate) {
        throw new Error('Missing required fields')
      }
      if (t.registeredTeams > t.maxTeams) t.registeredTeams = t.maxTeams
    },

    removeTournament(id) {
      this.tournaments = this.tournaments.filter((t) => t.id !== id)
    },

    setDatesToToday(id) {
      const t = this.tournaments.find((x) => x.id === id)
      if (!t) return
      const d = todayStr()
      t.startDate = d
      t.endDate = d
    },
  },
})
