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
            "click #entryDelete": "destroy",
            "focusout #entryTitle": "createPermalink",
            "click #clearPermalink": "clearPermalink",
            "focus input, textarea": "change"
        },
        _messages: {
            saveSucceed: "Dein Eintrag wurde erfolgreich gespeichert!",
            saveFailed: "Dein Eintrag konnte leider nicht gespeichert werden!",
            destroySucceed: "Dein Eintrag wurde erfolgreich gelöscht!",
            destroyFailed: "Dein Eintrag konnte nicht gelöscht werden!"
        },
        initialize: function () {
            this.model instanceof Backbone.Model || (this.model = new Bloggupy.Models.BlogEntry())
            this.model.on("change:permalink", this.changePermalink, this)
            this.registerStartEvents()

        },
        registerStartEvents: function () {
            this.model.on("sync", this.saved, this).on("error", this.error, this)
            return this
        },
        removeErrorSync: function () {
            this.model.off("error", null, this).off("sync", null, this).off("destroy", null, this)
            return this
        },
        template: Tpl.entry.create,
        templateDeleteButton: Tpl.entry.deleteButton,
        render: function () {
            var title = "Neuen Eintrag erstellen"
            if (!this.model.isNew()) {
                title = "Eintrag bearbeiten"
            }
            console.log("render")
            this.$el.html(this.template(title, this.model))
            console.log("afterrender")
            // If this entry is not new, add button to delete it
            if (!this.model.isNew()) {
                this._addButtonToDelete()
            }
            return this
        },
        // Save entry and publish it
        saveAndPublish: function (event) {
            console.log(event)
            event.preventDefault()
            this.saveModel(2)
        },
        save: function (event) {
            console.log(event)
            event.preventDefault()
            this.saveModel(0)
        },
        destroy: function () {
            this.removeErrorSync()
            this.model.on("error", this.destroyError, this).on("destroy", this.destroyed, this)
            this.model.destroy({
                wait: true
            })
        },
        saveModel: function (status) {
            this.model.save({
                published: status
            })
        },
        error: function (error) {
            console.log("saveError")
            this.message("saveFailed")
        },
        destroyError: function () {
            console.log("destroyError")
            this.message("destroyFailed")
            // Re-attach events
            this.removeErrorSync().registerStartEvents()
        },
        destroyed: function () {
            console.log("destroySync")
            this.model.off()
            this.model = null
            // Re-initialize view
            this.initialize()
            // Re-render
            this.render()
            this.message("destroySucceed", true)

        },
        saved: function () {
            console.log("saveSync")
            this.message("saveSucceed", true)
            // add button to delete entry
            this._addButtonToDelete()

        },
        readMessage: function (msg) {
            // TODO create proper message handling
            return this._messages[msg]
        },
        _addButtonToDelete: function () {
            if (!this.$("#entryDelete").length)
            this.$("#entrySave").after(this.templateDeleteButton())
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