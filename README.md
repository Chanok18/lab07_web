# Express Auth — Autenticación JWT con MongoDB Atlas

Proyecto desarrollado para el curso de **Desarrollo de Aplicaciones Web Avanzado** de TECSUP.

Esta aplicación permite registrar usuarios, iniciar sesión y administrar perfiles mediante autenticación con JWT. También cuenta con roles para controlar el acceso a determinadas funciones.

En el **Laboratorio 07** se desarrolló el sistema de autenticación y en el **Laboratorio 08** se realizó su despliegue en la nube utilizando MongoDB Atlas, Render y GitHub Actions.

## 1. Enlaces del proyecto

**Aplicación publicada:**  
https://express-auth-quispe.onrender.com/

**Repositorio GitHub:**  
https://github.com/Chanok18/lab07_web

## 2. Tecnologías utilizadas

| Tecnología | Uso |
|---|---|
| Node.js | Entorno de ejecución del servidor |
| Express.js | Desarrollo del servidor y las rutas |
| MongoDB | Base de datos NoSQL |
| MongoDB Atlas | Base de datos alojada en la nube |
| Mongoose | Conexión y manejo de datos en MongoDB |
| JWT | Autenticación mediante tokens |
| bcrypt | Protección de contraseñas |
| EJS | Renderización de las vistas |
| Materialize CSS | Diseño de la interfaz |
| Git y GitHub | Control de versiones |
| Render | Publicación de la aplicación |
| GitHub Actions | Automatización del despliegue |
| Postman | Pruebas de los endpoints |

## 3. Funcionalidades principales

- Registro de nuevos usuarios.
- Inicio y cierre de sesión.
- Autenticación mediante JWT.
- Contraseñas almacenadas de forma segura mediante hash.
- Manejo de roles `user` y `admin`.
- Protección de rutas según la autenticación y el rol.
- Dashboard para usuarios autenticados.
- Consulta y actualización de datos del perfil.
- Panel de administración.
- Almacenamiento de usuarios y roles en MongoDB Atlas.
- Despliegue en Render mediante GitHub Actions.

## 4. Rutas de la aplicación

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/signIn` | Formulario de inicio de sesión |
| GET | `/signUp` | Formulario de registro |
| GET | `/dashboard` | Panel principal del usuario |
| GET | `/profile` | Perfil del usuario |
| GET | `/admin/dashboard` | Panel de administración |
| GET | `/403` | Página de acceso denegado |
| POST | `/api/auth/signUp` | Registrar un usuario |
| POST | `/api/auth/signIn` | Iniciar sesión |
| GET | `/api/users/me` | Consultar el perfil autenticado |
| PUT | `/api/users/me` | Actualizar el perfil |
| GET | `/api/users` | Consultar usuarios, solo administrador |
| GET | `/api/users/:id` | Consultar un usuario por ID, solo administrador |

El sistema también cuenta con una página para rutas no encontradas (404).

## 5. Instalación del proyecto

### Requisitos previos

Para ejecutar el proyecto localmente se necesita:

- Node.js y npm.
- Una base de datos MongoDB, local o en MongoDB Atlas.
- Git.
- Un editor de código, como Visual Studio Code.

### Clonar el repositorio

```bash
git clone https://github.com/Chanok18/lab07_web.git
```

Entrar a la carpeta:

```bash
cd lab07_web
```

### Instalar las dependencias

```bash
npm install
```

### Configurar las variables de entorno

Crear un archivo `.env` en la raíz del proyecto.

Ejemplo de configuración:

```env
PORT=3000
NODE_ENV=development

MONGODB_URI=mongodb+srv://USUARIO:CONTRASENA@TU_CLUSTER.mongodb.net/auth_db

JWT_SECRET=CAMBIA_ESTA_CLAVE_POR_UNA_SEGURA
JWT_EXPIRES_IN=1h

