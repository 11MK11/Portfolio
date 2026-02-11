<template>
  <div>
    <!-- Header -->
    <div class="d-flex align-center justify-space-between mb-6">
      <div>
        <h1 class="text-h4 font-weight-bold">Events</h1>
        <div class="text-medium-emphasis">Manage community events for Ordonex</div>
      </div>

      <v-btn color="primary" prepend-icon="mdi-calendar-plus" @click="openAdd">
        Add Event
      </v-btn>
    </div>

    <!-- Filters -->
    <v-row class="mb-4" dense>
      <v-col cols="12" md="8">
        <v-text-field
          v-model="store.search"
          label="Search (title / type / location)"
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
        <v-card class="pa-4" variant="tonal" hover role="button" @click="setStatus('past')">
          <div class="text-caption text-medium-emphasis">Past</div>
          <div class="text-h5 font-weight-bold">{{ store.stats.past }}</div>
        </v-card>
      </v-col>
    </v-row>

    <!-- Table -->
    <v-card>
      <v-data-table
        :headers="headers"
        :items="store.filteredEvents"
        item-key="id"
        density="comfortable"
      >
        <template #item.status="{ item }">
          <v-chip :color="statusColor(item.status)" variant="tonal" class="font-weight-medium">
            {{ statusLabel(item.status) }}
          </v-chip>
        </template>

        <template #item.type="{ item }">
          <v-chip variant="tonal">{{ typeLabel(item.type) }}</v-chip>
        </template>

        <template #item.when="{ item }">
          <div class="d-flex flex-column">
            <div class="font-weight-medium">
              {{ item.startDate }} {{ item.startTime }} → {{ item.endDate }} {{ item.endTime }}
            </div>
            <div class="text-caption text-medium-emphasis">{{ whenHint(item) }}</div>
          </div>
        </template>

        <template #item.capacity="{ item }">
          <div class="d-flex flex-column">
            <div class="font-weight-medium">{{ item.attendees }} / {{ item.capacity }}</div>
            <div class="text-caption text-medium-emphasis">attending</div>
          </div>
        </template>

        <template #item.link="{ item }">
          <div v-if="item.link" class="text-truncate" style="max-width: 240px;">
            <a :href="item.link" target="_blank" rel="noreferrer">{{ item.link }}</a>
          </div>
          <span v-else class="text-medium-emphasis">—</span>
        </template>

        <template #item.actions="{ item }">
          <v-menu>
            <template #activator="{ props }">
              <v-btn v-bind="props" icon="mdi-dots-vertical" variant="text" />
            </template>

            <v-list>
              <v-list-item title="Edit" prepend-icon="mdi-pencil" @click="openEdit(item)" />
              <v-divider />
              <v-list-item title="Remove" class="text-error" prepend-icon="mdi-delete" @click="remove(item.id)" />
            </v-list>
          </v-menu>
        </template>
      </v-data-table>
    </v-card>

    <!-- Add/Edit Dialog -->
    <v-dialog v-model="formDialog" max-width="780" persistent>
      <v-card>
        <v-card-title class="text-h6 font-weight-bold">
          {{ mode === 'add' ? 'Add Event' : 'Edit Event' }}
        </v-card-title>

        <v-card-text class="pt-4">
          <v-form ref="formRef" @submit.prevent="submitForm">
            <v-row dense class="ga-2">
              <v-col cols="12" md="8">
                <v-text-field
                  v-model="form.title"
                  label="Event title"
                  variant="outlined"
                  density="comfortable"
                  :rules="[r.required]"
                />
              </v-col>

              <v-col cols="12" md="4">
                <v-select
                  v-model="form.type"
                  label="Type"
                  :items="typeOptions"
                  item-title="label"
                  item-value="value"
                  variant="outlined"
                  density="comfortable"
                  :rules="[r.required]"
                />
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field
                  v-model="form.location"
                  label="Location"
                  variant="outlined"
                  density="comfortable"
                  :rules="[r.required]"
                />
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field
                  v-model="form.link"
                  label="Link (optional)"
                  variant="outlined"
                  density="comfortable"
                  prepend-inner-icon="mdi-link-variant"
                />
              </v-col>

              <!-- Start date -->
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

              <v-col cols="12" md="3">
                <v-text-field
                  v-model="form.startTime"
                  label="Start time (HH:MM)"
                  variant="outlined"
                  density="comfortable"
                  :rules="[r.required, r.time]"
                  prepend-inner-icon="mdi-clock-outline"
                  placeholder="21:00"
                />
              </v-col>

              <!-- End date -->
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

              <v-col cols="12" md="3">
                <v-text-field
                  v-model="form.endTime"
                  label="End time (HH:MM)"
                  variant="outlined"
                  density="comfortable"
                  :rules="[r.required, r.time]"
                  prepend-inner-icon="mdi-clock-outline"
                  placeholder="23:30"
                />
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field
                  v-model.number="form.capacity"
                  type="number"
                  label="Capacity"
                  variant="outlined"
                  density="comfortable"
                  :rules="[r.required, r.min1]"
                />
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field
                  v-model.number="form.attendees"
                  type="number"
                  label="Attendees"
                  variant="outlined"
                  density="comfortable"
                  :rules="[r.required, r.min0]"
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
import { useEventsStore } from '../stores/events'

