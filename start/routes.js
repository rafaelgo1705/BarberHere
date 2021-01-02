'use strict';

const Route = use('Route');

Route.on('/').render('welcome');
Route.post('/login', 'UserController.login');

Route.group(() => {
  // USERS
  Route.post('/register', 'UserController.register').validator(
    'App/Validators/User/UserStore'
  );
  Route.get('/user', 'UserController.index');
  Route.get('/user/:secure_id', 'UserController.show');
  Route.get('/user/show/auth', 'UserController.showUserAuth');
  Route.put('/user/:secure_id', 'UserController.update').validator(
    'App/Validators/User/UserUpdate'
  );
  Route.put('/user/update/auth', 'UserController.updateUserAuth').validator(
    'App/Validators/User/UserUpdate'
  );
  Route.put('/user/inactive/:secure_id', 'UserController.inactive');
  Route.put('/user/active/:secure_id', 'UserController.active');
  Route.put('/user/reset_password/:secure_id', 'UserController.resetPassword');
  Route.put(
    '/user/reset_password/user/auth',
    'UserController.resetPasswordUserAuth'
  );

  // ROLES
  Route.get('/role', 'RoleController.index');
  Route.get('/role/:id', 'RoleController.show');
  Route.post('/role', 'RoleController.store').validator(
    'App/Validators/Role/RoleStore'
  );
  Route.put('/role/:id', 'RoleController.update').validator(
    'App/Validators/Role/RoleUpdate'
  );
  Route.delete('/role/:id', 'RoleController.destroy');

  // COMPANIES
  Route.post('/company', 'CompanyController.store').validator(
    'App/Validators/Company/CompanyStore'
  );
  Route.get('/company', 'CompanyController.index');
  Route.get('/company/:secure_id', 'CompanyController.show');
  Route.put('/company/:secure_id', 'CompanyController.update').validator(
    'App/Validators/Company/CompanyUpdate'
  );
  Route.put('/company/inactive/:secure_id', 'CompanyController.inactive');
  Route.put('/company/active/:secure_id', 'CompanyController.active');

  // COMPANIES TIME
  Route.post('/company_time', 'CompanyController.storeTime');
  Route.put('/company_time/:id', 'CompanyController.updateTime');
  Route.get('/company_time', 'CompanyController.showTime');
  Route.delete('/company_time/:id', 'CompanyController.deleteTime');

  // SERVICES/PRODUCTS
  Route.post('/serv_prod', 'ServProdController.store').validator(
    'App/Validators/ServProd/ServProdStore'
  );
  Route.get('/serv_prod', 'ServProdController.index');
  Route.get('/serv_prod/:secure_id', 'ServProdController.show');
  Route.put('/serv_prod/:secure_id', 'ServProdController.update').validator(
    'App/Validators/ServProd/ServProdUpdate'
  );
  Route.put('/serv_prod/inactive/:secure_id', 'ServProdController.inactive');
  Route.put('/serv_prod/active/:secure_id', 'ServProdController.active');
}).middleware('auth');
