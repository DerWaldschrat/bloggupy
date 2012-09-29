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
        }
    })
}).call(this, Tpl)