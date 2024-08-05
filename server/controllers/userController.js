const db = require("../models");
const bcrypt = require("bcrypt");

async function findAll(req, res) {
    try {
        const users = await db.User.findAll({
            attributes: { exclude: ["password"] },
        });

        if (users.length === 0) {
            return res.status(200).json({
                message: "no data!",
            });
        }
        res.status(200).json({
            message: "users found!",
            data: users,
        });
    } catch (error) {
        res.status(500).json(error);
    }
}
async function findOne(req, res) {
    try {
        const { id } = req.params;
        const user = await db.User.findOne({
            where: { id },
            attributes: { exclude: ["password"] },
        });

        if (!user) {
            return res.status(404).json({
                message: "no data!",
            });
        }
        delete user.password;
        res.status(200).json({
            message: "user found!",
            data: user,
        });
    } catch (error) {
        res.status(500).json(error);
    }
}
async function create(req, res) {
    try {
        const { firstname, lastname, email, password, roleId } = req.body;

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const user = await db.User.create({
            firstname,
            lastname,
            email,
            password: passwordHash,
            roleId,
        });
        res.status(201).json({
            message: "user created!",
            data: user,
        });
    } catch (error) {
        if (error.name === "SequelizeValidationError") {
            return res.status(400).json(error.message);
        }
        res.status(500).json(error);
    }
}
async function update(req, res) {
    try {
        const { firstname, lastname, email, password } = req.body;
        const { id } = req.params;

        const user = await db.User.findOne({ where: { id } });

        if (!user) {
            return res.status(404).json({ message: "no data!" });
        }

        if (password) {
            const salt = await bcrypt.genSalt();
            const passwordHash = await bcrypt.hash(password, salt);
            await user.update({
                firstname,
                lastname,
                email,
                password: passwordHash,
            });
        } else {
            await user.update({
                firstname,
                lastname,
                email,
            });
        }
        res.status(200).json({
            message: "user updated!",
            data: user,
        });
    } catch (error) {
        if (error.name === "SequelizeValidationError") {
            return res.status(400).json(error.message);
        }
        res.status(500).json(error);
    }
}
async function remove(req, res) {
    try {
        const { id } = req.params;

        const user = await db.User.findOne({
            where: { id },
        });

        if (!user) {
            return res.status(404).json({
                message: "no data!",
            });
        }

        await user.destroy();

        res.status(204).json({});
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports = { findOne, findAll, create, update, remove };
