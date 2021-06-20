import { Comment } from "../../../../kasabe/models/comment/comment.entity";

export const CommentEntities: Partial<Comment> [] = [
    {
        auth_id: 1,
        comment_article_id: 3,
        audience_article_id: 2, // article-id: 2 => first post: white and gold 
        comment_text: "comment one",
        
    },
    {
        auth_id: 1,
        comment_article_id: 4,
        audience_article_id: 2, // article-id: 2 => first post: white and gold 
        comment_text: "comment two",
        
    },
    
]
