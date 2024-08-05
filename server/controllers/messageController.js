const db = require("../models");

const nodemailer = require("nodemailer");

async function findAll(req, res) {
    try {
        const messages = await db.Message.findAll();

        if (messages.length === 0) {
            return res.status(200).json({
                message: "no data!",
            });
        }
        res.status(200).json({
            message: "messages found!",
            data: messages,
        });
    } catch (error) {
        console.log(error);

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
        const { object, description, importance_status } = req.body;

        const message = await db.Message.create({
            object,
            description,
            importance_status,
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
        const { object, description, importance_status } = req.body;
        const { id } = req.params;

        const message = await db.Message.findOne({ where: { id } });

        if (!message) {
            return res.status(404).json({ message: "no data!" });
        }

        await message.update({
            object,
            description,
            importance_status,
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
async function send(req, res) {
    try {
        const { listOfClients } = req.body;
        const { id } = req.params;

        const message = await db.Message.findOne({ where: { id } });

        if (!message) {
            return res.status(404).json({
                message: "no data!",
            });
        }
        var transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.USER,
                pass: process.env.PASS,
            },
        });

        var mailOptions = {
            from: process.env.FROM, // sender address
            to: listOfClients, // list of receivers
            subject: `${message.object}`, // Subject line
            html: `
            <div style="padding:10px;border-style: ridge">
            <p>You have a new Message.</p>
            <h3>Message Details</h3>
            <ul>
                <li>Importance status: ${message.importance_status} </li>
                <li>Message: ${message.description} </li>
            </ul>
            `,
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);

                console.log("Email Sent Unsuccessfully ");
                res.status(200).json({ message: "Email Sent Unsuccessfully" });
            } else {
                console.log("Email Sent Successfully");

                res.status(200).json({ message: "Email Sent Successfully" });
            }
        });
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports = { findOne, findAll, create, update, remove, send };
