import type { ColliderShape } from './collider.type'

export type RigidBodyType =
  | 'dynamic'
  | 'kinematic'
  | 'kinematicVelocity'
  | 'fixed'

export interface RigidBodyProps {
  type: RigidBodyType
  collider: ColliderShape
}
