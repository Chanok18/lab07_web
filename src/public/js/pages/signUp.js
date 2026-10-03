(() => {
    const current = Auth.getPayload();
    if (current) return window.location.replace(Auth.homeFor(current.roles));

    const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*\d)(?=.*[#$%&*@]).{8,}$/;
    const form = document.getElementById('signup-form');
    const btn = document.getElementById('submit-btn');
    const val = id => document.getElementById(id).value.trim();

    form.addEventListener('submit', async e => {
        e.preventDefault();
        const body = {
            name: val('name'), lastName: val('lastName'), phoneNumber: val('phoneNumber'),
            birthdate: val('birthdate'), email: val('email'),
            password: document.getElementById('password').value
        };
        if (Object.values(body).some(v => !v)) return Auth.toastError('Completa todos los campos');
        if (!PASSWORD_REGEX.test(body.password))
            return Auth.toastError('La contraseña no cumple los requisitos');

        btn.disabled = true;
        try {
            await Auth.api('/api/auth/signUp', { method: 'POST', body, auth: false });
            M.toast({ html: 'Registro exitoso. Ahora inicia sesión', classes: 'green' });
            setTimeout(() => window.location.replace('/signIn'), 1200);
        } catch (err) {
            Auth.toastError(err.message);
            btn.disabled = false;
        }
    });
})();
