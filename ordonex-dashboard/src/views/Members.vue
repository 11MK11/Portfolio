<template>
  <div>
    <!-- Header -->
    <div class="d-flex align-center justify-space-between mb-6">
      <div>
        <h1 class="text-h4 font-weight-bold">Members</h1>
        <div class="text-medium-emphasis">Manage tiers, Discord users, and subscription expiry</div>
      </div>

      <v-btn color="primary" prepend-icon="mdi-account-plus" @click="openAdd">
        Add Member
      </v-btn>
    </div>

    <!-- Filters -->
    <v-row class="mb-4" dense>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="store.search"
          label="Search (name / email / discord)"
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
          density="comfortable"
          clearable
        />
      </v-col>

      <v-col cols="12" md="3">
        <v-select
          v-model="store.tierFilter"
          label="Tier"
          :items="tierOptions"
          item-title="label"
          item-value="value"
          variant="outlined"
          density="comfortable"
        />
      </v-col>

      <v-col cols="12" md="3">
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
          <div class="text-caption text-medium-emphasis">Total Members</div>
          <div class="text-h5 font-weight-bold">{{ store.stats.total }}</div>
        </v-card>
      </v-col>

      <v-col cols="12" md="3">
        <v-card class="pa-4" variant="tonal" hover role="button" @click="setStatus('active')">
          <div class="text-caption text-medium-emphasis">Active</div>
          <div class="text-h5 font-weight-bold">{{ store.stats.active }}</div>
        </v-card>
      </v-col>

      <v-col cols="12" md="3">
        <v-card class="pa-4" variant="tonal" hover role="button" @click="setStatus('expiring')">
          <div class="text-caption text-medium-emphasis">Expiring Soon (≤14d)</div>
          <div class="text-h5 font-weight-bold">{{ store.stats.expiringSoon }}</div>
        </v-card>
      </v-col>

      <v-col cols="12" md="3">
        <v-card class="pa-4" variant="tonal" hover role="button" @click="setStatus('expired')">
          <div class="text-caption text-medium-emphasis">Expired</div>
          <div class="text-h5 font-weight-bold">{{ store.stats.expired }}</div>
        </v-card>
      </v-col>
    </v-row>

    <!-- Table -->
    <v-card>
      <v-data-table
        :headers="headers"
        :items="store.filteredMembers"
        item-key="id"
        density="comfortable"
      >
        <template #item.discord="{ item }">
          <div class="d-flex align-center" style="gap: 8px;">
            <v-icon icon="mdi-discord" size="18" style="color:#5865F2;" />
            <span class="font-weight-medium">{{ item.discord || '—' }}</span>
          </div>
        </template>

        <template #item.tier="{ item }">
          <v-chip :color="tierColor(item.tier)" variant="tonal" class="font-weight-medium">
            <v-icon v-if="item.tier === 'closed_circle'" start icon="mdi-lock" />
            {{ tierLabel(item.tier) }}
          </v-chip>
        </template>

        <template #item.subscriptionEnd="{ item }">
          <div class="d-flex flex-column">
            <div>{{ item.subscriptionEnd }}</div>
            <div class="text-caption" :class="statusTextClass(item)">
              {{ statusText(item) }}
            </div>
          </div>
        </template>

        <template #item.actions="{ item }">
          <v-menu>
            <template #activator="{ props }">
              <v-btn v-bind="props" icon="mdi-dots-vertical" variant="text" />
            </template>

            <v-list>
              <v-list-item title="Edit" prepend-icon="mdi-pencil" @click="openEdit(item)" />

              <v-divider />

              <v-list-item title="Set Bronze" @click="store.updateMemberTier(item.id, 'bronze')" />
              <v-list-item title="Set Silver" @click="store.updateMemberTier(item.id, 'silver')" />
              <v-list-item title="Set Gold" @click="store.updateMemberTier(item.id, 'gold')" />
              <v-list-item title="Set Closed Circle" @click="store.updateMemberTier(item.id, 'closed_circle')" />

              <v-divider />

              <v-list-item title="Extend +30 days" @click="store.extendSubscription(item.id, 30)" />
              <v-list-item title="Extend +90 days" @click="store.extendSubscription(item.id, 90)" />

              <v-divider />

              <v-list-item title="Remove Member" class="text-error" @click="remove(item.id)" />
            </v-list>
          </v-menu>
        </template>
      </v-data-table>
    </v-card>

    <!-- Add/Edit Dialog -->
    <v-dialog v-model="formDialog" max-width="620" persistent>
      <v-card>
        <v-card-title class="text-h6 font-weight-bold">
          {{ mode === 'add' ? 'Add Member' : 'Edit Member' }}
        </v-card-title>

        <v-card-text class="pt-4">
          <v-form ref="formRef" @submit.prevent="submitForm">
            <v-row dense class="ga-2">
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="form.name"
                  label="Full name"
                  variant="outlined"
                  density="comfortable"
                  :rules="[r.required]"
                />
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field
                  v-model="form.email"
                  label="Email"
                  variant="outlined"
                  density="comfortable"
                  :rules="[r.required, r.email]"
                />
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field
                  v-model="form.discord"
                  label="Discord username"
                  variant="outlined"
                  density="comfortable"
                  hint="Example: username#1234 or username"
                  persistent-hint
                />
              </v-col>

              <v-col cols="12" md="6">
                <v-select
                  v-model="form.tier"
                  label="Tier"
                  :items="tierOptions.filter(x => x.value !== 'all')"
                  item-title="label"
                  item-value="value"
                  variant="outlined"
                  density="comfortable"
                  :rules="[r.required]"
                />
              </v-col>

              <!-- Date Picker -->
              <v-col cols="12" md="6">
                <v-menu v-model="dateMenu" :close-on-content-click="false">
                  <template #activator="{ props }">
                    <v-text-field
                      v-bind="props"
                      v-model="form.subscriptionEnd"
                      label="Subscription end"
                      variant="outlined"
                      density="comfortable"
                      prepend-inner-icon="mdi-calendar"
                      readonly
                      :rules="[r.required, r.date]"
                    />
                  </template>

                  <v-date-picker
                    v-model="dateValue"
                    @update:modelValue="onDatePick"
                    color="primary"
                  />
                </v-menu>
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
import { useMembersStore } from '../stores/members'

