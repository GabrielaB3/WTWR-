const router = require("express").Router();
const { login, createUser } = require("../controllers/users");
const { getItems } = require("../controllers/clothingItems"); // Importamos getItems
const auth = require("../middlewares/auth"); // Importamos el middleware que acabas de crear
const userRouter = require("./users");
const clothingItemRouter = require("./clothingItems");
const { NOT_FOUND } = require("../utils/errors");

// RUTAS PÚBLICAS
router.post("/signup", createUser);
router.post("/signin", login);
router.get("/items", getItems);

// proteccion de rutas
router.use(auth);

//  (Solo accesibles con Token)
router.use("/users", userRouter);
router.use("/items", clothingItemRouter);

router.use((req, res) => {
  res.status(NOT_FOUND).send({ message: "Requested resource not found" });
});

module.exports = router;
