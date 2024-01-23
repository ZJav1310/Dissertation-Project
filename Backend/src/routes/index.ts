import express from "express";
import auth from "./auth";
import projects from "./projects";
import createError from "http-errors";
import cors from "../middlewares/cors";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello World!");
});

router.use("/auth", cors, auth);
router.use("/projects", cors, projects);

router.use(async (req, res, next) => {
  next(createError.NotFound("Route not Found"));
});

router.use((err: any, req: any, res: any, next: any) => {
  res.status(err.status || 500).json({
    status: false,
    message: err.message,
  });
});

export default router;
