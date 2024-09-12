export const basicsRoutes = [
  {
    path: '/basics/rigid-body',
    name: 'Rigid Body',
    component: () => import('../../pages/basics/RigidBody.vue'),
  },
  {
    path: '/basics/colliders',
    name: 'Colliders',
    component: () => import('../../pages/basics/Colliders.vue'),
  },
  {
    path: '/basics/instanced-rigid-body',
    name: 'Instanced Rigid Body',
    component: () => import('../../pages/basics/InstancedRigidBody.vue'),
  },
]
