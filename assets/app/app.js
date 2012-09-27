// This file is for loading the backend app

steal("assets/vendor/jquery", "assets/vendor/lodash").then("assets/vendor/backbone", "theme/backend").then("assets/yabe").then(function () {
    // Create app namespace
    var Bloggupy = {
        Models: {},
        Collections: {},
        Views: {},
        Mixins: {},
        App: {
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
                //$("#loginForm").remove();
            },
            setView: function () {

            },
            apiUrl: function (api) {
                return API + api
            }
        }
    }



    Bloggupy.Models.User = Backbone.Model.extend({
        initialize: function () {

        },
        urlRoot: Bloggupy.App.apiUrl("User/")
    })

    // The login screen
    Bloggupy.Views.LoginView = Backbone.View.extend({
        events: {
            "submit": function (event) {
                // Do not submit loginform
                event.preventDefault()
                alert("Relight my fire")
                new Bloggupy.Models.User({
                }).save()
            }
        },
        initialize: function () {
            // Show login button
            this.$("#submitLogin").prop("disabled", false)
        }
    })

    // Map over to global
    window.Bloggupy = Bloggupy
    window.App = Bloggupy.App

})
