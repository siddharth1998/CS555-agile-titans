import express from "express";
import {
  createContractList,
  findContractByFirstParty,
  createContractDetail,
} from "../services/contract.js";

const router = express.Router();

/** /contract */
router.get("/", async (req, res) => {
  try {
    let contractList = await findContractByFirstParty("AMD");
    return res.status(201).json({ status: 'success', message: 'Contract created successfully', contractList });
  } catch (err) {
    console.error(`Error while getting contract list`);
    console.error(err);
    return res.status(500).json({ status : 'error', message : err.message });
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

/** /contract/details/create  */
router.post("/details/create", async (req, res) => {
  try {
    if (!req.body) res.status(400).json({ status : 'error', message : "No contract content sent" });
    let contract = await createContractDetail(req.body);
    return res.status(201).json({ status: 'success', message: 'Contract created successfully', contract });
  } catch (err) {
    console.error(`Error while creating the contract content`);
    console.error(err);
    return res.status(500).json({ status : 'error', message : err.message });
  }
});

export { router };