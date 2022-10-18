import {
  mkdir,
  stat,
  readFile,
  writeFile,
  copyFile,
  readdir,
} from "fs/promises";
import { resolve, dirname } from "path";

export async function item_exists(file_path: string): Promise<boolean> {
  return stat(file_path)
    .then(() => true)
    .catch(() => false);
}

export async function create_folder(folder_path: string): Promise<string> {
  return mkdir(folder_path, { recursive: true });
}

export async function get_directory_items(
  folder_path: string
): Promise<string[]> {
  return readdir(folder_path).then(async (folder) => {
    return await folder.reduce(async (folder_arr_p, item) => {
      const folder_arr = await folder_arr_p;
      const item_stat = await stat(`${folder_path}/${item}`);
      if (item_stat.isDirectory()) {
        folder_arr.push.apply(
          folder_arr,
          await get_directory_items(`${folder_path}/${item}`)
        );
      } else {
        folder_arr.push(resolve(`${folder_path}/${item}`));
      }
      return folder_arr;
    }, Promise.resolve([]));
  });
}

export async function add_to_json(
  file_path: string,
  items: Object
): Promise<void> {
  return readFile(file_path, { encoding: "utf-8" })
    .then((file) => JSON.parse(file))
    .then((json_file) => {
      Object.entries(items).forEach(([key, value]) => {
        json_file[key] = value;
      });
      return json_file;
    })
    .then((json_file) =>
      writeFile(file_path, JSON.stringify(json_file, null, 2))
    );
}

export async function copy_asset(asset: string, dest: string): Promise<void> {
  const asset_path = resolve(asset);
  const asset_exists = await item_exists(asset_path);
  if (!asset_exists) {
    return Promise.reject("Asset doesn't exist");
  }
  const dest_path = resolve(dest);
  const dest_exists = await item_exists(dirname(dest_path));
  if (!dest_exists) {
    create_folder(dirname(dest_path));
  }
  return copyFile(asset_path, dest_path);
}

export async function copy_assets(assets: string[], dest: string[]) {
  return assets.map((asset, index) => {
    return copy_asset(asset, dest[index]);
  });
}
