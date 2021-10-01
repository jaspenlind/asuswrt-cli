import help from "../src/lib/help";
import parser from "../src/lib/parsers/command.parser";

describe("help", () => {
  it("can show global help", () => {
    const messages: string[] = [];

    console.log = jest.fn((message: string) => {
      messages.push(message);
    });

    help();

    expect(messages).not.toBeEmpty();
  });

  it("can show root command help", () => {
    const command = parser("info").find();

    const messages: string[] = [];

    console.log = jest.fn((message: string) => {
      messages.push(message);
    });

    help(command);

    const commands = messages.find(x => x.match("commands"));
    const uptime = messages.find(x => x.match("uptime"));

    expect(commands).toBeDefined();
    expect(uptime).toBeDefined();
  });

  it("can show sub command help", () => {
    const command = parser("info", "uptime").find();

    const messages: string[] = [];

    console.log = jest.fn((message: string) => {
      messages.push(message);
    });

    help(command);

    const commands = messages.find(x => x.match("commands"));
    const uptime = messages.find(x => x.match("uptime"));

    expect(commands).toBeUndefined();
    expect(uptime).toBeDefined();
  });
});