const store = useEventsStore()

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

const form = reactive({
  title: '',
  type: 'watch_party',
  location: '',
  link: '',
  startDate: '',
  startTime: '',
  endDate: '',
  endTime: '',
  capacity: 50,
  attendees: 0,
  notes: '',
})

const r = {
  required: (v) => !!String(v ?? '').toString().trim() || 'Required',
  date: (v) => /^\d{4}-\d{2}-\d{2}$/.test(String(v || '').trim()) || 'Use YYYY-MM-DD',
  time: (v) => /^\d{2}:\d{2}$/.test(String(v || '').trim()) || 'Use HH:MM',
  min0: (v) => Number(v) >= 0 || 'Must be 0 or more',
  min1: (v) => Number(v) >= 1 || 'Must be 1 or more',
}

const openAdd = () => {
  mode.value = 'add'
  editingId.value = null

  const now = new Date()
  const today = now.toISOString().slice(0, 10)

  form.title = ''
  form.type = 'watch_party'
  form.location = ''
  form.link = ''
  form.startDate = today
  form.startTime = '21:00'
  form.endDate = today
  form.endTime = '23:00'
  form.capacity = 50
  form.attendees = 0
  form.notes = ''

  startValue.value = now
  endValue.value = now

  formDialog.value = true
}

const openEdit = (item) => {
  mode.value = 'edit'
  editingId.value = item.id

  form.title = item.title
  form.type = item.type
  form.location = item.location
  form.link = item.link || ''
  form.startDate = item.startDate
  form.startTime = item.startTime
  form.endDate = item.endDate
  form.endTime = item.endTime
  form.capacity = item.capacity
  form.attendees = item.attendees
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

  if (form.attendees > form.capacity) {
    snack.text = 'Attendees can’t exceed Capacity'
    snack.show = true
    return
  }

  try {
    if (mode.value === 'add') {
      store.addEvent({ ...form })
      snack.text = 'Event added ✅'
    } else {
      store.updateEvent(editingId.value, { ...form })
      snack.text = 'Event updated ✅'
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
  store.removeEvent(id)
  snack.text = 'Event removed'
  snack.show = true
}

const setStatus = (s) => (store.statusFilter = s)

const headers = [
  { title: 'Title', key: 'title' },
  { title: 'Type', key: 'type' },
  { title: 'Status', key: 'status' },
  { title: 'When', key: 'when', sortable: false },
  { title: 'Location', key: 'location' },
  { title: 'Link', key: 'link', sortable: false },
  { title: 'Capacity', key: 'capacity', sortable: false },
  { title: 'Actions', key: 'actions', sortable: false },
]

const statusOptions = [
  { label: 'All', value: 'all' },
  { label: 'Upcoming', value: 'upcoming' },
  { label: 'Ongoing', value: 'ongoing' },
  { label: 'Past', value: 'past' },
]

const typeOptions = [
  { label: 'Watch Party', value: 'watch_party' },
  { label: 'Meetup', value: 'meetup' },
  { label: 'Workshop', value: 'workshop' },
  { label: 'Tournament Event', value: 'tournament_event' },
  { label: 'Other', value: 'other' },
]

const statusLabel = (s) => {
  if (s === 'upcoming') return 'Upcoming'
  if (s === 'ongoing') return 'Ongoing'
  if (s === 'past') return 'Past'
  return s
}

const statusColor = (s) => {
  if (s === 'upcoming') return 'info'
  if (s === 'ongoing') return 'success'
  if (s === 'past') return 'default'
  return 'default'
}

const typeLabel = (t) => {
  const found = typeOptions.find((x) => x.value === t)
  return found?.label || t
}

const whenHint = (e) => {
  if (e.status === 'upcoming') return 'Not started yet'
  if (e.status === 'ongoing') return 'Live now'
  return 'Finished'
}
</script>
