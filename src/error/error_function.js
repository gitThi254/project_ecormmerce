const CustomeError = require("../utils/CustomError");

exports.error_404 = (name, id) => {
  return new CustomeError(`${name} width ID : ${id} not found`, 404);
};
