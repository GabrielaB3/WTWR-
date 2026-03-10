const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { JWT_SECRET } = require("../utils/config");
const User = require("../models/user");
const {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
  ConflictError,
  InternalServerError,
} = require("../utils/errors");

const login = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new BadRequestError("Email and password are required"));
  }

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch((err) => {
      if (err.message === "Incorrect email or password") {
        return next(new UnauthorizedError("Incorrect email or password"));
      }

      return next(err);
    });
};

// POST /signup (Crear usuario con hash)
const createUser = (req, res, next) => {
  const { name, avatar, email, password } = req.body;

  // Hasheamos la contraseña antes de guardarla
  bcrypt
    .hash(password, 10)
    .then((hashedPassword) =>
      User.create({ name, avatar, email, password: hashedPassword })
    )
    .then((user) => {
      // Al responder, eliminamos el password del objeto (por seguridad extra)
      const userResponse = user.toObject();
      delete userResponse.password;
      res.status(201).send(userResponse);
    })
    .catch((err) => {
      // Si el error es 11000, significa que el email ya existe
      if (err.code === 11000) {
        return next(new ConflictError("Email already exists"));
      }
      if (err.name === "ValidationError") {
        return next(new BadRequestError("Invalid data"));
      }
      return next(err);
    });
};

// GET/users
const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch(next);
};

const getCurrentUser = (req, res, next) => {
  const userId = req.user._id;

  User.findById(userId)
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError("User not found"));
      }
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid data"));
      }
      return next(err);
    });
};

const updateUser = (req, res, next) => {
  const { name, avatar } = req.body;
  const userId = req.user._id;

  // Usamos findByIdAndUpdate para modificar solo los campos permitidos
  User.findByIdAndUpdate(
    userId,
    { name, avatar },
    { new: true, runValidators: true } // new: devuelve el doc actualizado. runValidators: valida el nuevo avatar.
  )
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return next(new BadRequestError("Invalid data for update"));
      }
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError("User not found"));
      }
      return next(err);
    });
};

module.exports = { createUser, login, getUsers, getCurrentUser, updateUser };
