import type {
  ActiveCollisionTypes,
  Collider,
  ColliderDesc,
  RigidBody,
  World,
} from '@dimforge/rapier3d-compat'
import type { TresObject3D } from '@tresjs/core'

import type { RigidBodyColliderContext } from './rigid-body'

/** @description Tres Rapier supported Collider shapes. */
export type ColliderShape =
  | 'cuboid'
  | 'ball'
  | 'capsule'
  | 'cone'
  | 'cylinder'
  | 'hull'
  | 'trimesh'
  | 'heightfield'

export interface ColliderProps {
  /** @description Set the {@link Collider} shape. */
  shape?: ColliderShape

  /**
   * @description Shape based {@link TresObject3D}.
   *
   * Required for certain shapes like `trimesh`, `hull`, `heightfield`.
   */
  object?: TresObject3D

  /**
   * @description The half-sizes of the collider shapes.
   *
   * Only radius is required for `ball` shape.
   */
  args?:
    | [halfWidth: number, halfHeight: number, HalfDepth: number]
    | [radius: number]
  /** @description {@link Collider} position */

  position?: [x: number, y: number, z: number]
  /** @description {@link Collider} position */

  rotation?: [x: number, y: number, z: number, w?: number]

  /** @description {@link Collider} scale */
  scale?: [x: number, y: number, z: number] | [radiusScale: number]
  /**
   * @description The friction coefficient of this collider.
   * @default 0.5
   */
  friction?: number
  /**
   * @description Mass of the collider.
   * @default 1
   */
  mass?: number
  /**
   * @description Restitution controls how elastic (aka. bouncy) a contact is.
   * @default 0
   */
  restitution?: number
  /**
   * @description The collider density. If non-zero the collider's mass and angular inertia will be added.
   * @default 1.0
   */
  density?: number
  /**
   * @description Enables collisions event.
   * @default false
   */
  activeCollision?: boolean
  /**
   * @description To set the collision type.
   * @default ActiveCollisionTypes.DEFAULT
   */
  activeCollisionTypes?: ActiveCollisionTypes.DEFAULT
  /**
   * @description To set the collision group.
   * @default undefined
   */
  collisionGroups?: undefined | number
  /**
   * @description Whether this collider is a sensor.
   * @default undefined
   */
  sensor?: boolean
}

export interface ExposedCollider {
  /**  @description Context {@link RigidBodyDesc}. */
  instance: RigidBodyColliderContext['collider']
  /**  @description Context {@link RigidBody}. */
  colliderDesc: RigidBodyColliderContext['colliderDesc']
}

export interface CreateColliderDescProps extends ColliderProps {
  /**
   * @description The {@link RigidBody}.
   */
  rigidBody: RigidBody
}

export interface CreateColliderProps extends CreateColliderDescProps {

  /**
   * @description The Rapier {@link World} context.
   *
   * @see https://rapier.rs/javascript3d/classes/World.html
   */
  world: World
}

export interface CreateCollidersFromChildrenProps extends CreateColliderProps {}

export interface CreateCollidersFromInstancedProps
  extends CreateColliderProps {}

export interface CreateColliderReturnType {
  /**
   * {@link Collider}
   *
   * @see https://rapier.rs/javascript3d/classes/Collider.html
   */
  collider: Collider
  /**
   * {@link ColliderDesc}
   *
   * @see https://rapier.rs/javascript3d/classes/ColliderDesc.html
   */
  colliderDesc: ColliderDesc
  /**
   * {@link CreateColliderDescProps['object'] #Object}
   */
  object: CreateColliderDescProps['object']
}
