import { buildImprovePrompt } from "./improvePromptEngine";
import { callClaude } from "../../services/claudeClient";

export function runAIImproveEngine({section={}, productInfo={}, category="", targetCustomer="", brainKnowledge={}, tone="", instruction=""}={}) {
  const prompt = buildImprovePrompt({section, productInfo, category, targetCustomer, brainKnowledge, tone, instruction});

  return {
    prompt,
    result: {
      title: `${section.title || ""}${instruction ? ` (${instruction})` : ""}`,
      body: section.body || "",
      generatedBy: "aiImproveEngine"
    }
  };
}


export async function runAIImproveEngineAsync({
  section = {},
  productInfo = {},
  category = "",
  targetCustomer = "",
  brainKnowledge = {},
  tone = "",
  instruction = ""
} = {}) {
  const prompt = buildImprovePrompt({
    section,
    productInfo,
    category,
    targetCustomer,
    brainKnowledge,
    tone,
    instruction
  });

  const result = await callClaude(
    prompt,
    1200,
    { product: productInfo },
    "regenerate"
  );

  return {
    prompt,
    result: {
      ...result,
      generatedBy: "aiImproveEngineAsync"
    }
  };
}
