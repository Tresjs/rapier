<script lang="ts" setup>
import { type ImpulseJoint, type JointData, Quaternion, Vector3 } from '@dimforge/rapier3d-compat'
import { shallowRef, watch } from 'vue'

import { useRapier } from '../composables'
import type { JointProps } from '../types'

const props = withDefaults(defineProps<JointProps>(), {
  type: 'fixed',
  bodies: () => [],
  params: () => [
    [0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0],
    [0, 0, 0, 0],
  ],
})

const { world, rapier } = useRapier()

const joins = shallowRef<ImpulseJoint>()

watch(() => props.bodies, (bodies) => {
  if (!(bodies?.[0] instanceof rapier.RigidBody) || !(bodies?.[1] instanceof rapier.RigidBody)) {
    return
  }

  let jointData: JointData | undefined

  if (props.type === 'fixed') {
    jointData = rapier.JointData.fixed(
      new Vector3(0, 8, 2),
      new Quaternion(0, 0, 0, 0),
      new Vector3(0, 8, -2),
      new Quaternion(0, 0, 0, 0),
    )
  }

  if (props.type === 'rope') {
    jointData = rapier.JointData.rope(
      2,
      new Vector3(0, 8, 0),
      new Quaternion(0, 0, 0, 0),
    )
  }

  if (jointData) {
    joins.value = world.createImpulseJoint(jointData, bodies[0], bodies[1], true)
  }
})

defineExpose({
  joins,
})
</script>

<template>
  <slot v-once></slot>
</template>
