#!/bin/bash

# Cargar variables de entorno desde .env si existe
if [ -f .env ]; then
  export $(cat .env | xargs)
fi

# Script para generar el archivo env.js con las variables de entorno
echo "window.ENV = {" > src/assets/env.js
echo "  GITHUB_API_TOKEN: '$GITHUB_API_TOKEN'," >> src/assets/env.js
echo "};" >> src/assets/env.js

echo "Variables de entorno inyectadas en env.js"