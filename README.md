# API REST - NODE JS PROJECT.

Proyecto desarrollado con el fin de reforzar conocimientos técnicos para la construcción de API Rest utilizando Typescript, MongoDb, Json Web Token, Swagger OA 2.0 etc.  

### `Requisitos de Instalación Previos`

Necesita tener instalado los siguientes programas:  

- [Node.js](https://nodejs.org/es/download/) versión 16 o superior. Entorno de ejecución de JavaScript orientado a eventos asíncronos.
- [MongoDb](https://www.mongodb.com/docs/manual/installation/)  sistema de base de datos NoSQL, orientado a documentos y de código abierto (Considere guía de instalación según sistema operativo). 
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) sistema operativo para contenedores. De manera similar a cómo una máquina virtual virtualiza (elimina la necesidad de administrar directamente) el hardware del servidor, los contenedores virtualizan el sistema operativo de un servidor. (Considere guía de instalación según sistema operativo).
- [Postman](https://www.postman.com/downloads/) plataforma para que los desarrolladores diseñen, construyan, prueben e iteren sus API. 

### `Cómo Iniciar la App`

Primero, instalar las dependencias de la app:

```bash
$ npm install
```

### Iniciar en Modo Dev
Para ejecutar pruebas durante el desarrollo, en archivo app.ts, asegurese de comentar la línea de código debajo de *** Prod *** y tener descomentada la línea de código debajo de *** Dev *** :

```bash
//****Dev****
const db = 'mongodb://localhost:27017/type-basics';
//****Prod****
// const db = 'mongodb://mongo:27017/type-basics';
```

Luego ejecute el siguiente comando:

```bash
$ npm run dev
```

La primera ejecución realiza la creación de roles y usuario administrador para poder operar con postman, u otro software para realizar API request. Se muestra por consola:

```bash
Server is running on PORT 4444
Successfully connected to mongodb://localhost:27017/type-basics
[
  { name: 'user', _id: new ObjectId("63e3ba3feee9f229175d2f41") },
  { name: 'moderator', _id: new ObjectId("63e3ba3feee9f229175d2f42") },
  { name: 'admin', _id: new ObjectId("63e3ba3feee9f229175d2f43") }
]
{
  email: 'admin@admin.com',
  firstName: 'user',
  lastName: 'admin',
  password: '$2a$10$jgnDHzovUiSmcjrYeCArmelCDC08UTRZ6QbpitrQNGK2rvwRIAbMK',
  userName: 'administrator',
  roles: [ new ObjectId("63e3ba3feee9f229175d2f43") ],
  _id: new ObjectId("63e3ba3feee9f229175d2f4a"),
  createdAt: 2023-02-08T15:05:35.907Z,
  updatedAt: 2023-02-08T15:05:35.907Z
}
```

Las credenciales creadas para ejecutar solicitudes a la API son:

- usuario: administrator
- password: 1234

### Iniciar App en Contenedor Docker

Para ejecutar la contenerización de la API, en archivo app.ts, asegurese de descomentar la línea de código debajo de *** Prod *** y tener comentada la línea de código debajo de *** Dev *** :

```bash
//****Dev****
//const db = 'mongodb://localhost:27017/type-basics';
//****Prod****
const db = 'mongodb://mongo:27017/type-basics';
```

Asegúrese de que Docker Desktop este corriendo, y ejecute el siguiente comando:

```bash
$ docker-compose up
```

La primera ejecución realiza la creación de roles y usuario administrador para poder operar con postman, u otro software para realizar API request. Se muestra por consola:

```bash
app-type-basics  | [
app-type-basics  |   { name: 'user', _id: new ObjectId("63e3c14689a18f43d8bf8bca") },
app-type-basics  |   { name: 'moderator', _id: new ObjectId("63e3c14689a18f43d8bf8bcb") },
app-type-basics  |   { name: 'admin', _id: new ObjectId("63e3c14689a18f43d8bf8bcc") }
app-type-basics  | ]
app-type-basics  | {
app-type-basics  |   email: 'admin@admin.com',
app-type-basics  |   firstName: 'user',
app-type-basics  |   lastName: 'admin',
app-type-basics  |   password: '$2a$10$r8c2fXXd5kCRty6W8devuejmHpokZCa2QKDYjONjygvPQ6xjyY9uG',
app-type-basics  |   userName: 'administrator',
app-type-basics  |   roles: [ new ObjectId("63e3c14689a18f43d8bf8bcc") ],
app-type-basics  |   _id: new ObjectId("63e3c14789a18f43d8bf8bd3"),
app-type-basics  |   createdAt: 2023-02-08T15:35:35.227Z,
app-type-basics  |   updatedAt: 2023-02-08T15:35:35.227Z
app-type-basics  | }
```

Las credenciales creadas para ejecutar solicitudes a la API son:

- usuario: administrator
- password: 1234

### `Ejecutar Solicitudes Http`

### Primero obtenga Token de Autorización
Utilizar Postman para realizar un solcitud POST. En el body (raw) utilizar el siguiente objeto JSON:

```bash
{
    "username": "administrator",
    "password": "1234"
}
```

Recibirá de respuesta un objeto JSON con la siguiente información:

```bash
{
    "status": "OK",
    "data": {
        "_id": "63e3c2062aec23041ded6576",
        "email": "admin@admin.com",
        "firstName": "user",
        "lastName": "admin",
        "password": "$2a$10$qh2BXUZNNL773JRmM0YL..ljBXpLHeztOtZdqwcrXNzuAfYffUTJS",
        "userName": "administrator",
        "roles": [
            {
                "_id": "63e3c2062aec23041ded656f",
                "name": "admin"
            }
        ],
        "createdAt": "2023-02-08T15:38:46.588Z",
        "updatedAt": "2023-02-08T15:38:46.588Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiI2M2UzYzIwNjJhZWMyMzA0MWRlZDY1NzYiLCJpYXQiOjE2NzU4NzA3MzYsImV4cCI6MTY3NTg3NzkzNn0.TjcVsqavU8elykw4fVn-StZ5XcDLW7-p2WXOfJWla94"
}
```

Copie el string de la propiedad "token".

### Acceda a Documentación de Swagger

Con el contenedor Docker corriendo, o ejecutando la app en modo dev, acceda a la siguiente dirección:

- http://localhost:4444/api/docs/

Luego presione el botón "Authorize", escriba "Bearer", luego un espacio, y peque el token antes copiado.

La documentación lo guiará en la operaciones disponibles para ejecutar solicitudes Http a la API.