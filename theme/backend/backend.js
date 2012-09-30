// Contains the template declarations for the backend
if (typeof Tpl === 'undefined') {
    var Tpl = {}
}
(function (Tpl) {
    _.extend(Tpl, {
        // Template for the login form
        // Can be overriden to change design entirely
        loginForm: function () {
            return '<form id="loginForm" action="#">'+
                    '<fieldset class="control-group">' +
                            '<legend>Einloggen</legend>'+
                            '<label for="name">Name:</label><input type="text" name="name" id="name" autofocus="on" />' +
                            '<label for="password">Passwort:</label><input type="password" name="password" id="password" />' +
                    '</fieldset>' +
                    '<fieldset class="control-group buttonAndMessage">' +
                        '<button type="submit" class="btn" id="submitLogin">Einloggen</button>' +
                        '<div class="statusField help-block"></div>' +
                    '</fieldset>' +
                '</form>'
        },
        // Template for the dashboard
        dashboard: function () {
            var html = ""
            return html
        },
        // Templates for the navigation
        nav: {
            item: function (uri, text, title) {
                title || (title = text)
                return "<li><a href='" + uri + "' title='" + title + "'>" + text + "</a></li>"
            },
            header: function (text, title) {
                title || (title = text)
                return "<li title='" + title + "' class='nav-header'>"+ text +"</li>"
            },
            spacer: function () {
                return "<li class='divider'></li>"
            }
        },
        // Templates for the entry plugin
        entry: {
            create: function (title) {
                return "<form action='#'>" +
                        "<fieldset class='control-group'>" +
                            "<legend>" + title + "</legend>" +
                            "<label for='entryTitle'>Titel</label>" +
                            "<input type='text' id='entryTitle' name='entryTitle' />" +
                            "<label for='entryPermalink'>Permalink</label>" +
                            "<div class='input-append'>" +
                                "<input type='text' id='entryPermalink' name='entryPermalink' /><span class='add-on' id='clearPermalink'><i class='icon-trash'></i></span>" +
                            "</div>" +
                            "<label for='entryContent'>Inhalt</label>" +
                            "<textarea id='entryContent' name='entryContent' class='input-xxlarge' rows='10'></textarea>" +
                        "</fieldset>" +
                        "<fieldset class='control-group buttonAndMessage'>" +
                            "<div class='btn-group'>" +
                                "<button type='button' id='entrySaveAndPublish' class='btn btn-primary'>Speichern und veröffentlichen</button>" +
                                "<button type='button' id='entrySave' class='btn'>Als Entwurf speichern</button>" +
                            "</div>" +
                            "<div class='help-block statusField'></div>" +
                        "</fieldset>" +
                    "</form>"
            }
        }
    })
}).call(this, Tpl)