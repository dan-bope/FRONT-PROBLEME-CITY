# REDACTION DE L'API DU PROJET PROBLEME CITY : PROJET LIBRE INNOVANT

## IMPLEMENTATION DE NOTRE FRONT EN REACTJS

### POUR COMMENCER A CREER NOTRE FRONT :

Création du dossier front avec React : **npx create-react-app client**
    

#### installation des packages pour le front :

1. Installation des packages pour sass: **npm i -s node-sass // npm i -s node-sass@4.14.1**
     
2. Installation des packages pour la navigation : **react-router-dom**
    
3. installation de la librairie axios pour des requetes à notre api : **npm i -s axios**
    
4. Installation de dotenv aussi niveau client(Front) : **npm i -s dotenv**
    
5. Installation de libraire pour gérer les cookie niveau front : **npm i -s js-cookie**
    
6. Installation de redux et des packages qui lui sont associés : **npm i -s react-redux redux**
    redux-thunk redux-logger redux-devtools-extension
    
7. Installation de la libraire nous permet de dire à l’utilisateur de se connecter avant de liker un post : **npm i -s reactjs-popup**


## API IMPLEMENTE EN NODESJ EXPRESS

### POUR COMMENCER A CREER L'API :

1. Télécharger un IDE : de préférence webStorme ou Visual Studio Code

2. ouvrir l'IDE de votre choix

3. installer node ainsi les packages npm

4. lancer la commande : npm init -y

#### installer des packages :

1. **npm install express --save** : pour express

2. **npm install dotenv** : pour utiliser et charger les variables d'environnements

3. **npm install body-parser** : pour gerer les requetes au niveau de body

4. **npm install cookie-parser** : pour Analyser l’en-tête et le remplir avec un objet clé par les noms de cookie

5. **npm install mongoose**:  pour servir de passerelle entre notre serveur Node.js et notre serveur MongoDB.  

6. **npm install jsonwebtoken**: pour permettre l'authentification par jeton (implémentation de jetons web JSON utilisés pour les communications sécurisées).

7. **npm install --save-dev nodemon** : permettre à démarrer automatiquement l’application lorsque des modifications de fichier dans le répertoire sont détectées.

8. **npm install bcrypt**: pour nous aider à hacher les mots de passe.

9. **npm install validatorjs**: pour faciliter la validation des données en JavaScript dans le navigateur et node.js.

10. **npm i -s multer@2.0.0-rc.1** : pour le traitement de l'image, téléchargement des fichiers. 

11. **npm i -s cors** :  pour permettre à d'autres utilisateurs de faire de requetes à notre base de données.

### NOS TESTS : SOUS FORME DE JSON SUR POSTMAN

### ENPOINTS, REQUETES ET REPONSES 

#### 1. Utilisateurs 

##### 1. 1. **type : POST**

         URL : /api/user/register

#### requetes

    {
        "pseudo" : "Fadhyl",
        "email": "fadhyl@gmail.com",
        "password": "djoifa"
    }
    
### Reponses :

    renvoie (201) en cas du succès et (400) en cas d'erreur.
    
    {
        "user": "60b4a882a73b5416489746d0"
    }

##### 1. 2. **type : POST**

         URL : /api/user/login

#### requetes

    {
        "email": "fadhyl@gmail.com",
        "password": "djoifa"
    }
    
### Reponses :

    renvoie (200) en cas du succès et (400) en cas d'erreur.
    
    {
        "user": "60b4a882a73b5416489746d0"
    }
    
##### 1. 3. **type : GET**

         URL : /api/user/logout

### Reponses :

    renvoie (404) en cas du succès(déconnexion)
    
##### 1. 4. **type : GET**

         URL : /api/user/

