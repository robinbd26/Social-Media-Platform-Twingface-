import { hashPassword } from '@/lib/auth';
import { prisma } from '@/lib/db';

async function main() {
  const password = process.env.SUPER_ADMIN_PASSWORD;
  if (!password) {
    throw new Error('SUPER_ADMIN_PASSWORD must be set before seeding the Super Admin account.');
  }

  const passwordHash = await hashPassword(password);
  const user = await prisma.user.upsert({
    where: { email: 'superadmin@gmail.com' },
    update: {
      name: 'Super Admin',
      username: 'superadmin',
      passwordHash,
      role: 'SUPER_ADMIN',
    },
    create: {
      name: 'Super Admin',
      username: 'superadmin',
      email: 'superadmin@gmail.com',
      passwordHash,
      role: 'SUPER_ADMIN',
    },
    select: { id: true, email: true, username: true, role: true },
  });

  console.log(`Super Admin account ready: ${user.email} (${user.username}, ${user.role})`);
}

main()
  .catch((error: unknown) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
