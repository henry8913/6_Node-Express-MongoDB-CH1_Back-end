
# Blog Backend

Backend Node.js/Express per la gestione di un blog con MongoDB.

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

## 📄 Licenza

MIT License - Vedi il file LICENSE per i dettagli.

## 👤 Autore

[Henry](https://github.com/henry8913)
