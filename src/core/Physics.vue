<script setup lang="ts">
import { useRenderLoop } from '@tresjs/core'
import { useRapierContextProvider } from '../composables/useRapier'

const { world } = await useRapierContextProvider()

console.log('world', world)

const { onLoop } = useRenderLoop()

onLoop(() => {
  if (!world) return
  world.step()

  /* const position = world.bodies.get(0).translation()
  console.log('Rigid-body position: ', position.x, position.y, position.z) */
})
</script>

<template>
  <slot />
</template>
