# Plan de Migración de Create React App a Vite

## 📋 Resumen
Este documento detalla los pasos para migrar el proyecto PhoneBook Frontend desde Create React App (CRA) a Vite, mejorando significativamente el rendimiento de desarrollo y build.

## 🎯 Beneficios de Vite
- ⚡ **Hot Module Replacement (HMR) ultra-rápido**: Actualizaciones instantáneas sin recargar la página
- 🚀 **Inicio inmediato del servidor**: No necesita bundling previo
- 📦 **Builds optimizados**: Usa Rollup para producción con mejor tree-shaking
- 🔧 **Configuración más simple**: Menos boilerplate que CRA
- 💡 **Soporte nativo para TypeScript, JSX, CSS Modules**: Sin configuración adicional

---

## 📝 Plan de Migración Paso a Paso

### **Fase 1: Preparación (15 min)**

#### 1.1 Hacer backup del proyecto
```bash
# Crear una rama para la migración
git checkout -b migrate-to-vite
git add .
git commit -m "Pre-migration checkpoint"
```

#### 1.2 Documentar configuraciones personalizadas
- [ ] Revisar `package.json` scripts personalizados
- [ ] Documentar variables de entorno en `.env` (si existen)
- [ ] Anotar configuraciones de proxy
- [ ] Revisar configuraciones de build personalizadas

---

### **Fase 2: Instalación de Dependencias (10 min)**

#### 2.1 Desinstalar dependencias de CRA
```bash
cd phonebook_frontend
npm uninstall react-scripts
```

#### 2.2 Instalar Vite y dependencias relacionadas
```bash
npm install --save-dev vite @vitejs/plugin-react
```

#### 2.3 Actualizar package.json scripts
Reemplazar los scripts actuales con:
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest",
    "lint": "eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0"
  }
}
```

#### 2.4 Instalar dependencias de testing (opcional, para Vitest)
```bash
npm install --save-dev vitest jsdom @vitest/ui
```

---

### **Fase 3: Configuración de Vite (20 min)**

#### 3.1 Crear `vite.config.js` en la raíz del proyecto
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    // Si necesitas proxy para el backend
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      }
    }
  },
  build: {
    outDir: 'build',
    sourcemap: true,
  },
  // Alias para imports absolutos (si los usas)
  resolve: {
    alias: {
      '@': '/src',
      '@components': '/src/components',
      '@services': '/src/services',
      '@layouts': '/src/layouts',
    }
  }
})
```

#### 3.2 Crear/Actualizar archivo de testing `vitest.config.js` (opcional)
```javascript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
    css: true,
  },
})
```

---

### **Fase 4: Ajustes en la Estructura de Archivos (30 min)**

#### 4.1 Mover `index.html` a la raíz del proyecto
```bash
# Desde phonebook_frontend/
mv public/index.html ./index.html
```

#### 4.2 Actualizar `index.html`
Reemplazar:
```html
<!-- ANTES (CRA) -->
<link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
<link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
```

Por:
```html
<!-- DESPUÉS (Vite) -->
<link rel="icon" href="/favicon.ico" />
<link rel="manifest" href="/manifest.json" />

<!-- Agregar al final del body, ANTES de cerrar </body> -->
<script type="module" src="/src/index.js"></script>
```

#### 4.3 Actualizar referencias a `process.env`
Buscar y reemplazar en todos los archivos:
```javascript
// ANTES (CRA)
const apiUrl = process.env.REACT_APP_API_URL;

// DESPUÉS (Vite)
const apiUrl = import.meta.env.VITE_API_URL;
```

#### 4.4 Crear archivo `.env` con las variables de entorno
```bash
# .env
VITE_API_URL=http://localhost:5000
VITE_APP_NAME=PhoneBook
```

#### 4.5 Actualizar imports de imágenes/assets
```javascript
// ANTES (CRA)
import logo from './logo.svg';

// DESPUÉS (Vite) - ¡Sigue siendo igual! ✅
import logo from './logo.svg';

// Para assets en public:
// ANTES: process.env.PUBLIC_URL + '/images/logo.png'
// DESPUÉS: '/images/logo.png'
```

---

### **Fase 5: Actualizar Código Específico (20 min)**

#### 5.1 Revisar archivos de servicio
Actualizar `src/services/ContactService.js` si usa `process.env`:
```javascript
// ANTES
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// DESPUÉS
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
```

#### 5.2 Actualizar setupTests.js (si usas Vitest)
```javascript
// src/setupTests.js
import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

afterEach(() => {
  cleanup();
});
```

