import { ColliderDesc } from '@dimforge/rapier3d-compat'
import { mergeVertices } from 'three/examples/jsm/utils/BufferGeometryUtils.js'
import type { TresObject } from '@tresjs/core'

import type { ColliderShape } from '../types/collider.type'
import { VECTOR_ZERO } from '../constants/object.constant'

/**
 * @description Create a {@link ColliderDesc} shape based on the passed
 * {@link TresObject} and {@link ColliderShape}
 *
 * @param object `TresObject` based on.
 *
 * @param colliderShape The shape of the `ColliderDesc`
 *
 * @internal
 */
export const createColliderDesc = (
  object: TresObject,
  colliderShape: ColliderShape,
) => {
  if (!object) {
    return
  }

  // Create a cuboid collider attached to the dynamic rigidBody.
  object.geometry.computeBoundingBox()

  const { boundingBox } = object.geometry
  const size = boundingBox!.getSize(VECTOR_ZERO)

  let colliderDesc = ColliderDesc.cuboid(size.x / 2, size.y / 2, size.z / 2)

  if (colliderShape === 'ball') {
    colliderDesc = ColliderDesc.ball(size.x / 2)
  }
  else if (colliderShape === 'capsule') {
    colliderDesc = ColliderDesc.capsule(size.x / 2, size.y / 2)
  }
  else if (colliderShape === 'cone') {
    colliderDesc = ColliderDesc.cone(size.x / 2, size.y / 2)
  }
  else if (colliderShape === 'cylinder') {
    colliderDesc = ColliderDesc.cylinder(size.x / 2, size.y / 2)
  }
  else if (colliderShape === 'trimesh') {
    const clonedGeometry = mergeVertices(object.geometry)
    const triMeshMap = clonedGeometry.attributes.position.array as Float32Array
    const triMeshUnit = clonedGeometry.index?.array as Uint32Array

    colliderDesc = ColliderDesc.trimesh(triMeshMap, triMeshUnit)
  }

  // TODO: Unable to retrieve the subdivision number & the Matrix of the given object for heightfield
  // else if (colliderShape === 'heightfield') {
  //   colliderDesc = ColliderDesc.heightfield(object.geometry)
  // }
  /* else if (colliderShape === 'trimesh') {
    colliderDesc = ColliderDesc.trimesh(object.geometry)
  }
  else if (colliderShape === 'heightfield') {
    colliderDesc = ColliderDesc.heightfield(object.geometry)
  } */
  return colliderDesc
}
