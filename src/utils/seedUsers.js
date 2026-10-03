import bcrypt from 'bcrypt';
import userRepository from '../repositories/UserRepository.js';
import roleRepository from '../repositories/RoleRepository.js';

// Crea un admin (y un usuario demo) si no existen. Se llama desde server.js
export default async function seedUsers() {
    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS ?? '10', 10);

    const seeds = [
        {
            roleName: 'admin',
            email: process.env.ADMIN_EMAIL || 'admin@example.com',
            password: process.env.ADMIN_PASSWORD || 'Admin@1234',
            name: 'Admin',
            lastName: 'Sistema',
            phoneNumber: '999999999',
            birthdate: new Date('1990-01-01')
        },
        {
            roleName: 'user',
            email: process.env.DEMO_USER_EMAIL || 'user@example.com',
            password: process.env.DEMO_USER_PASSWORD || 'User@1234',
            name: 'Usuario',
            lastName: 'Demo',
            phoneNumber: '988888888',
            birthdate: new Date('2000-05-15')
        }
    ];

    for (const { roleName, password, ...data } of seeds) {
        const email = data.email.toLowerCase();
        if (await userRepository.findByEmail(email)) continue;

        const role = await roleRepository.findByName(roleName);
        await userRepository.create({
            ...data,
            email,
            password: await bcrypt.hash(password, saltRounds),
            roles: [role._id]
        });
        console.log(`Seeded ${roleName}: ${email}`);
    }
}
