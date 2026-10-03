import User from '../models/User.js';

class UserRepository {
    async create(userData) {
        const user = new User(userData);
        return user.save();
    }

    // Se usa en signIn, por eso incluye el password (hash)
    async findByEmail(email) {
        return User.findOne({ email }).populate('roles').exec();
    }

    async findById(id) {
        return User.findById(id).select('-password').populate('roles').exec();
    }

    async updatePassword(id, hashedPassword) {
        return User.findByIdAndUpdate(id, { password: hashedPassword }, { new: true }).exec();
    }

    async update(id, data) {
        return User.findByIdAndUpdate(id, data, { new: true, runValidators: true })
            .select('-password').populate('roles').exec();
    }

    async getAll() {
        return User.find().select('-password').populate('roles').sort({ createdAt: -1 }).exec();
    }
}

export default new UserRepository();
