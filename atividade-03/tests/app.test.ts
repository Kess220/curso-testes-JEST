import supertest from "supertest";
import app from "./../src/app";

const api = supertest(app);

describe("API test", () => {
  it("should return 200 when asked /health", async () => {
    const { status, text } = await api.get("/health");
    expect(status).toBe(200);
    expect(text).toBe("OK!");
  });

  it("should return the correct Fibonacci sequence", async () => {
    const { status, body } = await api.get("/fibonacci?elements=10");
    expect(status).toBe(200);
    expect(body).toEqual([0, 1, 1, 2, 3, 5, 8, 13, 21, 34]);
  });

  it("should return status code 400 for invalid input", async () => {
    const { status } = await api.get("/fibonacci?elements=invalid");
    expect(status).toBe(400);
  });

  it("should return status code 400 for out-of-range input", async () => {
    const { status } = await api.get(
      `/fibonacci?elements=${Number.MAX_VALUE + 1}`
    );
    expect(status).toBe(400);
  });
});
