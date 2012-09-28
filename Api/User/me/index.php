<?php
define("__EXEC", true);
define("ROOT", "../../../");
define("PHP", ".php");
require ROOT . "block/user" . PHP;
require ROOT . "block/mapper" . PHP;
require ROOT . "block/validator" . PHP;
post(function () {
    $user = bodyAsJSON();
    if (hasAllSet($user, array("name", "password")) && $user->name === /*USERNAME*/"DerWaldschrat"/*/USERNAME*/ && $user->password === /*USERPASS*/"qwerty"/*/USERPASS*/) {
        $user = $_SESSION["user"] = array("name" => $user->name, "loggedin" => true, "rights" => 1000, "id" => 1);
        hJSON($user);
    } else {
        h404();
    }
});
// Log out
delete(function () {
    if (isset($_SESSION["user"])) {
        unset($_SESSION["user"]);
    }
})
?>