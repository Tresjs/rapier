<script setup lang="ts">
import { shallowRef, watch } from 'vue'
import { type TresObject, useLoop } from '@tresjs/core'

import { InstancedMesh } from 'three'
import { useRapierContext } from '../composables/useRapier'
import { createRigiBody } from '../utils/rigid-body.util'
import { createCollider, createCollidersFromChildren } from '../utils/collider.util'
import { MATRIX_ZERO, QUATERNION_ZERO, VECTOR_ZERO } from '../constants/object.constant'
import type { RigidBodyProps } from '../types/rigid-body.type'

const props = withDefaults(defineProps<Partial<RigidBodyProps>>(), {
  type: 'dynamic',
  collider: 'cuboid',
  instanced: false,
})

const { world } = await useRapierContext()
const { onBeforeRender } = useLoop()

const parentObject = shallowRef<TresObject>()
const rigidBodyInfos = shallowRef<ReturnType<typeof createRigiBody>[]>()
const colliderInfos = shallowRef<ReturnType<typeof createCollidersFromChildren>>()

watch(parentObject, (object) => {
  if (!object) { return }

  if (props.instanced) {
    const child = parentObject.value?.children[0]
    if (
      !(child instanceof InstancedMesh)
      || typeof parentObject.value?.children?.length !== 'number'
      || parentObject.value.children.length > 1
    ) {
      throw new Error('Incorrect data assignment detected! #RigidBody support only one #InstancedMesh')
    }

    // const array = child.instanceMatrix.array
    const rigidBodies = []
    const colliders = []

    for (let i = 0; i < child.count; i++) {
      // const position = VECTOR_ZERO.fromArray(array, i * 16 + 12)

      rigidBodies.push(createRigiBody({
        object: child,
        rigidBodyType: props.type,
        world,
      }))

      colliders.push(createCollider({
        object: child,
        colliderShape: props.collider,
        rigidBody: rigidBodies[i].rigidBody,
        world,
      }))
    }

    rigidBodyInfos.value = rigidBodies

    colliderInfos.value = colliders

    return
  }

  rigidBodyInfos.value = [createRigiBody({
    object,
    rigidBodyType: props.type,
    world,
  })]

  colliderInfos.value = createCollidersFromChildren({
    colliderShape: props.collider,
    rigidBody: rigidBodyInfos.value[0].rigidBody,
    object,
    world,
  })
})

onBeforeRender(() => {
  if (!colliderInfos.value || !rigidBodyInfos.value) { return }

  if (props.instanced) {
    const child: InstancedMesh = parentObject.value?.children[0]
    const array = child.instanceMatrix.array

    for (let i = 0; i < child.count; i++) {
      let position = VECTOR_ZERO.clone()
      let quaternion = QUATERNION_ZERO.clone()
      let scale = VECTOR_ZERO.clone()

      child.getMatrixAt(i, MATRIX_ZERO)
      MATRIX_ZERO.decompose(position, quaternion, scale)

      position = VECTOR_ZERO.copy(
        rigidBodyInfos.value[i].rigidBody.translation(),
      )
      quaternion = QUATERNION_ZERO.copy(
        rigidBodyInfos.value[i].rigidBody.rotation(),
      )
      scale = VECTOR_ZERO.clone().copy(scale)

      MATRIX_ZERO
        .compose(position, quaternion, scale)
        .toArray(array, i * 16)
    }

    child.instanceMatrix.needsUpdate = true
    child.computeBoundingSphere()

    return
  }

  colliderInfos.value.forEach((item) => {
    const position = item.collider.translation()
    item.child.position.set(position.x, position.y, position.z)

    const rotation = item.collider.rotation()
    item.child.quaternion.set(rotation.x, rotation.y, rotation.z, rotation.w)
  })
})
</script>

<template>
  <TresGroup ref="parentObject">
    <slot></slot>
  </TresGroup>
</template>
