
export const pollaRoutes =  {
  hippodromes: {
    url: 'apiPolla/hippodromes',
    method: 'GET'
  },
  races: {
    url: 'apiPolla/hippodromes/:id/races',
    method: 'GET'
  },
  pot: {
    url: 'apiPolla/hippodromes/:id/pot',
    method: 'GET'
  },
  hippodromeHistory: {
    url: 'apiPolla/hippodromes/:id/tickets-history',
    method: 'GET'
  },
  bet: {
    url: 'apiPolla/bet',
    method: 'POST'
  }
};

