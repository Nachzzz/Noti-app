const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const UserProfile = require('../models/UserProfile');
const Category = require('../models/Category');
const Article = require('../models/Article');
const Comment = require('../models/Comment');

require('dotenv').config();

const seedDatabase = async () => {
  try {
    // Conectar a MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/notiapp');
    console.log('Connected to MongoDB');

    // Limpiar la base de datos
    await User.deleteMany({});
    await UserProfile.deleteMany({});
    await Category.deleteMany({});
    await Article.deleteMany({});
    await Comment.deleteMany({});

    // Crear usuarios de prueba
    const users = await User.create([
      {
        username: 'admin',
        email: 'admin@notiapp.com',
        password: 'admin123',
        first_name: 'Admin',
        last_name: 'User'
      },
      {
        username: 'usuario1',
        email: 'usuario1@notiapp.com',
        password: 'password123',
        first_name: 'Juan',
        last_name: 'Pérez'
      },
      {
        username: 'usuario2',
        email: 'usuario2@notiapp.com',
        password: 'password123',
        first_name: 'María',
        last_name: 'Gómez'
      }
    ]);

    // Crear perfiles de usuario
    await UserProfile.create([
      {
        user: users[0]._id,
        bio: 'Administrador del sistema NotiApp',
        dob: new Date('1990-01-01')
      },
      {
        user: users[1]._id,
        bio: 'Periodista y escritor apasionado por las noticias',
        dob: new Date('1985-05-15')
      },
      {
        user: users[2]._id,
        bio: 'Amante de la tecnología y las últimas tendencias',
        dob: new Date('1992-08-20')
      }
    ]);

    // Crear categorías
    const categories = await Category.create([
      { name: 'Tecnología', description: 'Noticias sobre tecnología e innovación' },
      { name: 'Deportes', description: 'Últimas noticias deportivas' },
      { name: 'Política', description: 'Noticias políticas nacionales e internacionales' },
      { name: 'Cultura', description: 'Eventos culturales y artísticos' },
      { name: 'Economía', description: 'Noticias económicas y financieras' }
    ]);

    // Crear artículos de prueba
    const articles = await Article.create([
      {
        title: 'Avances en Inteligencia Artificial Revolucionan la Industria',
        abstract: 'Los últimos desarrollos en IA están transformando múltiples sectores industriales',
        content: 'La inteligencia artificial continúa avanzando a un ritmo acelerado, con nuevas aplicaciones que están revolucionando desde la medicina hasta la manufactura. Expertos predicen que en los próximos años veremos cambios aún más significativos en cómo interactuamos con la tecnología.',
        author: users[0]._id,
        categories: [categories[0]._id],
        view_count: 150
      },
      {
        title: 'Selección Nacional Gana Campeonato Internacional',
        abstract: 'El equipo nacional se corona campeón en torneo continental',
        content: 'En un emocionante partido final, la selección nacional logró vencer al equipo rival por 3-2, coronándose campeones del torneo continental. El jugador estrella anotó dos goles decisivos en los minutos finales del encuentro.',
        author: users[1]._id,
        categories: [categories[1]._id],
        view_count: 89
      },
      {
        title: 'Nuevas Medidas Económicas Anunciadas por el Gobierno',
        abstract: 'El gobierno presenta paquete de estímulo económico para reactivar el mercado',
        content: 'El ministro de economía anunció hoy un conjunto de medidas destinadas a estimular el crecimiento económico y reducir la inflación. Las nuevas políticas incluyen incentivos fiscales para pymes y programas de inversión en infraestructura.',
        author: users[2]._id,
        categories: [categories[2]._id, categories[4]._id],
        view_count: 203
      }
    ]);

    // Crear comentarios de prueba
    await Comment.create([
      {
        content: 'Excelente artículo, muy informativo sobre los avances en IA.',
        article: articles[0]._id,
        author: users[1]._id
      },
      {
        content: 'Me encantó el partido, fue muy emocionante hasta el último minuto!',
        article: articles[1]._id,
        author: users[2]._id
      },
      {
        content: 'Espero que estas medidas económicas realmente ayuden a la economía familiar.',
        article: articles[2]._id,
        author: users[0]._id
      },
      {
        content: '¿Cuándo podremos ver estas tecnologías aplicadas en la vida cotidiana?',
        article: articles[0]._id,
        author: users[2]._id
      }
    ]);

    console.log('Database seeded successfully!');
    console.log('Users created:', users.length);
    console.log('Categories created:', categories.length);
    console.log('Articles created:', articles.length);
    
    // Mostrar credenciales de prueba
    console.log('\n=== CREDENCIALES DE PRUEBA ===');
    console.log('Usuario: admin | Contraseña: admin123');
    console.log('Usuario: usuario1 | Contraseña: password123');
    console.log('Usuario: usuario2 | Contraseña: password123');
    console.log('=============================\n');

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
};

seedDatabase();