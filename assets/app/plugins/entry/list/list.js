// File for displaying a list all entries
steal("assets/app/plugins/entry/models").then(function () {
    Bloggupy.Collections.BlogEntries.instance(false, null, {add: true})
})