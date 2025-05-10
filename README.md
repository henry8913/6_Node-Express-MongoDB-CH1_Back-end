# Blog Backend

Backend Node.js/Express per la gestione di un blog con MongoDB.

![Cover del progetto](img/cover.jpg)

## 🚀 Caratteristiche

- API RESTful
- Sistema di autenticazione
  - Autenticazione locale con bcrypt e JWT
  - OAuth 2.0 con Google
  - Gestione token JWT
  - Middleware di protezione route
  - Autorizzazione basata su ruoli per post e commenti
- Sistema di gestione contenuti
  - CRUD completo per post e commenti
  - Verifica proprietà dei contenuti
  - Protezione delle operazioni di modifica/eliminazione
- Integrazione MongoDB
- Upload immagini con Cloudinary
- Sistema di notifiche email
- CORS abilitato
- Gestione degli errori
- Schema validazione dati

## 🛠 Tecnologie

- Node.js
- Express
- MongoDB con Mongoose
- Cloudinary per gestione immagini
- SendGrid per invio email
- CORS
- Dotenv

## 📦 Installazione

```bash
npm install
```

## ⚙️ Configurazione

Crea un file `.env` nella root del progetto:

```
MONGODB_URL= # URL di connessione al database MongoDB
appName= # Nome dell'applicazione
PORT= # Porta su cui il server sarà in ascolto
FRONTEND_URL= #http://0.0.0.0:3000
BACKEND_URL= #http://0.0.0.0:8913

CLOUDINARY_CLOUD_NAME= # Nome del cloud su Cloudinary
CLOUDINARY_API_KEY= # Chiave API di Cloudinary
CLOUDINARY_API_SECRET= # Segreto API di Cloudinary

SENDGRID_API_KEY= # Chiave API di SendGrid per l'invio di email
ADMIN_EMAIL= # Email dell'amministratore
JWT_SECRET= # Chiave segreta per la generazione dei token JWT
SALT_ROUNDS= # Numero di round per la generazione dell'hash della password

GOOGLE_CLIENT_ID= # ID del client Google per OAuth 2.0
GOOGLE_CLIENT_SECRET= # Segreto del client Google per OAuth 2.0
```

## 🚀 Avvio

```bash
npm run dev
```

Il server sarà in ascolto sulla porta 8913

## 📝 API Endpoints

- `GET /posts` - Recupera tutti i post
- `GET /posts/:id` - Recupera un post specifico
- `POST /posts` - Crea un nuovo post
- `PUT /posts/:id` - Aggiorna un post
- `DELETE /posts/:id` - Elimina un post
- `POST /posts/cover` - Upload immagine di copertina
- `POST /authors/avatar` - Upload avatar autore
- `GET /posts/:id/comments` - Recupera tutti i commenti di un post
- `POST /posts/:id/comments` - Aggiunge un nuovo commento a un post
- `PUT /posts/:id/comments/:commentId` - Modifica un commento
- `DELETE /posts/:id/comments/:commentId` - Elimina un commento

### Struttura JSON per POST /posts

```json
{
  "_id": Number,
  "category": String,
  "title": String,
  "cover": String,
  "readTime": {
    "value": Number,
    "unit": String
  },
  "author": {
    "name": String,
    "avatar": String
  },
  "content": String,
  "createdAt": String,
  "comments": [
    {
      "_id": Number,
      "text": String,
      "author": String,
      "createdAt": String
    }
  ]
}
```

Esempio:
```json
{
  "_id": 16,
  "category": "Frontend",
  "title": "Il mio nuovo post",
  "cover": "https://example.com/image.jpg",
  "readTime": {
    "value": 5,
    "unit": "minute"
  },
  "author": {
    "name": "Mario Rossi",
    "avatar": "https://example.com/avatar.jpg"
  },
  "content": "<div class='py-5 blog-content'><p>Il contenuto del post...</p></div>",
  "createdAt": "30 Apr 2024",
  "comments": [
    {
      "_id": 1,
      "text": "Ottimo articolo!",
      "author": "Luigi Bianchi",
      "createdAt": "1 May 2024"
    }
  ]
}
```

## 👤 Autore
Progetto creato da [Henry](https://github.com/henry8913) per scopi didattici.

## 📄 Licenza

Questo progetto è rilasciato sotto licenza MIT. Vedi il file LICENSE per i dettagli.