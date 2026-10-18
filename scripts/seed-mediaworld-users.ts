import { hashPassword } from '@/lib/auth';
import { prisma } from '@/lib/db';

const PASSWORD = 'ROBIN087654321robin###';

async function main() {
  const passwordHash = await hashPassword(PASSWORD);

  const users = [
    { username: 'profile-1', name: 'Profile One', email: 'profile-1@twingface.test', role: 'USER' as const },
    { username: 'profile-2', name: 'Profile Two', email: 'profile-2@twingface.test', role: 'USER' as const },
    { username: 'profile-3', name: 'Profile Three', email: 'profile-3@twingface.test', role: 'USER' as const },
    { username: 'profile-4', name: 'Profile Four', email: 'profile-4@twingface.test', role: 'USER' as const },
    { username: 'profile-5', name: 'Profile Five', email: 'profile-5@twingface.test', role: 'USER' as const },
    { username: 'super_admin', name: 'Super Admin', email: 'super_admin@twingface.test', role: 'SUPER_ADMIN' as const },
  ];

  const professions = ['OTHER', 'HOBBIES', 'FASHION', 'ELECTRONICS', 'VEHICLES'] as const;
  const divisions = ['Dhaka', 'Chattogram', 'Sylhet', 'Rajshahi', 'Khulna', 'Barishal'];
  const districts = ['Dhaka', 'Chattogram', 'Sylhet', 'Rajshahi', 'Khulna', 'Barishal'];

  for (let i = 0; i < users.length; i++) {
    const u = users[i];

    // Upsert user by unique username
    const user = await prisma.user.upsert({
      where: { username: u.username },
      update: { passwordHash, role: u.role, name: u.name, email: u.email },
      create: {
        username: u.username,
        name: u.name,
        email: u.email,
        passwordHash,
        role: u.role,
      },
      select: { id: true, username: true, role: true },
    });

    // Create / update MediaProfile so it appears in Find Talent / Super Admin dashboard
    await prisma.mediaProfile.upsert({
      where: { userId: user.id },
      update: {
        fullName: u.name,
        profession: professions[i % professions.length],
        bio: `This is ${u.name}, a media professional from Bangladesh.`,
        division: divisions[i % divisions.length],
        district: districts[i % districts.length],
        phone: '+880170000000' + (i + 1),
        email: u.email,
        portfolio: 'https://example.com/portfolio',
        experience: '5+ years',
        status: u.role === 'SUPER_ADMIN' ? 'APPROVED' : 'PENDING',
      },
      create: {
        userId: user.id,
        fullName: u.name,
        profession: professions[i % professions.length],
        bio: `This is ${u.name}, a media professional from Bangladesh.`,
        division: divisions[i % divisions.length],
        district: districts[i % districts.length],
        phone: '+880170000000' + (i + 1),
        email: u.email,
        portfolio: 'https://example.com/portfolio',
        experience: '5+ years',
        status: u.role === 'SUPER_ADMIN' ? 'APPROVED' : 'PENDING',
      },
    });

    console.log(`✅ Created/updated: ${u.username} (${u.role}) → MediaProfile status: ${u.role === 'SUPER_ADMIN' ? 'APPROVED' : 'PENDING'}`);
  }

  console.log('\n🎉 All users created successfully!');
  console.log('Login credentials:');
  console.log('  Password for all accounts: ROBIN087654321robin###');
  console.log('  Usernames: profile-1, profile-2, profile-3, profile-4, profile-5, super_admin');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
