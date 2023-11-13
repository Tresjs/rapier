<script setup lang="ts">
import { onMounted, nextTick, shallowRef, getCurrentInstance } from 'vue'
import type { RigidBody as RigidBodyType } from '@dimforge/rapier3d-compat'
import { RigidBody, RigidBodyDesc } from '@dimforge/rapier3d-compat'
import type { Mesh } from 'three'

//
// Refs
//
const rigidBodyRef = shallowRef<RigidBodyType>()
const meshRef = shallowRef<Mesh>()

const instance = getCurrentInstance()

onMounted(async () => {
	await nextTick()

	meshRef.value = instance.subTree?.children[0].el as Mesh

	createRigidBody()

	console.log('RigidBody mounted', meshRef.value)
})

//
// Methods
//
function createRigidBody() {
	const { x: tx, y: ty, z: tz } = meshRef.value.position

	const rigidBodyDesc = RigidBodyDesc.dynamic()
		.setTranslation(tx, ty, tz)
		.setRotation(meshRef.value.quaternion)
		.setAdditionalMass(1)

	// TODO: 👇 Access the physics world somehow
	// rigidBody = physics.world.createRigidBody(rigidBodyDesc)

	// rigidBody.userData = {}

	// Object.assign(rigidBody.userData, {
	//   meshUUID: meshRef.value.uuid
	// })
}
</script>

<template>
	<slot />
</template>
