(() => {
    // Si ya hay sesión válida, ir directo al dashboard correspondiente
    const current = Auth.getPayload();
    if (current) return window.location.replace(Auth.homeFor(current.roles));

    const form = document.getElementById('signin-form');
    const btn = document.getElementById('submit-btn');

    form.addEventListener('submit', async e => {
        e.preventDefault();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        if (!email || !password) return Auth.toastError('Ingresa email y contraseña');

        btn.disabled = true;
        try {
            const { token } = await Auth.api('/api/auth/signIn', { method: 'POST', body: { email, password }, auth: false });
            Auth.setToken(token);
            window.location.replace(Auth.homeFor(Auth.getPayload().roles));
        } catch (err) {
            Auth.toastError(err.message);
        } finally {
            btn.disabled = false;
        }
    });
})();
