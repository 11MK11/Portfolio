<template>
  <div class="mx-auto mb-10 max-w-2xl text-center reveal">
    <div class="mb-3 flex items-center justify-center gap-2">
      <span class="h-1.5 w-1.5 rounded-full bg-red-500"></span>
      <p class="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">{{ eyebrow }}</p>
    </div>
    <h2 class="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">{{ title }}</h2>
    <p class="mt-3 text-base leading-relaxed text-white/70">{{ desc }}</p>
  </div>
</template>
<script setup>
defineProps({ eyebrow: String, title: String, desc: String });
</script>
