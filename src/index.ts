import { Context, Schema, Service } from "koishi";
import type { Font, FontWeight, FontStyle } from "satori";
import fs from "node:fs/promises";
import path from "node:path";
// noinspection ES6UnusedImports
import {} from "koishi-plugin-vercel-satori-png-service";

const serviceName = "vercelSatoriPngServiceFontHonorSansCn";

class VercelSatoriPngServiceFontHonorSansCn extends Service {
  private _ctx: Context;
  constructor(
    ctx: Context,
    config: VercelSatoriPngServiceFontHonorSansCn.Config,
  ) {
    super(ctx, serviceName);
    this._ctx = ctx;
  }

  protected async start(): Promise<void> {
    await this.initFonts();
  }
  private async initFonts() {
    const fonts: Font[] = [];
    for (let i = 0; i < this.fontNames.length; i++) {
      const fontName = this.fontNames[i];
      fonts.push({
        name: "HONOR Sans CN",
        weight: ((i + 1) * 100) as FontWeight,
        style: "normal" as FontStyle,
        data: await fs.readFile(
          path.join(__dirname, `../fonts/HONORSansCN-${fontName}.ttf`),
        ),
      });
    }
    this._ctx.vercelSatoriPngService.addFont(fonts);
  }

  private fontNames: string[] = [
    "Thin",
    "ExtraLight",
    "Light",
    "Regular",
    "Medium",
    "DemiBold",
    "Bold",
    "ExtraBold",
    "Heavy",
  ];
}

namespace VercelSatoriPngServiceFontHonorSansCn {
  export const inject = ["vercelSatoriPngService"];

  export const usage =
    '<a target="_blank" href="https://developer.honor.com/cn/doc/guides/100681">HONOR Sans CN</a>';
  export interface Config {}
  export const Config: Schema<Config> = Schema.object({});
}
export default VercelSatoriPngServiceFontHonorSansCn;
