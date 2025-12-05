<template>
  <div :class="['ruler', cls]" :style="boxStyle">
    <div class="labels">
      <template v-for="n in labels" :key="n">
        <span
          v-if="direction === 'horizontal'"
          class="label"
          :style="{ left: `${n * props.scale}px` }"
          >{{ n }}</span
        >
        <span v-else class="label" :style="{ top: `${n * props.scale}px` }">{{
          n
        }}</span>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  direction: { type: String, default: 'horizontal' },
  length: { type: Number, default: 750 },
  minor: { type: Number, default: 10 },
  major: { type: Number, default: 100 },
  scale: { type: Number, default: 1 },
})

const cls = computed(() => (props.direction === 'horizontal' ? 'h' : 'v'))

const labels = computed(() => {
  const arr: number[] = []
  for (let i = 0; i <= props.length; i += props.major) arr.push(i)
  return arr
})

const boxStyle = computed(() => {
  const vars = {
    '--major-px': props.major * props.scale + 'px',
    '--minor-px': props.minor * props.scale + 'px',
  } as any
  return props.direction === 'horizontal'
    ? { width: props.length * props.scale + 'px', ...vars }
    : { height: props.length * props.scale + 'px', ...vars }
})
</script>

<style lang="scss" scoped>
.ruler {
  position: absolute;
  color: #374151;
  font-size: 10px;
  user-select: none;
  z-index: 30;
}
.h {
  left: 36px;
  top: 0;
  height: 28px;
  background-color: #f9fafb;
  background:
    /* major */ repeating-linear-gradient(
      to right,
      transparent 0,
      transparent calc(var(--major-px) - 1px),
      rgba(0, 0, 0, 0.45) calc(var(--major-px) - 1px),
      rgba(0, 0, 0, 0.45) var(--major-px)
    ),
    /* minor */
      repeating-linear-gradient(
        to right,
        rgba(0, 0, 0, 0.12) 0,
        rgba(0, 0, 0, 0.12) 1px,
        transparent 1px,
        transparent var(--minor-px)
      );
}
.v {
  left: 0;
  top: 28px;
  width: 36px;
  background-color: #f9fafb;
  background:
    /* major */ repeating-linear-gradient(
      to bottom,
      transparent 0,
      transparent calc(var(--major-px) - 1px),
      rgba(0, 0, 0, 0.45) calc(var(--major-px) - 1px),
      rgba(0, 0, 0, 0.45) var(--major-px)
    ),
    /* minor */
      repeating-linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0.12) 0,
        rgba(0, 0, 0, 0.12) 1px,
        transparent 1px,
        transparent var(--minor-px)
      );
}
.labels {
  position: absolute;
  inset: 0;
}
.label {
  position: absolute;
  color: #374151;
}
.h .label {
  top: 8px;
}
.v .label {
  left: 6px;
}
</style>
