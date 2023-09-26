import calculator from "../src/calculator";

describe("Operações", () => {
  it("soma dois números", () => {
    const n1 = 5;
    const n2 = 3;

    const resultado = calculator.sum(n1, n2);

    expect(resultado).toBe(8);
  });

  it("soma de zero com outro número deve ser igual ao número", () => {
    const n1 = 0;
    const n2 = 7;

    const resultado = calculator.sum(n1, n2);

    expect(resultado).toBe(n2);
  });

  it("soma de números negativos e positivos", () => {
    const n1 = -2;
    const n2 = 6;

    const resultado = calculator.sum(n1, n2);

    expect(resultado).toBe(4);
  });
});
