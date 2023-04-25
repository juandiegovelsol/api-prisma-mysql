import request from "supertest";
import app from "../app.js";

describe("user endpoints", () => {
  it("POST /user should register an user", async () => {
    await request(app)
      .post("/user")
      .send({
        email: "mocked@test.com",
        password: "0000",
      })
      .expect(201);
  });
  describe("POST /user/login", () => {
    it("should allow login", async () => {
      const res = await request(app).post("/user/login").send({
        username: "mocked@test.com",
        passwd: "0000",
      });
      expect(res.body.token).toBeDefined();
    });
    it("should denie login", async () => {
      const res = await request(app).post("/user/login").send({
        username: "mocked1@test.com",
        passwd: "0000X",
      });
      expect(res.body.token).toBeUndefined();
      expect(res.status).toEqual(500);
    });
  });
});
