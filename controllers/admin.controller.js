const Admin = require("../models/admin");
const { ValidationError } = require("sequelize");

const addAdmin = async (ctx) => {
    try {
        const { name, phone_number, is_active } = ctx.request.body;
        const newAdmin = await Admin.create({
            name,
            phone_number,
            is_active,
        });
        ctx.status = 201;
        ctx.body = newAdmin;
    } catch (error) {
        if (error instanceof ValidationError) {
            ctx.status = 400;
            ctx.body = "Validation Error: " + error.message;
        } else {
            ctx.status = 500;
            ctx.body = "Internal Server Error";
        }
    }
};

const getAllAdmins = async (ctx) => {
    try {
        const admins = await Admin.findAll();
        if (admins.length === 0) {
            ctx.status = 400;
            ctx.body = "Admins not found";
        } else {
            ctx.status = 200;
            ctx.body = admins;
        }
    } catch (error) {
        ctx.status = 500;
        ctx.body = "Internal Server Error";
    }
};

const getAdminById = async (ctx) => {
    try {
        const id = ctx.params.id;
        const admin = await Admin.findByPk(id);
        if (!admin) {
            ctx.status = 404;
            ctx.body = "Admin not found";
        } else {
            ctx.status = 200;
            ctx.body = admin;
        }
    } catch (error) {
        ctx.status = 500;
        ctx.body = "Internal Server Error";
    }
};

const deleteAdmin = async (ctx) => {
    try {
        const id = ctx.params.id;
        const deletedAdmin = await Admin.destroy({
            where: {
                id: id,
            },
        });
        if (deletedAdmin === 0) {
            ctx.status = 404;
            ctx.body = "Admin not found";
        } else {
            ctx.status = 200;
            ctx.body = "Admin deleted successfully";
        }
    } catch (error) {
        ctx.status = 500;
        ctx.body = "Internal Server Error";
    }
};

const updateAdmin = async (ctx) => {
    try {
        const id = ctx.params.id;
        const { name, phone_number, is_active } = ctx.request.body;
        const [admin] = await Admin.update(
            { name, phone_number, is_active },
            {
                where: {
                    id: id,
                },
            }
        );
        if (admin === 0) {
            ctx.status = 404;
            ctx.body = "Admin not found";
        } else {
            const updatedAdmin = await Admin.findByPk(id);
            ctx.status = 200;
            ctx.body = updatedAdmin;
        }
    } catch (error) {
        ctx.status = 500;
        ctx.body = "Internal Server Error";
    }
};

module.exports = {
    getAllAdmins,
    getAdminById,
    addAdmin,
    deleteAdmin,
    updateAdmin,
};
