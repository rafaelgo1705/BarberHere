"use strict";

const User = use("App/Models/User");
const Role = use("Role");
const Permission = use("Permission");

class UserSeeder {
  async run() {
    const user = await User.create({
      name: "Administrador",
      username: "admin",
      email: "rr147440@gmail.com",
      password: "admin",
    });

    const roleAdmin = new Role();
    roleAdmin.name = "Administrator";
    roleAdmin.slug = "admin";
    roleAdmin.description = "Manage Administration Privileges";
    await roleAdmin.save();

    await user.roles().attach([roleAdmin.id]);

    // Users
    const createUsersPermission = new Permission();
    createUsersPermission.slug = "create_users";
    createUsersPermission.name = "Create Users";
    createUsersPermission.description = "Create users permission";
    await createUsersPermission.save();

    const updateUsersPermission = new Permission();
    updateUsersPermission.slug = "update_users";
    updateUsersPermission.name = "Update Users";
    updateUsersPermission.description = "Update users permission";
    await updateUsersPermission.save();

    const deleteUsersPermission = new Permission();
    deleteUsersPermission.slug = "delete_users";
    deleteUsersPermission.name = "Delete Users";
    deleteUsersPermission.description = "Delete users permission";
    await deleteUsersPermission.save();

    const readUsersPermission = new Permission();
    readUsersPermission.slug = "read_users";
    readUsersPermission.name = "Read Users";
    readUsersPermission.description = "Read users permission";
    await readUsersPermission.save();

    // Roles
    const createRolesPermission = new Permission();
    createRolesPermission.slug = "create_roles";
    createRolesPermission.name = "Create Roles";
    createRolesPermission.description = "Create Roles permission";
    await createRolesPermission.save();

    const readRolesPermission = new Permission();
    readRolesPermission.slug = "read_roles";
    readRolesPermission.name = "Read Roles";
    readRolesPermission.description = "Read Roles permission";
    await readRolesPermission.save();

    const updateRolesPermission = new Permission();
    updateRolesPermission.slug = "update_roles";
    updateRolesPermission.name = "Update Roles";
    updateRolesPermission.description = "Update Roles permission";
    await updateRolesPermission.save();

    const deleteRolesPermission = new Permission();
    deleteRolesPermission.slug = "delete_roles";
    deleteRolesPermission.name = "Delete Roles";
    deleteRolesPermission.description = "Delete Roles permission";
    await deleteRolesPermission.save();

    // Companies
    const createCompaniesPermission = new Permission();
    createCompaniesPermission.slug = "create_companies";
    createCompaniesPermission.name = "Create Companies";
    createCompaniesPermission.description = "Create Companies permission";
    await createCompaniesPermission.save();

    const updateCompaniesPermission = new Permission();
    updateCompaniesPermission.slug = "update_companies";
    updateCompaniesPermission.name = "Update Companies";
    updateCompaniesPermission.description = "Update Companies permission";
    await updateCompaniesPermission.save();

    const readCompaniesPermission = new Permission();
    readCompaniesPermission.slug = "read_companies";
    readCompaniesPermission.name = "Read Companies";
    readCompaniesPermission.description = "Read Companies permission";
    await readCompaniesPermission.save();

    const deleteCompaniesPermission = new Permission();
    deleteCompaniesPermission.slug = "delete_companies";
    deleteCompaniesPermission.name = "Delete Companies";
    deleteCompaniesPermission.description = "Delete Companies permission";
    await deleteCompaniesPermission.save();

    await roleAdmin.permissions().attach([
      // Users
      createUsersPermission.id,
      updateUsersPermission.id,
      deleteUsersPermission.id,
      readUsersPermission.id,
      // Roles
      createRolesPermission.id,
      updateRolesPermission.id,
      readRolesPermission.id,
      deleteRolesPermission.id,
      // Companies
      createCompaniesPermission.id,
      updateCompaniesPermission.id,
      readCompaniesPermission.id,
      deleteCompaniesPermission.id,
    ]);
  }
}

module.exports = UserSeeder;
