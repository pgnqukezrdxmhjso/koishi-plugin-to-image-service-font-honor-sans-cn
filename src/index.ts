import path from "node:path";
import { Context, Schema, Service } from "koishi";
// noinspection ES6UnusedImports
import {} from "koishi-plugin-to-image-service";

const serviceName = "toImageServiceFontHonorSansCn";

class ToImageServiceFontHonorSansCn extends Service {
  private _ctx: Context;
  constructor(ctx: Context, config: ToImageServiceFontHonorSansCn.Config) {
    super(ctx, serviceName);
    this._ctx = ctx;
  }

  async start(): Promise<void> {
    const fonts = await this._ctx.toImageService.fontManagement.loadFontDir([
      path.resolve(__dirname, "../fonts"),
    ]);
    this._ctx.on("dispose", () => {
      this._ctx.toImageService.fontManagement.removeFont(fonts);
    });
  }
}

namespace ToImageServiceFontHonorSansCn {
  export const inject = ["toImageService"];

  export const usage =
    '<a target="_blank" href="https://developer.honor.com/cn/doc/guides/100681">HONOR Sans CN</a>';
  export interface Config {}
  export const Config: Schema<Config> = Schema.object({});
}
export default ToImageServiceFontHonorSansCn;
