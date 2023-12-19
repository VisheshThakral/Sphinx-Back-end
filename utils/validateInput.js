exports.validate = (schema) => (req, res, next) => {
  const { error } = schema(req.body);
  if (error) {
    return res.send(error.message);
  }
  next();
};
