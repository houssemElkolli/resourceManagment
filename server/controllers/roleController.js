const db = require("../models");

async function findAll(req, res) {
    try {
        const roles = await db.Role.findAll();

        if (roles.length === 0) {
            return res.status(200).json({
                message: "no data!",
            });
        }
        res.status(200).json({
            message: "roles found!",
            data: roles,
        });
    } catch (error) {
        console.log(error);

        res.status(500).json(error);
    }
}
module.exports = { findAll };