#### 5.3 Revisar imports dinámicos
```javascript
// ANTES (CRA puede soportar require)
const Component = require('./Component');

// DESPUÉS (Vite requiere ESM)
import Component from './Component';
// O para imports dinámicos:
const Component = await import('./Component');
```

---

### **Fase 6: Limpiar Archivos Obsoletos (5 min)**

Eliminar archivos y carpetas no necesarios:
```bash
# Eliminar archivos de CRA
rm -rf node_modules/.cache
rm -rf build

# Archivos que ya no necesitas (opcional, según tu configuración)
# rm public/index.html (ya lo moviste)
```

---

### **Fase 7: Testing y Validación (30 min)**

#### 7.1 Reinstalar dependencias
```bash
rm -rf node_modules package-lock.json
npm install
```

#### 7.2 Iniciar servidor de desarrollo
```bash
npm run dev
```

**Checklist de validación:**
- [ ] La aplicación se inicia sin errores
- [ ] El HMR funciona correctamente (cambios se reflejan instantáneamente)
- [ ] Las rutas funcionan correctamente
- [ ] Los formularios y funcionalidades principales funcionan
- [ ] Las variables de entorno se cargan correctamente
- [ ] Los estilos se aplican correctamente

#### 7.3 Construir para producción
```bash
npm run build
```

Verificar:
- [ ] El build se completa sin errores
- [ ] Los archivos están en la carpeta `build/`
- [ ] El tamaño del bundle es razonable

#### 7.4 Previsualizar build de producción
```bash
npm run preview
```

#### 7.5 Ejecutar tests (si migraste a Vitest)
```bash
npm run test
```

---

### **Fase 8: Optimizaciones Adicionales (Opcional, 20 min)**

#### 8.1 Configurar Code Splitting
```javascript
// En vite.config.js
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['react-toastify'],
        }
      }
    }
  }
})
```

#### 8.2 Configurar ESLint para Vite
```bash
npm install --save-dev eslint-plugin-react-refresh
```

Crear/actualizar `.eslintrc.cjs`:
```javascript
module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
}
```

#### 8.3 Agregar configuración de TypeScript (si decides migrar a TS)
```bash
npm install --save-dev typescript @types/react @types/react-dom
```

---

## 📊 Comparación de Rendimiento Esperado

| Métrica | CRA | Vite | Mejora |
|---------|-----|------|--------|
| Inicio dev server | 15-30s | <1s | 🚀 15-30x |
| HMR | 2-5s | <100ms | ⚡ 20-50x |
| Build producción | 30-60s | 10-20s | 📦 2-3x |

---

## 🔍 Problemas Comunes y Soluciones

### Error: "require is not defined"
**Solución:** Vite solo soporta ESM. Cambiar `require()` por `import`.

### Error: "process is not defined"
**Solución:** Cambiar `process.env.REACT_APP_*` por `import.meta.env.VITE_*`.

### CSS no se carga
**Solución:** Asegurar que los imports de CSS están en el orden correcto en los componentes.

### Variables de entorno no funcionan
**Solución:** 
- Verificar que empiecen con `VITE_`
- Reiniciar el servidor de desarrollo
- Verificar que el archivo `.env` esté en la raíz del proyecto

### Rutas absolutas no funcionan
**Solución:** Configurar `resolve.alias` en `vite.config.js`.

---

## 📚 Recursos Adicionales

- [Documentación oficial de Vite](https://vitejs.dev/)
- [Guía de migración CRA → Vite](https://vitejs.dev/guide/migration.html)
- [Plugin oficial de React para Vite](https://github.com/vitejs/vite-plugin-react)
- [Vitest para testing](https://vitest.dev/)

---

## ✅ Checklist Final de Migración

- [ ] Código funciona en desarrollo (`npm run dev`)
- [ ] Build de producción exitoso (`npm run build`)
- [ ] Preview de producción funciona (`npm run preview`)
- [ ] Tests pasan (si aplica)
- [ ] Variables de entorno configuradas
- [ ] Git commit de la migración
- [ ] Documentación actualizada
- [ ] README.md actualizado con nuevos scripts

---

## 🎉 Conclusión

Tiempo estimado total: **2-3 horas**

Una vez completada la migración, disfrutarás de:
- Desarrollo más rápido y fluido
- Builds más eficientes
- Mejor experiencia de desarrollo
- Soporte moderno y activamente mantenido

¡Buena suerte con la migración! 🚀
