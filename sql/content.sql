-- Creates content table
CREATE TABLE bl_content (
  contentid INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  created DATETIME, -- when this entry was created
  updated DATETIME, -- when this entry was updated
  author INT, -- author, not used at the moment
  title VARCHAR(100), -- title of this entry
  permalink VARCHAR(100), -- permalink to this entry
  content TEXT, -- content of this entry
  published TINYINT -- whether this article is published or not: 0 is not published, 1 is published for loggedin users, 2 is published for public
);
-- Add index to content table
ALTER TABLE `bl_content` ADD INDEX `updated` ( `updated` );
ALTER TABLE `bl_content` ADD INDEX `created` ( `created` );