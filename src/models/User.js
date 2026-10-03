import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    // Aquí se guarda el HASH (bcrypt). Las reglas de la contraseña en texto plano
    // (8 caracteres, mayúscula, dígito, especial) se validan en AuthService antes de hashear.
    password: {
        type: String,
        required: true
    },
    roles: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role'
    }],
    name: {
        type: String,
        required: [true, 'El nombre es requerido'],
        trim: true
    },
    lastName: {
        type: String,
        required: [true, 'El apellido es requerido'],
        trim: true
    },
    phoneNumber: {
        type: String,
        required: [true, 'El teléfono es requerido'],
        trim: true,
        match: [/^[0-9+\s-]{6,20}$/, 'Teléfono no válido']
    },
    birthdate: {
        type: Date,
        required: [true, 'La fecha de nacimiento es requerida'],
        validate: {
            validator: v => v <= new Date(),
            message: 'La fecha de nacimiento no puede ser futura'
        }
    },
    url_profile: {
        type: String,
        trim: true
    },
    address: {
        type: String,
        trim: true
    }
}, { timestamps: true });

export default mongoose.model('User', UserSchema);
