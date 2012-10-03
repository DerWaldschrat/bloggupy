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

    // Add lazyloading mixin to this collection
    _.extend(Bloggupy.Collections.BlogEntries.prototype, Backbone.Mixins.LazyCollection);
    // Add singleton behaviour
    Bloggupy.Collections.BlogEntries.instance = Backbone.Singleton({
        add: true
    })

}).call(this)