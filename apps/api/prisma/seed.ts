import { PrismaClient } from '@prisma/client';
// import { hash } from 'bcrypt';
// import { faker } from '@faker-js/faker';
const prisma = new PrismaClient();

async function main() {
  const mockUserCount = 100;
  // for (let i = 1; i <= mockUserCount; i++) {
  //   const first_name = faker.name.firstName();
  //   const last_name = faker.name.lastName();
  //   const email =
  //     `${first_name}_${last_name}@${faker.internet.domainName()}`.toLowerCase();
  //   await prisma.user.create({
  //     data: {
  //       first_name,
  //       last_name,
  //       email,
  //       password_hash: await hash(faker.internet.password(8), 10),
  //       avatar: faker.internet.avatar(),
  //     },
  //   });
  // }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
