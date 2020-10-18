import Admin from '@/layout/admin-index'

const weather = [
  {
    path: '/weather-page',
    name: 'Weather-Page',
    component: Admin,
    redirect: '/weather-page/weather',
    meta: { title: 'Weather Page', icon: 'photo' },
    children: [
      {
        path: '/weather-page/weather',
        name: 'Weather',
        component: () => import('@/views/weather-model/weather-page'),
        meta: { title: 'Weather' }
      }
    ]
  }
]

export default weather
