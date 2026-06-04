export interface EnvGlobalConfig {
  readonly server: {
    readonly nodeEnv: "development" | "production" | "test";
    readonly port: number;
    readonly aiApiKey: string;
    readonly aiModels: string;
  };
}

export default function envGlobal(): EnvGlobalConfig {
  const nodeEnv = process.env.NODE_ENV;
  const port = process.env.SERVER_PORT;
  const aiApiKey = process.env.AI_API_KEY;
  const aiModels = process.env.AI_MODELS;

  if (!nodeEnv) {
    throw new Error("Missing required environment variable: NODE_ENV");
  }

  if (!port) {
    throw new Error("Missing required environment variable: SERVER_PORT");
  }

  if (!aiApiKey) {
    throw new Error("Missing required environment variable: AI_API_KEY");
  }

  if (!aiModels) {
    throw new Error("Missing required environment variable: AI_MODELS");
  }

  return {
    server: {
      nodeEnv: nodeEnv as EnvGlobalConfig["server"]["nodeEnv"],
      port: Number.parseInt(port, 10),
      aiApiKey,
      aiModels,
    },
  };
}
