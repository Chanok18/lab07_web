import { calculateAge } from './validators.js';

// Nunca se expone el password (ni el hash) hacia el frontend
export function toUserDTO(user) {
    return {
        id: user._id,
        email: user.email,
        name: user.name,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
        birthdate: user.birthdate,
        age: calculateAge(user.birthdate),
        url_profile: user.url_profile,
        address: user.address,
        roles: (user.roles || []).map(r => r.name ?? r),
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
    };
}
