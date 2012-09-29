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
            // Stores the router
            router: null,
            // Store the active user
            user: null,
            init: function () {
                // Create router
                this.router = new Bloggupy.Router()
                // Start history
                Backbone.history.start()
            },
            login: function (user) {
                this.user = user
                // Navigate to dashboard
                this.router.navigate("dashboard", {
                    trigger: true
                })
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
            },
            logout: function () {
                // Remove all events from user
                this.user.off()
                // Clear reference
                this.user = null
                console.log(window.USER)
                // Go to home screen
                this.router.navigate("init", {
                    trigger: true
                })
            }
        }
    }

    /**
     *
     * @class Bloggupy.Router
     */
    Bloggupy.Router = Backbone.Router.extend({
        routes: {
            // Simply logs the user out
            "logout": "logout",
            // The main screen after logging in
            "dashboard": "dashboard",
            // Empty route as an alias for init
            "": "init",
            "init": "init"
        },
        logout: function () {
            App.user.destroy({
                error: function () {
                    // TODO: better display method
                    alert("Du konntest nicht ausgeloggt werden!")
                },
                success: function () {
                    App.logout()
                }
            })
        },
        dashboard: function () {
            App.setView(new Bloggupy.Views.Dashboard())
        },
        init: function () {
            if (window.USER && window.USER.loggedin === true) {
                App.login(new Bloggupy.Models.User(window.USER))
                // Delete user
                delete window.USER
                return
            }
            App.setView(new Bloggupy.Views.LoginView)
        }
    })


    Bloggupy.Models.User = Backbone.Model.extend({
        initialize: function () {

        },
        urlRoot: Bloggupy.App.apiUrl("User/me/")
    })

    // The login screen
    Bloggupy.Views.LoginView = Backbone.View.extend({
        events: {
            "submit form": function (event) {
                // Do not submit loginform
                event.preventDefault()
                // Create user model
                this.model = new Bloggupy.Models.User({
                    name: this.$("#name").val(),
                    password: this.$("#password").val()
                }).on("sync", this.login, this).on("error", this.error, this)
                // Save user to check data
                this.model.save()
            }
        },
        initialize: function () {
        },
        render: function () {
            this.$el.html('<form id="loginForm" action="#">'+
                '<fieldset class="control-group">' +
                    '<legend>Einloggen</legend>'+
                    '<label for="name">Name:</label><input type="text" name="name" id="name" autofocus="on" />' +
                    '<label for="password">Passwort:</label><input type="password" name="password" id="password" />' +
                '</fieldset>' +
                '<fieldset class="control-group buttonAndMessage">' +
                    '<button type="submit" class="btn" id="submitLogin">Einloggen</button>' +
                    '<div class="statusField help-block"></div>' +
                '</fieldset>' +
                '</form>')
            return this
        },
        login: function () {
            Bloggupy.App.login(this.model)
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
    // The start page for every login
    Bloggupy.Views.Dashboard = Backbone.View.extend({
        initialize: function () {

        },
        render: function () {
            this.$el.html("<h1>Dashboard</h1><a href='#logout'>Ausloggen</a>")
            return this
        }
    })

    // Map over to global
    window.Bloggupy = Bloggupy
    window.App = Bloggupy.App

})
