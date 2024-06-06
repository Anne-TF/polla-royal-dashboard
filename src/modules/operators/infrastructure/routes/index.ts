
const operatorsRoutes =  {
  list: {
    url: 'admin/bancas',
    method: 'GET'
  },
  create: {
    url: 'admin/bancas',
    method: 'POST'
  },
  delete: {
    url: 'admin/bancas/:id',
    method: 'DELETE'
  },
  update: {
    url: 'admin/bancas/:id',
    method: 'PUT'
  },
  get: {
    url: 'admin/bancas/:id',
    method: 'GET'
  }
};

export default operatorsRoutes;
