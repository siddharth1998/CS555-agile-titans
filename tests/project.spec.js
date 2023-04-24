import request from "supertest";
import app from "../app.js";
import mongoose from "mongoose";
import { projectModel } from "../models/project.js";

const testProjectData = {
  name: "Test Project",
  description: "This is a test project",
  startDate: "2023-04-10",
  endDate: "2023-04-20",
  createdBy: new mongoose.Types.ObjectId(),
  teamMembers: [new mongoose.Types.ObjectId(), new mongoose.Types.ObjectId()],
};

describe("Project APIs Testing", () => {
  let testProject;

  beforeEach(async () => {
    testProject = await projectModel.create(testProjectData);
  });

  afterEach(async () => {
    await projectModel.deleteMany({});
  });

  describe("get all project route", () => {
    it("GET /project should get all projects", (done) => {
      request(app)
        .get("/project")
        .expect(200)
        .expect("Content-Type", "text/html")
        .end((err, res) => {
          done();
        });
    });
  });

  describe("get project by id route", () => {
    it("GET /:id should get a project by id", (done) => {
      request(app)
        .get(`/project/${testProject._id}`)
        .expect(200)
        .expect("Content-Type", "text/html")
        .end((err, res) => {
          done();
        });
    });
  });

  describe("create new project route", () => {
    it("POST / should create a new project", (done) => {
      const newProjectData = {
        name: "New Test Project",
        description: "This is a new test project",
        startDate: "2023-04-12",
        createdBy: new mongoose.Types.ObjectId(),
        teamMembers: [new mongoose.Types.ObjectId()],
      };
      request(app)
        .post("/project")
        .send(newProjectData)
        .expect(200)
        .expect("Content-Type", "text/html")
        .end((err, res) => {
          done();
        });
    });
  });

  describe("update project route", () => {
    it("PUT /:id should update a project", (done) => {
      const updatedProjectData = {
        name: "Updated Test Project",
        description: "This is an updated test project",
        endDate: "2023-04-25",
        projectManager: new mongoose.Types.ObjectId(),
        teamMembers: [new mongoose.Types.ObjectId()],
      };
      request(app)
        .put(`/project/projects/${testProject._id}`)
        .send(updatedProjectData)
        .expect(200)
        .expect("Content-Type", "text/html")
        .end((err, res) => {
          done();
        });
    });
  });

  describe("delete project route", () => {
    it("DELETE /:id should delete a project", (done) => {
      request(app)
        .delete(`/project/${testProject._id}`)
        .expect(200)
        .expect("Content-Type", "text/html")
        .end((err, res) => {
          done();
        });
    });
  });
});
