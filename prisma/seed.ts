// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Seed customers
  const customer1 = await prisma.customer.create({
    data: {
      name: 'John Doe',
      email: 'johndoe@example.com',
      phone: '123456789',
      address:""
    },
  });

  const customer2 = await prisma.customer.create({
    data: {
      name: 'Jane Smith',
      email: 'janesmith@example.com',
      phone: '987654321',
    },
  });

  // Seed products
  const product1 = await prisma.product.create({
    data: {
      name: 'Product A',
      price: '100',
    },
  });

  const product2 = await prisma.product.create({
    data: {
      name: 'Product B',
      price: '200',
    },
  });

  // Seed orders without assigning to variables
  await prisma.order.create({
    data: {
      orderNumber: 'ORD001',
      totalAmount: '300',
      status: 'PENDING',
      customerId: customer1.id,
      orderItems: {
        create: [
          {
            quantity: 1,
            price: '100',
            productId: product1.id,
          },
          {
            quantity: 1,
            price: '200',
            productId: product2.id,
          },
        ],
      },
    },
  });

  await prisma.order.create({
    data: {
      orderNumber: 'ORD002',
      totalAmount: '200',
      status: 'COMPLETED',
      customerId: customer2.id,
      orderItems: {
        create: [
          {
            quantity: 2,
            price: '100',
            productId: product1.id,
          },
        ],
      },
    },
  });

  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
