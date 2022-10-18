import gulp from "gulp";

const default_cb: gulp.TaskFunctionCallback = (err) => {
  if (err) console.error(err);
};

export function call_task(task: string, cb?: gulp.TaskFunctionCallback) {
  const taskFunction = gulp.task(task);
  if (taskFunction) {
    return taskFunction(cb ? cb : default_cb);
  }
}
