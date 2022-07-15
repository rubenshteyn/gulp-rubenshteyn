import svgSprite from 'gulp-svg-sprite'
export const svgSprive = () => {
    return app.Gulp.src(`${app.path.src.svgicons}`, {})
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "SVG",
                message: "Error <%= error.message %>"
            })
        ))
        .pipe(svgSprite({
            mode: {
                stack: {
                    sprite: '../icons.svg',
                    example: true
                }
            }
        }))
        .pipe(app.Gulp.dest(`${app.path.build.images}`))
}