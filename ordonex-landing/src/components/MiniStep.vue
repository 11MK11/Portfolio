<template>
  <div class="rounded-3xl bg-white/5 p-5 ring-1 ring-white/10">
    <div class="text-xs font-semibold text-white/60">{{ k }}</div>
    <div class="mt-1 text-sm font-bold">{{ v }}</div>
  </div>
</template>
<script setup>
defineProps({ k: String, v: String });
</script>
