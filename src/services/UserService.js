import userRepository from '../repositories/UserRepository.js';
import { toUserDTO } from '../utils/userDTO.js';

// Campos que el usuario SÍ puede editar de su propio perfil (no email, roles ni password)
const EDITABLE_FIELDS = ['name', 'lastName', 'phoneNumber', 'birthdate', 'url_profile', 'address'];

class UserService {

    async getAll() {
        const users = await userRepository.getAll();
        return users.map(toUserDTO);
    }

    async getById(id) {
        const user = await userRepository.findById(id);
        if (!user) {
            const err = new Error('Usuario no encontrado');
            err.status = 404;
            throw err;
        }
        return toUserDTO(user);
    }

    async updateMe(id, body) {
        const data = {};
        for (const field of EDITABLE_FIELDS) {
            if (body[field] !== undefined) data[field] = body[field];
        }
        const user = await userRepository.update(id, data);
        if (!user) {
            const err = new Error('Usuario no encontrado');
            err.status = 404;
            throw err;
        }
        return toUserDTO(user);
    }
}

export default new UserService();
