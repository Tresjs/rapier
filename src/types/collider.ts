import type {
  Collider,
  ColliderDesc,
  RigidBody,
  World,
} from '@dimforge/rapier3d-compat'
import type { TresObject3D } from '@tresjs/core'

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
  shape: ColliderShape

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
