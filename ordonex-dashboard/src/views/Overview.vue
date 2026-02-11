<template>
  <div>
    <!-- Header -->
    <div class="d-flex align-center justify-space-between mb-6">
      <div>
        <h1 class="text-h4 font-weight-bold">Overview</h1>
        <div class="text-medium-emphasis">Ordonex admin dashboard snapshot</div>
      </div>

      <div class="d-flex" style="gap: 10px;">
        <v-btn variant="tonal" prepend-icon="mdi-account-plus" to="/members">Add Member</v-btn>
        <v-btn variant="tonal" prepend-icon="mdi-trophy" to="/tournaments">Tournaments</v-btn>
        <v-btn color="primary" prepend-icon="mdi-calendar-star" to="/events">Events</v-btn>
      </div>
    </div>

    <!-- KPI Cards -->
    <v-row dense class="mb-4">
      <v-col cols="12" md="3">
        <v-card class="pa-4" variant="tonal">
          <div class="d-flex align-center justify-space-between">
            <div>
              <div class="text-caption text-medium-emphasis">Members</div>
              <div class="text-h5 font-weight-bold">{{ k.totalMembers }}</div>
            </div>
            <v-icon icon="mdi-account-group" size="30" />
          </div>
          <div class="mt-2 text-caption text-medium-emphasis">
            Expiring soon: <b>{{ k.expiringMembers }}</b>
          </div>
        </v-card>
      </v-col>

      <v-col cols="12" md="3">
        <v-card class="pa-4" variant="tonal"  @click="goExpired">
          <div class="d-flex align-center justify-space-between">
            <div>
              <div class="text-caption text-medium-emphasis">Expired Members</div>
              <div class="text-h5 font-weight-bold">{{ k.expiredMembers }}</div>
            </div>
            <v-icon icon="mdi-alert-circle" size="30" />
          </div>
          <div class="mt-2 text-caption text-medium-emphasis">Click to filter</div>
        </v-card>
      </v-col>

      <v-col cols="12" md="3">
        <v-card class="pa-4" variant="tonal">
          <div class="d-flex align-center justify-space-between">
            <div>
              <div class="text-caption text-medium-emphasis">Ongoing Tournaments</div>
              <div class="text-h5 font-weight-bold">{{ k.ongoingTournaments }}</div>
            </div>
            <v-icon icon="mdi-trophy-variant" size="30" />
          </div>
          <div class="mt-2 text-caption text-medium-emphasis">
            Upcoming: <b>{{ k.upcomingTournaments }}</b>
          </div>
        </v-card>
      </v-col>

      <v-col cols="12" md="3">
        <v-card class="pa-4" variant="tonal">
          <div class="d-flex align-center justify-space-between">
            <div>
              <div class="text-caption text-medium-emphasis">Events</div>
              <div class="text-h5 font-weight-bold">{{ k.ongoingEvents }}</div>
            </div>
            <v-icon icon="mdi-calendar-star" size="30" />
          </div>
          <div class="mt-2 text-caption text-medium-emphasis">
            Upcoming: <b>{{ k.upcomingEvents }}</b>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <!-- 3 Columns -->
    <v-row dense>
      <!-- Expired Members -->
      <v-col cols="12" md="4">
        <v-card>
          <v-card-title class="text-subtitle-1 font-weight-bold">
            Expired Members
          </v-card-title>

          <v-divider />

          <v-card-text v-if="lists.expired.length === 0" class="text-medium-emphasis">
            No expired members 🎉
          </v-card-text>

          <v-list v-else density="comfortable">
            <v-list-item
              v-for="m in lists.expired"
              :key="m.id"
              :title="m.name"
              :subtitle="m.email"
            >
              <template #append>
                <v-chip color="error" variant="tonal">
                  Expired
                </v-chip>
              </template>
            </v-list-item>
          </v-list>

          <v-card-actions>
            <v-btn variant="text" to="/members" @click="goExpired">
              View all expired
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <!-- Ongoing tournaments -->
      <v-col cols="12" md="4">
        <v-card>
          <v-card-title class="text-subtitle-1 font-weight-bold">
            Ongoing Tournaments
          </v-card-title>

          <v-divider />

          <v-card-text v-if="lists.ongoingT.length === 0" class="text-medium-emphasis">
            No tournaments live right now.
          </v-card-text>

          <v-list v-else density="comfortable">
            <v-list-item
              v-for="t in lists.ongoingT"
              :key="t.id"
              :title="t.title"
              :subtitle="`${t.game} • ${t.region}`"
            >
              <template #append>
                <v-chip color="success" variant="tonal">Ongoing</v-chip>
              </template>
            </v-list-item>
          </v-list>

          <v-card-actions>
            <v-btn variant="text" to="/tournaments">Manage tournaments</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <!-- Upcoming events -->
      <v-col cols="12" md="4">
        <v-card>
          <v-card-title class="text-subtitle-1 font-weight-bold">
            Upcoming Events
          </v-card-title>

          <v-divider />

          <v-card-text v-if="lists.upcomingE.length === 0" class="text-medium-emphasis">
            No upcoming events.
          </v-card-text>

          <v-list v-else density="comfortable">
            <v-list-item
              v-for="e in lists.upcomingE"
              :key="e.id"
              :title="e.title"
              :subtitle="`${e.startDate} ${e.startTime} • ${e.location}`"
            >
              <template #append>
                <v-chip color="info" variant="tonal">Upcoming</v-chip>
              </template>
            </v-list-item>
          </v-list>

          <v-card-actions>
            <v-btn variant="text" to="/events">Manage events</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useOverviewStore } from '../stores/overview'
import { useMembersStore } from '../stores/members'

const router = useRouter()
const overview = useOverviewStore()
const membersStore = useMembersStore()

const k = computed(() => overview.kpis)
const lists = computed(() => overview.lists)

const goExpired = () => {
  // optional: set filter then navigate
  membersStore.statusFilter = 'expired'
  router.push('/members')
}
</script>

<style scoped>
.cursor-pointer { cursor: pointer; }
</style>
