import { tool } from "ai";
import { z } from "zod";

export const getDateTime = tool({
  description:
    "return the current date and time. Useful for when you need current date and time",
  inputSchema: z.object({}), //* what does this thing takes, exmp: tz: z.string().describe("the timezone")
  execute: async () => {
    return new Date().toISOString();
  },
});
