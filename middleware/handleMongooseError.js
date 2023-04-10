const handleMongooseError = (error, data, next) => {
  console.log('1234');
  error.status = 400;
  next();
};

module.exports = { handleMongooseError };