### Reponses :

    renvoie (200) en cas du succès
    
    [
        {
            "picture": "./uploads/profil/random-user.png",
            "followers": [
                "60b23c7480ec2fd508e7048f"
            ],
            "following": [
                "60b2b007e7cc7c8b2cf218b8"
            ],
            "likes": [],
            "_id": "60b23c7480ec2fd508e7048f",
            "pseudo": "makashi",
            "email": "mak@gmail.com",
            "createdAt": "2021-05-29T13:07:00.719Z",
            "updatedAt": "2021-05-29T21:25:02.969Z",
            "__v": 0,
            "bio": "salut tout le monde, c'est mon premier poste"
        },
        {
            "picture": "./uploads/profil/random-user.png",
            "followers": [],
            "following": [],
            "likes": [],
            "_id": "60b2b007e7cc7c8b2cf218b8",
            "pseudo": "Daniella",
            "email": "row@gmail.com",
            "createdAt": "2021-05-29T21:20:07.482Z",
            "updatedAt": "2021-05-31T06:18:12.950Z",
            "__v": 0
        },
        {
            "picture": "./uploads/profil/random-user.png",
            "followers": [],
            "following": [],
            "likes": [],
            "_id": "60b2b033e7cc7c8b2cf218b9",
            "pseudo": "Bope",
            "email": "bope@gmail.com",
            "createdAt": "2021-05-29T21:20:51.781Z",
            "updatedAt": "2021-05-29T21:50:53.030Z",
            "__v": 0
        },
        {
            "picture": "./uploads/profil/random-user.png",
            "followers": [],
            "following": [],
            "likes": [],
            "_id": "60b3922abe8c9a6c5070ba2e",
            "pseudo": "Daniel",
            "email": "rowa@gmail.com",
            "createdAt": "2021-05-30T13:24:58.031Z",
            "updatedAt": "2021-05-30T13:24:58.031Z",
            "__v": 0
        },
        {
            "picture": "./uploads/profil/random-user.png",
            "followers": [],
            "following": [],
            "likes": [],
            "_id": "60b4a882a73b5416489746d0",
            "pseudo": "Fadhyl",
            "email": "fadhyl@gmail.com",
            "createdAt": "2021-05-31T09:12:34.464Z",
            "updatedAt": "2021-05-31T09:12:34.464Z",
            "__v": 0
        }
    ]

##### 1. 5. **type : GET**

         URL : /api/user/:id

### Reponses :

    renvoie (200) en cas du succès et (400) en cas d'erreur
    
    {
        "picture": "./uploads/profil/random-user.png",
        "followers": [],
        "following": [],
        "likes": [],
        "_id": "60b4a882a73b5416489746d0",
        "pseudo": "Fadhyl",
        "email": "fadhyl@gmail.com",
        "createdAt": "2021-05-31T09:12:34.464Z",
        "updatedAt": "2021-05-31T09:12:34.464Z",
        "__v": 0
    }
   
 
##### 1. 6. **type : PUT**

         URL : /api/user/:id

#### requetes

    {
        "bio": "Je m'appelle Fadhyl et je suis étudiant à l'ETNA"
    }
    
### Reponses :

    renvoie (200) en cas du succès et (500) en cas d'erreur.
    
    {
        "picture": "./uploads/profil/random-user.png",
        "followers": [],
        "following": [],
        "likes": [],
        "_id": "60b4a882a73b5416489746d0",
        "pseudo": "Fadhyl",
        "email": "fadhyl@gmail.com",
        "password": "$2b$10$R1NZw.QZFmsSAdsEjw8xGemTtn.ou52UL4EkGRM3GqGzo.GpVTy9W",
        "createdAt": "2021-05-31T09:12:34.464Z",
        "updatedAt": "2021-05-31T09:39:56.028Z",
        "__v": 0,
        "bio": "Je m'appelle Fadhyl et je suis étudiant à l'ETNA"
    }
    
##### 1. 7. **type : DELETE**

         URL : /api/user/:id

### Reponses :

    renvoie (200) en cas du succès et (500) en cas d'erreur
    
    {
        "message": "Successfully deleted. "
    }
    
#### 1. 8. **type : PATCH**

    URL : /api/user/follow/:id
    
