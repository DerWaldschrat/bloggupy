// Contains all used plugins
window.PLUGINS = {
    "entry": {
        // Executed when plugin is loaded
        exec: function (App) {
            App.navbar.push({
                uri: "entry/create",
                text: "Neuer Eintrag",
                title: "Schreibe einen neuen Blogeintrag"
            })
        },
        // Contains all routes
        routes: {
            "entry/create": {
                route: "entry/create",
                afterLoad: function () {
                    alert("Blogeintrag erzeugt!")
                }
            }
        },
        // Returns information to display on the dashboard
        dashboardWidget: function () {
            return null
        }
    }
}