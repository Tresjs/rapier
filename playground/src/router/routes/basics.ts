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
  {
    path: '/basics/applying-forces',
    name: 'Applying Forces',
    component: () => import('../../pages/basics/ApplyingForcesDemo.vue'),
  },
  {
    path: '/basics/gravity',
    name: 'Gravity',
    component: () => import('../../pages/basics/GravityDemo.vue'),
  },
]
