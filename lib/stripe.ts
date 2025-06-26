import { loadStripe, Stripe } from '@stripe/stripe-js';

// Cliente de Stripe para el frontend
let stripePromise: Promise<Stripe | null>;

export const getStripe = () => {
  if (!stripePromise) {
    const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
    if (!publishableKey) {
      console.warn('Stripe publishable key not found');
      return Promise.resolve(null);
    }
    stripePromise = loadStripe(publishableKey);
  }
  return stripePromise;
};

// Configuración de Stripe para el backend
import StripeServer from 'stripe';

// Solo inicializar Stripe si tenemos la clave secreta
const secretKey = process.env.STRIPE_SECRET_KEY;

export const stripe = secretKey ? new StripeServer(secretKey, {
  apiVersion: '2025-05-28.basil',
  typescript: true,
}) : null;

// Configuración de los productos y precios
export const STRIPE_PRODUCTS = {
  personal: {
    monthly: 'price_personal_monthly', // Se reemplazará con los IDs reales de Stripe
    yearly: 'price_personal_yearly',
  },
  plus: {
    monthly: 'price_plus_monthly',
    yearly: 'price_plus_yearly',
  },
  familiar: {
    monthly: 'price_familiar_monthly',
    yearly: 'price_familiar_yearly',
  },
  empresas: {
    monthly: 'price_empresas_monthly',
    yearly: 'price_empresas_yearly',
  },
};

export const PLAN_PRICES = {
  personal: {
    monthly: 4.99,
    yearly: 59.88, // 4.99 * 12 * 0.64 (36% descuento)
  },
  plus: {
    monthly: 9.99,
    yearly: 119.88, // 9.99 * 12 * 0.64 (36% descuento)
  },
  familiar: {
    monthly: 14.99,
    yearly: 179.88, // 14.99 * 12 * 0.64 (36% descuento)
  },
  empresas: {
    monthly: 49.00,
    yearly: 588.00, // 49 * 12 * 0.64 (36% descuento)
  },
}; 