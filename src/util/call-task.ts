import gulp from "gulp";

const defaultCB: gulp.TaskFunctionCallback = (err) => {
  if (err) console.error(err);
};

export function callTask(task: string, cb?: gulp.TaskFunctionCallback) {
  const taskFunction = gulp.task(task);
  if (taskFunction) {
    return taskFunction(cb ? cb : defaultCB);
  }
}
