-- sql for creating comments
CREATE TABLE bl_comment (
  commentid INT NOT NULL AUTO_INCREMENT PRIMARY KEY, -- id of this comment
  contentid INT NOT NULL, -- to which content does this belong
  created DATETIME, -- when this comment was created
  author INT, -- not used at the moment
  aname VARCHAR(40), -- name of the author
  email VARCHAR(60), -- email address of the author
  website VARCHAR(80), -- website of the author
  title VARCHAR(100), -- title of this comment
  content TEXT, -- content of this comment
  INDEX contentid(`contentid`)
)