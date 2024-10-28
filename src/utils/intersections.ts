import type { collisionType, sourceTarget } from '../types'

export const emitIntersection = (
  source: sourceTarget,
  target: sourceTarget,
  started: boolean,
) => {
  const collisionType: collisionType = started ? 'enter' : 'exit'
  const colliderNode = source.object?.__vnode?.children?.[1]?.children?.find(child => child?.component?.exposed?.instance?.value === source.context.collider)

  colliderNode?.component?.emit?.(`intersection-${collisionType}`, { source, target })
}
