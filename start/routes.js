"use strict";

const Route = use("Route");

Route.on("/").render("welcome");
Route.post("/login", "UserController.login");

Route.group(() => {
  // USERS
  Route.post("/register", "UserController.register").validator(
    "App/Validators/User/UserStore"
  );
  Route.get("/user", "UserController.index");
  Route.get("/user/:secure_id", "UserController.show");
  Route.put("/user/:secure_id", "UserController.update").validator(
    "App/Validators/User/UserUpdate"
  );
  Route.put("/user/inactive/:secure_id", "UserController.inactive");
  Route.put("/user/active/:secure_id", "UserController.active");
  Route.put("/user/reset_password/:secure_id", "UserController.resetPassword");

  // COMPANIES
  Route.post("/company", "CompanyController.store").validator(
    "App/Validators/Company/CompanyStore"
  );
  Route.get("/company", "CompanyController.index");
  Route.get("/company/:secure_id", "CompanyController.show");
  Route.put("/company/:secure_id", "CompanyController.update").validator(
    "App/Validators/Company/CompanyUpdate"
  );
  Route.put("/company/inactive/:secure_id", "CompanyController.inactive");
  Route.put("/company/active/:secure_id", "CompanyController.active");
}).middleware("auth");
