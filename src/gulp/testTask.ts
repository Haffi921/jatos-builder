import gulp from "gulp";

function testTask(cb: Function) {
  console.log("Hello Gulp");
  cb();
}

gulp.task("test", testTask);
