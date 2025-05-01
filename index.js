const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();
const port = 8913;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

const User = require('./models/user');
const auth = require('./middleware/auth');

// Login route
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Register route
app.post('/authors', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get user profile
app.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.json({ user: { id: user._id, name: user.name, email: user.email } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

require("dotenv").config();

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

// Modello per i commenti
const commentSchema = new mongoose.Schema({
  _id: { type: Number, required: true },
  text: { type: String, required: true },
  author: { type: String, required: true },
  createdAt: { type: String, required: true }
});

// Modello per i post del blog
const postSchema = new mongoose.Schema({
  _id: { type: Number, required: true },
  category: { type: String, required: true },
  title: { type: String, required: true },
  cover: { type: String, required: true },
  readTime: {
    value: { type: Number, required: true },
    unit: { type: String, required: true },
  },
  author: {
    name: { type: String, required: true },
    avatar: { type: String, required: true },
  },
  content: { type: String, required: true },
  createdAt: { type: String, required: true },
  comments: [commentSchema]
});

const Post = mongoose.model("Post", postSchema);

const { upload } = require("./utils/cloudinary");

// Rotte per upload immagini
app.post("/authors/avatar", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Nessun file caricato" });
    }
    res.json({ url: req.file.path });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/posts/cover", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Nessun file caricato" });
    }
    res.json({ url: req.file.path });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rotte
app.get("/posts", async (req, res) => {
  try {
    let query = {};

    // Ricerca per titolo
    if (req.query.title) {
      query.title = { $regex: req.query.title, $options: "i" };
    }

    // Ricerca per autore
    if (req.query.author) {
      query["author.name"] = { $regex: req.query.author, $options: "i" };
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
      "author.name": req.params.authorName,
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
  try {
    const newPost = new Post(req.body);
    await newPost.save();

    // Send notification email
    await sendEmail(
      process.env.ADMIN_EMAIL,
      "Nuovo Post Pubblicato",
      `<h1>Nuovo post pubblicato sul blog</h1>
       <p><strong>Titolo:</strong> ${newPost.title}</p>
       <p><strong>Autore:</strong> ${newPost.author.name}</p>
       <p><strong>Categoria:</strong> ${newPost.category}</p>
       <a href="${process.env.FRONTEND_URL}/blog/${newPost._id}">Leggi il post</a>`
    );

    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.put("/posts/:id", async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
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

// Routes for comments
app.get("/blogPosts/:id/comments", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).send("Post non trovato");
    }
    res.json(post.comments);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get("/blogPosts/:id/comments/:commentId", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).send("Post non trovato");
    }
    const comment = post.comments.find(c => c._id === parseInt(req.params.commentId));
    if (!comment) {
      return res.status(404).send("Commento non trovato");
    }
    res.json(comment);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post("/blogPosts/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).send("Post non trovato");
    }

    const newComment = {
      _id: post.comments.length + 1,
      text: req.body.text,
      author: req.body.author,
      createdAt: req.body.createdAt
    };

    post.comments.push(newComment);
    await post.save();

    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.put("/blogPosts/:id/comment/:commentId", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).send("Post non trovato");
    }

    const commentIndex = post.comments.findIndex(c => c._id === parseInt(req.params.commentId));
    if (commentIndex === -1) {
      return res.status(404).send("Commento non trovato");
    }

    post.comments[commentIndex] = {
      ...post.comments[commentIndex],
      ...req.body
    };
    
    await post.save();
    res.json(post.comments[commentIndex]);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.delete("/blogPosts/:id/comment/:commentId", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).send("Post non trovato");
    }

    post.comments = post.comments.filter(
      comment => comment._id !== parseInt(req.params.commentId)
    );
    await post.save();

    res.json({ message: "Commento eliminato con successo" });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

const { sendEmail } = require("./utils/email");

app.post("/send-email", async (req, res) => {
  try {
    const { to, subject, content } = req.body;
    await sendEmail(to, subject, content);
    res.json({ message: "Email inviata con successo" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Avvio del server
app.listen(port, "0.0.0.0", () => {
  console.log(`Server in esecuzione sulla porta ${port}`);
});