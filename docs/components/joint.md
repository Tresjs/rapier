# Joints

Joints is an extension feature provided in [Rapier#Joint](https://rapier.rs/docs/user_guides/javascript/joints/). It lets us connect two or more bodies, restricting their movements according to each other.

In **TresJs** we can achieve such motion restriction by using one of the available components designed to handle joints:

- [GenericJoint](../../src/components/joints/index.ts#L41)
- [PrismaticJoint](../../src/components/joints/index.ts#L51)
- [RevoluteJoint](../../src/components/joints/index.ts#L60)
- [RopeJoint](../../src/components/joints/index.ts#L69)
- [SphericalJoint](../../src/components/joints/index.ts#L78)
- [SpringJoint](../../src/components/joints/index.ts#L86)

All of them extends [BaseJoint](../../src/components/joints/index.ts#L96).

## How to use

Here's a basic `Joints` implementation in **TresJs**:

```vue
<script setup>
import { RigidBody, SphericalJoint } from '@tresjs/rapier'
import { shallowRef } from 'vue'

const bodyRefA = shallowRef(null)
const bodyRefB = shallowRef(null)
</script>

<template>
  <RigidBody
    ref="bodyRefA"
    type="kinematic"
    :position="[0, 0, 0]"
    collider="ball"
  >
    <TresMesh>
      <TresSphereGeometry />
      <TresMeshNormalMaterial />
    </TresMesh>
  </RigidBody>

  <RigidBody
    ref="bodyRefB"
    :position="[-2.2, 0, 0]"
    collider="ball"
  >
    <TresMesh>
      <TresSphereGeometry />
      <TresMeshNormalMaterial />
    </TresMesh>
  </RigidBody>

  <SphericalJoint
    :bodies="[bodyRefA?.instance, bodyRefB?.instance]"
    :params="[
      [0, -1.1, 0],
      [0, 2, 0],
    ]"
  />
</template>
```

> Preview
<img width="1141" alt="JointsDemo" src="https://github.com/user-attachments/assets/d3cacac3-8764-4906-886a-d0b7a764b7c0" />

### Explanation

In the above example, we created 2 `RigidBody` references, then, we implemented the `SphericalJoint` component, by placing our 2 `RigidBody` references in the `:bodies` property and specifying parameters, we created a `spherical-joint` between them.

:::info
To understand how each Joint type works, please take a look at the official [Rapier Joint Documentation](https://rapier.rs/docs/user_guides/javascript/joints).
:::
