<script setup lang="ts">
import { watch } from 'vue'
import { useLoop } from '@tresjs/core'

import type { TresVector3 } from '@tresjs/core'
import { Vector3 } from 'three'
import { useRapierContextProvider } from '../composables/useRapier'
// import type { PhysicsProps } from '../types/physics'
import { GRAVITY } from '../constants/physics'
import Debug from './Debug.vue'

export interface PhysicsProps {
  debug: boolean
  gravity: TresVector3
}

const props = withDefaults(
  defineProps<Partial<PhysicsProps>>(),
  {
    gravity: () => new Vector3(GRAVITY.x, GRAVITY.y, GRAVITY.z),
    debug: false,
  },
)

const { world } = await useRapierContextProvider()

const setGravity = (gravity: TresVector3) => {
  world.gravity.x = gravity.x ?? gravity[0]
  world.gravity.y = gravity.y ?? gravity[1]
  world.gravity.z = gravity.z ?? gravity[2]
}

watch(() => props.gravity, (gravity) => {
  setGravity(gravity)
}, { immediate: true })

const { onBeforeRender } = useLoop()

onBeforeRender(() => {
  if (!world) { return }
  world.step()
})
</script>

<template>
  <Debug v-if="debug" />
  <slot></slot>
</template>
