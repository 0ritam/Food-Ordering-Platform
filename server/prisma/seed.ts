import { PrismaClient } from '../src/generated/prisma/client.js';

// Initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');

  // Clear existing data
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.item.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  console.log('Cleared existing data');

  // Create Categories
  const category1 = await prisma.category.create({
    data: { name: 'Fruits' },
  });

  const category2 = await prisma.category.create({
    data: { name: 'Vegetables' },
  });

  const category3 = await prisma.category.create({
    data: { name: 'Breads' },
  });
  
  const category4 = await prisma.category.create({
    data: { name: 'Non-Veg' },
  });

  console.log('Created categories:', { category1, category2, category3, category4 });

  // Create Items
  await prisma.item.create({
    data: {
      name: 'Apple',
      description: 'A crisp, sweet red apple.',
      price: 0.5,
      imageUrl: 'https://placehold.co/600x400/FF0000/FFF?text=Apple',
      stock: 100,
      categoryId: category1.id,
    },
  });

  await prisma.item.create({
    data: {
      name: 'Banana',
      description: 'A ripe yellow banana.',
      price: 0.3,
      imageUrl: 'https://placehold.co/600x400/FFFF00/000?text=Banana',
      stock: 150,
      categoryId: category1.id,
    },
  });

  await prisma.item.create({
    data: {
      name: 'Carrot',
      description: 'A fresh orange carrot.',
      price: 0.2,
      imageUrl: 'https://placehold.co/600x400/FFA500/FFF?text=Carrot',
      stock: 200,
      categoryId: category2.id,
    },
  });
  
  await prisma.item.create({
    data: {
      name: 'Broccoli',
      description: 'A head of green broccoli.',
      price: 1.2,
      imageUrl: 'https://placehold.co/600x400/008000/FFF?text=Broccoli',
      stock: 80,
      categoryId: category2.id,
    },
  });

  await prisma.item.create({
    data: {
      name: 'Baguette',
      description: 'A crusty French baguette.',
      price: 2.5,
      imageUrl: 'https://placehold.co/600x400/DEB887/FFF?text=Baguette',
      stock: 50,
      categoryId: category3.id,
    },
  });

  await prisma.item.create({
    data: {
      name: 'Chicken Breast',
      description: 'Fresh, skinless chicken breast.',
      price: 5.0,
      imageUrl: 'https://placehold.co/600x400/F0E68C/000?text=Chicken',
      stock: 30,
      categoryId: category4.id,
    },
  });

  console.log('Created items.');
  console.log('Seed completed successfully!');
}

// Run the seed script
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // Close the Prisma Client
    await prisma.$disconnect();
  });