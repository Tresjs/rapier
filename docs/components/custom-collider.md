# Custom Colliders

You can add colliders that are not tied to a 3D mesh, this way you can create
your own collider shape.

```vue
<template>
  <RigidBody>
    <BallCollider />
  </RigidBody>
</template>
```

:::warning
Custom collider needs to be child of a `Rigid-body` component.
:::

### Available as component

| Prop          | Description                                                                         |
| :------------ | :---------------------------------------------------------------------------------- |
| `<CuboidCollider>`      | Box shape                                                                           |
| `<BallCollider>`        | Sphere shape                                                                        |
| `<CapsuleCollider>`     | Capsule shape                                                                       |
| `<ConeCollider>`        | Cone shape                                                                          |
| `<CylinderCollider>`    | Cylinder shape                                                                      |
| `<HullCollider>`        | The smallest convex shape that contains all the given points.                       |
| `<TrimeshCollider>`     | A set of indices indicating what vertex is used by what triangle.                   |
| `<HeightfieldCollider>` | Large rectangle in the X-Z plane, subdivided in a grid pattern at regular intervals |

:::warning
Avoid using `<TrimeshCollider >` with dynamic bodies, since the performance get compromised
:::

## Collisions

Similar to [how collisions work in rigid-bodies](./rigid-body.md#collisions) you
can set a custom collider to receive collisions events.

Be aware that the event will be emitted by the `RigidBody` parent

```vue
<template>
  <RigidBody
    @collision-enter="onCollisionEnter"
    @collision-exit="onCollisionExit"
  >
    <BallCollider activeCollision />
  </RigidBody>
</template>
```

## Props

| Prop                     | Description                                                                                                   | Default                        |
| :----------------------- | :------------------------------------------------------------------------------------------------------------ | ------------------------------ |
| **shape**                | shape of the collider                                                                                         | `cuboid`                       |
| **args**                 | The half-sizes of the collider shapes                                                                         | `[1,1,1]`                      |
| **object**               | Required for certain shapes like `trimesh`, `hull`, `heightfield`.                                            |                                |
| **friction**             | The friction coefficient of this collider. (automatic-collider)                                               | `0.5`                          |
| **mass**                 | Mass of the collider. (automatic-collider)                                                                    | `1`                            |
| **density**              | Restitution controls how elastic (aka. bouncy) a contact is. (automatic-collider)                             | `0`                            |
| **restitution**          | The collider density. If non-zero the collider's mass and angular inertia will be added. (automatic-collider) | `1`                            |
| **activeCollision**      | To set the collider receiver/emitter collision events                                                         | `false`                        |
| **activeCollisionTypes** | Type of the collision event.                                                                                  | `ActiveCollisionTypes.DEFAULT` |
| **collisionGroups**      | To specify collision groups.                                                                                  | `undefined`                    |

:::info
You can access the
[Collider](https://rapier.rs/docs/user_guides/javascript/colliders) instance
which offers full control over all the properties & methods available by using
[Template refs](https://vuejs.org/guide/essentials/template-refs.html#template-refs).
:::

## Expose object

```js
const exposeObject = {
  instance,
  colliderDesc,
}
```
