const { authService } = require("../services");
const {
  registerSchema,
  loginSchema,
  checkEmailSchema,
} = require("../helpers/userValidations");
const { ApiError } = require("../middlewares/apiError");
const httpStatus = require("http-status");
const { User } = require("../models/user");

const authController = {
  async register(req, res, next) {
    try {
      //validate user register data using joi schema
      let value = await registerSchema.validateAsync(req.body);

      if (value) {
        //check if email is unique in mongo
        if (await User.emailTaken(value.email)) {
          throw new ApiError(
            httpStatus.BAD_REQUEST,
            "Sorry email already taken"
          );
        }

        //create new user in mongo
        let user = await authService.createUser(
          value.email,
          value.password,
          value.firstname,
          value.lastname,
          value.phone
        );

        res.status(httpStatus.CREATED).send({
          user,
        });
      }
    } catch (error) {
      next(error);
    }
  },

  async registerFarm(req, res, next) {
    try {
      let value = req.body;
      console.log(value);
      if (value) {
        // create farm in mongo
        let farm = await authService.createFarm(
          value.coordinates,
          value.farmName,
          value.userId,
          value.soilHealth ? value.soilHealth : [],
          value.cropYield ? value.cropYield : [],
          value.serviceTier ? value.serviceTier : []
        );
        res.status(httpStatus.CREATED).send({
          farm,
        });
      }
    } catch (error) {
      next(error);
    }
  },

  async checkEmail(req, res, next) {
    try {
      //validate user login data using joi schema
      let value = await checkEmailSchema.validateAsync(req.body);

      if (value) {
        //check if email exists in mongo
        let user = await User.emailTaken(value.email);

        if (user) {
          res.send({ user: user });
        } else {
          res.send({ message: "User not found" });
        }
      }
    } catch (error) {
      next(error);
    }
  },

  async signin(req, res, next) {
    try {
      //validate user login data using joi schema
      let value = await loginSchema.validateAsync(req.body);
      if (value) {
        const user = await authService.signInWithEmailAndPassword(
          value.email,
          value.password
        );

        //set access token
        let token = await authService.genAuthToken(user.user);

        //set access token to cookies

        res.cookie("x-access-token", token).status(httpStatus.CREATED).send({
          user,
          token,
        });
      }
    } catch (error) {
      next(error);
    }
  },

  async isauth(req, res, next) {
    res.json(req.user);
  },
};

module.exports = authController;
