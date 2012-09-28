// Contains some simple backbone extensions
(function () {
    // Creates a singleton generator which is used when you want to load a collection only ones
    Backbone.Singleton = function () {
        var instance = null
        return function (events, scope, opts) {
            var i, fetch
            opts || (opts = {})
            if (instance === null) {
                instance = new this()
                fetch = true
            }
            events || (events = {})
            for (i in events) {
                instance.on(i, events[i], scope)
            }
            if (fetch) {
                instance.fetch(opts)
            }
            return instance;
        }
    }

    // Save reference to old remove function because we want to override it
    var remove = Backbone.View.prototype.remove
    Backbone.View.prototype.remove = function () {
        if (typeof this._subviewList !== "undefined") {
            for (var i = 0, len = this._subviewList.length, curr; i < len; i++) {
                curr = this[this._subviewList[i]];
                // When null or undefined, just continue
                if (curr == null) continue;
                // Is it a list of views?
                if (!(curr instanceof Backbone.View)) {
                    var j;
                    for (j in curr) {
                        curr[j] !== null && typeof curr[j].remove === "function" && curr[j].remove();
                    }
                } else {
                    typeof curr.remove === "function" && curr.remove();
                }
            }
        }
        // Call "super" function
        return remove.apply(this, arguments)
    }


    // Add more functionality to Backbone.View
    _.extend(Backbone.View.prototype, {
        // Used for adding views to remove list
        setSubviewStore: function () {
            this._subviewList || (this._subviewList = []);
            for (var i = 0, len = arguments.length; i < len; i++) {
                this._subviewList.push(arguments[i]);
            }
        },
        /**
         * @param name Name of the message
         * @param green Whether this is an success or error message
         * Basic message function
         */
        message: function (name, green) {
            this.clearMessage();
            this.$el.find(".buttonAndMessage").addClass(green ? "success" : "error")
                .find(".statusField").text(this.readMessage(name))
        },
        // Clears messages
        clearMessage: function () {
            this.$el.find(".buttonAndMessage").removeClass("success error").find(".statusField").text("");
        },
        // Must be overridden to deliver the right messages
        readMessage: function (message) {
            return ""
        }
    })


}).call(this)
