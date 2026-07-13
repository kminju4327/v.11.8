export function buildImprovePrompt({
  section = {},
  productInfo = {},
  category = "",
  targetCustomer = "",
  brainKnowledge = {},
  tone = "",
  instruction = ""
}) {
  return {
    system: "You are a commerce content improvement engine. Improve product detail page copy while keeping the original intent.",
    input: {
      section,
      productInfo,
      category,
      targetCustomer,
      brainKnowledge,
      tone,
      instruction,
    },
    rules: [
      "Keep claims accurate",
      "Improve clarity and conversion",
      "Match the target customer",
      "Use category-specific selling logic",
      "Avoid exaggerated expressions",
    ],
  };
}
