<script setup lang="ts">
import { shallowRef, watch } from 'vue'
import { type TresObject, useLoop } from '@tresjs/core'

import { useRapierContext } from '../composables/useRapier'
import { createRigiBody } from '../utils/rigid-body.util'
import { createColliderFromChildren } from '../utils/collider.util'
import type { RigidBodyProps } from '../types/rigid-body.type'

const props = withDefaults(defineProps<Partial<RigidBodyProps>>(), {
  type: 'dynamic',
  collider: 'cuboid',
})

const { world } = await useRapierContext()
const { onBeforeRender } = useLoop()

const rigidObject = shallowRef<TresObject>()
const rigidBodyInfo = shallowRef<ReturnType<typeof createRigiBody>>()
const rigidColliders = shallowRef<ReturnType<typeof createColliderFromChildren>>()

watch(rigidObject, (object) => {
  if (!object) { return }

  rigidBodyInfo.value = createRigiBody({
    object,
    rigidBodyType: props.type,
    world,
  })
  rigidColliders.value = createColliderFromChildren({
    colliderShape: props.collider,
    rigidBody: rigidBodyInfo.value.rigidBody,
    object,
    world,
  })
})

onBeforeRender(() => {
  if (!rigidColliders.value) { return }

  rigidColliders.value.forEach((item) => {
    const position = item.collider.translation()
    item.child.position.set(position.x, position.y, position.z)

    const rotation = item.collider.rotation()
    item.child.quaternion.set(rotation.x, rotation.y, rotation.z, rotation.w)
  })
})
</script>

<template>
  <TresGroup ref="rigidObject">
    <slot></slot>
  </TresGroup>
</template>
