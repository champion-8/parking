
const { validationResult } = require("express-validator");

module.exports = {
  handleValidationError(req, res, next) {
    const error = validationResult(req);
    if(!error.isEmpty()) {
        const { errors } = error;
        if (errors.length > 0) {
            return res.status(400).json({ status: 400, errorMessage: errors[0].msg });
        }
        return res.status(400).json({ status: 400, errorMessage: error });
    }
    next();
  }
}