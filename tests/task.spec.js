import request from "supertest";
import app from "../app.js";
import mongoose from "mongoose";
import { taskModel } from "../models/Task.js";

const testTaskData = {
  taskName: "Test Task",
  Description: "This is a test task",
  priority: 3,
  dueDate: "2023-04-20",
  taskAssign: new mongoose.Types.ObjectId(),
  collabrators: [new mongoose.Types.ObjectId(), new mongoose.Types.ObjectId()],
};

describe("Task APIs Testing", () => {
  let testTask;

  beforeEach(async () => {
    testTask = await taskModel.create(testTaskData);
  });

  afterEach(async () => {
    await taskModel.deleteMany({});
  });

  describe("get all tasks route", () => {
    it("GET /task should get all tasks", (done) => {
      request(app)
        .get("/task")
        .expect(200)
        .expect("Content-Type", "text/html")
        .end((err, res) => {
          done();
        });
    });
  });

  describe("get task by id route", () => {
    it("GET /:id should get a task by id", (done) => {
      request(app)
        .get(`/task/${testTask._id}`)
        .expect(200)
        .expect("Content-Type", "text/html")
        .end((err, res) => {
          done();
        });
    });
  });

  describe("create new task route", () => {
    it("POST / should create a new task", (done) => {
      const testTaskData = {
        taskName: "New Test Task",
        Description: "This is a new test task",
        priority: 2,
        dueDate: "2023-04-21",
        taskAssign: new mongoose.Types.ObjectId(),
        collabrators: [
          new mongoose.Types.ObjectId(),
          new mongoose.Types.ObjectId(),
        ],
      };
      request(app)
        .post("/task")
        .send(testTaskData)
        .expect(200)
        .expect("Content-Type", "text/html")
        .end((err, res) => {
          done();
        });
    });
  });

  describe("update task route", () => {
    it("PUT /:id should update a task", (done) => {
      const testTaskData = {
        taskName: "Updated Test Task",
        Description: "This is a updated test task",
        priority: 1,
        dueDate: "2023-04-23",
        taskAssign: new mongoose.Types.ObjectId(),
        collabrators: [
          new mongoose.Types.ObjectId(),
          new mongoose.Types.ObjectId(),
        ],
      };
      request(app)
        .put(`/task/tasks/${testTaskData._id}`)
        .send(testTaskData)
        .expect(200)
        .expect("Content-Type", "text/html")
        .end((err, res) => {
          done();
        });
    });
  });

  describe("delete task route", () => {
    it("DELETE /:id should delete a task", (done) => {
      request(app)
        .delete(`/tasks/${testTask._id}`)
        .expect(200)
        .expect("Content-Type", "text/html")
        .end((err, res) => {
          done();
        });
    });
  });
});
