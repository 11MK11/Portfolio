<template>
  <div>
    <!-- Header -->
    <div class="d-flex align-center justify-space-between mb-6">
      <div>
        <h1 class="text-h4 font-weight-bold">Tournaments</h1>
        <div class="text-medium-emphasis">Create and manage tournaments for Ordonex</div>
      </div>

      <v-btn color="primary" prepend-icon="mdi-trophy" @click="openAdd">
        Add Tournament
      </v-btn>
    </div>

    <!-- Filters -->
    <v-row class="mb-4" dense>
      <v-col cols="12" md="8">
        <v-text-field
          v-model="store.search"
          label="Search (title / game / region)"
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
          density="comfortable"
          clearable
        />
      </v-col>

      <v-col cols="12" md="4">
        <v-select
          v-model="store.statusFilter"
          label="Status"
          :items="statusOptions"
          item-title="label"
          item-value="value"
          variant="outlined"
          density="comfortable"
        />
      </v-col>
    </v-row>

    <!-- Stats -->
    <v-row class="mb-4" dense>
      <v-col cols="12" md="3">
        <v-card class="pa-4" variant="tonal" hover role="button" @click="setStatus('all')">
          <div class="text-caption text-medium-emphasis">Total</div>
          <div class="text-h5 font-weight-bold">{{ store.stats.total }}</div>
        </v-card>
      </v-col>

      <v-col cols="12" md="3">
        <v-card class="pa-4" variant="tonal" hover role="button" @click="setStatus('upcoming')">
          <div class="text-caption text-medium-emphasis">Upcoming</div>
          <div class="text-h5 font-weight-bold">{{ store.stats.upcoming }}</div>
        </v-card>
      </v-col>

      <v-col cols="12" md="3">
        <v-card class="pa-4" variant="tonal" hover role="button" @click="setStatus('ongoing')">
          <div class="text-caption text-medium-emphasis">Ongoing</div>
          <div class="text-h5 font-weight-bold">{{ store.stats.ongoing }}</div>
        </v-card>
      </v-col>

      <v-col cols="12" md="3">
        <v-card class="pa-4" variant="tonal" hover role="button" @click="setStatus('ended')">
          <div class="text-caption text-medium-emphasis">Ended</div>
          <div class="text-h5 font-weight-bold">{{ store.stats.ended }}</div>
        </v-card>
      </v-col>
    </v-row>

    <!-- Table -->
    <v-card>
      <v-data-table
        :headers="headers"
        :items="store.filteredTournaments"
        item-key="id"
        density="comfortable"
      >
        <template #item.status="{ item }">
          <v-chip :color="statusColor(item.status)" variant="tonal" class="font-weight-medium">
            {{ statusLabel(item.status) }}
          </v-chip>
        </template>

        <template #item.teams="{ item }">
          <div class="d-flex flex-column">
            <div class="font-weight-medium">{{ item.registeredTeams }} / {{ item.maxTeams }}</div>
            <div class="text-caption text-medium-emphasis">registered</div>
          </div>
        </template>

        <template #item.dates="{ item }">
          <div class="d-flex flex-column">
            <div class="font-weight-medium">{{ item.startDate }} → {{ item.endDate }}</div>
            <div class="text-caption text-medium-emphasis">{{ datesHint(item) }}</div>
          </div>
        </template>

        <template #item.prizePool="{ item }">
          <div class="font-weight-medium">
            {{ formatMoney(item.prizePool) }}
          </div>
        </template>

        <template #item.actions="{ item }">
          <v-menu>
            <template #activator="{ props }">
              <v-btn v-bind="props" icon="mdi-dots-vertical" variant="text" />
            </template>

            <v-list>
              <v-list-item title="Edit" prepend-icon="mdi-pencil" @click="openEdit(item)" />
              <v-list-item title="Set dates to Today" prepend-icon="mdi-calendar" @click="store.setDatesToToday(item.id)" />
              <v-divider />
              <v-list-item title="Remove" class="text-error" prepend-icon="mdi-delete" @click="remove(item.id)" />
            </v-list>
          </v-menu>
        </template>
      </v-data-table>
    </v-card>

    <!-- Add/Edit Dialog -->
    <v-dialog v-model="formDialog" max-width="720" persistent>
      <v-card>
        <v-card-title class="text-h6 font-weight-bold">
          {{ mode === 'add' ? 'Add Tournament' : 'Edit Tournament' }}
        </v-card-title>

        <v-card-text class="pt-4">
          <v-form ref="formRef" @submit.prevent="submitForm">
            <v-row dense class="ga-2">
              <v-col cols="12" md="8">
                <v-text-field
                  v-model="form.title"
                  label="Tournament title"
                  variant="outlined"
                  density="comfortable"
                  :rules="[r.required]"
                />
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field
                  v-model="form.game"
                  label="Game"
                  variant="outlined"
                  density="comfortable"
                  :rules="[r.required]"
                />
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field
                  v-model="form.region"
                  label="Region"
                  variant="outlined"
                  density="comfortable"
                  :rules="[r.required]"
                />
              </v-col>

              <!-- Start date picker -->
              <v-col cols="12" md="3">
                <v-menu v-model="startMenu" :close-on-content-click="false">
                  <template #activator="{ props }">
                    <v-text-field
                      v-bind="props"
                      v-model="form.startDate"
                      label="Start date"
                      variant="outlined"
                      density="comfortable"
                      prepend-inner-icon="mdi-calendar"
                      readonly
                      :rules="[r.required, r.date]"
                    />
                  </template>

                  <v-date-picker v-model="startValue" @update:modelValue="onStartPick" color="primary" />
                </v-menu>
              </v-col>

              <!-- End date picker -->
              <v-col cols="12" md="3">
                <v-menu v-model="endMenu" :close-on-content-click="false">
                  <template #activator="{ props }">
                    <v-text-field
                      v-bind="props"
                      v-model="form.endDate"
                      label="End date"
                      variant="outlined"
                      density="comfortable"
                      prepend-inner-icon="mdi-calendar"
                      readonly
                      :rules="[r.required, r.date]"
                    />
                  </template>

                  <v-date-picker v-model="endValue" @update:modelValue="onEndPick" color="primary" />
                </v-menu>
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field
                  v-model.number="form.maxTeams"
                  label="Max teams"
                  type="number"
                  variant="outlined"
                  density="comfortable"
                  :rules="[r.required, r.min1]"
                />
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field
                  v-model.number="form.registeredTeams"
                  label="Registered teams"
                  type="number"
                  variant="outlined"
                  density="comfortable"
                  :rules="[r.required, r.min0]"
                />
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field
                  v-model.number="form.prizePool"
                  label="Prize pool"
                  type="number"
                  variant="outlined"
                  density="comfortable"
                  :rules="[r.min0]"
                  hint="Number only (ex: 300)"
                  persistent-hint
                />
              </v-col>

              <v-col cols="12">
                <v-textarea
                  v-model="form.notes"
                  label="Notes"
                  variant="outlined"
                  density="comfortable"
                  rows="2"
                  auto-grow
                />
              </v-col>

              <v-col cols="12" class="d-flex justify-end mt-2" style="gap: 10px;">
                <v-btn variant="text" @click="formDialog = false">Cancel</v-btn>
                <v-btn color="primary" type="submit">
                  {{ mode === 'add' ? 'Add' : 'Save' }}
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="snack.show" :timeout="2200">
      {{ snack.text }}
    </v-snackbar>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useTournamentsStore } from '../stores/tournaments'

