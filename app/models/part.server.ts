
import { prisma } from "~/db.server";

export async function getParts() {
  return prisma.part.findMany();
}
