import { Logger, ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import type { NestExpressApplication } from "@nestjs/platform-express";
import helmet from "helmet";

import { AppModule } from "./app.module";
import type { EnvGlobalConfig } from "./configs/env.global";
import swaggerInitializer from "./configs/swagger";
import { fallbackSpaMiddleware } from "./middleware/fallbackSpaMiddleware";
import { apiPrefix, clientDistPath } from "./shared/constants";

const logger = new Logger("Bootstrap");

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const configService = app.get(ConfigService<EnvGlobalConfig, true>);

  const { nodeEnv, port } = configService.get("server", { infer: true });

  if (nodeEnv === "production") {
    app.use(helmet());

    app.set("trust proxy", true);
  } else {
    app.enableCors({
      origin: "*",
    });
  }

  app.useStaticAssets(clientDistPath);

  app.use(fallbackSpaMiddleware);

  app.setGlobalPrefix(apiPrefix);

  swaggerInitializer(app);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  await app.listen(port);

  logger.log(
    `Application running in ${nodeEnv} mode on http://localhost:${port}`,
  );
}

void bootstrap();
