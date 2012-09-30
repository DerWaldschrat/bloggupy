(function () {
    var blogEntryRoute = App.apiUrl("Content/")
    /**
     * @class Models.BlogEntry
     * A single BlogEntry instance
     */
    Bloggupy.Models.BlogEntry = Backbone.Model.extend({
        urlRoot: blogEntryRoute
    })

    Bloggupy.Collections.BlogEntries = Backbone.Collection.extend({
        urlRoot: blogEntryRoute,
        model: Bloggupy.Models.BlogEntry

    })

}).call(this)