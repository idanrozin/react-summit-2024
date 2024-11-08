import { ChatLLM } from './ChatLLM';
import { Tool } from './types';

const OBSERVATION_TOKEN = 'Observation:';

const PROMPT_TEMPLATE = `Today is {today} and you can use tools to get new information. Answer the question as best as you can using the following tools:

{tool_description}

Use the following format:

Question: the input question you must answer
Thought: comment on what you want to do next
Action: the action to take, exactly one element of [{tool_names}]
Action Input: the input to the action
Observation: the result of the action
... (this Thought/Action/Action Input/Observation repeats N times, use it until you are sure of the answer)
Thought: I now know the final answer
Final Answer: your final answer to the original input question

please use the exact format given above, no more, no less.
Don't forget to use "Final Answer:" when you have the final answer - as the format above requires.


Begin!

Question: {question}
Thought: {previous_responses}
`;

export class Agent {
  private llm: ChatLLM;
  private tools: Tool[];
  private promptTemplate: string;
  private maxLoops: number;
  private stopPattern: string[];

  constructor(
    llm: ChatLLM,
    tools: Tool[],
    promptTemplate: string = PROMPT_TEMPLATE,
    maxLoops = 15,
    // The stop pattern is used, so the LLM does not hallucinate until the end
    stopPattern: string[] = [`\n${OBSERVATION_TOKEN}`, `\n\t${OBSERVATION_TOKEN}`],
  ) {
    this.llm = llm;
    this.tools = tools;
    this.promptTemplate = promptTemplate;
    this.maxLoops = maxLoops;
    this.stopPattern = stopPattern;
  }

  private get toolDescription(): string {
    return this.tools.map((tool) => `${tool.name}: ${tool.description}`).join('\n');
  }

  private get toolNames(): string {
    return this.tools.map((tool) => tool.name).join(',');
  }

  private get toolByNames(): { [key: string]: Tool } {
    return Object.fromEntries(this.tools.map((tool) => [tool.name, tool]));
  }

  async run(question: string): Promise<string> {
    const previousResponses: string[] = [];
    const numLoops = 0;
    const prompt = this.promptTemplate
      .replace('{today}', new Date().toISOString().split('T')[0])
      .replace('{tool_description}', this.toolDescription)
      .replace('{tool_names}', this.toolNames)
      .replace('{question}', question);

    // TODO: implement
    throw new Error('Not implemented');
  }
}
