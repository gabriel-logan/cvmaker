import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import OpenAI from "openai";
import type { EnvGlobalConfig } from "src/configs/env.global";

@Injectable()
export class AiService {
  private readonly openai: OpenAI;
  private readonly model: string;

  constructor(private readonly configService: ConfigService<EnvGlobalConfig>) {
    const serverConfig = this.configService.get("server", { infer: true })!;

    this.openai = new OpenAI({
      apiKey: serverConfig.aiApiKey,
      baseURL: serverConfig.aiBaseUrl,
    });

    this.model = serverConfig.aiModels[0] ?? "gpt-4o";
  }

  async generateTemplate(
    prompt: string,
    cvData: Record<string, unknown>,
  ): Promise<string> {
    const systemPrompt = `You are a professional CV/resume HTML template generator.

Generate a complete, standalone HTML document for a CV template based on the user's style description and the provided CV data.

REQUIREMENTS:
- Return ONLY valid HTML. No markdown, no explanations, no code fences.
- The HTML must be A4 sized (210mm × 297mm) with proper @page CSS rule.
- Use embedded <style> tags for all CSS. No external dependencies.
- Use professional typography, spacing, and colors.
- Include ALL sections from the CV data that have content.
- Handle empty sections gracefully (skip them entirely).
- The design must be print-friendly and responsive.
- Use the CV data values directly — do not use placeholder text.
- IMPORTANT: The entire output must be a single valid HTML document starting with <!DOCTYPE html>.

CV Data:
${JSON.stringify(cvData, null, 2)}

User's template description: ${prompt}`;

    try {
      const response = await this.openai.chat.completions.create({
        model: this.model,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: "Generate the HTML template now." },
        ],
        temperature: 0.7,
        max_tokens: 8192,
      });

      const content = response.choices[0]?.message?.content;

      if (!content) {
        throw new InternalServerErrorException(
          "AI returned an empty response.",
        );
      }

      let html = content.trim();

      if (html.startsWith("```")) {
        html = html.replace(/^```(?:html)?\n?/, "").replace(/\n?```$/, "");
      }

      if (!html.startsWith("<!DOCTYPE html") && !html.startsWith("<html")) {
        html = `<!DOCTYPE html>\n${html}`;
      }

      return html;
    } catch (error) {
      if (error instanceof InternalServerErrorException) {
        throw error;
      }

      throw new InternalServerErrorException(
        `Failed to generate template: ${(error as Error).message}`,
      );
    }
  }
}
