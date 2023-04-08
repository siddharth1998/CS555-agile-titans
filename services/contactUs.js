import { contactUsModel } from "../models/contactUs.js";

const create = request => new contactUsModel(request).save();

const getAll = () => contactUsModel.find({});

export { create, getAll };