const router = require("express").Router();
const { getCurrentUser, updateUser } = require("../controllers/users");
const { validateUserProfileUpdate } = require("../middlewares/validation");

// Eliminamos router.post("/", createUser) tal como dicen las instrucciones
router.get("/me", getCurrentUser);
router.patch("/me", validateUserProfileUpdate, updateUser);

module.exports = router;
