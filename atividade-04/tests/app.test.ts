import supertest from "supertest";

import app from "./../src/app";

const api = supertest(app);

describe("API test", () => {
  it("route test event", async () => {
    const response = await api.get("/event");

    expect(response.statusCode).toBe(200);
     expect(response.body).toEqual({
       id: 1,
       title: "Super Event!",
       image:
         "https://img.freepik.com/fotos-gratis/publico-animado-assistindo-fogos-de-artificio-de-confete-e-se-divertindo-no-festival-de-musica-a-noite-copiar-espaco_637285-559.jpg",
       date: "2023-07-21T00:00:00.000Z",
     });
  });
});
