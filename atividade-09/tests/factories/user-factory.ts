import prisma from "../../src/database";
import { UserInput } from "../../src/repository";
import { faker } from "@faker-js/faker";

export async function buildUser(email?: string, password?: string) {
  const userEmail = email || faker.internet.email();
  const userPassword = password || faker.internet.password();

  const userData: UserInput = {
    email: userEmail,
    password: userPassword,
  };

  const user = await prisma.user.create({ data: userData });
  return user;
}
