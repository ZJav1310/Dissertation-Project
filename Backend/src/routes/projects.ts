const router = require("express").Router();

import auth from "../middlewares/auth";
import project from "../controllers/project.controller";
import userAccess from "../middlewares/access";
import application from "../controllers/application.controller";

// add project
router.post("/", auth, project.add);

// all get all
router.get("/", auth, project.all);

// get by id
router.get("/:id", auth, userAccess, project.getById);

// Update project
router.put("/:id", auth, userAccess, project.update);

// Apply to project
router.post("/:id/apply", auth, userAccess, application.apply);

// Delete project
router.post("/:id", auth, userAccess, project.delete);

// upload file
router.post("/:id/file", auth, userAccess, project.uploadFile);

export default router;
