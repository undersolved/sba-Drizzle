import express from "express";
import userRouter from "./routes/user.routes.js";

const app = express();
const PORT = process.env.PORT ?? 8000;

app.use(express.json());

app.get("/", (req, res) => {
	return res.json({ status: "Server is UP" });
});

app.use("/user", userRouter);

app.listen(PORT, () => console.log(`App is listening on PORT ${PORT}`));
