import { Router } from "express";
import { testFollow, saveFollow, unfollow, following, followers } from "../controllers/follow.js";
import { ensureAuth } from "../middlewares/auth.js";

const router = Router();

// Definir las rutas
router.get('/test-follow', testFollow);
router.post("/follow", ensureAuth, saveFollow);
router.delete("/unfollow/:id", ensureAuth, unfollow);
router.get("/following/:id?/:page?", ensureAuth, following);
router.get("/followers/:id?/:page?", ensureAuth, followers);

//Exportar el Router
export default router;