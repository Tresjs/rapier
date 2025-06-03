# How does it work?

To gain a clearer understanding of the underlying mechanics, it's helpful to think in terms of two distinct domains:

- The TresJS context, which represents our 3D scene.
- The physics layer, powered by Rapier, which governs the physical simulation.

Let's try to make a simple ball fall.

First, we add 2 different meshes to our scene, a sphere representing the ball and a plane representing the floor.

```vue
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
</script>

<template>
  <TresCanvas window-size>
    <TresPerspectiveCamera :position="[15, 15, 15]" :look-at="[0, 0, 0]" />
    <TresMesh :position="[0, 8, 0]">
      <TresSphereGeometry :args="[1, 16]" />
      <TresMeshNormalMaterial />
    </TresMesh>
    <TresMesh :position="[0, 0, 0]" :rotate-x="-Math.PI / 2">
      <TresPlaneGeometry :args="[20, 20, 20]" />
      <TresMeshBasicMaterial color="#f4f4f4" />
    </TresMesh>
  </TresCanvas>
</template>
```

![](/img/initial-scene.jpg)

Then we enable `Rapier` by adding the `<Physics >` component surrounding all the elements we want to be affected by physics, in this case, the ball and the floor.

::: warning
	The <Physics /> component needs to be wrapped by a Suspense component
:::

```vue{3,10,11,21,22}
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { Physics } from '@tresjs/rapier'
</script>

<template>
  <TresCanvas window-size>
    <TresPerspectiveCamera :position="[15, 15, 15]" :look-at="[0, 0, 0]" />
    <Suspense>
      <Physics>
        <TresMesh :position="[0, 8, 0]">
          <TresSphereGeometry :args="[1,16]" />
          <TresMeshNormalMaterial />
        </TresMesh>
        <TresMesh :position="[0, 0, 0]" :rotate-x="-Math.PI / 2">
          <TresPlaneGeometry :args="[20, 20, 20]" />
          <TresMeshBasicMaterial color="#f4f4f4" />
        </TresMesh>
      </Physics>
    </Suspense>
  </TresCanvas>
</template>
```

To add forces (such as gravity) to our sphere, we need to wrap it with a `<RigidBody />` component , which will generate a [RigidBody](https://rapier.rs/docs/user_guides/javascript/rigid_bodies#creation-and-insertion) instance containing one or many [Colliders](https://rapier.rs/docs/user_guides/javascript/colliders). These are responsible for all the physical calculations.

By default, the RigidBody type is `Dynamic`, which fits perfectly what we need for our ball. See all available types [here](/components/rigid-body.html#types)

```vue
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { Physics, RigidBody } from '@tresjs/rapier'
</script>

<template>
  <TresCanvas window-size>
    <TresPerspectiveCamera :position="[15, 15, 15]" :look-at="[0, 0, 0]" />
    <Suspense>
      <Physics>
        <RigidBody>
          <TresMesh :position="[0, 8, 0]">
            <TresSphereGeometry :args="[1, 16]" />
            <TresMeshNormalMaterial />
          </TresMesh>
        </RigidBody>
        <TresMesh :position="[0, 0, 0]" :rotate-x="-Math.PI / 2">
          <TresPlaneGeometry :args="[20, 20, 20]" />
          <TresMeshBasicMaterial color="#f4f4f4" />
        </TresMesh>
      </Physics>
    </Suspense>
  </TresCanvas>
</template>
```

Let's repeat the same process with the floor, the process is the same except that now we use the type `Fixed` instead indicating the body cannot move.

```vue
<template>
  <RigidBody type="fixed">
    <TresMesh :position="[0, 0, 0]" :rotate-x="-Math.PI / 2">
      <TresPlaneGeometry :args="[20, 20, 20]" />
      <TresMeshBasicMaterial color="#f4f4f4" />
    </TresMesh>
  </RigidBody>
</template>
```

Now we need to make the bridge between the two worlds so that when our RigidBody instance gets updated, our sphere mesh will follow along.

Fortunately `@tresjs/rapier` abstracts most of the logic for you with a nice syntax, so you don't have to worry about making bounds or difficult configurations, even the colliders are set up for you automatically.

```vue
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { Physics, RigidBody } from '@tresjs/rapier'
</script>

<template>
  <TresCanvas window-size>
    <TresPerspectiveCamera :position="[15, 15, 15]" :look-at="[0, 0, 0]" />
    <Suspense>
      <Physics>
        <RigidBody>
          <TresMesh :position="[0, 8, 0]">
            <TresSphereGeometry :args="[1, 16]" />
            <TresMeshNormalMaterial />
          </TresMesh>
        </RigidBody>
        <RigidBody type="fixed">
          <TresMesh :position="[0, 0, 0]" :rotate-x="-Math.PI / 2">
            <TresPlaneGeometry :args="[20, 20, 20]" />
            <TresMeshBasicMaterial color="#f4f4f4" />
          </TresMesh>
        </RigidBody>
      </Physics>
    </Suspense>
  </TresCanvas>
</template>
```

<DocsDemo>
  <IntroDemo />
</DocsDemo>

These physics are working, but the sphere is not behaving like a ball, it's not rolling through the floor, why is that?

You can inspect your physic scene using the `debug` prop in the `<Physics>` component you should see something like this:

![](/img/cuboid.jpg)

You'll quickly realize that our ball is wrapped by a cube, not a sphere, so let's introduce the **Colliders**:

Colliders are physical objects with shape, properties, and methods, they are a child of the RigidBody component and a RigidBody can have one or many colliders. But we haven't created any, why did that collider appear there?

Well `@tresjs/rapier` will create an automatic collider for you, for each Mesh that you add! This normally is enough, but in cases like this, we need to tell our collider to have a sphere or `ball` shape.

Now our sphere finally acts like one 🏀!

```vue
<template>
  <RigidBody collider="ball">
    <TresMesh :position="[0, 8, 0]">
      <TresSphereGeometry :args="[1, 16]" />
      <TresMeshNormalMaterial />
    </TresMesh>
  </RigidBody>
</template>
```

## Caveats

- To save resources rapier sets the object to sleep when they are not moving or moving too slowly.
- Modifying the position/rotation property in a `RigidBody instance` in real-time causes teleport or "jump" weird behaviors, and is discouraged.
