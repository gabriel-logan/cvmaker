import { Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import type { NestExpressApplication } from "@nestjs/platform-express";

import { AppModule } from "./app.module";
import type { EnvGlobalConfig } from "./configs/env.global";

const logger = new Logger("Bootstrap");

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const configService = app.get(ConfigService<EnvGlobalConfig, true>);

  const { nodeEnv, port } = configService.get("server", { infer: true });

  if (nodeEnv === "production") {
    app.set("trust proxy", true);
  }

  await app.listen(port);

  logger.log(
    `Application running in ${nodeEnv} mode on http://localhost:${port}`,
  );
}

void bootstrap();
