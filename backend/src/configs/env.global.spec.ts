import envGlobal from "./env.global";

describe("env.global", () => {
  const ORIGINAL_ENV = process.env;

  const loadSubject = (): typeof envGlobal => envGlobal;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...ORIGINAL_ENV };
  });

  afterAll(() => {
    process.env = ORIGINAL_ENV;
  });

  it("should throw when NODE_ENV is missing", () => {
    delete process.env.NODE_ENV;
    process.env.SERVER_PORT = "3000";

    const envGlobal = loadSubject();
    expect(() => envGlobal()).toThrow("Missing required environment variables");
  });

  it("should throw when SERVER_PORT is missing", () => {
    process.env.NODE_ENV = "test";
    delete process.env.SERVER_PORT;

    const envGlobal = loadSubject();
    expect(() => envGlobal()).toThrow("Missing required environment variables");
  });

  it("should return parsed config when required environment variables are present", () => {
    process.env.NODE_ENV = "development";
    process.env.SERVER_PORT = "3001";

    const envGlobal = loadSubject();
    const cfg = envGlobal();

    expect(cfg).toEqual({
      server: {
        nodeEnv: "development",
        port: 3001,
      },
    });
  });

  it("should parse SERVER_PORT with base 10 (e.g., '3000abc' -> 3000)", () => {
    process.env.NODE_ENV = "production";
    process.env.SERVER_PORT = "3000abc";

    const envGlobal = loadSubject();
    const cfg = envGlobal();

    expect(cfg.server.nodeEnv).toBe("production");
    expect(cfg.server.port).toBe(3000);
  });

  it("should return NaN when SERVER_PORT is not a number (current behavior)", () => {
    process.env.NODE_ENV = "test";
    process.env.SERVER_PORT = "not-a-number";

    const envGlobal = loadSubject();
    const cfg = envGlobal();

    expect(cfg.server.nodeEnv).toBe("test");
    expect(Number.isNaN(cfg.server.port)).toBe(true);
  });
});
