// Contains all used plugins
/*
Es funktioniert folgendermaßen:
Jedes Plugin hat zunächst einen eindeutigen Namen.
Diesem Namen, der im "PLUGINS"-Objekt als Key dient, wird ein Objekt mit folgenden Eigenschaften zugeordnet:
    - <function> exec Dies ist eine Funktion, die vor dem Erstellen der Pluginrouten aufgerufen wird. Hier können also Navigationslinks konfiguriert werden, Dateien direkt geladen werden....
    - <object> routes Dieses Objekt enthält eine Liste von Routen, die mit diesem Plugin verbunden sind.
        Dabei ist der Key die zu ladende Datei, der Wert wieder ein Objekt, diesmal mit zwei Eigenschaften:
        - <string> route Die zu routende Route.
        - <function> afterLoad Die Funktion, die bei jedem Aufruf nach dem Laden der Datei aufgerufen wird.
 */
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