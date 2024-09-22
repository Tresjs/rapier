<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'
import { type ExposedRigidBody, Physics, RigidBody } from '@tresjs/rapier'
import { ACESFilmicToneMapping, SRGBColorSpace } from 'three'
import { shallowRef } from 'vue'
import '@tresjs/leches/styles'

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  outputColorSpace: SRGBColorSpace,
  toneMapping: ACESFilmicToneMapping,
}

const rigidTorusRef = shallowRef<ExposedRigidBody>(null)

const jump = () => {
  if (!rigidTorusRef.value) { return }
  rigidTorusRef.value.instance.applyImpulse({ x: 0, y: 35, z: 0 }, true)
}

const { gravityScale, linearDamping } = useControls({
  gravityScale: { value: 2.5, min: -10, max: 10, step: 1 },
  linearDamping: { value: 0, min: 0, max: 10, step: 1 },
  enabledTranslationsY: true,
})

// TODO test locks and enabledTranslations, check docs
</script>

<template>
  <TresLeches />
  <TresCanvas v-bind="gl" window-size>
    <TresPerspectiveCamera :position="[11, 11, 11]" :look-at="[0, 0, 0]" />
    <OrbitControls />

    <Suspense>
      <Physics debug>
        <RigidBody
          ref="rigidTorusRef"
          :gravityScale="gravityScale.value"
          :linearDamping="linearDamping.value"
          lockTranslations
        >
          <TresMesh :position="[0, 8, 0]" @click="jump">
            <TresTorusGeometry />
            <TresMeshNormalMaterial />
          </TresMesh>
        </RigidBody>

        <RigidBody>
          <TresMesh :position="[2, 8, 0]">
            <TresTorusGeometry />
            <TresMeshNormalMaterial />
          </TresMesh>
        </RigidBody>

        <RigidBody type="fixed">
          <TresMesh :position="[0, 0, 0]">
            <TresPlaneGeometry :args="[20, 20, 20]" :rotate-x="-Math.PI / 2" />
            <TresMeshBasicMaterial color="#f4f4f4" />
          </TresMesh>
        </RigidBody>
      </Physics>
    </Suspense>
  </TresCanvas>
</template>
