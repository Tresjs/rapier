<script lang="ts" setup>
import { type ImpulseJoint, type JointData, Quaternion, Vector3 } from '@dimforge/rapier3d-compat'
import { shallowRef, watch } from 'vue'

import { useRapier } from '../composables'
import type { JointProps } from '../types'

const {
  type = 'fixed',
  bodies = [],
  params = [
    [0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0],
    [0, 0, 0, 0],
  ],
} = defineProps<JointProps>()

const { world, rapier } = useRapier()

const joins = shallowRef<ImpulseJoint>()

watch(() => bodies, (bodies) => {
  if (
    !(bodies?.[0] instanceof rapier.RigidBody)
    || !(bodies?.[1] instanceof rapier.RigidBody)
    || !Array.isArray(params)
  ) {
    return
  }

  let jointParams: JointData | undefined

  if (type === 'fixed') {
    jointParams = rapier.JointData.fixed(
      new Vector3(0, 8, 2),
      new Quaternion(0, 0, 0, 0),
      new Vector3(0, 8, -2),
      new Quaternion(0, 0, 0, 0),
    )
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
      new Vector3(...params[1] as [number, number, number]),
      new Quaternion(...params[2] as [number, number, number, number]),
    )
  }
  else if (type === 'rope') {
    throw new Error(`Invalid "${type}" joint parameters`)
  }

  if (
    type === 'spherical'
    && params.length >= 2
    && (Array.isArray(params[0]) && params[0].length >= 3)
    && (Array.isArray(params[1]) && params[1].length >= 3)
  ) {
    jointParams = rapier.JointData.spherical(
      new Vector3(...params[0] as [number, number, number]),
      new Vector3(...params[1] as [number, number, number]),
    )
  }
  else if (type === 'spherical') {
    throw new Error(`Invalid "${type}" joint parameters`)
  }

  if (!jointParams) {
    throw new Error(`Unsupported joint type. If you think this is a bug or the "${type}" type should be implemented, please open an issue.`)
  }

  joins.value = world.createImpulseJoint(jointParams, bodies[0], bodies[1], true)
})

defineExpose({
  joins,
})
</script>

<template>
  <slot v-once></slot>
</template>
