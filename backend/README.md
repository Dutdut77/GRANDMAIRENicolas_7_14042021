# Introduction

So Pekocko est une entreprise familiale qui a comme activité principale, la création de sauces piquantes dont la composition est tenue secrète.

Cette documentation décrit comment utiliser l'API [So Pekocko](http://localhost:4200/). Nous espérons que vous apprécierez ce document, et n'hésitez pas à nous [signaler un problème](https://github.com/Dutdut77/GRANDMAIRENicolas_6_08032021/issues/new) si vous faites face à un disfonctionnement.



## Autorisation

Pour accéder aux différentes "routes" de l'API, vous devez fournir une clé valide dans le header "Authorization". Cette clé vous est fourni par l'API en vous logant au site [So Pekocko](http://localhost:4200/). Cette clé reste valide pendant 24h. 


## Routes

```http
POST /api/sauces/
```

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `userId` | `string` | **Required**. Identifiant unique |
| `name` | `string` | **Required**. Nom de la sauce |
| `manufacturer` | `string` | **Required**. Fabriquant de la sauce |
| `description` | `string` | **Required**. Description de la sauce |
| `mainPepper` | `string` | **Required**. Principal ingrédient de la sauce |
| `filename` | `string` | **Required**. Nom de la photo |
| `heat` | `Number` | **Required**. Force de la sauce |


----------------

```http
GET /api/sauces/
```

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `/` | `/` | Retourne la liste des sauces au format **JSON** |

----------------

```http
GET /api/sauces/:id
```

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `:id` | `String` | Retourne la sauce demandée au format **JSON** |


----------------

```http
PUT /api/sauces/:id
```

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `name` | `string` | **Required**. Nom de la sauce |
| `manufacturer` | `string` | **Required**. Fabriquant de la sauce |
| `description` | `string` | **Required**. Description de la sauce |
| `mainPepper` | `string` | **Required**. Principal ingrédient de la sauce |
| `filename` | `string` | **Required**. Nom de la photo |
| `heat` | `Number` | **Required**. Force de la sauce |


----------------

```http
DELETE /api/sauces/:id
```

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `:id` | `String` | Supprime de la base de donnée la sauce demandée **:id** |



----------------

```http
POST /api/sauces/:id/like
```

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `likes` | `Number` | **Required**. 1 / 0 / -1 |
| `userId` | `string` | **Required**. Identifiant unique |


## Réponses

Voici un exemple au format JSON que retourne l'API. 

```javascript
{
    "usersLiked": [
        "/"
    ],
    "usersDisliked": [
        "/"
    ],
    "_id": "605a576b12001e395001233f",
    "name": "Moutarde",
    "manufacturer": "Amora",
    "description": "fuyg",
    "mainPepper": "uyguy",
    "heat": 3,
    "userId": "604fbdf275f31b17108cc11b",
    "imageUrl": "http://localhost:3000/images/Sketchpad.png1616533355736.png",
    "likes": 0,
    "dislikes": 0,
    "__v": 0
}
```

The `message` attribute contains a message commonly used to indicate errors or, in the case of deleting a resource, success that the resource was properly deleted.

The `success` attribute describes if the transaction was successful or not.

The `data` attribute contains any other metadata associated with the response. This will be an escaped string containing JSON data.

## Status Codes

So Peckoko renvoie les codes d'état suivants dans son API:


| Status Code | Description |
| :--- | :--- |
| 200 | `OK` |
| 201 | `CREATED` |
| 400 | `BAD REQUEST` |
| 404 | `NOT FOUND` |
| 500 | `INTERNAL SERVER ERROR` |

