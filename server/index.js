const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const dotenv = require("dotenv");

const db = require("./models");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const clientRoutes = require("./routes/client");
const messageRoutes = require("./routes/message");
const corsOptions = require("./config/corsOption");

dotenv.config();

const app = express();

app.use(cors(corsOptions));
app.use(morgan("common"));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(express.json());

app.get("/", async (req, res) => {
    const users = await db.User.findAll();
    res.status(200).json(users);
});

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/clients", clientRoutes);
app.use("/messages", messageRoutes);

db.sequelize.sync().then(() => {
    app.listen(3001, () => console.log("started on port 3001"));
});
