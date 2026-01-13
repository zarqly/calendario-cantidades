# 📱 INSTRUCCIONES PARA DESPLEGAR DIETARIO TAXI

## 🎯 PASO 1: Descargar el proyecto

Descarga todos los archivos del proyecto que están en `/mnt/user-data/outputs/`

Estructura de carpetas:
```
dietario-taxi/
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/
│   └── manifest.json
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── .gitignore
└── README.md
```

## 🚀 PASO 2: Subir a GitHub

### Opción A: Desde el móvil
1. Descarga la app "GitHub" desde Play Store
2. Crea un nuevo repositorio: "dietario-taxi"
3. Sube todos los archivos

### Opción B: Desde PC
1. Ve a https://github.com/new
2. Nombre: dietario-taxi
3. Crea el repositorio
4. Sube todos los archivos

## ☁️ PASO 3: Desplegar en Vercel

1. Ve a https://vercel.com desde tu móvil
2. Haz clic en "Sign Up" (o "Log In")
3. Elige "Continue with GitHub"
4. Autoriza Vercel
5. Haz clic en "Import Project" o "Add New..."
6. Selecciona "Import Git Repository"
7. Busca "dietario-taxi"
8. Haz clic en "Import"
9. **NO cambies nada** en la configuración
10. Haz clic en "Deploy"
11. Espera 2-3 minutos
12. ¡Listo! Te dará una URL como: https://dietario-taxi.vercel.app

## 📱 PASO 4: Instalar en tu Android

1. Abre la URL de Vercel en **Chrome** (no otros navegadores)
2. Verás un ícono de "Instalar" o una notificación
3. Toca "Añadir a pantalla de inicio"
4. La app se instalará como una app normal
5. ¡Ya la tienes funcionando!

## ✅ CARACTERÍSTICAS:
- ✅ Funciona offline
- ✅ Se instala como app nativa
- ✅ Login con Google
- ✅ Datos sincronizados en la nube
- ✅ Actualizaciones automáticas

## 🆘 SI NO PUEDES SUBIR A GITHUB:

Alternativa usando Vercel CLI desde móvil:
1. Descarga "Termux" desde Play Store
2. En Termux ejecuta:
```bash
pkg install nodejs-lts
npm install -g vercel
vercel login
vercel
```
3. Sigue las instrucciones

## 📧 CONTACTO:
Si tienes problemas, contáctame con el error específico.
