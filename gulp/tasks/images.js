import webp from "gulp-webp"
import imagemin from "gulp-imagemin"

export const images = () => {
    return app.Gulp.src(app.path.src.images)
    .pipe(app.plugins.plumber(
        app.plugins.notify.onError({
            title: "IMAGES",
            message: "Error <%= error.message %>"
        })
    ))
    .pipe(app.plugins.newer(app.path.build.images))
    .pipe(
        app.plugins.if(
            app.isBuild,
            webp()
        )
    )
    .pipe(
        app.plugins.if(
            app.isBuild,
            app.Gulp.dest(app.path.build.images)
        )
    )
    .pipe(
        app.plugins.if(
            app.isBuild,
            app.Gulp.src(app.path.src.images)
        )
    )
    .pipe(
        app.plugins.if(
            app.isBuild,
            imagemin({
                progessive: true,
                svgoPlugins: [{ removeViewBox: false }],
                interlaced: true,
                optimizationLevel: 3 // 0 to 7
            })
        )
    )
    .pipe(app.Gulp.dest(app.path.build.images))
    .pipe(app.Gulp.src(app.path.src.svg))
    .pipe(app.Gulp.dest(app.path.build.images))
    .pipe(app.plugins.browsersync.stream())
}