
const userRoutes =  {
  list: {
    url: 'admin/usuarios',
    method: 'GET'
  },
  create: {
    url: 'admin/usuarios',
    method: 'POST'
  },
  delete: {
    url: 'admin/usuarios/:id',
    method: 'DELETE'
  },
  update: {
    url: 'admin/usuarios/:id',
    method: 'PUT'
  },
  get: {
    url: 'admin/usuarios/:id',
    method: 'GET'
  }
};

export default userRoutes;
