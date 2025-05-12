<script lang="ts" setup>
// eslint-disable-next-line ts/ban-ts-comment
// @ts-ignore
import { CuboidCollider, type ExposedRigidBody, RigidBody, SphericalJoint } from '@tresjs/rapier'
import { onMounted, shallowRef, type ShallowRef } from 'vue'

const headRef: ShallowRef<ExposedRigidBody> = shallowRef(null)
const torsoRef: ShallowRef<ExposedRigidBody> = shallowRef(null)
const upperArmL: ShallowRef<ExposedRigidBody> = shallowRef(null)
const lowerArmL: ShallowRef<ExposedRigidBody> = shallowRef(null)

const upperArmR: ShallowRef<ExposedRigidBody> = shallowRef(null)
const lowerArmR: ShallowRef<ExposedRigidBody> = shallowRef(null)

const upperLegL: ShallowRef<ExposedRigidBody> = shallowRef(null)
const lowerLegL: ShallowRef<ExposedRigidBody> = shallowRef(null)

const upperLegR: ShallowRef<ExposedRigidBody> = shallowRef(null)
const lowerLegR: ShallowRef<ExposedRigidBody> = shallowRef(null)

// Adjust this to make it more flexible
const stiffness = 0.02

const torsoWidth = 0.4
const torsoHeight = 0.4

const headSize = 0.2

const armLength = 0.25
const armThickness = 0.15

const legSegmentHeight = torsoHeight * 0.8
const legthickness = 0.16

const localAnchorHead = [0, -headSize / 2 - stiffness, 0]
const localAnchorNeck = [0, torsoHeight / 2, 0]

const localAnchorLTorso = [(torsoWidth / 2) + stiffness, 0.1, 0]
const localAnchorLArm = [-armLength / 2, 0, 0]

const localAnchorLArmBottom = [(armLength / 2) + stiffness, 0 / 2, 0.0]
const localAnchorLArmLower = [-armLength / 2, 0 / 2, 0]

const localAnchorRTorso = [-(torsoWidth / 2) - stiffness, 0.1, 0]
const localAnchorRArm = [armLength / 2, 0, 0]

const localAnchorRArmBottom = [-(armLength / 2) - stiffness, 0 / 2, 0.0]
const localAnchorRArmLower = [armLength / 2, 0 / 2, 0]

const localAnchorLTorsoBottom = [-(torsoWidth / 2) + legthickness / 2, -torsoHeight / 2 - stiffness, 0]
const localAnchorLLegUpper = [0, legSegmentHeight / 2, 0]

const localAnchorLLegUpperLower = [0, -legSegmentHeight / 2 - stiffness, 0]
const localAnchorLLegLowerTop = [0, legSegmentHeight / 2, 0]

const localAnchorRTorsoBottom = [+(torsoWidth / 2) - legthickness / 2, -torsoHeight / 2 - stiffness, 0]
const localAnchorRLegUpper = [0, legSegmentHeight / 2, 0]

const localAnchorRLegUpperLower = [0, -legSegmentHeight / 2 - stiffness, 0]
const localAnchorRLegLowerTop = [0, legSegmentHeight / 2, 0]

onMounted(() => {
  document.addEventListener('click', () => {
    if (!headRef.value) { return }

    headRef.value.instance?.applyImpulse({ x: 0, y: 35, z: 0 }, true)
  })
})
</script>

<template>
  <RigidBody ref="headRef">
    <CuboidCollider :args="[headSize / 2, headSize / 2, headSize / 2]" />
  </RigidBody>

  <SphericalJoint
    :bodies="[headRef?.instance, torsoRef?.instance]"
    :params="[
      localAnchorHead,
      localAnchorNeck,
    ]"
  />
  <RigidBody ref="torsoRef">
    <CuboidCollider :args="[torsoWidth / 2, torsoHeight / 2, .1]" />
  </RigidBody>

  <SphericalJoint
    :bodies="[torsoRef?.instance, upperArmL?.instance]"
    :params="[
      localAnchorLTorso,
      localAnchorLArm,
    ]"
  />

  <RigidBody ref="upperArmL">
    <CuboidCollider :args="[armLength / 2, armThickness / 2, armThickness / 2]" />
  </RigidBody>

  <SphericalJoint
    :bodies="[upperArmL?.instance, lowerArmL?.instance]"
    :params="[
      localAnchorLArmBottom,
      localAnchorLArmLower,
    ]"
  />

  <RigidBody ref="lowerArmL">
    <CuboidCollider :args="[armLength / 2, armThickness / 2, armThickness / 2]" />
  </RigidBody>

  <SphericalJoint
    :bodies="[torsoRef?.instance, upperArmR?.instance]"
    :params="[
      localAnchorRTorso,
      localAnchorRArm,
    ]"
  />

  <RigidBody ref="upperArmR">
    <CuboidCollider :args="[armLength / 2, armThickness / 2, armThickness / 2]" />
  </RigidBody>

  <SphericalJoint
    :bodies="[upperArmR?.instance, lowerArmR?.instance]"
    :params="[
      localAnchorRArmBottom,
      localAnchorRArmLower,
    ]"
  />

  <RigidBody ref="lowerArmR">
    <CuboidCollider :args="[armLength / 2, armThickness / 2, armThickness / 2]" />
  </RigidBody>

  <SphericalJoint
    :bodies="[torsoRef?.instance, upperLegL?.instance]"
    :params="[
      localAnchorLTorsoBottom,
      localAnchorLLegUpper,
    ]"
  />

  <RigidBody ref="upperLegL">
    <CuboidCollider :args="[legthickness / 2, legSegmentHeight / 2, legthickness / 2]" />
  </RigidBody>

  <SphericalJoint
    :bodies="[upperLegL?.instance, lowerLegL?.instance]"
    :params="[
      localAnchorLLegUpperLower,
      localAnchorLLegLowerTop,
    ]"
  />

  <RigidBody ref="lowerLegL">
    <CuboidCollider :args="[legthickness / 2, legSegmentHeight / 2, legthickness / 2]" />
  </RigidBody>

  <SphericalJoint
    :bodies="[torsoRef?.instance, upperLegR?.instance]"
    :params="[
      localAnchorRTorsoBottom,
      localAnchorRLegUpper,
    ]"
  />

  <RigidBody ref="upperLegR">
    <CuboidCollider :args="[legthickness / 2, legSegmentHeight / 2, legthickness / 2]" />
  </RigidBody>

  <SphericalJoint
    :bodies="[upperLegR?.instance, lowerLegR?.instance]"
    :params="[
      localAnchorRLegUpperLower,
      localAnchorRLegLowerTop,
    ]"
  />

  <RigidBody ref="lowerLegR">
    <CuboidCollider :args="[legthickness / 2, legSegmentHeight / 2, legthickness / 2]" />
  </RigidBody>
</template>
