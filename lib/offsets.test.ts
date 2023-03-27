import { exportedForTesting } from "./offsets";

const { normalizeOffset, LOCAL_OFFSET } = exportedForTesting;

describe("offsets", () => {
  test("converting offsets", () => {
    let offset: string;

    offset = normalizeOffset(0);
    expect(offset).toBe("+00:00");

    offset = normalizeOffset(-60);
    expect(offset).toBe("+01:00");

    offset = normalizeOffset(-120);
    expect(offset).toBe("+02:00");

    offset = normalizeOffset(-330);
    expect(offset).toBe("+05:30");

    offset = normalizeOffset(570);
    expect(offset).toBe("-09:30");

    console.log(`Local offset: ${LOCAL_OFFSET}`);
  });
});
