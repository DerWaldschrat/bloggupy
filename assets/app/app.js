// This file is for loading the backend app

steal("assets/vendor/jquery", "assets/vendor/lodash").then("assets/vendor/backbone", "theme/backend").then("assets/yabe").then(function () {
    // Create app namespace
    var Bloggupy = {
        Models: {},
        Collections: {},
        Views: {},
        Mixins: {},
        App: {}
    }

    _.extend(Bloggupy.App, {
        init: function () {

        }
    })

    // Map over to global
    window.Bloggupy = Bloggupy
    window.App = Bloggupy.App

})
