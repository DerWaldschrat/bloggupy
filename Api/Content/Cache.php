<?php
/**
 * Created by JetBrains PhpStorm.
 * User: hauke
 * Date: 01.10.12
 * Time: 18:20
 * To change this template use File | Settings | File Templates.
 */
class Cache {
    /**
     * @param $body stdClass | null The data of this cache object
     */
    function __construct ($body) {
        $this->body = $body;
    }
    /**
     * @return array All entries connected to this entry
     */
    function resolveAllInvolvedFiles()
    {
        return array();
    }

    /**
     * @return bool Whether clearing the cache was successful
     */
    function createCache() {
        return true;
    }

    /**
     * @return bool Whether clearing the cache was successful
     */
    function clearCache() {
        return true;
    }

    /**
     * @param $action string Which action should be performed
     */
    function perform($action) {
    }
}
?>