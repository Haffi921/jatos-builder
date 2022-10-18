import { Command } from "commander";
import { createPromptModule, Question } from "inquirer";

const create = new Command("create");

const questions: Question[] = [{}];

create
  .description("Create a new JATOS/JsPsych experiment")
  // .argument("[name]", "Name of the experiment")
  .action((name) => {
    // create();
  });

export default create;