### Requetes :

    {
        "idToFollow":"60b4eda9b0d1d063d02e61bc"(id)
    }
 
### Reponses :

    renvoie (201) en cas du succès et (500) en cas d'erreur

    {
        "picture": "./uploads/profil/random-user.png",
        "followers": [],
        "following": [
            "60b4eda9b0d1d063d02e61bc"
        ],
        "likes": [],
        "_id": "60b4ea68b0d1d063d02e61bb",
        "pseudo": "Fadhyl",
        "email": "fadhyl@gmail.com",
        "password": "$2b$10$4RtxRyZ8NCh5cy9e4MMZo.0nvZ9A5sT3mymBAExffoLqyPFuvd6l.",
        "createdAt": "2021-05-31T13:53:44.325Z",
        "updatedAt": "2021-05-31T14:42:17.720Z",
        "__v": 0
    }
    

#### 1. 9. **type : PATCH**

    URL : /api/user/unfollow/:id
    
### Requetes :

    {
        "idToUnFollow":"60b4eda9b0d1d063d02e61bc"(id)
    }
 
 
### Reponses :

    renvoie (201) en cas du succès et (500) en cas d'erreur

    {
        "picture": "./uploads/profil/random-user.png",
        "followers": [],
        "following": [],
        "likes": [],
        "_id": "60b4ea68b0d1d063d02e61bb",
        "pseudo": "Fadhyl",
        "email": "fadhyl@gmail.com",
        "password": "$2b$10$4RtxRyZ8NCh5cy9e4MMZo.0nvZ9A5sT3mymBAExffoLqyPFuvd6l.",
        "createdAt": "2021-05-31T13:53:44.325Z",
        "updatedAt": "2021-05-31T14:41:52.061Z",
        "__v": 0
    }
    
    
##### 1. 10. **type : POST**

         URL : /api/user/upload

#### requetes

N.B :  cette requete sur Postman se fait au niveau de "body" toujours mais particularité au niveau de form-data

    
    Key                           Value
    
    file(type)                      mcdo.jpg
    
    name                             Dan
    
    userId                           60b4eda9b0d1d063d02e61bc

    
    
### Reponses :

    renvoie (200) en cas du succès et (400) en cas d'erreur.
    
    {
        "picture": "./uploads/profil/Dan.jpg",
        "followers": [
            "60b4ea68b0d1d063d02e61bb"
        ],
        "following": [],
        "likes": [],
        "_id": "60b4eda9b0d1d063d02e61bc",
        "pseudo": "Dan",
        "email": "dan@gmail.com",
        "password": "$2b$10$8E7sK1nbeF5xKiWW9q8ju.SwOESgLOquRU5coGLILtqX42MH8smtS",
        "createdAt": "2021-05-31T14:07:37.721Z",
        "updatedAt": "2021-06-01T09:41:39.425Z",
        "__v": 0
    }


#### 2. Posts   

##### 2. 1. **type : GET**

         URL : /api/post/

### Reponses :

    renvoie (200) en cas du succès
    
    [
        {
            "likers": [],
            "_id": "60b3d378216ee5b44857800b",
            "posterId": "60b23c7480ec2fd508e7048f",
            "message": "Mon nouveau post a été modifié !!",
            "comments": [],
            "createdAt": "2021-05-30T18:03:36.752Z",
            "updatedAt": "2021-05-31T06:18:12.887Z",
            "__v": 0
        }
    ]
    
##### 2. 2. **type : POST**

         URL : /api/post/

#### requetes

    {
        "posterId": "60b4b2d3c8e05d4c0c1496cc",
        "message": "Bonjour c'est mon premier commentaire !! ):"
    }
    
### Reponses :

    renvoie (201) en cas du succès et (400) en cas d'erreur.
    
    {
        "likers": [],
        "_id": "60b4b591c8e05d4c0c1496cd",
        "posterId": "60b4b2d3c8e05d4c0c1496cc",
        "message": "Bonjour c'est mon premier commentaire !! ):",
        "comments": [],
        "createdAt": "2021-05-31T10:08:17.192Z",
        "updatedAt": "2021-05-31T10:08:17.192Z",
        "__v": 0
    }
    
