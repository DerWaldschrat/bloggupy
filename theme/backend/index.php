<!doctype html>
<html lang="de">
    <head>
        <meta charset="utf-8" />
        <style type="text/css">
            @import url(<?php echo CLIENTROOT; ?>assets/vendor/bootstrap/bootstrap.css);
            @import url(<?php echo CLIENTROOT; ?>assets/vendor/bootstrap/responsive.css);
            @import url(<?php echo CLIENTROOT; ?>theme/main.css)
        </style>
    </head>
    <body>
        <div id="navbarTop" class='navbar navbar-fixed-top'>
            <div class="navbar-inner">

            </div>
        </div>
        <div id="main" class="row-fluid">
            <div id="navbarLeft" class="span3">

            </div>
            <div id="content" class="span9">
                <form id="loginForm" action="#">
                    <fieldset class="control-group">
                        <legend>Einloggen</legend>
                        <label for="name">Name:</label><input type="text" name="name" id="name" autofocus="on" />
                        <label for="password">Passwort:</label><input type="password" name="password" id="password" />
                    </fieldset>
                    <fieldset class="control-group buttonAndMessage">
                        <button type="submit" class="btn" disabled="disabled" id="submitLogin">Einloggen</button>
                        <div class="statusField"></div>
                    </fieldset>
                </form>
            </div>
        </div>
        <script>
            // Config stealJS
            var steal = {env: "production"}
            <?php if (isLoggedin()): ?>window.USER = <?php echo json_encode($_SESSION["user"]);endif; ?>
        </script>
        <script src="<?php echo CLIENTROOT; ?>assets/vendor/steal/steal.js">
        </script>
        <script>
            // Set root
            steal.rootUrl("<?php echo CLIENTROOT; ?>")
            // Init page
            steal("assets/app").then(function () {
                App.init()
            })
        </script>
    </body>
</html>