import supertest from "supertest";
import app from "../src/index";

const server = supertest(app);

describe("Server", () => {
  it("Router Health Check", async () => {
    const result = await server.get("/health");
    console.log(result);

    const { statusCode } = result;
    expect(statusCode).toBe(200);
  });
});
