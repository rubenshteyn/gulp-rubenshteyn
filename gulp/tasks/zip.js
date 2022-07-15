import del from "del"
import zipPlugin from 'gulp-zip'
export const zip = () => {
    del(`./${app.path.rootFolder}.zip`)
    return app.Gulp.src(`${app.path.buildFolder}/**/*.*`, {})
    .pipe(app.plugins.plumber(
        app.plugins.notify.onError({
            title: "ZIP",
            message: "Error <%= error.message %>"
        }))
    )
    .pipe(zipPlugin(`${app.path.rootFolder}.zip`))
    .pipe(app.Gulp.dest('./'))
}