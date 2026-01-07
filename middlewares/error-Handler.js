module.exports = (err, req, res, next) => {
  const statusCode =
    Number.isInteger(err.statusCode) &&
    err.statusCode >= 400 &&
    err.statusCode <= 599
      ? err.statusCode
      : 500;

  const message =
    statusCode === 500 ? "An error ocurred on the server" : err.message;

  res.status(statusCode).send({ message });
};
