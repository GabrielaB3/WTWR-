const router = require("express").Router();
const { getCurrentUser, updateUser } = require("../controllers/users");

// Eliminamos router.post("/", createUser) tal como dicen las instrucciones
router.get("/me", getCurrentUser);
router.patch("/me", updateUser);

module.exports = router;
