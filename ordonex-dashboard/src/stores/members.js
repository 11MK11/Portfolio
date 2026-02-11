import { defineStore } from 'pinia'

const uid = () =>
  (globalThis.crypto?.randomUUID?.() ||
    `m_${Date.now()}_${Math.random().toString(16).slice(2)}`)

const toDate = (yyyyMmDd) => new Date(`${yyyyMmDd}T00:00:00`)

const daysLeft = (end) => {
  const now = new Date()
  const d = toDate(end)
  const diff = d.getTime() - now.getTime()
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

const statusOf = (m) => {
  const d = daysLeft(m.subscriptionEnd)
  if (d < 0) return 'expired'
  if (d <= 14) return 'expiring'
  return 'active'
}

export const useMembersStore = defineStore('members', {
  state: () => ({
    search: '',
    tierFilter: 'all',
    statusFilter: 'all',

    members: [
      {
        id: uid(),
        name: 'Ahmad Saleh',
        email: 'ahmad@ordonex.com',
        discord: 'ahmad#1234',
        tier: 'gold',
        subscriptionEnd: '2026-03-20',
      },
      {
        id: uid(),
        name: 'Lina Hasan',
        email: 'lina@ordonex.com',
        discord: 'lina',
        tier: 'silver',
        subscriptionEnd: '2026-02-20',
      },
      {
        id: uid(),
        name: 'Omar Khaled',
        email: 'omar@ordonex.com',
        discord: '',
        tier: 'bronze',
        subscriptionEnd: '2026-02-12',
      },
      {
        id: uid(),
        name: 'Sami Nasser',
        email: 'sami@ordonex.com',
        discord: 'sami',
        tier: 'closed_circle',
        subscriptionEnd: '2026-05-01',
      },
      {
        id: uid(),
        name: 'Hala Zaid',
        email: 'hala@ordonex.com',
        discord: 'hala',
        tier: 'bronze',
        subscriptionEnd: '2026-01-20',
      },
    ],
  }),

  getters: {
    filteredMembers(state) {
      const q = state.search.trim().toLowerCase()

      return state.members.filter((m) => {
        // tier filter
        if (state.tierFilter !== 'all' && m.tier !== state.tierFilter) return false

        // status filter
        const st = statusOf(m)
        if (state.statusFilter !== 'all' && st !== state.statusFilter) return false

        // search
        if (!q) return true
        const hay = `${m.name} ${m.email} ${m.discord || ''}`.toLowerCase()
        return hay.includes(q)
      })
    },

    stats(state) {
      let active = 0
      let expiringSoon = 0
      let expired = 0

      for (const m of state.members) {
        const st = statusOf(m)
        if (st === 'active') active++
        if (st === 'expiring') expiringSoon++
        if (st === 'expired') expired++
      }

      return {
        total: state.members.length,
        active,
        expiringSoon,
        expired,
      }
    },
  },

  actions: {
    addMember(payload) {
      const member = {
        id: uid(),
        name: String(payload.name || '').trim(),
        email: String(payload.email || '').trim(),
        discord: String(payload.discord || '').trim(),
        tier: payload.tier,
        subscriptionEnd: String(payload.subscriptionEnd || '').trim(),
      }

      if (!member.name || !member.email || !member.tier || !member.subscriptionEnd) {
        throw new Error('Missing required fields')
      }

      this.members.push(member)
    },

    removeMember(id) {
      this.members = this.members.filter((m) => m.id !== id)
    },

    updateMemberTier(id, tier) {
      const m = this.members.find((x) => x.id === id)
      if (m) m.tier = tier
    },

    extendSubscription(id, days) {
      const m = this.members.find((x) => x.id === id)
      if (!m) return

      const base = toDate(m.subscriptionEnd)
      base.setDate(base.getDate() + Number(days || 0))
      m.subscriptionEnd = base.toISOString().slice(0, 10)
    },

    updateMember(id, patch) {
      const m = this.members.find((x) => x.id === id)
      if (!m) return

      m.name = String(patch.name || '').trim()
      m.email = String(patch.email || '').trim()
      m.discord = String(patch.discord || '').trim()
      m.tier = patch.tier
      m.subscriptionEnd = String(patch.subscriptionEnd || '').trim()

      if (!m.name || !m.email || !m.tier || !m.subscriptionEnd) {
        throw new Error('Missing required fields')
      }
    },
  },
})
