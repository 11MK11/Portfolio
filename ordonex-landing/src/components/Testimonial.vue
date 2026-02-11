<template>
  <div class="rounded-3xl bg-white/5 p-6 ring-1 ring-white/10 reveal">
    <p class="text-sm leading-relaxed text-white/80">“{{ quote }}”</p>
    <div class="mt-5 flex items-center gap-3">
      <div class="h-10 w-10 rounded-2xl bg-gradient-to-br from-red-500/40 to-white/10 ring-1 ring-white/10"></div>
      <div>
        <div class="text-sm font-semibold text-white">{{ name }}</div>
        <div class="text-xs text-white/60">{{ role }}</div>
      </div>
    </div>
  </div>
</template>
<script setup>
defineProps({ name: String, role: String, quote: String });
</script>
