# P7_reseau-social

//********** Router POSTMAN USER **********//

//Creation de compte
POST    http://localhost:5000/api/auth/signup
    {
        "pseudo" : "   ",
        "email": "   ",
        "password": "   "
    }

//Identification
POST    http://localhost:5000/api/auth/login
    {
        "email": "   ",
        "password": "   "
    }

//Deconnection
GET     http://localhost:5000/api/auth/logout
    {
        "email" :"   ",
        "password": "   "
    }

//Afficher tous les users
GET     http://localhost:5000/api/auth

//Afficher les données d' un user 
GET     http://localhost:5000/api/auth/"NumberIdUser"

//Ajouter une biographie aux données d'un user
PUT     http://localhost:5000/api/auth/"NumberIdUser"
    {
        "bio": " message ...."
    }

//Supprimer un user
DELETE     http://localhost:5000/api/auth/"NumberIdUser"



//********** Router POSTMAN post **********//

//Afficher tous les posts
GET     http://localhost:5000/api/post

//Créer un post
POST    http://localhost:5000/api/post
    { 
        "posterId": "idUser",
        "message": "First post"
    }

//Modifier un post
PUT     http://localhost:5000/api/post/objectIdOfPost
    { 
        "message": "Modified post"
    }

//Liker un post
PATCH   http://localhost:5000/api/post/like-post/objectIdOfPostToLike
    { 
        "id": "likerId"
    }

//Ne plus aimer un post
PATCH   http://localhost:5000/api/post/unlike-post/objectIdOfPostToUnlike
    { 
        "id": "likerId"
    }

//********** Router POSTMAN comments users post **********//

//Commenter un post
PATCH   http://localhost:5000/api/post/comment-post/objectIdOfPost
    { 
    "commenterId": "userId",
    "commenterPseudo": "userPseudo",
    "text": "comment"
    }

//Modifier un commentaire
PATCH   http://localhost:5000/api/post/edit-comment-post/objectIdOfPost
    { 
    "commentId": "objectId of first comment",
    "commenterPseudo": "userPseudo",
    "text": "edit comment"
    }

//Supprimer son commentaire
PATCH   http://localhost:5000/api/post/delete-comment-post/objectIdOfComment
    { 
    "commentId": "6324bae5f6af3aafdb5d682a"
    }