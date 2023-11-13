<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
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
	<TresCanvas v-bind="gl" window-size>
		<TresPerspectiveCamera :position="[0, 2, 6]" :look-at="[0, 0, 0]" />

		<Suspense>
			<Physics>
				<RigidBody>
					<TresMesh>
						<TresBoxGeometry />
						<TresMeshNormalMaterial />
					</TresMesh>
				</RigidBody>
			</Physics>
		</Suspense>
	</TresCanvas>
</template>
