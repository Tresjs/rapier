import type { Collider, RigidBody } from '@dimforge/rapier3d-compat'
import type { TresVNodeObject } from './object'

export interface CollisionSource {
  collider: Collider
  rigidBody: RigidBody | undefined
};

export interface sourceTarget {
  object: TresVNodeObject
  context: CollisionSource
}

export type collisionType = 'enter' | 'exit'
