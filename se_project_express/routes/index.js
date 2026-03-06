const router = require("express").Router();
const { login, createUser } = require("../controllers/users");
const { getItems } = require("../controllers/clothingItems"); // Importamos getItems
const auth = require("../middlewares/auth"); // Importamos el middleware que acabas de crear
const userRouter = require("./users");
const clothingItemRouter = require("./clothingItems");
const { NotFoundError } = require("../utils/errors");
const {
  validateUserBody,
  validateAuthentication,
} = require("../middlewares/validation");

// RUTAS PÚBLICAS
router.post("/signup", validateUserBody, createUser);
router.post("/signin", validateAuthentication, login);
router.get("/items", getItems);

// proteccion de rutas
router.use(auth);

//  (Solo accesibles con Token)
router.use("/users", userRouter);
router.use("/items", clothingItemRouter);

router.use((req, res, next) => {
  next(new NotFoundError("Requested resource not found"));
});

module.exports = router;
