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
} from "../services/contract.js";

const router = express.Router();

/** /contract */
router.get("/", async (req, res) => {
  try {
    let firstParty = req.user.firstName + req.user.lastName;
    let contractList = await findContractByFirstParty(firstParty);
    return res.status(201).json({ status: 'success', message: 'Get contract list successfully', contractList });
  } catch (err) {
    console.error(`Error while getting contract list`);
    console.error(err);
    return res.status(500).json({ status : 'error', message : err.message });
  }
});

/** /contract/countInProgress */
router.get("/countInProgress", async (req, res) => {
  try {
    let firstParty = req.user.firstName + req.user.lastName;
    let contractList = await findInProgressContracts(firstParty);
    let numberOfContracts = contractList.length;
    return res.status(201).json({
      status: "success",
      message: "Get contract list successfully",
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
    if (!req.body) res.status(400).json({ status : 'error', message : "No contract details are sent" });
    let contract = await createContractList(req.body);
    return res.status(201).json({ status: 'success', message: 'Contract created successfully', contract });
  } catch (err) {
    console.error(`Error while creating a new contract`);
    console.error(err);
    return res.status(500).json({ status : 'error', message : err.message });
  }
});

/** /contract/details/:contractNo */
router.get("/details/:contractNo", async (req, res) => {
  try {
    let contractNo = req.params.contractNo;
    let contractContent = await getContractContentByContractNo(contractNo);
    return res.status(201).json({ status: 'success', message: 'Get contract content successfully', contractContent });
  } catch (err) {
    console.error(`Error while getting contract content`);
    console.error(err);
    return res.status(500).json({ status : 'error', message : err.message });
  }
});

/** /contract/details/:contractNo */
router.post("/details/:contractNo", async (req, res) => {
  try {
    let contractNo = req.params.contractNo;
    let secondParty = req.body.secondPartySignature;
    await updateSecondPartySignature(contractNo, secondParty);
    let updatedContent = await updateSecondParty(contractNo, secondParty);
    return res.status(201).json({
      status: "success",
      message: "Get contract content successfully",
      updatedContent,
    });
  } catch (err) {
    console.error(`Error while updating second party signature`);
    console.error(err);
    return res.status(500).json({ status : 'error', message : err.message });
  }
});

/** /contract/details/create  */
router.post("/details/create", async (req, res) => {
  try {
    if (!req.body) res.status(400).json({ status : 'error', message : "No contract content sent" });
    console.log(req.body);
    let contract = await createContractDetail(req.body);
    await updateContractList(
      req.body.contractNo,
      req.body.startDate,
      req.body.endDate,
      req.body.dateSigned,
    );
    return res.status(201).json({ status: 'success', message: 'Contract content created successfully', contract });
  } catch (err) {
    console.error(`Error while creating the contract content`);
    console.error(err);
    return res.status(500).json({ status : 'error', message : err.message });
  }
});

export { router };