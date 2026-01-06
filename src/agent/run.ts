// Basic agent

// import "dotenv/config";

// import { generateText, type ModelMessage } from "ai";
// import { openai } from "@ai-sdk/openai";
// import { SYSTEM_PROMPT } from "./system/prompt";
// import type { AgentCallbacks } from "../types";

// const MODEL_NAME = "gpt-5-mini";

// export const runAgent = async (
//   userMessage: string,
//   conversationHistory: ModelMessage[],
//   callbacks: AgentCallbacks
// ) => {
//   const { text } = await generateText({
//     model: openai(MODEL_NAME),
//     prompt: userMessage,
//     system: SYSTEM_PROMPT,
//   });

//   console.log(text);
// };

// runAgent("hi my name is max");

//* Agent with tools
import "dotenv/config";
import { generateText, stepCountIs, tool, type ModelMessage } from "ai";
import { openai } from "@ai-sdk/openai";
import { tools } from "./tools/index.ts";
import { SYSTEM_PROMPT } from "./system/prompt.ts";

import type { AgentCallbacks } from "../types.ts";
import { executeTools } from "./executeTool.ts";

const MODEL_NAME = "gpt-5-mini";

export const runAgent = async (
  userMessage: string,
  conversationHistory: ModelMessage[],
  callbacks: AgentCallbacks
) => {
  const { text, toolCalls } = await generateText({
    model: openai(MODEL_NAME),
    prompt: userMessage,
    system: SYSTEM_PROMPT,
    tools: tools,
    stopWhen: stepCountIs(1),
  });

  console.log(text);
  toolCalls.forEach(async (tc) => {
    const result = await executeTools(tc.toolName as any, tc.input);
    console.log(`Tool ${tc.toolName} returned: ${result}`);
  });
};

runAgent("hi get the current time");
