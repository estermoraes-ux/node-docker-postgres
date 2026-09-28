const express = require('express');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

// 1. Criar Autor (POST /authors)
app.post('/authors', async (req, res) => {
  try {
    const { name, biography } = req.body;
    const author = await prisma.authors.create({
      data: { name, biography }
    });
    return res.status(201).json(author);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

// 2. Criar Livro (POST /books)
app.post('/books', async (req, res) => {
  try {
    const { title, release_year, author_id } = req.body;
    const book = await prisma.books.create({
      data: { title, release_year, author_id }
    });
    return res.status(201).json(book);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

// 3. Listar Livros com Autores (GET /books)
app.get('/books', async (req, res) => {
  try {
    const books = await prisma.books.findMany({
      include: { author: true }
    });
    return res.json(books);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// 4. Atualizar Livro (PUT /books/:id)
app.put('/books/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, release_year, author_id } = req.body;
    const updatedBook = await prisma.books.update({
      where: { id },
      data: { title, release_year, author_id }
    });
    return res.json(updatedBook);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

// 5. Excluir Livro (DELETE /books/:id)
app.delete('/books/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.books.delete({ where: { id } });
    return res.status(204).send();
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});