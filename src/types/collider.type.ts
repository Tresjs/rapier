import type { RigidBody, World } from '@dimforge/rapier3d-compat'
import type { TresObject } from '@tresjs/core'
import type { InstancedMesh } from 'three'

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

export interface CreateColliderDescProps {
  /** @description The parent object. (@link TresObject}. */
  object: TresObject | InstancedMesh
  /** @description The `Collider` shape. {@link ColliderShape}. */
  colliderShape?: ColliderShape
}

export interface CreateColliderProps extends CreateColliderDescProps {
  /** @description The Collider shape. {@link ColliderShape}. */
  rigidBody: RigidBody
  /**
   * @description The Rapier {@link World} context.
   *
   * @see https://rapier.rs/javascript3d/classes/World.html
   */
  world: World
}

export interface CreateCollidersFromChildrenProps extends CreateColliderProps {}

export interface CreateCollidersFromInstancedProps extends CreateColliderProps {}
