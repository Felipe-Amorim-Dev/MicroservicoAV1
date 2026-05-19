import Fastify from 'fastify';
import { Product } from './model/product.entity.js';

const app = Fastify({
  logger: true
});

const products: Product[] = [
  {
    id: 1,
    name: 'Notebook Pro',
    price: 3500,
    stock: 10
  },
  {
    id: 2,
    name: 'Mouse Gamer',
    price: 150,
    stock: 25
  },
  {
    id: 3,
    name: 'Teclado Mecânico',
    price: 450,
    stock: 15
  }
];

app.get('/products', async () => {
  return products;
});

app.get<{ Params: { id: string } }>(
  '/products/:id',
  async (request, reply) => {
    const id = Number(request.params.id);

    const product = products.find(product => product.id === id);

    if (!product) {
      return reply.status(404).send({
        error: 'Produto não encontrado'
      });
    }

    return product;
  }
);

const start = async () => {
  try {
    await app.listen({
      port: 3001,
      host: '0.0.0.0'
    });
    
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
};

start();