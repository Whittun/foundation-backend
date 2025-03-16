// prisma/seed.ts

import { PrismaClient } from '@prisma/client';
import { create } from 'domain';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  const category1 = await prisma.category.create({
    data: {
      text: 'Sport',
      objectives: {
        create: [
          {
            text: 'Objective 1 in Sport',
            status: false,
            days: [false, false, false, false, false, false, false],
          },
          {
            text: 'Objective 2 in Sport',
            status: false,
            days: [false, false, false, false, false, false, false],
          },
        ],
      },
    },
  });

  const category2 = await prisma.category.create({
    data: {
      text: 'Sleep',
      objectives: {
        create: [
          {
            text: 'Objective 2 in Sleep',
            status: false,
            days: [false, false, false, false, false, false, false],
          },
        ],
      },
    },
  });

  console.log({ category1, category2 });
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
