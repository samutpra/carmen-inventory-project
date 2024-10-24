import { Prisma, PrismaClient as dbSystem } from '@prisma-carmen-client/system';

const prisma = new dbSystem();

async function main() {
  const business1Obj: Prisma.BusinessCreateInput = {
    name: 'Test Business',
  };

  const business1 = await prisma.business.upsert({
    where: {
      name: business1Obj.name,
    },
    update: {},
    create: business1Obj,
  });

  const user1Obj: Prisma.UserCreateInput = {
    username: 'user1',
    email: 'user1@xxx.xxx',
  };

  const user1 = await prisma.user.upsert({
    where: { username: user1Obj.username },
    update: {},
    create: user1Obj,
  });

  const user2Obj: Prisma.UserCreateInput = {
    username: 'user2',
    email: 'user2@xxx.xxx',
  };

  const user2 = await prisma.user.upsert({
    where: { username: user2Obj.username },
    update: {},
    create: user2Obj,
  });

  const tenant1Obj: Prisma.TenantCreateInput = {
    name: 'tenant 1',
  };

  const tenant1 = await prisma.tenant.upsert({
    where: { name: tenant1Obj.name },
    update: {},
    create: tenant1Obj,
  });

  const tenant2Obj: Prisma.TenantCreateInput = {
    name: 'tenant 2',
  };

  const tenant2 = await prisma.tenant.upsert({
    where: { name: tenant2Obj.name },
    update: {},
    create: tenant2Obj,
  });

  await prisma.userTenant.deleteMany({});

  const userTenant1Obj: Prisma.UserTenantCreateInput = {
    userId: user1.id,
    tenantId: tenant1.id,
  };

  const userTenant1 = await prisma.userTenant.create({
    data: userTenant1Obj,
  });

  const userTenant2Obj: Prisma.UserTenantCreateInput = {
    userId: user2.id,
    tenantId: tenant1.id,
  };

  const userTenant2 = await prisma.userTenant.create({
    data: userTenant2Obj,
  });
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