##### 2. 3. **type : PUT**

         URL : /api/post/:id

#### requetes

    {
        "message": "Bonjour c'est mon commentaire modifie !! ):"
    }
    
### Reponses :

    renvoie (200) en cas du succès et (400) en cas d'erreur.
    
    {
        "likers": [],
        "_id": "60b5121947e58a638cf6ca4e",
        "posterId": "60b4ea68b0d1d063d02e61bb",
        "message": "Bonjour c'est mon commentaire modifie !! ):",
        "comments": [],
        "createdAt": "2021-05-31T16:43:05.724Z",
        "updatedAt": "2021-05-31T16:46:05.058Z",
        "__v": 0
    }

#### 2. 4. **type : PATCH**

    URL : /api/post/like-post/:id(du post)
    
### Requetes :

    {
        "id":"60b4eda9b0d1d063d02e61bc"(id de l'utilisateur)
    }
 
 
### Reponses :

    renvoie (200) en cas du succès et (400) en cas d'erreur

    {
        "picture": "./uploads/profil/random-user.png",
        "followers": [
            "60b4ea68b0d1d063d02e61bb"
        ],
        "following": [],
        "likes": [
            "60b5121947e58a638cf6ca4e"
        ],
        "_id": "60b4eda9b0d1d063d02e61bc",
        "pseudo": "Dan",
        "email": "dan@gmail.com",
        "password": "$2b$10$8E7sK1nbeF5xKiWW9q8ju.SwOESgLOquRU5coGLILtqX42MH8smtS",
        "createdAt": "2021-05-31T14:07:37.721Z",
        "updatedAt": "2021-05-31T17:18:05.985Z",
        "__v": 0
    }
    

#### 2. 5. **type : PATCH**

    URL : /api/post/unlike-post/:id(du post)
    
### Requetes :

    {
        "id":"60b4eda9b0d1d063d02e61bc"(id de l'utilisateur)
    }
 
 
### Reponses :

    renvoie (200) en cas du succès et (400) en cas d'erreur

    {
        "picture": "./uploads/profil/random-user.png",
        "followers": [
            "60b4ea68b0d1d063d02e61bb"
        ],
        "following": [],
        "likes": [],
        "_id": "60b4eda9b0d1d063d02e61bc",
        "pseudo": "Dan",
        "email": "dan@gmail.com",
        "password": "$2b$10$8E7sK1nbeF5xKiWW9q8ju.SwOESgLOquRU5coGLILtqX42MH8smtS",
        "createdAt": "2021-05-31T14:07:37.721Z",
        "updatedAt": "2021-05-31T17:26:27.411Z",
        "__v": 0
    }
    
#### 2. 6. **type : DELETE**

    URL : /api/post/:id(du post)
    
 
### Reponses :

    renvoie (200) en cas du succès et le post supprimé et (400) en cas d'erreur

    {
        "likers": [],
        "_id": "60b526a35d869638e4d3ac99",
        "posterId": "60b4ea68b0d1d063d02e61bb",
        "message": "Bonjour c'est mon premier commentaire !! ):",
        "comments": [],
        "createdAt": "2021-05-31T18:10:43.286Z",
        "updatedAt": "2021-05-31T18:10:43.286Z",
        "__v": 0
    }
    
#### 2. 7. **type : PATCH**

    URL : /api/post/post/comment-post//:id(du post)
    
### Requetes :

    {
        "commenterId": "60b4eda9b0d1d063d02e61bc",(id de l'utilisateur)
        "commenterPseudo": "Dan",
        "text": "Salut Fadhyl, tu as fait du bon boulot"
    }
 
 
### Reponses :

    renvoie (200) en cas du succès et (400) en cas d'erreur

    {
        "likers": [],
        "_id": "60b52b20ddb8383410c710ab",
        "posterId": "60b4ea68b0d1d063d02e61bb",
        "message": "Bonjour c'est mon premier commentaire !! ):",
        "comments": [
            {
                "_id": "60b52c1eddb8383410c710ac",
                "commenterId": "60b4eda9b0d1d063d02e61bc",
                "commenterPseudo": "Dan",
                "text": "Salut Fadhyl, tu as fait du bon boulot",
                "timeStamp": 1622486046344
            }
        ],
        "createdAt": "2021-05-31T18:29:52.215Z",
        "updatedAt": "2021-05-31T18:34:06.347Z",
        "__v": 0
    }
    
#### 2. 8. **type : PATCH**

    URL : /api/post/post/edit-comment-post/:id(du post)
    
### Requetes :

    {
        "commentId": "60b52db2ddb8383410c710ad",(id du commentaire existant)
        "text": "Merci Dan, vraiemtn t'es mon meilleur pote"
    }
 
 
### Reponses :

    renvoie (200) en cas du succès et (400) en cas d'erreur

    {
        "likers": [],
        "_id": "60b52b20ddb8383410c710ab",
        "posterId": "60b4ea68b0d1d063d02e61bb",
        "message": "Bonjour c'est mon premier commentaire !! ):",
        "comments": [
            {
                "_id": "60b52c1eddb8383410c710ac",
                "commenterId": "60b4eda9b0d1d063d02e61bc",
                "commenterPseudo": "Dan",
                "text": "Salut Fadhyl, tu as fait du bon boulot",
                "timeStamp": 1622486046344
            },
            {
                "_id": "60b52db2ddb8383410c710ad",
                "commenterId": "60b4ea68b0d1d063d02e61bb",
                "commenterPseudo": "Fadhyl",
                "text": "Merci Dan, vraiemtn t'es mon meilleur pote",
                "timeStamp": 1622486450942
            }
        ],
        "createdAt": "2021-05-31T18:29:52.215Z",
        "updatedAt": "2021-05-31T19:11:13.708Z",
        "__v": 0
    }
    
#### 2. 9. **type : PATCH**

    URL : /api/post/post/delete-comment-post/:id(du post)
    
### Requetes :

    {
        "commentId": "60b52db2ddb8383410c710ad",(id du commentaire existant)
    }
 
 
### Reponses :

    renvoie (200) en cas du succès et (400) en cas d'erreur

    {
        "likers": [],
        "_id": "60b52b20ddb8383410c710ab",
        "posterId": "60b4ea68b0d1d063d02e61bb",
        "message": "Bonjour c'est mon premier commentaire !! ):",
        "comments": [
            {
                "_id": "60b52c1eddb8383410c710ac",
                "commenterId": "60b4eda9b0d1d063d02e61bc",
                "commenterPseudo": "Dan",
                "text": "Salut Fadhyl, tu as fait du bon boulot",
                "timeStamp": 1622486046344
            }
        ],
        "createdAt": "2021-05-31T18:29:52.215Z",
        "updatedAt": "2021-05-31T19:27:54.577Z",
        "__v": 0
    }
    
##### 2. 10. **type : POST**

         URL : /api/post

#### requetes

N.B :  cette requete sur Postman se fait au niveau de "body" toujours mais particularité au niveau de form-data

    
    Key                           Value
    
    file(type)                      mcdo.jpg
    
    posterId                        60b4eda9b0d1d063d02e61bc
    
    message                         Tes

    
    
### Reponses :

    renvoie (200) en cas du succès et (400) en cas d'erreur.
    
    {
        "likers": [],
        "_id": "60b60b896e31ce68c0cfb9c6",
        "posterId": "60b4eda9b0d1d063d02e61bc",
        "message": "Tes",
        "picture": "./uploads/posts/60b4eda9b0d1d063d02e61bc1622543241433jpg",
        "comments": [],
        "createdAt": "2021-06-01T10:27:21.443Z",
        "updatedAt": "2021-06-01T10:27:21.443Z",
        "__v": 0
    }

