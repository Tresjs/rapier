import type { TresObject } from '@tresjs/core'
import type { World } from '@dimforge/rapier3d-compat'

import type { ColliderShape } from './collider.type'

/** @description Tres Rapier supported `RigidBody` types. */
export type RigidBodyType =
  | 'dynamic'
  | 'kinematic'
  | 'kinematicVelocity'
  | 'fixed'

export interface RigidBodyProps {
  /** @description Set the `RigidBody` type. */
  type: RigidBodyType
  /**  @description Set the `RigidBody` collider shape. */
  collider: ColliderShape
}

export interface CreateRigidBodyDescProps {
  /** @description The parent object. (@link TresObject}. */
  object: TresObject
  /** @description The `rigidBody` type. {@link RigidBodyType}. */
  rigidBodyType: RigidBodyType
}

export interface CreateRigidBodyProps extends CreateRigidBodyDescProps {
  /**
   * @description The Rapier {@link World} context.
   *
   * @see https://rapier.rs/javascript3d/classes/World.html
   */
  world: World
}
