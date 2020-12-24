"use strict";

const UserController = require("../app/Controllers/Http/UserController");

const Route = use("Route");

Route.on("/").render("welcome");

Route.post("/login", "UserController.login");
Route.post("/register", "UserController.register").validator(
  "App/Validators/User/UserStore"
);

Route.group(() => {
  Route.get("/user", "UserController.index");
  Route.get("/user/:secure_id", "UserController.show");
  Route.put("/user/:secure_id", "UserController.update");
  Route.put("/user/inactive/:secure_id", "UserController.inactive");
  Route.put("/user/active/:secure_id", "UserController.active");
}).middleware("auth");
