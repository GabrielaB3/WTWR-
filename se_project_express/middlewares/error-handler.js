const errorHandler = (err, req, res, next) => {
  console.error(err);

  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    message:
      statusCode === 500
        ? "An error occurred on the server" // Mensaje genérico para errores desconocidos
        : message, // Mensaje específico para errores controlados (400, 401, 404, etc.)
  });
};

module.exports = errorHandler;
