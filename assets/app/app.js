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
            $navbar: $("#navbar"),
            // Stores the router
            router: null,
            // Store the active user
            user: null,
            init: function () {
                // Create router
                this.router = new Bloggupy.Router()
                // Create navbar view
                this.navbar = new Bloggupy.Views.NavbarController({
                    el: this.$navbar[0],
                    router: this.router
                })
                this.navbar.push({
                    uri: "logout",
                    text: "Ausloggen"
                }, {
                    uri: "dashboard",
                    text: "Dashboard"
                })
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
        loginForm: Tpl.loginForm,
        render: function () {
            this.$el.html(this.loginForm())
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
        template: Tpl.dashboard,
        render: function () {
            this.$el.html(this.template())
            return this
        }
    })
    // The view for the navbar
    Bloggupy.Views.NavbarController = Backbone.View.extend({
        events: {
            "click a": "navigate"
        },
        // Triggered on every click on a navlink
        navigate: function (event) {
            event.preventDefault()
            this.router.navigate($(event.target).attr("href"), {
                trigger: true
            })
        },
        initialize: function (options) {
            // Stores every single link
            this.items = {}
            this.router = options.router
        },
        singleNavItem: Tpl.singleNavItem,
        render: function () {
            var html = ""
                , i, curr
            for (i in this.items) {
                curr = this.items[i]
                html += this.singleNavItem(curr.uri, curr.text, curr.title)
            }
            this.$el.html(html)
            return this
        },
        push: function (obj) {
            // Do we have multiple objects?
            if (obj && typeof obj === 'object' && !_.isString(obj)) {
                for (var i = 0, len = arguments.length, curr; i < len; i++) {
                    curr = arguments[i]
                    this._push.call(this, curr.uri, curr.text, curr.title)
                }
            } else {
                this._push.apply(this, arguments)
            }
            // Navbar is so small that we can completely rerender it
            return this.render()
        },
        _push: function (uri, text, title) {
            this.items[uri] = {
                uri: uri,
                text: text,
                title: title
            }
        },
        unlink: function (uri) {
            for (var i = 0, len = arguments.length, curr; i < len; i++) {
                curr = arguments[i]
                this.items[curr] && delete this.items[curr]
            }
            return this.render()
        }
    })

    // Map over to global
    window.Bloggupy = Bloggupy
    window.App = Bloggupy.App

})
