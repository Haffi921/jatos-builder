import { Command } from "commander";
import { callTask } from "../util/call-task";
import "../gulp/testTask";

const hello = new Command("hello");

hello
  .description("Say hello")
  .argument("[name]", "Name to greet")
  .action((name) => {
    if (name) console.log(`Hello, ${name}`);
    else callTask("test");
  });

export default hello;
