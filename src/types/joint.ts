import type { JointData, RigidBody } from '@dimforge/rapier3d-compat'
import type { Methods } from './object'

/** @description Supported [Joint](https://rapier.rs/javascript3d/classes/JointData.html#Methods) types. */
export type JointType = keyof Methods<typeof JointData>

export interface JointProps {
  /** @description Set the {@link JointType}. */
  type: JointType

  /** @description  Bodies to connect with the joint. */
  bodies?: RigidBody[]

  /** @description {@link JointData} parameters. */
  params?:
    | [
      [x: number, y: number, z: number],
      [w: number, x: number, y: number, z: number],
      [x: number, y: number, z: number],
      [w: number, x: number, y: number, z: number],
    ]
    | [
      [x: number, y: number, z: number],
      [x: number, y: number, z: number],
    ]
}
