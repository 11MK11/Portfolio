<template>
  <v-app>
    <v-navigation-drawer permanent width="260" color="surface">
      <!-- Logo Header -->
      <div class="pa-4 d-flex align-center gap-3">
        <div class="logoWrap">
          <v-img :src="logoUrl" width="40" height="40" cover />
        </div>

        <div>
          <div class="text-h6 font-weight-bold">Ordonex</div>
          <div class="text-caption text-medium-emphasis">Team Dashboard</div>
        </div>
      </div>

      <v-divider class="mb-2" />

      <v-list nav density="comfortable">
        <v-list-item to="/" prepend-icon="mdi-view-dashboard" title="Overview" />
        <v-list-item to="/members" prepend-icon="mdi-account-group" title="Members" />
        <v-list-item to="/tournaments" prepend-icon="mdi-trophy" title="Tournaments" />
        <v-list-item to="/events" prepend-icon="mdi-calendar-star" title="Events" />
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container fluid class="pa-6">
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
// This works even if @ alias is messy in some setups:
const logoUrl = new URL('../assets/Ordonex_Logo.png', import.meta.url).href
</script>

<style scoped>
.gap-3 { gap: 12px; }
.logoWrap{
  width:44px; height:44px;
  display:flex; align-items:center; justify-content:center;
  background: rgba(255,255,255,0.06);
  border-radius: 10px;
  overflow: hidden;
}
</style>
