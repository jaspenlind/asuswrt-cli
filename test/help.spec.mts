import { help } from "../src/lib/help.mjs";
import { parse } from "../src/lib/parsers/command.parser.mjs";

describe("help", () => {
  it("can show global help", () => {
    const messages: string[] = [];

    console.log = jest.fn((message: string) => {
      messages.push(message);
    });

    help();

    expect(messages).not.toBeEmpty();
  });

  it("can show root command help", async () => {
    const command = await parse("info");

    const messages: string[] = [];

    console.log = jest.fn((message: string) => {
      messages.push(message);
    });

    help(command);

    const commands = messages.find((x) => x.match("commands"));
    const uptime = messages.find((x) => x.match("uptime"));

    expect(commands).toBeDefined();
    expect(uptime).toBeDefined();
  });

  it("can show sub command help", async () => {
    const command = await parse("info", "uptime");

    const messages: string[] = [];

    console.log = jest.fn((message: string) => {
      messages.push(message);
    });

    help(command);

    const commands = messages.find((x) => x.match("commands"));
    const uptime = messages.find((x) => x.match("uptime"));

    expect(commands).toBeUndefined();
    expect(uptime).toBeDefined();
  });
});
