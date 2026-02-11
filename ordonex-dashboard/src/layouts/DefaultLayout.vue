<template>
  <v-app>
    <!-- Sidebar -->
    <v-navigation-drawer
      permanent
      width="260"
      color="surface"
    >
      <div class="pa-4">
        <div class="text-h6 font-weight-bold">Ordonex</div>
        <div class="text-caption text-medium-emphasis">Team Dashboard</div>
      </div>

      <v-divider />

      <v-list nav density="comfortable">
        <v-list-item
          to="/"
          prepend-icon="mdi-view-dashboard"
          title="Overview"
        />

        <v-list-item
          to="/members"
          prepend-icon="mdi-account-group"
          title="Members"
        />

        <v-list-item
          to="/tournaments"
          prepend-icon="mdi-trophy"
          title="Tournaments"
        />

        <v-list-item
          to="/events"
          prepend-icon="mdi-calendar-star"
          title="Events"
        />
            
      </v-list>
    </v-navigation-drawer>

    <!-- Main Content -->
    <v-main>
      <v-container fluid class="pa-6">
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
</script>
