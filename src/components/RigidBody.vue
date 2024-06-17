<script setup lang="ts">
import { shallowRef, watch } from 'vue'
import type { Collider, RigidBody } from '@dimforge/rapier3d-compat'
import { type TresObject, useLoop } from '@tresjs/core'

import { useRapierContext } from '../composables/useRapier'
import { createRigidBodyDesc } from '../utils/rigid-body.util'
import { createColliderDesc } from '../utils/collider.util'
import type { RigidBodyProps } from '../types/rigid-body.type'

const props = withDefaults(defineProps<Partial<RigidBodyProps>>(), {
  type: 'dynamic',
  collider: 'cuboid',
})

const { world } = await useRapierContext()
const { onBeforeRender } = useLoop()

const rigidRef = shallowRef<TresObject>()
const rigidBody = shallowRef<RigidBody>()
const collider = shallowRef<Collider>()

watch(rigidRef, (value) => {
  if (!value) { return }

  const rigidBodyDesc = createRigidBodyDesc(value.children[0], props.type)
  const colliderDesc = createColliderDesc(value.children[0], props.collider)

  if (!rigidBodyDesc || !colliderDesc) {
    throw new Error('Invalid #RigidBody properties detected. Unable to construct the physics body')
  }

  rigidBody.value = world.createRigidBody(rigidBodyDesc)
  collider.value = world.createCollider(colliderDesc, rigidBody.value)
})

onBeforeRender(() => {
  if (!rigidBody.value) { return }

  const position = rigidBody.value.translation()
  rigidRef.value?.children[0].position.set(position.x, position.y, position.z)

  const rotation = rigidBody.value.rotation()
  rigidRef.value?.children[0].quaternion.set(rotation.x, rotation.y, rotation.z, rotation.w)
})
</script>

<template>
  <TresGroup ref="rigidRef">
    <slot></slot>
  </TresGroup>
</template>
