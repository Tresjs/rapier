<script setup lang="ts">
import { onUnmounted, provide, shallowRef, watch } from 'vue'
import { Object3D } from 'three'
import { type TresObject, useLoop } from '@tresjs/core'

import type { ColliderProps, RigidBodyContext, RigidBodyProps } from '../types'
import { useRapierContext } from '../composables'
import { createColliderPropsFromObject, createRigidBody } from '../utils'
import { BaseCollider } from './colliders'

const props = withDefaults(defineProps<Partial<RigidBodyProps>>(), {
  type: 'dynamic',
  collider: 'cuboid',
})

const { onBeforeRender } = useLoop()
const { world } = useRapierContext()

const bodyGroup = shallowRef<TresObject>()
const bodyContext = shallowRef<RigidBodyContext>()
const autoColliderProps = shallowRef<ColliderProps[]>([])

provide('bodyContext', bodyContext)

watch(bodyGroup, (group) => {
  if (!(group instanceof Object3D) || bodyContext.value) { return }

  const newPhysicsState: RigidBodyContext = {
    ...createRigidBody({
      object: group,
      rigidBodyType: props.type,
      world,
    }),
    group,
    collider: props.collider,
    colliders: [],
  }

  bodyContext.value = newPhysicsState

  if (props.collider !== false) {
    const colliders = []

    for (const child of group.children) {
      colliders.push(createColliderPropsFromObject(child, props.collider))
    }

    autoColliderProps.value = colliders
  }
}, { once: true })

onBeforeRender(() => {
  const context = bodyContext.value
  if (!context) { return }

  const position = context.rigidBody.translation()
  context.group.position.set(position.x, position.y, position.z)

  const rotation = context.rigidBody.rotation()
  context.group.quaternion.set(rotation.x, rotation.y, rotation.z, rotation.w)
})

// TODO: Correctly remove the state from the map and physics world when the component is unmounted
onUnmounted(() => {
  if (bodyGroup.value instanceof Object3D) { /* Dispose of the rigid body */ }

  bodyContext.value = undefined
})
</script>

<template>
  <TresGroup ref="bodyGroup">
    <BaseCollider
      v-for="(_props, id) in autoColliderProps"
      :key="id"
      :shape="_props.shape"
      :args="_props.args"
      :object="_props.object"
    />
    <slot></slot>
  </TresGroup>
</template>
