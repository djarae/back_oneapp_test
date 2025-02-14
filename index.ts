
import { createPool } from "mysql2/promise";
import express, { Request, Response } from "express";
import dotenv from "dotenv";
var cors = require('cors')
import bodyParser from "body-parser";

// Importaciones locales
import { Post } from "./model/post";
import { DbConfig } from "./config/dbconfig";

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());

const pool = createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "oneappdb",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

app.post("/login", async (req:any,res:any) => {
  const { email, contrasena } = req.body;
  try {
    const [result]: any = await pool.query(
      "SELECT * FROM usuario WHERE email = ? AND contraseña = ?",
      [email, contrasena]
    );
    if (result.length > 0) {
      res.send("true");
    } else {
      res.send("false");
    }
  } catch (error) {
    res.status(500).send("Error en el login");
  }
});

app.post("/getPosts", async (req:any,res:any) => {
  const { idPagina } = req.body;
  console.log("request")

  console.log(idPagina)
  try {
    const offsetValue = 10;
    const [posts] = await pool.query(
      "SELECT * FROM post LIMIT 10 OFFSET "+idPagina,
      [offsetValue]
    );
    res.send(posts);
  } catch (error) {
    res.status(500).send("Error obteniendo posts");
  }
});

app.post("/postPost", async (req:any,res:any) => {
  const { titulo, contenido } = req.body;
  try {
    await pool.query(
      "INSERT INTO post (idUsuario, titulo, contenido, fechaCreacion) VALUES (?, ?, ?, CURRENT_DATE)",
      [1, titulo, contenido]
    );
    res.send("Ok");
  } catch (error) {
    res.status(500).send("Error creando post");
  }
});

app.put("/putPost/:id", async (req:any,res:any) => {
  const { id } = req.params;
  const { titulo, contenido } = req.body;
  try {
    await pool.query(
      "UPDATE post SET titulo = ?, contenido = ? WHERE id = ?",
      [titulo, contenido, id]
    );
    res.send("Post actualizado");
  } catch (error) {
    res.status(500).send("Error actualizando post");
  }
});

app.delete("/deletePost/:id", async (req:any,res:any) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM post WHERE id = ?", [id]);
    res.send("Post eliminado");
  } catch (error) {
    res.status(500).send("Error eliminando post");
  }
});

app.post("/crearUsuario", async (req:any,res:any) => {
  const { email, contrasena } = req.body;
  try {
    const [usuarios]: any = await pool.query(
      "SELECT * FROM usuario WHERE email = ?",
      [email]
    );
    if (usuarios.length > 0) {
      return res.status(400).send("Error: El correo ya está registrado.");
    }
    await pool.query(
      "INSERT INTO usuario (email, contraseña, idRol, fechaCreacion) VALUES (?, ?, ?, CURRENT_DATE)",
      [email, contrasena, 2]
    );
    res.send("Usuario creado exitosamente.");
  } catch (error) {
    res.status(500).send("Error creando usuario");
  }
});

app.get("/post/:id", async (req:any,res:any) => {
  const { id } = req.params;
  try {
    const [result]: any = await pool.query("SELECT * FROM Post WHERE id = ?", [id]);
    if (result.length === 0) {
      return res.status(404).json({ message: "Post no encontrado" });
    }
    res.json(result[0]);
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo el post", error });
  }
});

app.post("/comentarios/getComentario", async (req:any,res:any) => {
  const { idPost } = req.body;
  try {
    const [result] = await pool.query("SELECT * FROM Comentario WHERE idPost = ?", [idPost]);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo comentarios", error });
  }
});

app.post("/comentario", async (req:any,res:any) => {
  const { idUsuario, idPost, contenido } = req.body;
  try {
    await pool.query(
      "INSERT INTO Comentario (idUsuario, idPost, contenido, fechaCreacion) VALUES (?, ?, ?, NOW())",
      [idUsuario, idPost, contenido]
    );
    res.status(201).json({ message: "Comentario creado" });
  } catch (error) {
    res.status(500).json({ message: "Error creando comentario", error });
  }
});

app.put("/comentario/:id", async (req:any,res:any) => {
  const { id } = req.params;
  const { contenido } = req.body;
  try {
    await pool.query("UPDATE Comentario SET contenido = ? WHERE id = ?", [contenido, id]);
    res.json({ message: "Comentario actualizado" });
  } catch (error) {
    res.status(500).json({ message: "Error editando comentario", error });
  }
});

app.delete("/comentario/:id", async (req:any,res:any) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM Comentario WHERE id = ?", [id]);
    res.json({ message: "Comentario eliminado" });
  } catch (error) {
    res.status(500).json({ message: "Error eliminando comentario", error });
  }
});

app.get("/", (req:any,res:any) => {
  res.status(200).send("Hello World");
});

app.listen(PORT, () => {
  console.log("Server running at PORT:", PORT);
}).on("error", (error) => {
  throw new Error(error.message);
});
