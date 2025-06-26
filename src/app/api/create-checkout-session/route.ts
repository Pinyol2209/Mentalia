import { NextRequest, NextResponse } from 'next/server';
import { stripe, STRIPE_PRODUCTS } from '../../../../lib/stripe';

export async function POST(req: NextRequest) {
  try {
    // Verificar que Stripe esté configurado
    if (!stripe) {
      return NextResponse.json(
        { error: 'Stripe no está configurado. Por favor, configura las claves API.' },
        { status: 500 }
      );
    }

    const { planType, billingPeriod } = await req.json();

    // Validar que los parámetros sean válidos
    if (!planType || !billingPeriod) {
      return NextResponse.json(
        { error: 'Faltan parámetros requeridos' },
        { status: 400 }
      );
    }

    // Validar que el plan existe (excepto plan gratis)
    if (planType === 'gratis') {
      return NextResponse.json(
        { error: 'El plan gratuito no requiere pago' },
        { status: 400 }
      );
    }

    if (!['personal', 'plus', 'familiar', 'empresas'].includes(planType)) {
      return NextResponse.json(
        { error: 'Tipo de plan inválido' },
        { status: 400 }
      );
    }

    if (!['monthly', 'yearly'].includes(billingPeriod)) {
      return NextResponse.json(
        { error: 'Período de facturación inválido' },
        { status: 400 }
      );
    }

    // Obtener el price ID correspondiente
    const priceId = STRIPE_PRODUCTS[planType as keyof typeof STRIPE_PRODUCTS][billingPeriod as 'monthly' | 'yearly'];

    // Crear la sesión de checkout
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_DOMAIN}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_DOMAIN}/pricing`,
      metadata: {
        planType,
        billingPeriod,
      },
      subscription_data: {
        metadata: {
          planType,
          billingPeriod,
        },
      },
      customer_creation: 'always',
      billing_address_collection: 'required',
      allow_promotion_codes: true,
    });

    return NextResponse.json({ sessionId: session.id });
    
  } catch (error) {
    console.error('Error creando sesión de checkout:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
} 