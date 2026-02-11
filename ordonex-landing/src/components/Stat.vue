<template>
  <div class="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10">
    <div class="text-2xl font-extrabold text-white">{{ value }}</div>
    <div class="mt-1 text-sm text-white/60">{{ label }}</div>
  </div>
</template>
<script setup>
defineProps({ label: String, value: String });
</script>
