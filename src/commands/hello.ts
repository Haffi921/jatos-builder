import { Command } from "commander";
import { call_task } from "../util/call_task";
import "../gulp/testTask";

const hello = new Command("hello");

hello
  .description("Say hello")
  .argument("[name]", "Name to greet")
  .action((name) => {
    if (name) console.log(`Hello, ${name}`);
    else call_task("test");
  });

export default hello;
