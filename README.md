# Ace Stream Links

Markel Links es una web que ofrece enlaces de streaming para ver partidos de fútbol y otros eventos deportivos en vivo. La web se basa en el protocolo Ace Stream, que permite la transmisión de video a través de redes P2P. Los enlaces proporcionados son gratuitos. La web no es responsable de la legalidad de los enlaces y su uso es bajo el propio riesgo del usuario. Se recomienda utilizar una VPN para proteger la privacidad y seguridad al acceder a estos enlaces.

## Características

- **Enlaces Actualizados**: Los enlaces se actualizan regularmente para garantizar la disponibilidad.
- **Fácil de Usar**: Interfaz sencilla para encontrar y copiar enlaces rápidamente.
- **Compatibilidad**: Funciona con reproductores compatibles con Ace Stream.

## Requisitos

- Ace Stream Media instalado en tu dispositivo.
- Conexión a Internet estable.
- Opcional: VPN para mayor privacidad.

## Instalación

1. Clona este repositorio:
    ```bash
    git clone https://github.com/tu-usuario/acestream-links.git
    ```
2. Navega al directorio del proyecto:
    ```bash
    cd acestream-links
    ```
3. Instala las dependencias:
    ```bash
    npm install
    ```
4. Configura las variables de entorno:
    ```bash
    cp .env.example .env
    ```
    Edita el archivo `.env` y añade tu token de GitHub API.

## Variables de Entorno

Este proyecto requiere las siguientes variables de entorno:

- `GITHUB_API_TOKEN`: Token de acceso personal de GitHub para acceder a la API

### Configuración para desarrollo local

1. Copia el archivo `.env.example` a `.env`
2. Edita `.env` y añade tu token de GitHub
3. El archivo `src/assets/env.js` se generará automáticamente

### Configuración para Vercel

1. Ve a tu dashboard de Vercel
2. Selecciona tu proyecto
3. Ve a "Settings" > "Environment Variables"
4. Añade: `GITHUB_API_TOKEN` con tu token de GitHub

### Configuración para Netlify

1. Ve a tu dashboard de Netlify
2. Selecciona tu sitio
3. Ve a "Site settings" > "Environment variables"
4. Añade: `GITHUB_API_TOKEN` con tu token de GitHub

## Uso

1. Para desarrollo local:
    ```bash
    npm start
    ```
2. Para construcción de producción:
    ```bash
    npm run build:prod
    ```

## Contribuciones

¡Las contribuciones son bienvenidas! Si deseas colaborar, sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una rama para tu funcionalidad:
    ```bash
    git checkout -b nueva-funcionalidad
    ```
3. Realiza tus cambios y haz un commit:
    ```bash
    git commit -m "Añadir nueva funcionalidad"
    ```
4. Envía un pull request.