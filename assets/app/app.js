// This file is for loading the backend app

steal("assets/vendor/jquery", "assets/vendor/lodash").then("assets/vendor/backbone", "theme/backend", "assets/collections").then("assets/yabe", "assets/app/pluginlist").then(function () {
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
            // Directly invoked after declaration
            preload: function () {
                // Create router
                this.router = new Bloggupy.Router()
                // Create navbar view
                this.navbar = new Bloggupy.Views.NavbarController({
                    el: this.$navbar[0],
                    router: this.router,
                    delayed: true
                }).push({ // Insert link to dashboard
                    uri: "dashboard",
                    text: "Dashboard"

                })
                // Init plugins
                this.initPlugins()
            },
            init: function () {
                // Define logout link
                this.navbar.push({ // Spacer between main bar and logout screen
                    uri: "spacer",
                    id: "logoutSpacer"
                },{
                    uri: "logout",
                    text: "Logout"
                })
                // Start history
                Backbone.history.start()
                // If we are not on the startpage, navigate to startpage to trigger login
                if (window.USER && window.USER.loggedin) {
                    App.login(new Bloggupy.Models.User(window.USER))
                    delete window.USER
                }
            },
            login: function (user) {
                this.user = user
                // Start navbar
                this.navbar.start()
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
                this.navbar.stop()
                this.router.navigate("init", {
                    trigger: true,
                    replace: true
                })

            },
            // Used to init all plugins
            initPlugins: function () {
                var i, curr
                for (i in PLUGINS) {
                    curr = PLUGINS[i]
                    // Add plugin
                    this._addPlugin(curr)
                }
            },
            // Adds the plugins
            _addPlugin: function (curr) {
                var j, route
                // Exec plugin preload function
                curr.exec(this)
                for (j in curr.routes) {
                    route = curr.routes[j]
                    this.makeNewRoute(route.route, route.route, j, route.afterLoad)
                }
            },
            // Creates a new route which executes the file send in
            makeNewRoute: function (name, route, file, fn, forAll) {
                var self = this
                this.router.route(name, route, function () {
                    steal("assets/app/plugins/" + file).then(function () {
                        fn()
                    })
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
            Bloggupy.App.router.navigate("dashboard", {
                trigger: true
            })
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
        },
        // Adds a widget to this dashboard
        addWidget: function (widget) {

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
            this.items = new collections.LinkedHashMap()
            this.router = options.router
            // Hide if delayed
            if (this.options.delayed) {
                this.stop()
            }
        },
        singleItem: Tpl.nav.item,
        header: Tpl.nav.header,
        spacer: Tpl.nav.spacer,
        render: function () {
            var html = ""
                , i = 0, values = this.items.values(), len = values.length, curr
            for (; i < len; i++) {
                curr = values[i]
                if (curr.uri == "header") {
                    html += this.header(curr.text, curr.title)
                } else if (curr.uri == "spacer") {
                    html += this.spacer()
                } else {
                    html += this.singleItem(curr.uri, curr.text, curr.title)
                }
            }
            this.$el.html(html)
            return this
        },
        push: function (obj) {
            // Do we have multiple objects?
            if (obj && typeof obj === 'object' && !_.isString(obj)) {
                for (var i = 0, len = arguments.length, curr; i < len; i++) {
                    curr = arguments[i]
                    // You can leave out the id if you use objects
                    if (!curr.id) {
                        curr.id = curr.uri
                    }
                    this._push.call(this, curr.id, curr.uri, curr.text, curr.title)
                }
            } else {
                this._push.apply(this, arguments)
            }
            // Navbar is so small that we can completely rerender it
            return this.delayed ? this : this.render()
        },
        _push: function (id, uri, text, title) {
            this.items.put(id, {
                uri: uri,
                text: text,
                title: title
            })
        },
        unlink: function (uri) {
            for (var i = 0, len = arguments.length, curr; i < len; i++) {
                curr = arguments[i]
                this.items[curr] && delete this.items[curr]
            }
            return this.delayed ? this : this.render()
        },
        // Start when delayed
        start: function () {
            this.delayed = false
            this.$el.show()
            return this.render()
        },
        // Stop again
        stop: function () {
            this.delayed = true
            this.$el.hide()
            return this
        }
    })

    // Map over to global
    window.Bloggupy = Bloggupy
    window.App = Bloggupy.App
    // Invoke preload
    Bloggupy.App.preload()
})
