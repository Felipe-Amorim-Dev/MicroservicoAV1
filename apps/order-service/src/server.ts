import Fastify from 'fastify';
import { CreateOrderDto } from './dto/createOrder.dto.js';
import { Order } from './model/order.entity.js';
import { Product } from './model/product.entity.js';

const app = Fastify({
  logger: true
});

const PRODUCT_SERVICE_URL =
  process.env.PRODUCT_SERVICE_URL || 'http://localhost:3001';

const orders: Order[] = [];
let nextId = 1;

app.get('/orders', async () => {
  return orders;
});

app.post<{ Body: CreateOrderDto }>('/orders', async (request, reply) => {
  const { productId, quantity } = request.body;

  if (!productId || !quantity) {
    return reply.status(400).send({
      error: 'productId e quantity são obrigatórios'
    });
  }

  const response = await fetch(`${PRODUCT_SERVICE_URL}/products/${productId}`);

  if (!response.ok) {
    return reply.status(404).send({
      error: 'Produto não encontrado no Product Service'
    });
  }

  const product = (await response.json()) as Product;

  const order: Order = {
    id: nextId++,
    productId,
    productName: product.name,
    quantity,
    total: product.price * quantity,
    createdAt: new Date().toISOString()
  };

  orders.push(order);

  return reply.status(201).send(order);
});

const start = async () => {
  try {
    await app.listen({
      port: 3002,
      host: '0.0.0.0'
    });
    
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
};

start();