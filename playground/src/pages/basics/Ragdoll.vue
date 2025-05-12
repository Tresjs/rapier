<script lang="ts" setup>
import { OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
// eslint-disable-next-line ts/ban-ts-comment
// @ts-ignore
import { Physics, RigidBody } from '@tresjs/rapier'
import { ACESFilmicToneMapping, SRGBColorSpace } from 'three'

import Ragdoll from './../../components/Ragdoll.vue'

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  outputColorSpace: SRGBColorSpace,
  toneMapping: ACESFilmicToneMapping,
}
</script>

<template>
  <TresCanvas v-bind="gl" window-size>
    <TresPerspectiveCamera :position="[-4, 1, -4]" :look-at="[0, 0, 0]" />
    <OrbitControls />

    <Suspense>
      <Physics debug>
        <Ragdoll />

        <RigidBody type="fixed" :position="[0, -1, 0]">
          <TresMesh>
            <TresPlaneGeometry :args="[20, 20, 20]" :rotate-x="-Math.PI / 2" />
            <TresMeshBasicMaterial color="#f4f4f4" />
          </TresMesh>
        </RigidBody>
      </Physics>
    </Suspense>
  </TresCanvas>
</template>
