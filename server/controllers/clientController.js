const db = require("../models");

async function getAllEmail(req, res) {
    try {
        const clients = await db.Client.findAll({
            attributes: ["email"],
        });

        if (clients.length === 0) {
            return res.status(200).json({
                message: "no data!",
            });
        }
        res.status(200).json({
            message: "clients email found!",
            data: clients,
        });
    } catch (error) {
        res.status(500).json(error);
    }
}
async function findAll(req, res) {
    try {
        const clients = await db.Client.findAll();

        if (clients.length === 0) {
            return res.status(200).json({
                message: "no data!",
            });
        }
        res.status(200).json({
            message: "clients found!",
            data: clients,
        });
    } catch (error) {
        res.status(500).json(error);
    }
}
async function findOne(req, res) {
    try {
        const { id } = req.params;
        const client = await db.Client.findOne({ where: { id } });

        if (!client) {
            return res.status(404).json({
                message: "no data!",
            });
        }
        delete client.password;
        res.status(200).json({
            message: "client found!",
            data: client,
        });
    } catch (error) {
        res.status(500).json(error);
    }
}
async function create(req, res) {
    try {
        const { firstname, lastname, email, date_of_birth } = req.body;

        const client = await db.Client.create({
            firstname,
            lastname,
            email,
            date_of_birth,
        });
        res.status(201).json({
            message: "client created!",
            data: client,
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
        const { firstname, lastname, email, date_of_birth } = req.body;
        const { id } = req.params;

        const client = await db.Client.findOne({ where: { id } });

        if (!client) {
            return res.status(404).json({ message: "no data!" });
        }

        await client.update({
            firstname,
            lastname,
            email,
            date_of_birth,
        });

        res.status(200).json({
            message: "client updated!",
            data: client,
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

        const client = await db.Client.findOne({
            where: { id },
        });

        if (!client) {
            return res.status(404).json({
                message: "no data!",
            });
        }

        await client.destroy();

        res.status(204).json({});
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports = { findOne, findAll, create, update, remove, getAllEmail };
