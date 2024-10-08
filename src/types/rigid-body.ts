import type { ActiveCollisionTypes, Collider, ColliderDesc, RigidBody, RigidBodyDesc, World } from '@dimforge/rapier3d-compat'
import type { TresObject3D, TresVector3, VectorCoordinates } from '@tresjs/core'

import type { ColliderShape } from './collider'

/** @description Tres Rapier supported `RigidBody` types. */
export type RigidBodyType =
  | 'dynamic'
  | 'kinematic'
  | 'kinematicVelocity'
  | 'fixed'

export interface RigidBodyProps {
  /** @description Set the `RigidBody` type. */
  type: RigidBodyType

  /**
   * @description Set the `RigidBody` collider shape.
   *
   * Pass `false` to disable the auto colliders.
   */
  collider?: ColliderShape | false
  /**
   * @description Set the gravity of the`RigidBody`.
   * @default 1
   */
  gravityScale?: number
  /**
   * @description add extra mass to the`RigidBody`.
   * @default 1
   */
  additionalMass?: number
  /**
   * @description Set the gravity of the`RigidBody`.
   * @default { x: 0, y: 0, z: 0 }
   */
  linvel?: TresVector3 | VectorCoordinates
  /**
   * @description Set the gravity of the`RigidBody`.
   * @default { x: 0, y: 0, z: 0 }
   */
  angvel?: TresVector3 | VectorCoordinates
  /**
   * @description Set the linear damping of the`RigidBody`.
   * @default 1
   */
  linearDamping?: number
  /**
   * @description Set the angular damping of the`RigidBody`.
   * @default 1
   */
  angularDamping?: number
  /**
   * @description Set the dominance group of the`RigidBody`.
   * @default 1
   */
  dominanceGroup?: number
  /**
   * @description Set the dominance group of the`RigidBody`.
   * @default [true,true,true]
   */
  enabledRotations?: [x: boolean, y: boolean, z: boolean]
  /**
   * @description Set the dominance group of the`RigidBody`.
   * @default [true,true,true]
   */
  enabledTranslations?: [x: boolean, y: boolean, z: boolean]
  /**
   * @description Locks the translations of the `RigidBody`.
   * @default false
   */
  lockTranslations?: boolean
  /**
   * @description Locks the rotations of the `RigidBody`.
   * @default false
   */
  lockRotations?: boolean
  /**
   * @description Enables continuous collisions detection.
   * @default false
   */
  enableCcd?: boolean

  // AUTOMATIC COLLIDERS

  /**
   * @description The friction coefficient of this collider.
   * @default 0.5
   */
  friction?: number
  /**
   * @description mass.
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

}

export interface ExposedRigidBody {
  /**  @description Context {@link RigidBodyDesc}. */
  instance: RigidBodyContext['rigidBody']
  /**  @description Context {@link RigidBody}. */
  rigidBodyDesc: RigidBodyContext['rigidBodyDesc']
  /** @description Context {@Link TresObject3D} group. */
  group: RigidBodyContext['group']
  /** @description Context {@Link RigidBodyContext}. */
  context: RigidBodyContext
}

export interface InstancedRigidBodyProps extends RigidBodyProps {
  /**  @description Set the `RigidBody` collider shape. */
  collider: ColliderShape
}

export interface RigidBodyColliderContext {
  /**  @description Context {@link ColliderDesc}. */
  colliderDesc: ColliderDesc

  /** @description Context {@link Collider}. */
  collider: Collider

  /** @description Context {@Link TresObject3D} group. */
  object: TresObject3D
}

export interface RigidBodyContext extends RigidBodyProps {
  /**  @description Context {@link RigidBodyDesc}. */
  rigidBodyDesc: RigidBodyDesc

  /**  @description Context {@link RigidBody}. */
  rigidBody: RigidBody

  /** @description Context {@Link TresObject3D} group. */
  group: TresObject3D

  /** @description Context {@Link RigidBodyColliderContext}. */
  colliders: RigidBodyColliderContext[]
}

export interface CreateRigidBodyDescProps {
  /** @description The rigid-body based object. (@link TresObject3D}. */
  object: TresObject3D
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

export interface CreateRigidBodyReturnType {
  /**
   * {@link RigidBody}
   *
   * @see https://rapier.rs/javascript3d/classes/RigidBody.html
   */
  rigidBody: RigidBody
  /**
   * {@link RigidBodyDesc}
   *
   * @see https://rapier.rs/javascript3d/classes/RigidBodyDesc.html
   */
  rigidBodyDesc: RigidBodyDesc
}
