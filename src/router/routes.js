
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'login', component: () => import('src/pages/auth/Login.vue') },
      { path: 'register', component: () => import('src/pages/auth/Register.vue') },
      { path: 'uploads', component: () => import('pages/FormImg.vue'), meta: { requireAuth: true } }
    ]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]


export default routes
