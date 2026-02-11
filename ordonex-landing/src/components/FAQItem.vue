<template>
  <button class="w-full rounded-3xl bg-white/5 p-5 text-left ring-1 ring-white/10 hover:bg-white/10 transition reveal"
          @click="$emit('toggle')">
    <div class="flex items-center justify-between gap-4">
      <div class="text-sm font-semibold text-white">{{ q }}</div>
      <div class="text-white/60">{{ open ? "−" : "+" }}</div>
    </div>

    <div :class="['overflow-hidden transition-all', open ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0']">
      <p class="mt-3 text-sm leading-relaxed text-white/70">{{ a }}</p>
    </div>
  </button>
</template>
<script setup>
defineProps({ q: String, a: String, open: Boolean });
defineEmits(["toggle"]);
</script>
