# Blog Backend

Backend Node.js/Express per la gestione di un blog con MongoDB.

![Cover del progetto](img/cover.jpg)

## 🚀 Caratteristiche

- API RESTful
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
MONGODB_URL=il_tuo_url_mongodb
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
SENDGRID_API_KEY=your_sendgrid_api_key
ADMIN_EMAIL=your_admin_email
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