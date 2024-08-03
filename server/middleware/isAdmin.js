const db = require("../models");

const isAdmin = async (req, res, next) => {
    try {
        if (req.user.Role.name !== "admin") {
            return res.status(401).send("unautherized!");
        }
        next();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = isAdmin;
