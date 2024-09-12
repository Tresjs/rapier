<script lang="ts" setup>
import { shallowRef, watch } from 'vue'
import { InstancedMesh, Object3D } from 'three'
import { type TresObject, useLoop } from '@tresjs/core'

import type { InstancedRigidBodyProps, RigidBodyContext } from '../types'
import { MATRIX_ZERO, QUATERNION_ZERO, VECTOR_ZERO } from '../constants/'
import { useRapierContext } from '../composables'
import { createCollider, createRigidBody } from '../utils'

const props = withDefaults(defineProps<Partial<InstancedRigidBodyProps>>(), {
  type: 'dynamic',
  collider: 'cuboid',
})

const { onBeforeRender } = useLoop()
const { world } = useRapierContext()

const bodyGroup = shallowRef<TresObject>()
const bodiesContexts = shallowRef<RigidBodyContext[]>([])

watch(bodyGroup, (group) => {
  if (!(group instanceof Object3D)) { return }

  const child = bodyGroup.value?.children[0]
  if (
    !(child instanceof InstancedMesh)
    || typeof bodyGroup.value?.children?.length !== 'number'
    || bodyGroup.value.children.length > 1
  ) {
    throw new Error('Incorrect data assignment detected! #RigidBody support only one #InstancedMesh')
  }

  const instanceArray = child.instanceMatrix.array

  for (let i = 0; i < child.count; i++) {
    const matrix = MATRIX_ZERO.fromArray(instanceArray, i * 16)
    const position = VECTOR_ZERO.clone()
    const quaternion = QUATERNION_ZERO.clone()
    const scale = VECTOR_ZERO.clone()
    matrix.decompose(position, quaternion, scale)

    const rigidBodyInfo: RigidBodyContext = {
      ...createRigidBody({
        object: child,
        rigidBodyType: props.type,
        world,
      }),
      collider: props.collider,
      group,
      colliders: [],
    }
    rigidBodyInfo.rigidBody.setTranslation(position, true)
    rigidBodyInfo.rigidBody.setRotation(quaternion, true)

    const colliderInfo = createCollider({
      object: child,
      shape: props.collider,
      rigidBody: rigidBodyInfo.rigidBody,
      world,
    })

    rigidBodyInfo.colliders.push(colliderInfo)
    bodiesContexts.value.push(rigidBodyInfo)
  }
})

onBeforeRender(() => {
  const child: InstancedMesh | undefined = bodyGroup.value?.children[0]

  if (!bodiesContexts.value?.length || !(child instanceof InstancedMesh)) { return }

  const array = child.instanceMatrix.array

  for (let i = 0; i < child.count; i++) {
    let position = VECTOR_ZERO.clone()
    let quaternion = QUATERNION_ZERO.clone()
    let scale = VECTOR_ZERO.clone()

    child.getMatrixAt(i, MATRIX_ZERO)
    MATRIX_ZERO.decompose(position, quaternion, scale)

    position = position.copy(
      bodiesContexts.value[i].rigidBody.translation(),
    )
    quaternion = quaternion.copy(
      bodiesContexts.value[i].rigidBody.rotation(),
    )
    scale = scale.copy(scale)

    MATRIX_ZERO
      .compose(position, quaternion, scale)
      .toArray(array, i * 16)
  }

  child.instanceMatrix.needsUpdate = true
  child.computeBoundingSphere()
})
</script>

<template>
  <TresGroup ref="bodyGroup">
    <slot></slot>
  </TresGroup>
</template>
