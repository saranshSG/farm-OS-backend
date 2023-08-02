const { User } = require("../models/user");
const { Farm } = require("../models/farm");
const httpStatus = require("http-status");
const { ApiError } = require("../middlewares/apiError");

const createUser = async (email, password, firstname, lastname, phone) => {
  try {
    if (await User.emailTaken(email)) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Sorry email already taken");
    }

    const user = new User({
      email,
      password,
      firstname,
      lastname,
      phone,
    });

    await user.save();
    return user;
  } catch (error) {
    throw error;
  }
};

const findUserByEmail = async (email) => {
  return User.findOne({ email });
};

const findUserById = async (id) => {
  return User.findById(id);
};

const findFarmByUserId = async (id) => {
  let findFarmByMenuId = await Farm.find({ userId: id });
  return findFarmByMenuId;
};

const genAuthToken = (user) => {
  try {
    const token = user.generateAuthToken();
    return token;
  } catch (error) {}
};

const signInWithEmailAndPassword = async (email, password) => {
  try {
    const user = await findUserByEmail(email);
    let farm = {};
    farm = await findFarmByUserId(user._id);
    if (!user) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "Sorry Bad Email");
    }
    
    if (!(await user.comparePassword(password))) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "Sorry Bad Password");
    }

    let result = {
      user,
      farm,
    };

    return result;
  } catch (error) {
    throw error;
  }
};

const createFarm = async (
  coordinates,
  farmName,
  userId,
  soilHealth,
  cropYield,
  serviceTier
) => {
  try {
    const user = await findUserById(userId);

    if (!user) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "User does not exist");
    } else {
      const farm = new Farm({
        coordinates,
        farmName,
        userId,
        soilHealth,
        cropYield,
        serviceTier,
      });

      await farm.save();
      return farm;
    }
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createUser,
  createFarm,
  genAuthToken,
  signInWithEmailAndPassword,
  findUserByEmail,
};
