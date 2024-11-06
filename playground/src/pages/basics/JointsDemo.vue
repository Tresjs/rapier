<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
// eslint-disable-next-line ts/ban-ts-comment
// @ts-ignore
import { type ExposedRigidBody, Joint, Physics, RigidBody } from '@tresjs/rapier'
import { ACESFilmicToneMapping, SRGBColorSpace } from 'three'
import { shallowRef } from 'vue'

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  outputColorSpace: SRGBColorSpace,
  toneMapping: ACESFilmicToneMapping,
}

const body1 = shallowRef<ExposedRigidBody>(null)
const body2 = shallowRef<ExposedRigidBody>(null)
</script>

<template>
  <TresCanvas v-bind="gl" window-size>
    <TresPerspectiveCamera :position="[11, 11, 11]" :look-at="[0, 0, 0]" />
    <OrbitControls />

    <Suspense>
      <Physics debug>
        <RigidBody ref="body1" type="kinematic" collider="ball">
          <TresMesh :position="[0, 8, 0]">
            <TresSphereGeometry />
            <TresMeshNormalMaterial />
          </TresMesh>
        </RigidBody>

        <RigidBody ref="body2" collider="ball">
          <TresMesh :position="[0, 8, 2]">
            <TresSphereGeometry />
            <TresMeshNormalMaterial />
          </TresMesh>
        </RigidBody>

        <RigidBody type="fixed">
          <TresMesh :position="[0, 0, 0]">
            <TresPlaneGeometry :args="[20, 20, 20]" :rotate-x="-Math.PI / 2" />
            <TresMeshBasicMaterial color="#f4f4f4" />
          </TresMesh>
        </RigidBody>

        <Joint
          type="spherical"
          :bodies="[body1?.instance, body2?.instance]"
          :params="[
            [0, 8, 0],
            [0, 12, 2],
          ]"
        />
      </Physics>
    </Suspense>
  </TresCanvas>
</template>
