import { contractListModel } from "../models/contractList.js";
import { contractDetailsModel } from "../models/contractDetails.js"

const createContractList = (contractList) => new contractListModel(contractList).save();

const findContractByFirstParty = async (firstParty) => {
  let contractList = contractListModel.find({ firstParty: firstParty });
  return contractList;
}

const findInProgressContracts = async (firstParty) => {
  let contractList = contractListModel.find({
    firstParty: firstParty,
    contractStatus: "In Progress",
  });
  return contractList;
}

const getContractContentByContractNo = async (contractNo) => {
  return contractDetailsModel.findOne({ contractNo: contractNo });
}

const updateContractList = async (
  contractNo,
  startDate,
  endDate,
  dateSigned
) => {
  let updateContent = contractListModel.findOneAndUpdate(
    {
      contractNo: contractNo,
    },
    {
      $set: {
        startDate: startDate,
        endDate: endDate,
        dateSigned: dateSigned,
      },
    }
  );
  return updateContent;
};

const updateSecondPartySignature = async (contractNo, secondPartySignature) => {
  return await contractDetailsModel.findOneAndUpdate(
    {
      contractNo: contractNo,
    },
    {
      $set: {
        secondPartySignature: secondPartySignature,
      },
    }
  );
};

const updateSecondParty = async (contractNo, secondParty) => {
  return await contractListModel.findOneAndUpdate(
    {
      contractNo: contractNo,
    },
    {
      $set: {
        secondParty: secondParty,
        contractStatus: "In Progress",
      },
    }
  );
};

const deleteContractBeforeSigned = async (contractNo) => {
  await contractListModel.findOneAndDelete({
    contractNo: contractNo,
  });
  await contractDetailsModel.findOneAndDelete({
    contractNo: contractNo,
  });
  return true;
}

const terminateContractAtWill = async (contractNo) => {
  return await contractListModel.findOneAndUpdate(
    {
      contractNo: contractNo,
    },
    {
      $set: {
        endDate: Date(),
        contractStatus: "Terminate",
      },
    }
  );
}

const createContractDetail = (contract) =>
  new contractDetailsModel(contract).save();

export {
  createContractList,
  findContractByFirstParty,
  createContractDetail,
  updateContractList,
  getContractContentByContractNo,
  updateSecondPartySignature,
  updateSecondParty,
  findInProgressContracts,
  deleteContractBeforeSigned,
  terminateContractAtWill,
};
