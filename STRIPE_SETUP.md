# 🚀 Guía de Configuración de Stripe para MENTALIA

Esta guía te ayudará a configurar los pagos con Stripe en tu aplicación MENTALIA.

## 📋 Prerequisitos

1. Una cuenta de Stripe (crea una gratis en [stripe.com](https://stripe.com))
2. Las claves API de Stripe (Publishable key y Secret key)

## 🔧 Paso 1: Configurar Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto con el siguiente contenido:

```bash
# Database Configuration (Supabase)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Environment
NODE_ENV=development

# Stripe Configuration - REPLACE WITH YOUR ACTUAL KEYS
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51_your_stripe_publishable_key_here
STRIPE_SECRET_KEY=sk_test_51_your_stripe_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# Domain Configuration
NEXT_PUBLIC_DOMAIN=http://localhost:3000
```

### 🔑 Obtener las Claves de Stripe

1. Ve a tu [Dashboard de Stripe](https://dashboard.stripe.com)
2. Navega a **Developers > API keys**
3. Copia tu **Publishable key** (comienza con `pk_test_`)
4. Copia tu **Secret key** (comienza con `sk_test_`)
5. Reemplaza los valores en tu archivo `.env.local`

## 🏗️ Paso 2: Crear Productos y Precios en Stripe

Ejecuta el script de configuración automática:

```bash
node scripts/setup-stripe.js
```

Este script creará automáticamente en tu cuenta de Stripe:

- ✅ **Plan Personal**: €4.99/mes o €59.88/año
- ✅ **Plan Plus**: €9.99/mes o €119.88/año  
- ✅ **Plan Familiar**: €14.99/mes o €179.88/año
- ✅ **Plan Empresas**: €49.00/mes o €588.00/año

## 📝 Paso 3: Actualizar IDs de Precios

Después de ejecutar el script, obtendrás algo como esto:

```
PERSONAL:
  Producto: prod_XXXXXXXXXX
  Precio mensual: price_YYYYYYYYYY
  Precio anual: price_ZZZZZZZZZZ
```

Actualiza el archivo `lib/stripe.ts` con los IDs reales generados:

```typescript
export const STRIPE_PRODUCTS = {
  personal: {
    monthly: 'price_YYYYYYYYYY', // Reemplaza con tu ID real
    yearly: 'price_ZZZZZZZZZZ',  // Reemplaza con tu ID real
  },
  plus: {
    monthly: 'price_AAAAAAAAA',
    yearly: 'price_BBBBBBBBB',
  },
  familiar: {
    monthly: 'price_CCCCCCCCC',
    yearly: 'price_DDDDDDDDD',
  },
  empresas: {
    monthly: 'price_EEEEEEEEE',
    yearly: 'price_FFFFFFFFF',
  },
};
```

## 🚀 Paso 4: Probar la Integración

1. Inicia tu servidor de desarrollo:
   ```bash
   npm run dev
   ```

2. Ve a la página de precios: `http://localhost:3000`

3. Haz clic en cualquier botón de plan de pago

4. Deberías ser redirigido a Stripe Checkout

## 💳 Tarjetas de Prueba

En modo test, puedes usar estas tarjetas:

- **Visa**: `4242 4242 4242 4242`
- **Visa (declined)**: `4000 0000 0000 0002`
- **Mastercard**: `5555 5555 5555 4444`

**Detalles adicionales**:
- Cualquier fecha futura (ej: 12/25)
- Cualquier CVC de 3 dígitos (ej: 123)
- Cualquier código postal

## 🎯 Funcionalidades Implementadas

### ✅ Planes Disponibles
- **Plan Gratis**: Funciona con WhatsApp (sin Stripe)
- **Plan Personal**: €4.99/mes o €59.88/año
- **Plan Plus**: €9.99/mes o €119.88/año
- **Plan Familiar**: €14.99/mes o €179.88/año
- **Plan Empresas**: €49.00/mes o €588.00/año

### ✅ Características
- Toggle mensual/anual con descuento del 36%
- Precios dinámicos según período seleccionado
- Estados de carga en botones
- Redirección automática a Stripe Checkout
- Página de éxito post-pago
- Manejo de errores

### ✅ Páginas
- **Checkout**: Procesado por Stripe
- **Éxito**: `/success` - Confirmación de pago
- **Cancelación**: Regresa a `/pricing`

## 🔄 Configurar Webhooks (Opcional)

Para recibir notificaciones de eventos de Stripe:

1. Ve a **Developers > Webhooks** en tu Dashboard de Stripe
2. Clic en "Add endpoint"
3. URL: `https://tu-dominio.com/api/webhooks/stripe`
4. Selecciona estos eventos:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`

## 🛠️ Modo Producción

Para pasar a producción:

1. Reemplaza las claves de test por las de producción
2. Cambia `NODE_ENV=production`
3. Actualiza `NEXT_PUBLIC_DOMAIN` con tu dominio real
4. Vuelve a ejecutar el script para crear productos en producción

## 🆘 Solución de Problemas

### Error: "No price ID found"
- Verifica que ejecutaste `node scripts/setup-stripe.js`
- Asegúrate de actualizar `lib/stripe.ts` con los IDs correctos

### Error: "Invalid API key"
- Verifica que tus claves de Stripe sean correctas en `.env.local`
- Asegúrate de usar claves de test en desarrollo

### Error: "Domain not allowed"
- Actualiza `NEXT_PUBLIC_DOMAIN` en tu `.env.local`

## 📞 Soporte

Si tienes problemas:
1. Revisa la consola del navegador para errores
2. Verifica los logs de Stripe Dashboard
3. Asegúrate de que todas las variables de entorno estén configuradas

¡Tu integración con Stripe está lista! 🎉 