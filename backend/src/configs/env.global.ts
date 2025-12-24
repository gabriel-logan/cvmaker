export interface EnvGlobalConfig {
  readonly server: {
    readonly nodeEnv: "development" | "production" | "test";
    readonly port: number;
  };
}

export default (): EnvGlobalConfig => {
  const nodeEnv = process.env.NODE_ENV;
  const port = process.env.SERVER_PORT;

  if (!nodeEnv || !port) {
    throw new Error("Missing required environment variables");
  }

  return {
    server: {
      nodeEnv: nodeEnv as EnvGlobalConfig["server"]["nodeEnv"],
      port: parseInt(port, 10),
    },
  };
};
