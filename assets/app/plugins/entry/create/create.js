/**
 * @class Views.CreateBlogEntryView
 * Responsible for handling blog entries
 */
steal("assets/app/plugins/entry/models").then(function () {
    Bloggupy.Views.EditBlogEntryView = Backbone.View.extend({
        events: {
            "click #entrySaveAndPublish": "saveAndPublish",
            "submit form": "saveAndPublish",
            "click #entrySave": "save",
            "focusout #entryTitle": "createPermalink",
            "click #clearPermalink": "clearPermalink",
            "focus input, textarea": "change"
        },
        initialize: function () {
            this.model = new Bloggupy.Models.BlogEntry()
            this.model.on("change:permalink", this.changePermalink, this)
        },
        template: Tpl.entry.create,
        render: function () {
            this.$el.html(this.template("Neuen Eintrag erstellen"))
            return this
        },
        saveAndPublish: function (event) {
            event.preventDefault()
        },
        save: function (event) {
            event.preventDefault()
        },
        createPermalink: function (event) {
            // If Model already has permalink, just return
            if (this.model.has("permalink")) return;
            var replace = {
                    "ä": "ae",
                    "ö": "oe",
                    "ü": "ue",
                    "s": "ss"
            }, val = this.$("#entryTitle").val(),
                // Very simple but should do the trick
                stripped = val.toLowerCase().replace(/\s+/g, "-").replace(/(ä|ö|ü|ß)/g, function (a) {
                    return replace[a]
                })
            this.model.set({
                permalink: stripped
            })
        },
        changePermalink: function () {
            this.$("#entryPermalink").val(this.model.get("permalink"))
        },
        clearPermalink: function () {
            this.model.unset("permalink")
        },
        change: function (event) {
            var $el = $(event.target), attr = this._normalize($el.attr("id")), val = $el.val()
            this.model.set(attr, val)
        },
        _normalize: function (id) {
            return id.replace(/(entry[A-Z]).*/, function (high) {
                return high.replace("entry", "").toLowerCase()
            })
        }
    })
})