BCRYPT_SALT_ROUNDS=10
```

Se deben reemplazar los datos de ejemplo por las credenciales correspondientes.

**Importante:** el archivo `.env` no debe subirse al repositorio, ya que contiene información privada.

### Ejecutar la aplicación

```bash
npm start
```

Cuando el servidor y la base de datos se conecten correctamente, se podrá abrir la aplicación desde el navegador.

Con el puerto del ejemplo:

http://localhost:3000

## 6. Autenticación y autorización

El proyecto utiliza JWT para identificar a los usuarios autenticados.

El funcionamiento general es el siguiente:

1. El usuario se registra o inicia sesión.
2. El servidor valida sus credenciales.
3. Si los datos son correctos, se genera un token JWT.
4. El token permite identificar al usuario en las solicitudes protegidas.
5. El sistema verifica sus permisos antes de permitir el acceso.

### Roles del sistema

**Usuario (`user`)**

Puede acceder a su dashboard, consultar sus datos y actualizar su perfil.

**Administrador (`admin`)**

Puede acceder a las funciones de administración y consultar información de los usuarios mediante las rutas autorizadas.

## 7. Base de datos MongoDB Atlas

Para el laboratorio 08 se utilizó MongoDB Atlas, que permite trabajar con una base de datos MongoDB alojada en la nube.

**Base de datos utilizada:** `auth_db`

### Colecciones principales

| Colección | Descripción |
|---|---|
| `users` | Guarda los datos de los usuarios registrados |
| `roles` | Almacena los roles disponibles en el sistema |

La aplicación establece la conexión mediante la variable de entorno `MONGODB_URI`.

Al iniciar el proyecto, se comprueba la conexión con MongoDB y se preparan los roles y usuarios iniciales según la configuración del sistema.

## 8. Pruebas de la API con Postman

Se utilizó Postman para comprobar el funcionamiento de los endpoints publicados en Render.

### Registro de usuario

**Método:** `POST`

```text
https://express-auth-quispe.onrender.com/api/auth/signUp
```

Esta ruta permite registrar un usuario enviando los datos requeridos por la API.

### Inicio de sesión

**Método:** `POST`

```text
https://express-auth-quispe.onrender.com/api/auth/signIn
```

Ejemplo del cuerpo de la petición:

```json
{
  "email": "usuario@ejemplo.com",
  "password": "CONTRASENA_DEL_USUARIO"
}
```

Cuando las credenciales son correctas, el servidor permite la autenticación del usuario.

### Consultar el perfil

**Método:** `GET`

```text
https://express-auth-quispe.onrender.com/api/users/me
```

Esta ruta requiere autenticación.

En Postman se puede configurar el token JWT desde la sección **Authorization → Bearer Token**.

### Consultar usuarios

**Método:** `GET`

```text
https://express-auth-quispe.onrender.com/api/users
```

Esta ruta está restringida a usuarios con rol de administrador.

## 9. Despliegue en Render

Para publicar la aplicación se utilizó Render, conectando el repositorio de GitHub con un servicio web.

### Configuración utilizada

| Campo | Configuración |
|---|---|
| Servicio | Web Service |
| Repositorio | `Chanok18/lab07_web` |
| Rama | `main` |
| Build Command | `npm install` |
| Start Command | `npm start` |
| Base de datos | MongoDB Atlas |

En Render se configuraron las variables de entorno necesarias para la conexión a MongoDB y la autenticación JWT.

### Aplicación en producción

https://express-auth-quispe.onrender.com/

## 10. Automatización con GitHub Actions

En el laboratorio 08 también se configuró un workflow de GitHub Actions para automatizar el despliegue.

El archivo se encuentra en:

```text
.github/workflows/deploy.yml
```

### Funcionamiento del pipeline

1. Se realiza un cambio en el proyecto.
2. El cambio se sube a la rama `main` de GitHub.
3. GitHub Actions ejecuta el workflow.
4. Se instalan las dependencias del proyecto.
5. Se verifica la sintaxis del servidor.
6. Se envía una solicitud de despliegue a Render mediante un Deploy Hook.
7. Render realiza el despliegue de la nueva versión.

Para proteger el Deploy Hook se creó el siguiente Repository Secret en GitHub:

```text
RENDER_DEPLOY_HOOK_URL
```

De esta manera, no es necesario colocar la URL privada directamente en el código del repositorio.

## 11. Problemas encontrados y soluciones

Durante el laboratorio se presentaron algunos errores que se pudieron solucionar.

**Error en el comando de inicio**

Inicialmente, Render tenía un comando incorrecto para ejecutar la aplicación.

Se solucionó configurando el comando:

```bash
npm start
```

**Error en la cadena de conexión de MongoDB**

La variable `MONGODB_URI` estaba configurada incorrectamente, lo que impedía interpretar la URL de conexión.

Se corrigió el valor de la variable de entorno.

**Error de autenticación en MongoDB Atlas**

La aplicación mostraba un error de autenticación por las credenciales utilizadas.

Se revisó el usuario de base de datos y se corrigió la conexión hasta conseguir el mensaje:

```text
Mongo connected
```

**Configuración de GitHub Actions**

Se configuró un Repository Secret para almacenar el Deploy Hook de Render y utilizarlo en el workflow.

Después se comprobó la ejecución del pipeline desde GitHub Actions.

## 12. Seguridad

El proyecto considera las siguientes medidas:

- Uso de JWT para la autenticación.
- Contraseñas protegidas mediante hash.
- Control de acceso mediante roles.
- Rutas protegidas para usuarios autenticados.
- Variables de entorno para almacenar credenciales.
- GitHub Secrets para proteger el Deploy Hook.
- Separación entre la configuración local y la configuración de producción.

Las credenciales reales y los tokens privados no deben publicarse en GitHub.

## 13. Resultados del laboratorio

Se consiguió publicar la aplicación web en Render y conectarla correctamente a MongoDB Atlas.

También se configuró GitHub Actions para automatizar el proceso de despliegue y se comprobó que la aplicación permite acceder a las funciones de autenticación desde su URL pública.

Con este laboratorio se puso en práctica la integración de una aplicación Node.js con servicios en la nube.

## 14. Autor

**Kevin Quispe Ccolque**  
Carrera: Diseño y Desarrollo de Software  
Institución: TECSUP  
Curso: Desarrollo de Aplicaciones Web Avanzado

**GitHub:** https://github.com/Chanok18

---

Proyecto académico desarrollado como parte de los laboratorios 07 y 08 de Desarrollo de Aplicaciones Web Avanzado.