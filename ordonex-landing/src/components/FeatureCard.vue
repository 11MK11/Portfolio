<template>
  <div class="group relative overflow-hidden rounded-3xl bg-white/5 p-6 ring-1 ring-white/10 transition hover:-translate-y-1.5 reveal">
    <div class="absolute inset-0 opacity-0 transition group-hover:opacity-100">
      <div class="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-red-600/15 blur-3xl"></div>
      <div class="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>
    </div>
    <div class="relative">
      <div class="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/15">
        <span class="text-lg">{{ icon }}</span>
      </div>
      <h3 class="text-lg font-bold text-white">{{ title }}</h3>
      <p class="mt-2 text-sm leading-relaxed text-white/70">{{ desc }}</p>
    </div>
  </div>
</template>
<script setup>
defineProps({ title: String, desc: String, icon: String });
</script>