const store = useTournamentsStore()

const formDialog = ref(false)
const mode = ref('add')
const editingId = ref(null)
const formRef = ref(null)
const snack = reactive({ show: false, text: '' })

// Date pickers
const startMenu = ref(false)
const endMenu = ref(false)
const startValue = ref(null)
const endValue = ref(null)

const form = reactive({
  title: '',
  game: '',
  region: '',
  startDate: '',
  endDate: '',
  maxTeams: 16,
  registeredTeams: 0,
  prizePool: 0,
  notes: '',
})

const r = {
  required: (v) => !!String(v ?? '').toString().trim() || 'Required',
  date: (v) => /^\d{4}-\d{2}-\d{2}$/.test(String(v || '').trim()) || 'Use YYYY-MM-DD',
  min0: (v) => Number(v) >= 0 || 'Must be 0 or more',
  min1: (v) => Number(v) >= 1 || 'Must be 1 or more',
}

const toISO = (val) => new Date(val).toISOString().slice(0, 10)

const onStartPick = (val) => {
  if (!val) return
  form.startDate = toISO(val)
  startMenu.value = false
}

const onEndPick = (val) => {
  if (!val) return
  form.endDate = toISO(val)
  endMenu.value = false
}

const openAdd = () => {
  mode.value = 'add'
  editingId.value = null

  const today = new Date()
  form.title = ''
  form.game = ''
  form.region = 'Jordan'
  form.startDate = today.toISOString().slice(0, 10)
  form.endDate = today.toISOString().slice(0, 10)
  form.maxTeams = 16
  form.registeredTeams = 0
  form.prizePool = 0
  form.notes = ''

  startValue.value = today
  endValue.value = today

  formDialog.value = true
}

