const Joi = require("@hapi/joi");

const strongPasswordRegex =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/;

const phoneRegex = /^[6-9]\d{9}$/;
const stringPassswordError = new Error(
  "Password must be strong. At least one upper case alphabet. At least one lower case alphabet. At least one digit. At least one special character. Minimum six in length"
);
const phoneError = new Error("Enter a 10 digit valid Phone number");

const registerSchema = Joi.object({
  email: Joi.string().email().max(225).required(),
  password: Joi.string()
    .regex(strongPasswordRegex)
    .error(stringPassswordError)
    .required(),
  firstname: Joi.string().min(4).max(255).required(),
  lastname: Joi.string().max(225),
  phone: Joi.string()
    .min(10)
    .max(10)
    .regex(phoneRegex)
    .error(phoneError)
    .required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().max(225).required(),
  password: Joi.string().required(),
});

const checkEmailSchema = Joi.object({
  email: Joi.string().email().max(225).required(),
});

module.exports = {
  registerSchema,
  loginSchema,
  checkEmailSchema,
};
