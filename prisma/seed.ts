import { PrismaClient } from "@prisma/client";
import partsJson from './resources/parts.json';

const prisma = new PrismaClient();


async function seed() {

  const parts = partsJson;
  for (const part of parts) {
    await prisma.part.create(
      {
        data: part,
      }
    );
  }
  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
