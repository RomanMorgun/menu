export const api = 'https://menu-app.grassbusinesslabs.ml/api/';

export const COMMON_URL = {
  auth: {
    sentToken: `${api}auth/token-login`
  },
  // get one should add cafe id to link
  cafe: {
    getAll: `${api}cafes`,
    getOne: `${api}cafes`
  },
  // get one should add cafe id to link
  menu: {
    getAll: `${api}menus`,
    getOne: `${api}menus/`
  }

};
