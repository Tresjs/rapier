import type { Collider, RigidBody } from '@dimforge/rapier3d-compat'
import type { Object3D } from 'three'

export interface CollisionSource {
  collider: Collider
  rigidBody: RigidBody | undefined
};

export interface sourceTarget {
  group: Object3D
  rapierGroup: CollisionSource
}

export type collisionType = 'enter' | 'exit'
