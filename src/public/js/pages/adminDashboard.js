(async () => {
    // Solo admin; un user es enviado a /403
    if (!Auth.requireAuth(['admin'])) return;

    const body = document.getElementById('users-body');
    const modal = M.Modal.init(document.getElementById('user-modal'));
    const modalBody = document.getElementById('modal-body');

    try {
        const users = await Auth.api('/api/users');
        document.getElementById('total').textContent = users.length;
        body.innerHTML = users.map((u, i) => `
            <tr>
                <td>${i + 1}</td>
                <td>${Auth.esc(u.name)} ${Auth.esc(u.lastName)}</td>
                <td>${Auth.esc(u.email)}</td>
                <td>${Auth.esc(u.phoneNumber)}</td>
                <td>${Auth.esc(u.age)}</td>
                <td>${u.roles.map(r => `<span class="chip">${Auth.esc(r)}</span>`).join('')}</td>
                <td>${Auth.fmtDateTime(u.createdAt)}</td>
                <td><button class="btn-small indigo waves-effect view-btn" data-id="${Auth.esc(u.id)}">
                    <i class="material-icons left">visibility</i>Ver</button></td>
            </tr>`).join('') || '<tr><td colspan="8">Sin usuarios</td></tr>';
    } catch (err) {
        Auth.toastError(err.message);
    }

    body.addEventListener('click', async e => {
        const btn = e.target.closest('.view-btn');
        if (!btn) return;
        try {
            const u = await Auth.api(`/api/users/${btn.dataset.id}`);
            const rows = [
                ['ID', u.id], ['Nombre', `${u.name} ${u.lastName}`], ['Email', u.email],
                ['Teléfono', u.phoneNumber],
                ['Nacimiento', `${Auth.fmtDate(u.birthdate)} (${u.age} años)`],
                ['Dirección', u.address || '—'], ['URL de perfil', u.url_profile || '—'],
                ['Roles', u.roles.join(', ')],
                ['Registrado', Auth.fmtDateTime(u.createdAt)],
                ['Última actualización', Auth.fmtDateTime(u.updatedAt)]
            ];
            modalBody.innerHTML = rows.map(([k, v]) =>
                `<div class="data-row"><b>${k}:</b> ${Auth.esc(v)}</div>`).join('');
            modal.open();
        } catch (err) {
            Auth.toastError(err.message);
        }
    });
})();
