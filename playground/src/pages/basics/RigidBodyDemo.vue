<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'
import { Physics, RigidBody } from '@tresjs/rapier'
import { SRGBColorSpace, ACESFilmicToneMapping } from 'three'

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  outputColorSpace: SRGBColorSpace,
  toneMapping: ACESFilmicToneMapping,
}
</script>

<template>
  <TresCanvas
    v-bind="gl"
    window-size
  >
    <TresPerspectiveCamera
      :position="[6, 6, 6]"
      :look-at="[0, 0, 0]"
    />
    <OrbitControls />
    <Suspense>
      <Physics>
        <RigidBody>
          <TresMesh :position="[0, 4, 0]">
            <TresBoxGeometry />
            <TresMeshNormalMaterial />
          </TresMesh>
        </RigidBody>
        <RigidBody collider="ball">
          <TresMesh :position="[1, 8, 0]">
            <TresSphereGeometry />
            <TresMeshNormalMaterial />
          </TresMesh>
        </RigidBody>
        <RigidBody type="fixed">
          <TresMesh>
            <TresPlaneGeometry
              :args="[8, 8, 8]"
              :rotate-x="-Math.PI / 2"
            />
            <TresMeshNormalMaterial />
          </TresMesh>
        </RigidBody>
      </Physics>
    </Suspense>
  </TresCanvas>
</template>
