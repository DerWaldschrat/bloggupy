(function () {
    var blogEntryRoute = App.apiUrl("Content/")
    /**
     * @class Models.BlogEntry
     * A single BlogEntry instance
     */
    Bloggupy.Models.BlogEntry = Backbone.Model.extend({
        urlRoot: blogEntryRoute,
        idAttribute: "contentid"
    })

    Bloggupy.Collections.BlogEntries = Backbone.Collection.extend({
        urlRoot: blogEntryRoute,
        model: Bloggupy.Models.BlogEntry

    })

}).call(this)