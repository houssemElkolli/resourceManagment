const jwt = require("jsonwebtoken");
const db = require("../models");

const authCheckToken = async (req, res, next) => {
    try {
        let token = req.header("Authorization");

        if (!token) {
            return res.status(401).send("unautherized!");
        }

        if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trimLeft();
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET);

        const user = await db.User.findOne({
            where: { id: verified.id },
            include: [{ model: db.Role }],
        });

        req.user = user;
        next();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = authCheckToken;
