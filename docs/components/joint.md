# Joints

Joints is an extension feature provided in [Rapier#Joint](https://rapier.rs/docs/user_guides/javascript/joints/). It lets us connect two or more bodies, restricting their movements according to each other.

In **Tres** we can achieve such motion restriction by using one of the available components designed to handle joints:

- [GenericJoint](../../src/components/joints/index.ts#L41)
- [PrismaticJoint](../../src/components/joints/index.ts#L51)
- [RevoluteJoint](../../src/components/joints/index.ts#L60)
- [RopeJoint](../../src/components/joints/index.ts#L69)
- [SphericalJoint](../../src/components/joints/index.ts#L78)
- [SpringJoint](../../src/components/joints/index.ts#L86)

All of them extends [BaseJoint](../../src/components/joints/index.ts#L96).

## How to use

Here's a basic `Joints` implementation in **Tres**:

```vue
<script setup lang="ts">
import { RigidBody, SphericalJoint } from '@tresjs/rapier'
import { shallowRef } from 'vue'

const bodyRefs = shallowRef(
  Array.from({ length: 10 }).map(() => shallowRef(null)),
)
</script>

<template>
  <RigidBody
    v-for="(ref, i) in bodyRefs"
    :key="i"
    :ref="ref"
    :type="i === 0 ? 'kinematic' : 'dynamic'"
    :position="[i * 1.5, 0, 0]"
    collider="ball"
  >
    <TresMesh>
      <TresSphereGeometry />
      <TresMeshNormalMaterial />
    </TresMesh>
  </RigidBody>

  <SphericalJoint
    v-for="(ref, i) in bodyRefs"
    :key="i"
    :bodies="[ref.value?.[0]?.instance, bodyRefs[i - 1]?.value?.[0]?.instance]"
    :params="[
      [-1.1, 0, 0],
      [1.1, 0, 0],
    ]"
  />
</template>
```

> Preview
<img width="843" alt="Screenshot 2024-12-09 at 4 01 58PM" src="https://github.com/user-attachments/assets/9baaea58-f996-45d5-b4f4-34dae30d44cb">

### Explanation

In the above example, we created a list of 10 `RigidBody` references and mapped them using the `v-for` directive. Then, we implemented the `SphericalJoint` component, creating a Joint between each mapped `RigidBody`.

:::info
To understand how each Joint type works, please take a look at the official [Rapier Joint Documentation](https://rapier.rs/docs/user_guides/javascript/joints).
:::
