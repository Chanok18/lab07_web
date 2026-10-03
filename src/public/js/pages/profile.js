(async () => {
    if (!Auth.requireAuth()) return;   // cualquier usuario logueado

    const $ = id => document.getElementById(id);
    const FIELDS = ['name', 'lastName', 'phoneNumber', 'birthdate', 'address', 'url_profile'];
    const FALLBACK = 'https://via.placeholder.com/120?text=Perfil';

    function render(u) {
        $('email').value = u.email;
        FIELDS.forEach(f => { $(f).value = f === 'birthdate' ? (u.birthdate || '').slice(0, 10) : (u[f] || ''); });
        $('full-name').textContent = `${u.name} ${u.lastName}`;
        $('age').textContent = u.age;
        $('created').textContent = Auth.fmtDateTime(u.createdAt);
        $('roles').innerHTML = u.roles.map(r => `<span class="chip">${Auth.esc(r)}</span>`).join('');
        $('avatar').src = u.url_profile || FALLBACK;
        $('avatar').onerror = () => { $('avatar').src = FALLBACK; };
        M.updateTextFields();
    }

    try { render(await Auth.api('/api/users/me')); } catch (err) { Auth.toastError(err.message); }

    $('profile-form').addEventListener('submit', async e => {
        e.preventDefault();
        const body = {};
        FIELDS.forEach(f => { body[f] = $(f).value.trim(); });
        if (!body.name || !body.lastName || !body.phoneNumber || !body.birthdate)
            return Auth.toastError('Nombre, apellido, teléfono y fecha de nacimiento son requeridos');

        $('save-btn').disabled = true;
        try {
            render(await Auth.api('/api/users/me', { method: 'PUT', body }));
            M.toast({ html: 'Datos actualizados', classes: 'green' });
        } catch (err) {
            Auth.toastError(err.message);
        } finally {
            $('save-btn').disabled = false;
        }
    });
})();
