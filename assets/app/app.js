// This file is for loading the backend app

steal("assets/vendor/jquery", "assets/vendor/lodash").then("assets/vendor/backbone", "theme/backend").then("assets/yabe").then(function () {
    // Create app namespace
    var Bloggupy = {
        Models: {},
        Collections: {},
        Views: {},
        Mixins: {},
        App: {
            // Stores the active view
            view: null,
            $main: $("#content"),
            init: function () {
                if (false && window.USER && window.USER.loggedin === true) {
                    this.login()
                } else {
                    this.setView(new Bloggupy.Views.LoginView({
                        el: $("#loginForm")[0]
                    }))
                }
            },
            login: function () {

            },
            setView: function (view) {
                // Removes old view
                if (this.view instanceof Backbone.View) {
                    this.view.remove()
                }
                // Set new view
                this.view = view
                // ..and render it
                this.$main.append(this.view.render().el)

            },
            apiUrl: function (api) {
                return API + api
            }
        }
    }



    Bloggupy.Models.User = Backbone.Model.extend({
        initialize: function () {

        },
        urlRoot: Bloggupy.App.apiUrl("User/me/")
    })

    // The login screen
    Bloggupy.Views.LoginView = Backbone.View.extend({
        events: {
            "submit": function (event) {
                // Do not submit loginform
                event.preventDefault()
                new Bloggupy.Models.User({
                    name: this.$("#name").val(),
                    password: this.$("#password").val()
                }).on("sync", this.login, this).on("error", this.error, this).save()
            }
        },
        initialize: function () {
        },
        render: function () {
            this.$("#submitLogin").prop("disabled", false)
            return this
        },
        login: function () {

        },
        error: function () {
            this.$("input").val("")
            this.message("loginFail")
        },
        // TODO: modularize messages
        readMessage: function (message) {
            return "Login fehlgeschlagen! Bitte probiere es erneut!"
        }
    })

    // Map over to global
    window.Bloggupy = Bloggupy
    window.App = Bloggupy.App

})
