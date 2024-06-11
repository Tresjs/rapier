import type { World } from '@dimforge/rapier3d-compat'
import type Rapier from '@dimforge/rapier3d-compat'
import { inject, provide } from 'vue'

const GRAVITY = { x: 0, y: -9.81, z: 0 }
export interface RapierContext {
  /**
   * @description Rapier instance.
   *
   * @docs https://rapier.rs/docs/api/javascript/JavaScript3D/
   */
  rapier: typeof Rapier
  /**
   * @description Rapier physics world
   */
  world: World
  /**
   * @description If the physics simulation is paused.
   */
  isPaused: boolean
  /**
   * @description If the debugging mode enabled.
   */
  isDebug: boolean
  /**
   * @description Set the physics world.
   *
   * @param world New physics world.
   */
  setWorld: (world: World) => void
  /**
   * @description Step the physics world.
   *
   * @param timestep The timestep length, in seconds.
   *
   * @example
   * ```ts
   * step(1/60)
   * ```
   */
  step: (timestep?: number) => void
}

/**
 * @description to retrieve the `RapierContext` provider.
 */
export async function useRapierContextProvider() {
  const toProvide: Partial<RapierContext> = {
    rapier: undefined,
    world: undefined,
    isPaused: false,
    isDebug: false,
    setWorld: (world) => {
      toProvide.world = world
    },
    step: (timestep) => {
      if (!toProvide.world) { return }
      if (typeof timestep === 'number') { toProvide.world.timestep = timestep }

      toProvide.world.step()
    },
  }

  provide('useRapier', toProvide)

  toProvide.rapier = await import('@dimforge/rapier3d-compat')
  await toProvide.rapier.init()

  /* Initialize the world with gravity and timestep. */
  toProvide.world = new toProvide.rapier.World(GRAVITY)

  return toProvide as RapierContext
}

/**
 * @description To retrieve the `RapierContext`
 *
 * @internal
 */
export function useRapierContext(): RapierContext {
  const context = inject<Partial<RapierContext>>('useRapier')

  if (!context?.world) {
    throw new Error(
      'useRapierContext must be used together with useRapierContextProvider',
    )
  }

  return context as RapierContext
}

/**
 * @description Retrieve the `RapierContext`
 */
export const useRapier = useRapierContext
