import { contractListModel } from "../models/contractList.js";
import { contractDetailsModel } from "../models/contractDetails.js"

const createContractList = (contractList) => new contractListModel(contractList).save();

const findContractByFirstParty = async (firstParty) => {
  let contractList = contractListModel.find({ firstParty: firstParty });
  return contractList;
}

const createContractDetail = (contract) =>
  new contractDetailsModel(contract).save();


export { createContractList, findContractByFirstParty, createContractDetail };
