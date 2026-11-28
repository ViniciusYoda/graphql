const usuarios = require('../../../db');
const perfis = require('../../../db/perfis');

module.exports = {
    Usuario: {
        telefone(obj) {
            return obj.telefone_fixo
        },
        perfil(usuario) {
            return perfis.find(perfil => perfil.usuarioId === usuario.id) ?? null;
        }
    },
    Query: {
        usuario(_obj, { id }) {
            if (!id) {
                return usuarios[0];
            }

            return usuarios.find(usuario => usuario.id === Number(id)) ?? null;
        },
        usuarios(_obj, { status }) {
            return usuarios.filter(usuario => usuario.status === status);
        },
    }
};
