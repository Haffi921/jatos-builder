import { initJsPsych } from "jspsych";

import ExternalHtmlPlugin from "@jspsych/plugin-external-html";

function run() {
  const jsPsych = initJsPsych({
    on_finish() {
      if (jatos) {
        jatos.startNextComponent(null, "Accepted");
      } else {
        require("experiment/index");
      }
    },
  });

  const timeline = [
    {
      type: ExternalHtmlPlugin,
      url: "informedConsent.html",
      force_refresh: true,
      cont_btn: "start",
      check_fn: function () {
        if (document.getElementById("consent_y").checked) {
          return true;
        }
        if (document.getElementById("consent_n").checked) {
          jatos.endStudy(false, "Consent Declined");
        }
      },
    },
  ];

  jsPsych.run(timeline);
}

if (jatos) {
  jatos.onLoad(run);
} else {
  run();
}
