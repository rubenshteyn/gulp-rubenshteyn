import Gulp from "gulp";
// импорт путей
import { path } from "./gulp/config/path.js";
// импорт общих плагинов
import { plugins } from "./gulp/config/plugins.js"
// локальный сервер
// import { server } from "./gulp/tasks/server.js"


global.app = {
    isBuild: process.argv.includes('--build'),
    isDev: !process.argv.includes('--build'),
    path: path,
    Gulp: Gulp,
    plugins: plugins,
}

// импорт задач
import { copy } from "./gulp/tasks/copy.js";
import { reset } from "./gulp/tasks/reset.js";
import { html } from "./gulp/tasks/html.js";
import { server } from "./gulp/tasks/server.js";
import { scss } from "./gulp/tasks/scss.js";
import { js } from "./gulp/tasks/js.js"
import { images } from "./gulp/tasks/images.js";
import { otfToTtf, ttfToWoff, fontsStyle } from "./gulp/tasks/fonts.js";
import { svgSprive } from "./gulp/tasks/svgSprive.js";
import { zip } from "./gulp/tasks/zip.js";

// наблюдатель за изм-ми в файлах
function watcher() {
    Gulp.watch(path.watch.files, copy)
    Gulp.watch(path.watch.html, html)
    Gulp.watch(path.watch.scss, scss)
    Gulp.watch(path.watch.js, js)
    Gulp.watch(path.watch.images, images)
}

export { svgSprive }

const fonts = Gulp.series(otfToTtf, ttfToWoff, fontsStyle)

const mainTasks = Gulp.series(fonts, Gulp.parallel(copy, html, scss, js, images))

// построение сценариев вып-я задач
const dev = Gulp.series(reset, mainTasks, Gulp.parallel(watcher, server))
const build = Gulp.series(reset, mainTasks)
const deployZIP = Gulp.series(reset, mainTasks, zip)

// экспорт сценариев
export { dev }
export { build }
export { deployZIP }

// выполнение сценария по умолчанию
Gulp.task('default', dev)