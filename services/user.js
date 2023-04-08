import { userModel } from "../models/user.js";

const create = user => new userModel(user).save();

const validate = async (email, password) => {
    let user = await userModel.findOne({ email });

    if (!user) throw "user not found";
    return (await user.comparePassword(password)) ? user : false;
};

const getAll = () => userModel.find();

export { create, validate, getAll };