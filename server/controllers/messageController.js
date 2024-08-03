const db = require("../models");

async function findAll(req, res) {
    try {
        const messages = await db.Message.findAll();

        if (messages.length === 0) {
            return res.status(404).json({
                message: "no data!",
            });
        }
        res.status(200).json({
            message: "messages found!",
            data: messages,
        });
    } catch (error) {
        res.status(500).json(error);
    }
}
async function findOne(req, res) {
    try {
        const { id } = req.params;
        const message = await db.Message.findOne({ where: { id } });

        if (!message) {
            return res.status(404).json({
                message: "no data!",
            });
        }
        delete message.password;
        res.status(200).json({
            message: "message found!",
            data: message,
        });
    } catch (error) {
        res.status(500).json(error);
    }
}
async function create(req, res) {
    try {
        const { firstname, lastname, email, date_of_birth, roleId } = req.body;

        const message = await db.Message.create({
            firstname,
            lastname,
            email,
            date_of_birth,
            roleId,
        });
        res.status(201).json({
            message: "message created!",
            data: message,
        });
    } catch (error) {
        res.status(500).json(error);
    }
}
async function update(req, res) {
    try {
        const { firstname, lastname, email, date_of_birth } = req.body;
        const { id } = req.params;

        const message = await db.Message.findOne({ where: { id } });

        if (!message) {
            return res.status(404).json({ message: "no data!" });
        }

        await message.update({
            firstname,
            lastname,
            email,
            date_of_birth,
        });

        res.status(200).json({
            message: "message updated!",
            data: message,
        });
    } catch (error) {
        res.status(500).json(error);
    }
}
async function remove(req, res) {
    try {
        const { id } = req.params;

        const message = await db.Message.findOne({
            where: { id },
        });

        if (!message) {
            return res.status(404).json({
                message: "no data!",
            });
        }

        await message.destroy();

        res.status(204).json({});
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports = { findOne, findAll, create, update, remove };
