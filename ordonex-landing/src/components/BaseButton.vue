<template>
  <button
    :class="[
      'inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold transition active:scale-[0.98]',
      variant === 'primary' && 'bg-red-600 text-white shadow-[0_10px_30px_rgba(208,0,0,0.25)] hover:bg-red-500',
      variant === 'secondary' && 'bg-white/10 text-white ring-1 ring-white/15 hover:bg-white/15'
    ]"
  >
    <slot />
  </button>
</template>

<script setup>
defineProps({ variant: { type: String, default: "primary" } });
</script>
