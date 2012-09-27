<!doctype html>
<html lang="de">
    <head>
        <meta charset="utf-8" />
        <style type="text/css">
            @import url(<?php echo CLIENTROOT; ?>assets/vendor/bootstrap/bootstrap.css);
            @import url(<?php echo CLIENTROOT; ?>assets/vendor/bootstrap/responsive.css);
        </style>
    </head>
    <body>
    <script>
        var steal = {env: "production"}
    </script>
    <script src="<?php echo CLIENTROOT; ?>assets/vendor/steal/steal.js">

    </script>
    <script>
        steal.rootUrl("<?php echo CLIENTROOT; ?>")
        // Init page
        steal("assets/app")
    </script>
    </body>
</html>