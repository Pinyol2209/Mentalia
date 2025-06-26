const Stripe = require('stripe');
require('dotenv').config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

async function setupStripeProducts() {
  console.log('🚀 Configurando productos y precios en Stripe...\n');

  const plans = [
    {
      id: 'personal',
      name: 'Plan Personal MENTALIA',
      description: 'Apoyo emocional personalizado 24/7 vía WhatsApp con ejercicios guiados y IA configurable.',
      monthly_price: 4.99,
      yearly_price: 59.88,
    },
    {
      id: 'plus',
      name: 'Plan Plus MENTALIA',
      description: 'Todo del Plan Personal más historial emocional, informes mensuales y 30 técnicas de relajación.',
      monthly_price: 9.99,
      yearly_price: 119.88,
    },
    {
      id: 'familiar',
      name: 'Plan Familiar MENTALIA',
      description: 'Todo del Plan Plus para hasta 3 miembros de la familia con IA personalizada para cada uno.',
      monthly_price: 14.99,
      yearly_price: 179.88,
    },
    {
      id: 'empresas',
      name: 'Plan Empresas MENTALIA',
      description: 'Solución completa para equipos con dashboard administrativo y soporte dedicado.',
      monthly_price: 49.00,
      yearly_price: 588.00,
    },
  ];

  const createdProducts = {};

  for (const plan of plans) {
    try {
      console.log(`📦 Creando producto: ${plan.name}...`);
      
      // Crear producto
      const product = await stripe.products.create({
        name: plan.name,
        description: plan.description,
        metadata: {
          plan_id: plan.id,
        },
      });

      console.log(`✅ Producto creado: ${product.id}`);

      // Crear precio mensual
      console.log(`💳 Creando precio mensual...`);
      const monthlyPrice = await stripe.prices.create({
        unit_amount: Math.round(plan.monthly_price * 100), // Convertir a centavos
        currency: 'eur',
        recurring: { interval: 'month' },
        product: product.id,
        metadata: {
          plan_id: plan.id,
          billing_period: 'monthly',
        },
      });

      console.log(`✅ Precio mensual creado: ${monthlyPrice.id}`);

      // Crear precio anual
      console.log(`💳 Creando precio anual...`);
      const yearlyPrice = await stripe.prices.create({
        unit_amount: Math.round(plan.yearly_price * 100), // Convertir a centavos
        currency: 'eur',
        recurring: { interval: 'year' },
        product: product.id,
        metadata: {
          plan_id: plan.id,
          billing_period: 'yearly',
        },
      });

      console.log(`✅ Precio anual creado: ${yearlyPrice.id}`);

      createdProducts[plan.id] = {
        product_id: product.id,
        monthly_price_id: monthlyPrice.id,
        yearly_price_id: yearlyPrice.id,
      };

      console.log(`\n`);
    } catch (error) {
      console.error(`❌ Error creando ${plan.name}:`, error.message);
    }
  }

  console.log('\n🎉 ¡Configuración completada!\n');
  console.log('📋 Productos y precios creados:');
  console.log('==================================');
  
  for (const [planId, ids] of Object.entries(createdProducts)) {
    console.log(`\n${planId.toUpperCase()}:`);
    console.log(`  Producto: ${ids.product_id}`);
    console.log(`  Precio mensual: ${ids.monthly_price_id}`);
    console.log(`  Precio anual: ${ids.yearly_price_id}`);
  }

  console.log('\n📝 Actualiza tu archivo lib/stripe.ts con estos IDs:');
  console.log('==================================================');
  console.log(`
export const STRIPE_PRODUCTS = {
  personal: {
    monthly: '${createdProducts.personal?.monthly_price_id || 'price_personal_monthly'}',
    yearly: '${createdProducts.personal?.yearly_price_id || 'price_personal_yearly'}',
  },
  plus: {
    monthly: '${createdProducts.plus?.monthly_price_id || 'price_plus_monthly'}',
    yearly: '${createdProducts.plus?.yearly_price_id || 'price_plus_yearly'}',
  },
  familiar: {
    monthly: '${createdProducts.familiar?.monthly_price_id || 'price_familiar_monthly'}',
    yearly: '${createdProducts.familiar?.yearly_price_id || 'price_familiar_yearly'}',
  },
  empresas: {
    monthly: '${createdProducts.empresas?.monthly_price_id || 'price_empresas_monthly'}',
    yearly: '${createdProducts.empresas?.yearly_price_id || 'price_empresas_yearly'}',
  },
};`);

  console.log('\n🚀 ¡Ya puedes procesar pagos con Stripe!');
}

// Ejecutar si se llama directamente
if (require.main === module) {
  setupStripeProducts().catch(console.error);
}

module.exports = { setupStripeProducts }; 