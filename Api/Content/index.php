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
        global $shouldUpdateCache, $cacheBody, $cacheAction;
        $id = $_SERVER["QUERY_STRING"];
        $db = db();
        // Get permalink for later destruction
        $st = $db->prepare("SELECT permalink FROM ". CONTENT . " WHERE contentid = ?");
        $st = $db->prepare("DELETE FROM " . CONTENT . " WHERE contentid = ?");
        $st->bind_param("i", $id);
        if (exQuery($st)) {
            $shouldUpdateCache = true;
            $cacheAction = "destroy";
            $cacheBody = new stdClass();
            $cacheBody->contentid = $id;
        } else {
            fail("contentDeleteFail");
        }
    });
    get(function () {
        hJSON(array());
    });
    // If new entry is created
    post(function () {
        global $shouldUpdateCache, $cacheBody;
        $body = bodyAsJSON();
        if (hasAllSetIsset($body, array("title", "permalink", "content", "published"))) {
            $db = db();
            $response = new stdClass();
            $response->created = $response->updated = $body->created = $body->updated = dateForDatabase();
            $response->author = $body->author = userField("id");
            $st = $db->prepare("INSERT INTO " . CONTENT . " (title, permalink, content, published, created, updated, author) VALUES(?, ?, ?, ?, ?, ?, ?)");
            $st->bind_param("sssssss", $body->title, $body->permalink, $body->content, $body->published, $body->created, $body->updated, $body->author);
            if (exQuery($st)) {
                $response->contentid = $body->contentid = $db->insert_id;
                hJSON($response);
                if ($body->published >= 2) {
                    $shouldUpdateCache = true;
                    $cacheBody = $body;
                }
            } else {
                fail("contentCreateFail");
            }
        } else {
            fail("contentCreateFail");
        }
    });
    // If entry is updated
    put(function () {
        global $shouldUpdateCache, $cacheBody;
        $body = bodyAsJSON();
        $id = $_SERVER["QUERY_STRING"];
        if (hasAllSetIsset($body, array("contentid", "title", "permalink", "content", "published", "created")) && $id == $body->contentid) {
            $db = db();
            $response = new stdClass();
            $st = $db->prepare("UPDATE " . CONTENT . " SET title = ?, permalink = ?, content = ?, published = ?, updated = ?, author = ? WHERE contentid = ?");
            $response->updated = $body->updated = dateForDatabase();
            $body->author = userField("id");
            $st->bind_param("ssssssi", $body->title, $body->permalink, $body->content, $body->published, $body->updated, $body->author, $body->contentid);
            if (exQuery($st)) {
                hJSON($response);
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