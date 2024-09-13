<script setup lang="ts">
import { inject, onUnmounted, type ShallowRef, shallowRef, watch } from 'vue'

import { useRapierContext } from '../../composables'
import { createCollider } from '../../utils/collider'
import type { ColliderProps, CreateColliderReturnType, RigidBodyContext } from '../../types'

const props = withDefaults(defineProps<Partial<ColliderProps>>(), {
  shape: 'cuboid',
  args: () => [1, 1, 1],
})

const { world } = useRapierContext()

const bodyContext = inject<ShallowRef<RigidBodyContext>>('bodyContext') ?? shallowRef<RigidBodyContext>()
const colliderInfos = shallowRef<CreateColliderReturnType>()
const instance = shallowRef<CreateColliderReturnType['collider']>()
const instanceDesc = shallowRef<CreateColliderReturnType['colliderDesc']>()

defineExpose({
  instance,
  colliderDesc: instanceDesc,
})

// TODO: Correctly wait for the physics state to be available
watch(bodyContext, state => setTimeout(() => {
  if (colliderInfos.value || !state) { return }

  colliderInfos.value = createCollider({
    ...props,
    object: props.object ?? state.group,
    rigidBody: state.rigidBody,
    world,
  })
  instance.value = colliderInfos.value.collider
  instanceDesc.value = colliderInfos.value.colliderDesc

  state.colliders.push(colliderInfos.value)
}, 0), { immediate: true })

// TODO: Correctly remove the state from the map and physics world when the component is unmounted
onUnmounted(() => {
  if (bodyContext.value && colliderInfos.value) {
    // Dispose of the collider
  }
})
</script>

<template>
  <slot></slot>
</template>
