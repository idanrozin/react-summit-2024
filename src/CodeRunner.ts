type Args = Map<string, unknown>;

interface JavascriptCodeRunnerConstructor {
  globals?: Args;
  locals?: Args | null;
}

class JavascriptCodeRunner {
  private _globals: Args;
  private _locals: Args | null;

  constructor({ globals = new Map(), locals = new Map() }: JavascriptCodeRunnerConstructor) {
    this._globals = globals;
    this._locals = locals;
  }

  run(command: string): string {
    const oldConsoleLog = console.log;
    let output = '';
    console.log = (...args) => {
      output += args.join(' ') + '\n';
    };

    try {
      // Note: This is a simplified version. In Javascript, we can't directly
      // execute arbitrary code like in Python's exec().
      // You might need to use a JavaScript runtime or interpreter here.
      eval(command);
    } catch (e) {
      output = String(e);
    } finally {
      console.log = oldConsoleLog;
    }

    return output;
  }
}

// a helper function to clean the code from the user input the tool is used with
const cleanCode = (str: string): string => {
  const prefix = '```javascript\n';
  const suffix = '```';

  if (str.startsWith(prefix) && str.endsWith(suffix)) {
    return str.slice(prefix.length, -suffix.length);
  }
  return str;
};
