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
const collider = shallowRef<CreateColliderReturnType>()

// TODO: Correctly wait for the physics state to be available
watch(bodyContext, state => setTimeout(() => {
  if (collider.value || !state) { return }

  collider.value = createCollider({
    ...props,
    object: props.object ?? state.group,
    rigidBody: state.rigidBody,
    world,
  })

  state.colliders.push(collider.value)
}, 0), { immediate: true })

// TODO: Correctly remove the state from the map and physics world when the component is unmounted
onUnmounted(() => {
  if (bodyContext.value && collider.value) {
    // Dispose of the collider
  }
})
</script>

<template>
  <slot></slot>
</template>
