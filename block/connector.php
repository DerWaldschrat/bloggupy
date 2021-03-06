<?php
// Connects to database
$__DB = null;
function db()
{
    global $__DB;
    if($__DB === null) {
        $__DB = new mysqli(/*HOST*/"127.0.0.1"/*/HOST*/, /*NAME*/"root"/*/NAME*/, /*PASS*/""/*/PASS*/, /*DATABASE*/"bloggupy"/*/DATABASE*/);
        $__DB->set_charset("utf8");
    }
    return $__DB;
}
/**
 * Executes a query and tells if it was successful.
 * */
function exQuery(mysqli_stmt $query, $affected = 0) {
    return $query->execute() && $query->affected_rows > $affected;
}

/*
 * Creates a timestamp in the format of the database
 * @param date if not specified the current time
 */
function dateForDatabase($date = null)
{
    if ($date === null) {
        $date = time();
    }
    return date("Y-m-d H:i:s", $date);
}

// Defines tables
$prefix = /*PREFIX*/"bl_"/*/PREFIX*/;
define("CONTENT", $prefix . "content");
define("COMMENT", $prefix . "comment");
?>