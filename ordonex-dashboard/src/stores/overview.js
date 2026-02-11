import { defineStore } from 'pinia'
import { useMembersStore } from './members'
import { useTournamentsStore } from './tournaments'
import { useEventsStore } from './events'

const toDate = (yyyyMmDd) => new Date(`${yyyyMmDd}T00:00:00`)

const daysLeft = (end) => {
  const now = new Date()
  const d = toDate(end)
  const diff = d.getTime() - now.getTime()
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

const memberStatus = (m) => {
  const d = daysLeft(m.subscriptionEnd)
  if (d < 0) return 'expired'
  if (d <= 14) return 'expiring'
  return 'active'
}

const tournamentStatus = (t) => {
  const now = new Date()
  const start = toDate(t.startDate)
  const end = toDate(t.endDate)
  if (now < start) return 'upcoming'
  if (now > end) return 'ended'
  return 'ongoing'
}

const toDateTime = (d, t) => new Date(`${d}T${t}:00`)
const eventStatus = (e) => {
  const now = new Date()
  const start = toDateTime(e.startDate, e.startTime)
  const end = toDateTime(e.endDate, e.endTime)
  if (now < start) return 'upcoming'
  if (now > end) return 'past'
  return 'ongoing'
}

export const useOverviewStore = defineStore('overview', {
  getters: {
    kpis() {
      const members = useMembersStore()
      const tournaments = useTournamentsStore()
      const events = useEventsStore()

      const totalMembers = members.members.length
      const expiredMembers = members.members.filter((m) => memberStatus(m) === 'expired').length
      const expiringMembers = members.members.filter((m) => memberStatus(m) === 'expiring').length

      const tList = tournaments.tournaments.map((t) => ({ ...t, status: tournamentStatus(t) }))
      const ongoingTournaments = tList.filter((t) => t.status === 'ongoing').length
      const upcomingTournaments = tList.filter((t) => t.status === 'upcoming').length

      const eList = events.events.map((e) => ({ ...e, status: eventStatus(e) }))
      const ongoingEvents = eList.filter((e) => e.status === 'ongoing').length
      const upcomingEvents = eList.filter((e) => e.status === 'upcoming').length

      return {
        totalMembers,
        expiredMembers,
        expiringMembers,
        ongoingTournaments,
        upcomingTournaments,
        ongoingEvents,
        upcomingEvents,
      }
    },

    lists() {
      const members = useMembersStore()
      const tournaments = useTournamentsStore()
      const events = useEventsStore()

      // Expired members (top 5)
      const expired = members.members
        .map((m) => ({ ...m, _days: daysLeft(m.subscriptionEnd) }))
        .filter((m) => m._days < 0)
        .sort((a, b) => a._days - b._days)
        .slice(0, 5)

      // Ongoing tournaments (top 5)
      const ongoingT = tournaments.tournaments
        .map((t) => ({ ...t, status: tournamentStatus(t) }))
        .filter((t) => t.status === 'ongoing')
        .slice(0, 5)

      // Upcoming events (top 5)
      const upcomingE = events.events
        .map((e) => ({ ...e, status: eventStatus(e), _start: toDateTime(e.startDate, e.startTime) }))
        .filter((e) => e.status === 'upcoming')
        .sort((a, b) => a._start - b._start)
        .slice(0, 5)

      return { expired, ongoingT, upcomingE }
    },
  },
})
