(async () => {
    // Acceso: rol user o superior (admin también puede entrar)
    const payload = Auth.requireAuth(['user', 'admin']);
    if (!payload) return;
    if (payload.roles.includes('admin')) document.getElementById('admin-link').style.display = 'inline';

    try {
        const u = await Auth.api('/api/users/me');
        document.getElementById('welcome-name').textContent = `${u.name} ${u.lastName}`;
        const rows = [
            ['Email', u.email], ['Teléfono', u.phoneNumber],
            ['Fecha de nacimiento', `${Auth.fmtDate(u.birthdate)} (${u.age} años)`],
            ['Dirección', u.address || '—'], ['Roles', u.roles.join(', ')],
            ['Registrado el', Auth.fmtDateTime(u.createdAt)]
        ];
        document.getElementById('user-data').innerHTML = rows
            .map(([k, v]) => `<div class="data-row"><b>${k}:</b> ${Auth.esc(v)}</div>`).join('');
    } catch (err) {
        Auth.toastError(err.message);
    }
})();
