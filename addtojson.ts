import { get_directory_items } from "./src/util/os_actions";

const package_list: string[] = [
  "jspsych",
  "@jspsych/plugin-browser-check",
  "@jspsych/plugin-external-html",
  "@jspsych/plugin-fullscreen",
  "@jspsych/plugin-html-keyboard-response",
];

async function get_latest_version(packageName: string) {
  return fetch("https://registry.npmjs.org/" + packageName + "/latest").then(
    async (res) => {
      const body = await res.json();
      // @ts-ignore
      return body.version;
    }
  );
}

async function create_npm_list(package_list: string[]) {
  const npm_list = {};
  const package_list_promises = package_list.map(async (pkg) => {
    return get_latest_version(pkg).then((version) => {
      npm_list[pkg] = version;
    });
  });
  return Promise.all(package_list_promises).then(() => npm_list);
}

create_npm_list(package_list).then((list) => {
  console.log(list);
});
