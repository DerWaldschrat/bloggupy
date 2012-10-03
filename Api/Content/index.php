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
require ROOT . "block/connector" . PHP;
require ROOT . "block/mapper" . PHP;
require ROOT . "block/validator" . PHP;

if (isLoggedin(10)) {
    $shouldUpdateCache = false;
    $cacheBody = null;
    $cacheAction = "update";
    delete(function () {

    });
    get(function () {

    });
    // If new entry is created
    post(function () {

    });
    // If entry is updated
    put(function () {
        global $shouldUpdateCache, $cacheBody;
        $body = bodyAsJSON();
        $id = $_SERVER["QUERY_STRING"];
        if (hasAllSet($body, array("contentid", "title", "permalink", "content", "published", "created")) && $id == $body->contentid) {
            $db = db();
            $response = new stdClass();
            $st = $db->prepare("UPDATE " . CONTENT . " SET title = ?, permalink = ?, content = ?, published = ?, updated = ? WHERE contentid = ?");
            $response->updated = $body->updated = dateForDatabase();
            $st->bind_param("sssssi", $body->title, $body->permalink, $body->content, $body->published, $body->updated, $body->contentid);
            if (exQuery($st)) {
                if ($body->published >= 2) {
                    $shouldUpdateCache = true;
                    $cacheBody = $body;
                }
            } else {
                fail("contentUpdateFail");
            }
        } else {
            fail("contentUpdateFail");
        }
    });
    // Should the cache be updated
    if ($shouldUpdateCache) {
        require "Cache" . PHP;
        $cache = new Cache($cacheBody);
        $cache->perform($cacheAction);
    }
}


?>