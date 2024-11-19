<script lang="ts" setup>
import { type ImpulseJoint, type JointAxesMask, type JointData, Quaternion, Vector3 } from '@dimforge/rapier3d-compat'
import { onUnmounted, shallowRef, watch } from 'vue'

import { useRapier } from '../../composables'
import type { JointProps, QuaternionArray, VectorArray } from '../../types'

const {
  type = 'fixed',
  bodies,
  params = [
    [0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0],
    [0, 0, 0, 0],
  ],
  wakeUpOnChanges = true,
} = defineProps<JointProps>()
const { world, rapier } = useRapier()

const joins = shallowRef<ImpulseJoint>()

watch(() => bodies, (bodies) => {
  if (
    joins.value
    || !(bodies?.[0] instanceof rapier.RigidBody)
    || !(bodies?.[1] instanceof rapier.RigidBody)
    || !Array.isArray(params)
  ) {
    return
  }

  let jointParams: JointData | undefined
  let hasParamsError = false

  if (
    type === 'fixed'
    && params.length >= 4
    && (Array.isArray(params[0]) && params[0].length >= 3)
    && (Array.isArray(params[1]) && params[1].length >= 4)
    && (Array.isArray(params[2]) && params[2].length >= 3)
    && (Array.isArray(params[3]) && params[3].length >= 4)
  ) {
    jointParams = rapier.JointData.fixed(
      new Vector3(...params[0] as VectorArray),
      new Quaternion(...params[1] as QuaternionArray),
      new Vector3(...params[2] as VectorArray),
      new Quaternion(...params[3] as QuaternionArray),
    )
  }
  else if (type === 'fixed') {
    hasParamsError = true
  }

  if (
    type === 'generic'
    && params.length >= 3
    && (Array.isArray(params[0]) && params[0].length >= 3)
    && (Array.isArray(params[1]) && params[1].length >= 3)
    && (Array.isArray(params[2]) && params[2].length >= 3)
    && typeof params[3] === 'number'
  ) {
    jointParams = rapier.JointData.generic(
      new Vector3(...params[0] as VectorArray),
      new Vector3(...params[1] as VectorArray),
      new Vector3(...params[2] as VectorArray),
      params[3] as JointAxesMask,
    )
  }
  else if (type === 'generic') {
    hasParamsError = true
  }

  if (
    type === 'prismatic'
    && params.length >= 4
    && (Array.isArray(params[0]) && params[0].length >= 3)
    && (Array.isArray(params[1]) && params[1].length >= 3)
    && (Array.isArray(params[2]) && params[2].length >= 3)
  ) {
    jointParams = rapier.JointData.prismatic(
      new Vector3(...params[0] as VectorArray),
      new Vector3(...params[1] as VectorArray),
      new Vector3(...params[1] as VectorArray),
    )
  }
  else if (type === 'prismatic') {
    hasParamsError = true
  }

  if (
    type === 'revolute'
    && params.length >= 3
    && (Array.isArray(params[0]) && params[0].length >= 3)
    && (Array.isArray(params[1]) && params[1].length >= 3)
    && (Array.isArray(params[2]) && params[2].length >= 3)
  ) {
    jointParams = rapier.JointData.revolute(
      new Vector3(...params[0] as VectorArray),
      new Vector3(...params[1] as VectorArray),
      new Vector3(...params[2] as VectorArray),
    )
  }
  else if (type === 'revolute') {
    hasParamsError = true
  }

  if (
    type === 'rope'
    && params.length >= 3
    && typeof params[0] === 'number'
    && (Array.isArray(params[1]) && params[1].length >= 3)
    && (Array.isArray(params[2]) && params[2].length >= 4)
  ) {
    jointParams = rapier.JointData.rope(
      params[0],
      new Vector3(...params[1] as VectorArray),
      new Quaternion(...params[2] as QuaternionArray),
    )
  }
  else if (type === 'rope') {
    hasParamsError = true
  }

  if (
    type === 'spherical'
    && params.length >= 2
    && (Array.isArray(params[0]) && params[0].length >= 3)
    && (Array.isArray(params[1]) && params[1].length >= 3)
  ) {
    jointParams = rapier.JointData.spherical(
      new Vector3(...params[0] as VectorArray),
      new Vector3(...params[1] as VectorArray),
    )
  }
  else if (type === 'spherical') {
    hasParamsError = true
  }

  if (
    type === 'spring'
    && params.length >= 5
    && typeof params[0] === 'number'
    && typeof params[1] === 'number'
    && typeof params[2] === 'number'
    && (Array.isArray(params[3]) && params[3].length >= 3)
    && (Array.isArray(params[4]) && params[4].length >= 3)
  ) {
    jointParams = rapier.JointData.spring(
      params[0],
      params[1],
      params[2],
      new Vector3(...params[3] as VectorArray),
      new Vector3(...params[4] as VectorArray),
    )
  }
  else if (type === 'spring') {
    hasParamsError = true
  }

  if (hasParamsError) {
    throw new Error(`Invalid "${type}" joint parameters`)
  }

  if (!jointParams) {
    throw new Error(`Unsupported joint type. If you think this is a bug or the "${type}" type should be implemented, please open an issue.`)
  }

  joins.value = world.createImpulseJoint(jointParams, bodies[0], bodies[1], wakeUpOnChanges)
})

onUnmounted(() => {
  if (joins.value) {
    world.removeImpulseJoint(joins.value, wakeUpOnChanges)
  }
})

defineExpose({
  joins,
})
</script>

<template>
  <slot v-once></slot>
</template>
