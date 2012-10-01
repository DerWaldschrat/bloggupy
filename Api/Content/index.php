<?php
/**
 * Created by JetBrains PhpStorm.
 * User: hauke
 * Date: 01.10.12
 * Time: 17:48
 * Backend file containing the logic to create, update and delete entries
 */
define("__EXEC", true);
define("ROOT", "../../");
define("PHP", ".php");

require ROOT . "block/user" . PHP;
require ROOT . "block/mapper" . PHP;
require ROOT . "block/validator" . PHP;
require "contentHelper" . PHP;

if (isLoggedin(10)) {
    delete(function () {

    })
}


?>