import { tools } from "./tools/index.ts";

export type ToolName = keyof typeof tools;

export const executeTools = async (name: ToolName, args: any) => {
  const tool = tools[name];

  if (!tool) {
    return "Sorry, this tool is not ready yet, use something else. Let the user know that.";
  }

  const execute = tool.execute!;

  const result = await execute(args as any, {
    toolCallId: "",
    messages: [],
  });

  return String(result);
};
