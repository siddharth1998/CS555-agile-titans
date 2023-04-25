import express from "express";
import {
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
  getContractListByContractNo,
} from "../services/contract.js";

const router = express.Router();

/** /contract */
router.get("/", async (req, res) => {
  try {
    let firstParty = req.user.firstName + req.user.lastName;
    let contractList = await findContractByFirstParty(firstParty);
    return res
      .status(200)
      .json({
        status: "success",
        message: "Get contract list successfully",
        contractList,
      });
  } catch (err) {
    console.error(`Error while getting contract list`);
    console.error(err);
    return res.status(500).json({ status: "error", message: err.message });
  }
});

/** /contract/countInProgress */
router.get("/countInProgress", async (req, res) => {
  try {
    let firstParty = req.user.firstName + req.user.lastName;
    let contractList = await findInProgressContracts(firstParty);
    let numberOfContracts = contractList.length;
    return res.status(200).json({
      status: "success",
      message: "Get number of In Progress contracts successfully",
      numberOfContracts,
    });
  } catch (err) {
    console.error(`Error while getting number of In Progress contracts.`);
    console.error(err);
    return res.status(500).json({ status: "error", message: err.message });
  }
});

/** /contract/create  */
router.post("/create", async (req, res) => {
  try {
    if (!req.body)
      return res.status(400).json({
        status: "error",
        message: "No contract list details are sent",
      });
    let contract = await createContractList(req.body);
    return res
      .status(200)
      .json({
        status: "success",
        message: "Contract list created successfully",
        contract,
      });
  } catch (err) {
    console.error(`Error while creating a new contract list`);
    console.error(err);
    return res.status(500).json({ status: "error", message: err.message });
  }
});

/** /contract/content/:contractNo */
router.get("/content/:contractNo", async (req, res) => {
  try {
    let contractNo = req.params.contractNo;
    let contractContent = await getContractContentByContractNo(contractNo);
    return res.status(200).json({
      status: "success",
      message: "Get contract content successfully",
      contractContent,
    });
  } catch (err) {
    console.error(`Error while getting contract content`);
    console.error(err);
    return res.status(500).json({ status: "error", message: err.message });
  }
});

/** /contract/content/:contractNo */
router.post("/content/:contractNo", async (req, res) => {
  try {
    let contractNo = req.params.contractNo;
    let secondParty = req.body.secondPartySignature;
    if (!(secondParty.trim()))
      return res.status(400).json({
        status: "error",
        message: "Signature should not be empty",
      });
    await updateSecondPartySignature(contractNo, secondParty);
    let updatedContent = await updateSecondParty(contractNo, secondParty);
    return res.status(200).json({
      status: "success",
      message: "Update contract second party signature successfully",
      updatedContent,
    });
  } catch (err) {
    console.error(`Error while updating second party signature`);
    console.error(err);
    return res.status(500).json({ status: "error", message: err.message });
  }
});

/** /contract/details/create  */
router.post("/details/create/:contractNo", async (req, res) => {
  try {
    if (!req.body)
      return res
        .status(400)
        .json({ status: "error", message: "No contract content sent" });
    if (!req.body.firstPartySignature.trim())
      return res
        .status(400)
        .json({ status: "error", message: "Signature should not be empty" });
    let contract = await createContractDetail(req.body);
    await updateContractList(
      req.body.contractNo,
      req.body.startDate,
      req.body.endDate,
      req.body.dateSigned
    );
    return res.status(200).json({
      status: "success",
      message: "Contract content created successfully",
      contract,
    });
  } catch (err) {
    console.error(`Error while creating the contract content`);
    console.error(err);
    return res.status(500).json({ status: "error", message: err.message });
  }
});

/** /contract/delete/:contractNo */
router.post("/delete/:contractNo", async (req, res) => {
  try {
    let contractNo = req.params.contractNo;
    let deleteResult = await deleteContractBeforeSigned(contractNo);
    return res.status(200).json({
      status: "success",
      message: "Delete contract successfully",
      deleteResult,
    });
  } catch (err) {
    console.error(`Error while deleting contract`);
    console.error(err);
    return res.status(500).json({ status: "error", message: err.message });
  }
});

/** /contract/terminate/:contractNo */
router.post("/terminate/:contractNo", async (req, res) => {
  try {
    let contractNo = req.params.contractNo;
    let terminateResult = await terminateContractAtWill(contractNo);
    return res.status(200).json({
      status: "success",
      message: "Terminate contract successfully",
      terminateResult,
    });
  } catch (err) {
    console.error(`Error while terminating contract`);
    console.error(err);
    return res.status(500).json({ status: "error", message: err.message });
  }
});

/** /contract/update/:contractNo */
router.post("/update/:contractNo", async (req, res) => {
  try {
    let contractNo = req.params.contractNo;
    await terminateContractAtWill(contractNo);
    if (!req.body)
      return res
        .status(400)
        .json({ status: "error", message: "No new contract content sent" });
    if (!(req.body.firstPartySignature.trim())) 
      return res
        .status(400)
        .json({ status: "error", message: "Signature should not be empty" });
    let newContract = await createContractDetail(req.body);
    let oldListItem = await getContractListByContractNo(contractNo);
    let newListItem = {
      contractNo: req.body.contractNo,
      contractType: oldListItem.contractType,
      entity: oldListItem.entity,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      dateSigned: req.body.dateSigned,
      firstParty: oldListItem.firstParty,
      additionalInformation: `Updated from ${contractNo}`,
    };
    let newContractList = await createContractList(newListItem);
    return res.status(200).json({
      status: "success",
      message: "Update contract successfully",
      newContract,
      newContractList,
    });
  } catch (err) {
    console.error(`Error while updating contract`);
    console.error(err);
    return res.status(500).json({ status: "error", message: err.message });
  }
});

export { router };
