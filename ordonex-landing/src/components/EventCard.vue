<template>
  <div class="rounded-3xl bg-white/5 p-6 ring-1 ring-white/10 transition hover:-translate-y-1.5 reveal">
    <div class="flex items-start justify-between gap-3">
      <div>
        <div class="text-lg font-bold">{{ title }}</div>
        <div class="mt-1 text-sm text-white/60">{{ meta }}</div>
      </div>
      <span class="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/80 ring-1 ring-white/15">
        {{ tag }}
      </span>
    </div>

    <ul class="mt-4 space-y-2 text-sm text-white/70">
      <li v-for="b in bullets" :key="b" class="flex gap-2">
        <span class="mt-1 h-1.5 w-1.5 rounded-full bg-red-500"></span>
        <span>{{ b }}</span>
      </li>
    </ul>

    <div class="mt-6">
      <button
        class="w-full inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold bg-white/10 text-white ring-1 ring-white/15 hover:bg-white/15 transition"
        @click="$emit('reserve')"
      >
        Reserve Spot
      </button>
    </div>
  </div>
</template>
<script setup>
defineProps({ title: String, meta: String, tag: String, bullets: Array });
defineEmits(["reserve"]);
</script>
