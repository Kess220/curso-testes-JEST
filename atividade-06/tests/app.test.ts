import supertest from "supertest";

import app from "./../src/app";
import prisma from "../src/database";

const api = supertest(app);

beforeEach(async () => {
  await prisma.user.deleteMany();
});

describe("POST /users tests", () => {
  it("should create a user", async () => {
    const { status } = await api.post("/users").send({
      email: "user@example.com",
      password: "password",
    });
    expect(status).toBe(201);
  });

  it("should receive 409 when trying to create two users with the same e-mail", async () => {
    await api.post("/users").send({
      email: "user@example.com",
      password: "password",
    });

    const { status } = await api.post("/users").send({
      email: "user@example.com",
      password: "password",
    });

    expect(status).toBe(409);
  });
});

describe("GET /users tests", () => {
  it("should return a single user", async () => {
    const newUser = {
      email: "user@example.com",
      password: "password",
    };

    const createResponse = await api.post("/users").send(newUser);
    expect(createResponse.status).toBe(201);

    const userId = createResponse.body.id;

    const { status, body } = await api.get(`/users/${userId}`);

    expect(status).toBe(200);
    expect(body.email).toBe(newUser.email);
  });

  it("should return 404 when can't find a user by id", async () => {
    const userId = 999;

    const { status } = await api.get(`/users/${userId}`);

    expect(status).toBe(404);
  });

  it("should return all users", async () => {
    const usersToCreate = [
      {
        email: "user1@example.com",
        password: "password1",
      },
      {
        email: "user2@example.com",
        password: "password2",
      },
    ];

    for (const user of usersToCreate) {
      await api.post("/users").send(user);
    }

    const { status, body } = await api.get("/users");

    expect(status).toBe(200);
    expect(Array.isArray(body)).toBe(true);
    expect(body.length).toBe(usersToCreate.length);
  });
});
