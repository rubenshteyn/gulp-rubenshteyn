export const copy = () => {
    return app.Gulp.src(app.path.src.files)
        .pipe(app.Gulp.dest(app.path.build.files))
}