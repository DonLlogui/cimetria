const URL_BASE = 'http://localhost:3333/app';

// Intercambio de formularios
document.getElementById('go-register').addEventListener('click', () => {
    document.getElementById('login-box').classList.add('hidden');
    document.getElementById('register-box').classList.remove('hidden');
});

document.getElementById('go-login').addEventListener('click', () => {
    document.getElementById('register-box').classList.add('hidden');
    document.getElementById('login-box').classList.remove('hidden');
});

// CONSUMO DE LOGIN
document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const correo = document.getElementById('login-correo').value;
    const contrasena = document.getElementById('login-pass').value;

    try {
        const resp = await fetch(`${URL_BASE}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ correo, contrasena })
        });

        const data = await resp.json();
        if (data.ok) {
            alert('¡Bienvenido! ' + data.usuario.nombres);
            // Aquí podrías redirigir a una página de inicio
        } else {
            alert('Error: ' + data.msg);
        }
    } catch (error) {
        console.error('Error en la petición:', error);
    }
});

// CONSUMO DE REGISTRO
document.getElementById('register-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const datos = {
        documento: document.getElementById('reg-documento').value,
        nombres: document.getElementById('reg-nombres').value,
        telefono: document.getElementById('reg-telefono').value,
        correo: document.getElementById('reg-correo').value,
        contrasena: document.getElementById('reg-pass').value
    };
try {
        const resp = await fetch(`${URL_BASE}/crear`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datos)
        });

        const data = await resp.json();
        if (data.ok) {
            alert('Cuenta creada con éxito. Ahora puedes iniciar sesión.');
            document.getElementById('go-login').click(); // Volver al login
        } else {
            alert('No se pudo crear: ' + data.msg);
        }
    } catch (error) {
        console.error('Error al registrar:', error);
    }
});