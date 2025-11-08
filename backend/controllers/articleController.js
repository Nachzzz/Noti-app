const Article = require('../models/Article');

// Obtener todos los artículos
const getArticles = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;
    const title = req.query.title || '';

    let query = {};
    if (title) {
      query.title = { $regex: title, $options: 'i' };
    }

    const articles = await Article.find(query)
      .populate('author', 'username first_name last_name')
      .populate('categories')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Article.countDocuments(query);

    res.json({
      results: articles,
      count: articles.length,
      total,
      next: page * limit < total ? page + 1 : null,
      previous: page > 1 ? page - 1 : null
    });
  } catch (error) {
    console.error('Error getting articles:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Obtener artículo por ID
const getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id)
      .populate('author', 'username first_name last_name')
      .populate('categories');

    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    // Incrementar contador de vistas
    article.view_count += 1;
    await article.save();

    res.json(article);
  } catch (error) {
    console.error('Error getting article:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Crear nuevo artículo
const createArticle = async (req, res) => {
  try {
    console.log('Received article creation request');
    console.log('Request body:', req.body);
    console.log('Request file:', req.file);
    console.log('User:', req.user);

    const { title, content, abstract } = req.body;
    
    // Validar campos requeridos
    if (!title || !content) {
      return res.status(400).json({ 
        message: 'El título y contenido son requeridos' 
      });
    }

    // Procesar categorías - pueden venir como string o array
    let categories = [];
    if (req.body.categories) {
      if (typeof req.body.categories === 'string') {
        // Si es string, puede ser un solo ID o un array JSON
        try {
          categories = JSON.parse(req.body.categories);
        } catch {
          // Si no es JSON válido, asumir que es un solo ID
          categories = [req.body.categories];
        }
      } else if (Array.isArray(req.body.categories)) {
        categories = req.body.categories;
      }
    }

    console.log('Processed categories:', categories);

    const article = new Article({
      title,
      content,
      abstract: abstract || '',
      author: req.user._id,
      categories: categories
    });

    if (req.file) {
      article.image = `/uploads/articles/${req.file.filename}`;
    }

    await article.save();
    
    // Popular los datos relacionados
    await article.populate('author', 'username first_name last_name');
    await article.populate('categories', 'name');

    console.log('Article created successfully:', article._id);

    res.status(201).json(article);
  } catch (error) {
    console.error('Error creating article:', error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        message: 'Datos de artículo inválidos',
        errors: error.errors 
      });
    }
    
    res.status(500).json({ 
      message: 'Error interno del servidor al crear el artículo' 
    });
  }
};

// Eliminar artículo
const deleteArticle = async (req, res) => {
  try {
    console.log('Deleting article with ID:', req.params.id); // Debug
    
    const article = await Article.findById(req.params.id);
    
    if (!article) {
      console.log('Article not found:', req.params.id);
      return res.status(404).json({ message: 'Article not found' });
    }

    // Verificar si el usuario es el autor
    if (article.author.toString() !== req.user._id.toString()) {
      console.log('User not authorized to delete article');
      return res.status(403).json({ message: 'Not authorized to delete this article' });
    }

    await Article.findByIdAndDelete(req.params.id);
    console.log('Article deleted successfully:', req.params.id);
    res.json({ message: 'Article deleted successfully' });
  } catch (error) {
    console.error('Error deleting article:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Actualizar artículo (opcional - por si lo necesitas después)
const updateArticle = async (req, res) => {
  try {
    const { title, content, abstract, categories } = req.body;
    
    const article = await Article.findById(req.params.id);
    
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    // Verificar si el usuario es el autor
    if (article.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this article' });
    }

    // Actualizar campos
    if (title) article.title = title;
    if (content) article.content = content;
    if (abstract) article.abstract = abstract;
    if (categories) article.categories = categories;

    if (req.file) {
      article.image = `/uploads/articles/${req.file.filename}`;
    }

    await article.save();
    await article.populate('author', 'username first_name last_name');
    await article.populate('categories');

    res.json(article);
  } catch (error) {
    console.error('Error updating article:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getArticles,
  getArticleById,
  createArticle,
  deleteArticle,
  updateArticle
};