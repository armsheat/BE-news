\c nc_news_test

<<<<<<< HEAD
DELETE FROM comments WHERE comment_id = $1;
=======
SELECT articles.* , COUNT(comments.article_id) AS number_of_comments 
FROM articles 
LEFT JOIN comments ON comments.article_id = articles.article_id 
GROUP BY articles.article_id 
ORDER BY title DESC; 
>>>>>>> 8dcbe7d9569e9d086467b2a09630abdf29002afb


