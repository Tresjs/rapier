<script setup lang="ts">
import { useRenderLoop } from '@tresjs/core'
import { useRapierContextProvider } from '../composables/useRapier'

const { world, step } = await useRapierContextProvider()
const { onLoop } = useRenderLoop()

onLoop(() => {
  if (!world) return
  step()
})
</script>

<template>
  <slot />
</template>
