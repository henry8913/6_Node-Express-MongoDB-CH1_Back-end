
# Blog Backend

Backend Node.js/Express per la gestione di un blog con MongoDB.

![Cover del progetto](img/cover.jpg)

## 🚀 Caratteristiche

- API RESTful
- Integrazione MongoDB
- CORS abilitato
- Gestione degli errori
- Schema validazione dati

## 🛠 Tecnologie

- Node.js
- Express
- MongoDB con Mongoose
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
  "createdAt": String
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
  "createdAt": "30 Apr 2024"
}
```

## 👤 Autore
Progetto creato da [Henry](https://github.com/henry8913) per scopi didattici.

## 📄 Licenza

Questo progetto è rilasciato sotto licenza MIT. Vedi il file LICENSE per i dettagli.
