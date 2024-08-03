const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models");
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await db.User.findOne({
            where: { email },
            include: [{ model: db.Role }],
        });
        if (!user)
            return res.status(400).json({ message: "Invalid credentials." });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({ message: "Invalid credentials. " });

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
        res.status(200).json({
            token,
            user: { id: user.id, email: user.email, role: user.Role.name },
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { login };
