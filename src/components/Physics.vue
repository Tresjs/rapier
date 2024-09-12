<script setup lang="ts">
import { useLoop } from '@tresjs/core'

import type { PhysicsProps } from '../types'
import { useRapierContextProvider } from '../composables'
import Debug from './Debug.vue'

const props = withDefaults(
  defineProps<Partial<PhysicsProps>>(),
  {
    debug: false,
  },
)

const { world, isPaused } = await useRapierContextProvider()
const { onBeforeRender } = useLoop()

onBeforeRender(() => {
  if (!world || isPaused) { return }
  if (typeof props.timestep === 'number') {
    world.timestep = props.timestep
  }

  world.step()
})
</script>

<template>
  <Debug v-if="debug" />
  <slot></slot>
</template>
