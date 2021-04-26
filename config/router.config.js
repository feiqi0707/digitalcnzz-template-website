export default [
  {
    path: '/',
    component: '@/layouts/index',
    routes: [
      { path: '/', redirect: '/index' },
      {
        path: '/index',
        component: './Demo'
      },
    ]
  }
];
