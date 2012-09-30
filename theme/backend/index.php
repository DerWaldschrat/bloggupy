<!doctype html>
<html lang="de">
    <head>
        <meta charset="utf-8" />
        <style type="text/css">
            @import url(<?php echo CLIENTROOT; ?>assets/vendor/bootstrap/css/bootstrap.css);
            @import url(<?php echo CLIENTROOT; ?>assets/vendor/bootstrap/css/responsive.css);
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
                <ul id="navbar" class="nav nav-list well">

                </ul>
            </div>
            <div id="content" class="span9">
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
            window.API = "<?php echo APIROOT; ?>"
            // Set root
            steal.rootUrl("<?php echo CLIENTROOT; ?>")
            // Init page
            steal("assets/app").then(function () {
                App.init()
            })
        </script>
    </body>
</html>