// Utilidades de autenticación del frontend (token JWT en sessionStorage)
const Auth = (() => {
    const KEY = 'token';
    let expiryTimer = null;

    const getToken = () => sessionStorage.getItem(KEY);
    const setToken = t => sessionStorage.setItem(KEY, t);

    // Escapa HTML para no inyectar datos de usuario en el DOM (evita XSS)
    const esc = v => String(v ?? '').replace(/[&<>"']/g, c =>
        ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

    function decode(token) {
        try {
            const b64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
            const json = decodeURIComponent(atob(b64).split('')
                .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
            return JSON.parse(json);
        } catch { return null; }
    }

    // Devuelve el payload si hay token válido y NO expirado; si no, null
    function getPayload() {
        const t = getToken();
        if (!t) return null;
        const p = decode(t);
        if (!p || !p.exp || p.exp * 1000 <= Date.now()) return null;
        return p;
    }

    function logout() {
        sessionStorage.removeItem(KEY);
        window.location.replace('/signIn');
    }

    const homeFor = (roles = []) => roles.includes('admin') ? '/admin/dashboard' : '/dashboard';

    // Protege una página: sin token/expirado => /signIn; sin rol suficiente => /403
    function requireAuth(allowedRoles = []) {
        const p = getPayload();
        if (!p) { logout(); return null; }
        if (allowedRoles.length && !p.roles.some(r => allowedRoles.includes(r))) {
            window.location.replace('/403');
            return null;
        }
        // Cierre de sesión automático cuando el token expire
        clearTimeout(expiryTimer);
        const ms = Math.min(p.exp * 1000 - Date.now(), 2147483647);
        expiryTimer = setTimeout(() => {
            M.toast({ html: 'Tu sesión expiró', classes: 'orange' });
            setTimeout(logout, 1200);
        }, ms);
        document.body.classList.remove('guarded');
        return p;
    }

    // fetch con JWT. Lanza Error con el mensaje del servidor si falla
    async function api(path, { method = 'GET', body, auth = true } = {}) {
        const headers = { 'Content-Type': 'application/json' };
        if (auth) headers.Authorization = `Bearer ${getToken()}`;
        const res = await fetch(path, { method, headers, body: body ? JSON.stringify(body) : undefined });
        const data = await res.json().catch(() => ({}));
        if (auth && res.status === 401) { logout(); throw new Error(data.message || 'Sesión inválida'); }
        if (auth && res.status === 403) { window.location.replace('/403'); throw new Error(data.message); }
        if (!res.ok) throw new Error(data.message || 'Error en la solicitud');
        return data;
    }

    const fmtDate = iso => { // 'YYYY-MM-DD...' => 'DD/MM/YYYY' (sin desfase de zona horaria)
        if (!iso) return '—';
        const [y, m, d] = iso.slice(0, 10).split('-');
        return `${d}/${m}/${y}`;
    };
    const fmtDateTime = iso => iso ? new Date(iso).toLocaleString('es-PE') : '—';

    function renderNav() {
        const p = getPayload();
        const links = p
            ? [
                ['/dashboard', 'Dashboard'],
                ...(p.roles.includes('admin') ? [['/admin/dashboard', 'Administración']] : []),
                ['/profile', 'Mi cuenta'],
                ['#logout', 'Cerrar sesión']
            ]
            : [['/signIn', 'Iniciar sesión'], ['/signUp', 'Registrarse']];

        const html = links.map(([href, label]) => `<li><a href="${href}">${label}</a></li>`).join('');
        document.getElementById('nav-links').innerHTML = html;
        document.getElementById('mobile-nav').innerHTML = html;
        document.querySelectorAll('a[href="#logout"]').forEach(a =>
            a.addEventListener('click', e => { e.preventDefault(); logout(); }));
        M.Sidenav.init(document.querySelectorAll('.sidenav'));
    }

    const toastError = msg => M.toast({ html: esc(msg), classes: 'red darken-1' });

    return { getToken, setToken, getPayload, logout, homeFor, requireAuth, api, esc, fmtDate, fmtDateTime, renderNav, toastError };
})();
