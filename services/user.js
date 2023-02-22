import { userModel } from "../models/user.js";

const create = user => new userModel(user).save();

const validate = async (email, password) => {
    let user = await userModel.findOne({ email });

    if (!user) throw "user not found";
    return user.comparePassword(password);
};

export { create, validate };