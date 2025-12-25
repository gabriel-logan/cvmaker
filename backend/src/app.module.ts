import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { join } from "path";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import envGlobal from "./configs/env.global";
import { CvsModule } from "./cvs/cvs.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [envGlobal],
      envFilePath: [join(__dirname, "..", "..", ".env")],
    }),
    CvsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
