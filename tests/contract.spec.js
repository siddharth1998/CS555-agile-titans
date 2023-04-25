import request from "supertest";
import app from "../app.js";
import { contractListModel } from "../models/contractList.js";
import { contractDetailsModel } from "../models/contractDetails.js";

const testContractListData = {
  contractNo: "LEASE0101",
  contractType: "lease",
  entity: "company",
  startDate: "2023-04-01",
  endDate: "2023-12-31",
  dateSigned: "2023-04-01",
  firstParty: "mickyz",
  secondParty: "amd",
};

const testContractDetailData = {
  contractNo: "LEASE0101",
  dateSigned: "2023-04-01",
  firstParty: "mickyz",
  secondParty: "amd",
  paymentAmount: 10000,
  noticePeriod: 30,
  startDate: "2023-04-10",
  endDate: "2023-04-20",
  firstPartySignature: "mickyz",
};

describe("Contract APIs Testing", () => {
  let testContractList;
  let testContractDetail;

  beforeEach(async () => {
    testContractList = await contractListModel.create(testContractListData);
    testContractDetail = await contractDetailsModel.create(
      testContractDetailData
    );
  });

  afterEach(async () => {
    await contractListModel.deleteMany({});
    await contractDetailsModel.deleteMany({});
  });

  describe("get all contracts route", () => {
    it("GET /contract should get all contracts", (done) => {
      request(app)
        .get("/contract")
        .expect(200)
        .expect("Content-Type", "text/html")
        .end((err, res) => {
          done();
        });
    });
  });

  describe("get number of In Progress contracts", () => {
    it("GET /contract/countInProgress should number of In Progress contracts.", (done) => {
      request(app)
        .get("/contract/countInProgress")
        .expect(200)
        .expect("Content-Type", "text/html")
        .end((err, res) => {
          done();
        });
    });
  });

  describe("create new contract list route", () => {
    it("POST /contract/create should create a new contract list", (done) => {
      const newContractListData = {
        contractNo: "LEASE0102",
        contractType: "sale",
        entity: "company",
        firstParty: "mickyz",
      };
      request(app)
        .post("/contract/create")
        .send(newContractListData)
        .expect(200)
        .expect("Content-Type", "text/html")
        .end((err, res) => {
          done();
        });
    });
  });

  describe("get a contract content by contract No.", () => {
    it("GET /contract/content/:contractNo should get a contract content", (done) => {
      request(app)
        .get(`/contract/content/${testContractList.contractNo}`)
        .expect(200)
        .expect("Content-Type", "text/html")
        .end((err, res) => {
          done();
        });
    });
  });

  describe("update contract list and content's second party signature", () => {
    it("POST /contract/content/:contractNo should update contract list and content's second party signature", (done) => {
      const secondPartySignatureData = {
        secondPartySignature: "amd",
      };
      request(app)
        .post(`/contract/content/${testContractDetail.contractNo}`)
        .send(secondPartySignatureData)
        .expect(200)
        .expect("Content-Type", "text/html")
        .end((err, res) => {
          done();
        });
    });
  });

  describe("create a new contract content", () => {
    it("POST /contract/details/create/:contractNo should create a new contract content", (done) => {
      const newContractContentData = {
        contractNo: "LEASE0102",
        dateSigned: "2023-04-01",
        firstParty: "mickyz",
        secondParty: "amd",
        paymentAmount: 200000,
        noticePeriod: 90,
        startDate: "2023-04-10",
        endDate: "2023-12-20",
        firstPartySignature: "mickyz",
      };
      request(app)
        .post("/contract/details/create")
        .send(newContractContentData)
        .expect(200)
        .expect("Content-Type", "text/html")
        .end((err, res) => {
          done();
        });
    });
  });

  describe("update a contract", () => {
    it("POST /contract/update/:contractNo should terminate the original contract and create a new one", (done) => {
      const newContractContentData = {
        contractNo: "LEASE0103",
        dateSigned: "2023-05-01",
        firstParty: "mickyz",
        secondParty: "amd",
        paymentAmount: 300000,
        noticePeriod: 90,
        startDate: "2023-04-10",
        endDate: "2023-12-31",
        firstPartySignature: "mickyz",
      };
      request(app)
        .post(`/contract/update/${testContractList.contractNo}`)
        .send(newContractContentData)
        .expect(200)
        .expect("Content-Type", "text/html")
        .end((err, res) => {
          done();
        });
    });
  });

  describe("delete a contract before signed", () => {
    it("POST /contract/delete/:contractNo should delete a contract", (done) => {
      request(app)
        .post("/contract/delete/LEASE0102")
        .expect(200)
        .expect("Content-Type", "text/html")
        .end((err, res) => {
          done();
        });
    });
  });

  describe("update contract list and content's second party signature", () => {
    it("POST /contract/content/:contractNo should update contract list and content's second party signature", (done) => {
      const secondPartySignatureData = {
        secondPartySignature: "amd",
      };
      request(app)
        .post("/contract/content/LEASE0103")
        .send(secondPartySignatureData)
        .expect(200)
        .expect("Content-Type", "text/html")
        .end((err, res) => {
          done();
        });
    });
  });

  describe("terminate a contract after signed", () => {
    it("POST /contract/terminate/:contractNo should terminate a contract", (done) => {
      request(app)
        .post("/contract/terminate/LEASE0103")
        .expect(200)
        .expect("Content-Type", "text/html")
        .end((err, res) => {
          done();
        });
    });
  });

});
