import { initJsPsych } from "jspsych";

async function run() {
  const jsPsych = initJsPsych({
    on_finish() {
      if (jatos) {
        jatos
          .submitResultData(jsPsych.data.get().csv())
          .then(() => jatos.endStudy());
      } else {
        console.log(jsPsych.data.get().csv());
      }
    },
  });

  const timeline = [];

  await jsPsych.run(timeline);
}

if (jatos) {
  jatos.onLoad(run);
} else {
  run();
}
