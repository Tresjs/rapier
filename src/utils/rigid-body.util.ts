import { RigidBodyDesc } from '@dimforge/rapier3d-compat'
import type { TresObject } from '@tresjs/core'

import type { RigidBodyType } from '../types/rigid-body.type'

/**
 * @description Create a {@link RigidBodyDesc} based on the passed
 * {@link TresObject} and the {@link RigidBodyType}
 *
 * @param object `TresObject` based on.
 *
 * @param rigidBodyType The type of the `RigidBodyDesc`
 *
 * @internal
 */
export const createRigidBodyDesc = (object: TresObject, rigidBodyType: RigidBodyType) => {
  if (!object) { return }

  const safeRigidBodyDescType: keyof typeof RigidBodyDesc = rigidBodyType === 'kinematic'
    ? 'kinematicPositionBased'
    : rigidBodyType === 'kinematicVelocity'
      ? 'kinematicVelocityBased'
      : rigidBodyType
  const rigidBodyDesc = RigidBodyDesc[safeRigidBodyDescType]()
    .setTranslation(object.position.x, object.position.y, object.position.z)
    .setRotation(object.quaternion)

  if (rigidBodyType === 'dynamic') {
    rigidBodyDesc.setAdditionalMass(1)
  }

  rigidBodyDesc.userData = {
    uuid: object.uuid,
    name: object.name,
    type: object.type,
  }

  return rigidBodyDesc
}
