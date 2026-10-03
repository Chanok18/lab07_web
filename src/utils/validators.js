// Mínimo 8 caracteres, 1 mayúscula, 1 dígito y 1 caracter especial de: # $ % & * @
export const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*\d)(?=.*[#$%&*@]).{8,}$/;
export const PASSWORD_MESSAGE =
    'La contraseña debe tener mínimo 8 caracteres, 1 mayúscula, 1 dígito y 1 caracter especial (# $ % & * @)';

export function assertValidPassword(password) {
    if (typeof password !== 'string' || !PASSWORD_REGEX.test(password)) {
        const err = new Error(PASSWORD_MESSAGE);
        err.status = 400;
        throw err;
    }
}

// Edad en años cumplidos (se usa UTC para evitar desfases de zona horaria)
export function calculateAge(birthdate) {
    if (!birthdate) return null;
    const b = new Date(birthdate);
    const now = new Date();
    let age = now.getUTCFullYear() - b.getUTCFullYear();
    const m = now.getUTCMonth() - b.getUTCMonth();
    if (m < 0 || (m === 0 && now.getUTCDate() < b.getUTCDate())) age--;
    return age;
}