const store = useMembersStore()

// Dialog state
const formDialog = ref(false)
const mode = ref('add') // 'add' | 'edit'
const editingId = ref(null)

const formRef = ref(null)
const snack = reactive({ show: false, text: '' })

// Date picker state
const dateMenu = ref(false)
const dateValue = ref(null)

const form = reactive({
  name: '',
  email: '',
  discord: '',
  tier: 'bronze',
  subscriptionEnd: '',
})

const r = {
  required: v => !!String(v || '').trim() || 'Required',
  email: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v || '').trim()) || 'Invalid email',
  date: v => /^\d{4}-\d{2}-\d{2}$/.test(String(v || '').trim()) || 'Use YYYY-MM-DD',
}

const onDatePick = (val) => {
  if (!val) return
  form.subscriptionEnd = new Date(val).toISOString().slice(0, 10)
  dateMenu.value = false
}

const openAdd = () => {
  mode.value = 'add'
  editingId.value = null

  form.name = ''
  form.email = ''
  form.discord = ''
  form.tier = 'bronze'

  const today = new Date()
  form.subscriptionEnd = today.toISOString().slice(0, 10)
  dateValue.value = today

  formDialog.value = true
}

const openEdit = (item) => {
  mode.value = 'edit'
  editingId.value = item.id

  form.name = item.name || ''
  form.email = item.email || ''
  form.discord = item.discord || ''
  form.tier = item.tier || 'bronze'
  form.subscriptionEnd = item.subscriptionEnd || new Date().toISOString().slice(0, 10)

  dateValue.value = new Date(`${form.subscriptionEnd}T00:00:00`)
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
    if (mode.value === 'add') {
      store.addMember({ ...form })
      snack.text = 'Member added ✅'
    } else {
      store.updateMember(editingId.value, { ...form })
      snack.text = 'Member updated ✅'
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
  store.removeMember(id)
  snack.text = 'Member removed'
  snack.show = true
}

const setStatus = (s) => (store.statusFilter = s)

// Table config
const headers = [
  { title: 'Name', key: 'name' },
  { title: 'Email', key: 'email' },
  { title: 'Discord', key: 'discord' },
  { title: 'Tier', key: 'tier' },
  { title: 'Subscription End', key: 'subscriptionEnd' },
  { title: 'Actions', key: 'actions', sortable: false },
]

const tierOptions = [
  { label: 'All', value: 'all' },
  { label: 'Bronze', value: 'bronze' },
  { label: 'Silver', value: 'silver' },
  { label: 'Gold', value: 'gold' },
  { label: 'Closed Circle', value: 'closed_circle' },
]

const statusOptions = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Expiring Soon', value: 'expiring' },
  { label: 'Expired', value: 'expired' },
]

const tierLabel = (tier) => {
  switch (tier) {
    case 'bronze': return 'Bronze'
    case 'silver': return 'Silver'
    case 'gold': return 'Gold'
    case 'closed_circle': return 'Closed Circle'
    default: return tier
  }
}

const tierColor = (tier) => {
  switch (tier) {
    case 'bronze': return '#8B5E3C'
    case 'silver': return '#A1A1AA'
    case 'gold': return '#EAB308'
    case 'closed_circle': return 'primary'
    default: return 'default'
  }
}

const daysLeft = (end) => {
  const now = new Date()
  const d = new Date(`${end}T00:00:00`)
  const diff = d.getTime() - now.getTime()
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

const statusText = (m) => {
  const d = daysLeft(m.subscriptionEnd)
  if (d < 0) return 'Expired'
  if (d <= 14) return `Expiring in ${d} day(s)`
  return `Active • ${d} day(s) left`
}

const statusTextClass = (m) => {
  const d = daysLeft(m.subscriptionEnd)
  if (d < 0) return 'text-error'
  if (d <= 14) return 'text-warning'
  return 'text-success'
}
</script>
