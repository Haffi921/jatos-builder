#!/usr/bin/env node

import { program } from "commander";
import { name, description, version } from "../package.json";
import hello from "./commands/hello";

program.name(name).description(description).version(version);

program.addCommand(hello);

program.parse();
