
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const port = 8913;

// Middleware
app.use(cors());
app.use(express.json());

require('dotenv').config();

// Connessione a MongoDB
mongoose
  .connect(process.env.MONGODB_URL, {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  })
  .then(() => console.log("Connesso a MongoDB Atlas"))
  .catch((err) => {
    console.error("Errore di connessione a MongoDB Atlas:", err.message);
    process.exit(1);
  });

// Modello per i post del blog
const postSchema = new mongoose.Schema({
  _id: { type: Number, required: true },
  category: { type: String, required: true },
  title: { type: String, required: true },
  cover: { type: String, required: true },
  readTime: {
    value: { type: Number, required: true },
    unit: { type: String, required: true }
  },
  author: {
    name: { type: String, required: true },
    avatar: { type: String, required: true }
  },
  content: { type: String, required: true },
  createdAt: { type: String, required: true }
});

const Post = mongoose.model("Post", postSchema);

// Rotte
app.get("/posts", async (req, res) => {
  try {
    let query = {};
    
    // Ricerca per titolo
    if (req.query.title) {
      query.title = { $regex: req.query.title, $options: 'i' };
    }
    
    // Ricerca per autore
    if (req.query.author) {
      query['author.name'] = { $regex: req.query.author, $options: 'i' };
    }

    const posts = await Post.find(query);
    res.json(posts);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Endpoint per i post di uno specifico autore
app.get("/authors/:authorName/posts", async (req, res) => {
  try {
    const posts = await Post.find({
      'author.name': req.params.authorName
    });
    res.json(posts);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get("/posts/:id", async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (post) {
    res.json(post);
  } else {
    res.status(404).send("Post non trovato");
  }
});

app.post("/posts", async (req, res) => {
  const newPost = new Post(req.body);
  await newPost.save();
  res.status(201).json(newPost);
});

app.put("/posts/:id", async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (updatedPost) {
      res.json(updatedPost);
    } else {
      res.status(404).send("Post non trovato");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.delete("/posts/:id", async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if (deletedPost) {
      res.json({ message: "Post cancellato con successo" });
    } else {
      res.status(404).send("Post non trovato");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Avvio del server
app.listen(port, "0.0.0.0", () => {
  console.log(`Server in esecuzione sulla porta ${port}`);
});
