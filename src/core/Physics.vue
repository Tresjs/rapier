<script setup lang="ts">
import { onMounted, nextTick, shallowRef } from 'vue'
import { useRenderLoop } from '@tresjs/core'
import type { World } from '@dimforge/rapier3d-compat'

const RAPIER = await import('@dimforge/rapier3d-compat')
await RAPIER.init()

//
// Refs
//
const worldRef = shallowRef<World>()

const { onLoop } = useRenderLoop()

createWorld()

onMounted(async () => {
	await nextTick()

	onLoop(() => {
		worldRef.value?.step()
	})
})

//
// Methods
//
function createWorld() {
	const gravity = { x: 0, y: -9.81, z: 0 }
	worldRef.value = new RAPIER.World(gravity)
}
</script>

<template>
	<slot />
</template>