const openEdit = (item) => {
  mode.value = 'edit'
  editingId.value = item.id

  form.title = item.title
  form.game = item.game
  form.region = item.region
  form.startDate = item.startDate
  form.endDate = item.endDate
  form.maxTeams = item.maxTeams
  form.registeredTeams = item.registeredTeams
  form.prizePool = item.prizePool
  form.notes = item.notes || ''

  startValue.value = new Date(`${form.startDate}T00:00:00`)
  endValue.value = new Date(`${form.endDate}T00:00:00`)

  formDialog.value = true
}

const submitForm = async () => {
  const result = await formRef.value?.validate?.()
  const valid = typeof result === 'boolean' ? result : result?.valid

  if (!valid) {
    snack.text = 'Please fix the form fields'
    snack.show = true
    return
  }

  try {
    if (form.registeredTeams > form.maxTeams) {
      snack.text = 'Registered teams can’t exceed Max teams'
      snack.show = true
      return
    }

    if (mode.value === 'add') {
      store.addTournament({ ...form })
      snack.text = 'Tournament added ✅'
    } else {
      store.updateTournament(editingId.value, { ...form })
      snack.text = 'Tournament updated ✅'
    }

    snack.show = true
    formDialog.value = false
  } catch (e) {
    console.error(e)
    snack.text = e?.message || 'Something went wrong'
    snack.show = true
  }
}

const remove = (id) => {
  store.removeTournament(id)
  snack.text = 'Tournament removed'
  snack.show = true
}

const setStatus = (s) => (store.statusFilter = s)

const headers = [
  { title: 'Title', key: 'title' },
  { title: 'Game', key: 'game' },
  { title: 'Region', key: 'region' },
  { title: 'Status', key: 'status' },
  { title: 'Dates', key: 'dates', sortable: false },
  { title: 'Teams', key: 'teams', sortable: false },
  { title: 'Prize', key: 'prizePool' },
  { title: 'Actions', key: 'actions', sortable: false },
]

const statusOptions = [
  { label: 'All', value: 'all' },
  { label: 'Upcoming', value: 'upcoming' },
  { label: 'Ongoing', value: 'ongoing' },
  { label: 'Ended', value: 'ended' },
]

const statusLabel = (s) => {
  if (s === 'upcoming') return 'Upcoming'
  if (s === 'ongoing') return 'Ongoing'
  if (s === 'ended') return 'Ended'
  return s
}

const statusColor = (s) => {
  if (s === 'upcoming') return 'info'
  if (s === 'ongoing') return 'success'
  if (s === 'ended') return 'default'
  return 'default'
}

const datesHint = (t) => {
  // lightweight hint only
  if (t.status === 'upcoming') return 'Not started yet'
  if (t.status === 'ongoing') return 'Live now'
  return 'Finished'
}

const formatMoney = (n) => {
  const x = Number(n || 0)
  return x ? `${x} JOD` : '—'
}
</script>
