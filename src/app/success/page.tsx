'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, ArrowRight } from 'lucide-react';

interface SessionData {
  customer_email: string;
  plan_name: string;
  amount_total: number;
}

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [loading, setLoading] = useState(true);
  const [sessionData, setSessionData] = useState<SessionData | null>(null);

  useEffect(() => {
    if (sessionId) {
      // Aquí puedes hacer una llamada al backend para verificar la sesión
      // Por ahora, simplemente simulamos los datos
      setTimeout(() => {
        setSessionData({
          customer_email: 'usuario@ejemplo.com',
          plan_name: 'Plan Personal',
          amount_total: 4.99
        });
        setLoading(false);
      }, 2000);
    } else {
      setLoading(false);
    }
  }, [sessionId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-2xl p-8 shadow-lg text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Procesando tu pago...
          </h2>
          <p className="text-gray-600">
            Estamos verificando tu suscripción
          </p>
        </div>
      </div>
    );
  }

  if (!sessionId) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-2xl p-8 shadow-lg text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">❌</span>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Sesión no encontrada
          </h2>
          <p className="text-gray-600 mb-6">
            No se pudo verificar tu pago. Por favor, contacta con soporte.
          </p>
          <Link 
            href="/contacto"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Contactar Soporte
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header simple */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="text-3xl font-bold text-blue-600">
              MENTALIA
            </Link>
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4">
        <div className="max-w-2xl w-full bg-white rounded-2xl p-8 shadow-lg text-center">
          
          {/* Icono de éxito */}
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>

          {/* Mensaje principal */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            ¡Pago completado con éxito!
          </h1>
          
          <p className="text-xl text-gray-600 mb-8">
            Bienvenido a MENTALIA. Tu suscripción ya está activa.
          </p>

          {/* Detalles del pago */}
          <div className="bg-gray-50 rounded-xl p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Detalles de tu suscripción
            </h3>
            <div className="space-y-3 text-left">
              <div className="flex justify-between">
                <span className="text-gray-600">Plan:</span>
                <span className="font-medium text-gray-900">
                  {sessionData?.plan_name || 'Plan Personal'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Email:</span>
                <span className="font-medium text-gray-900">
                  {sessionData?.customer_email || 'usuario@ejemplo.com'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Monto:</span>
                <span className="font-medium text-gray-900">
                  €{sessionData?.amount_total || '4.99'}/mes
                </span>
              </div>
            </div>
          </div>

          {/* Próximos pasos */}
          <div className="bg-blue-50 rounded-xl p-6 mb-8">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">
              Próximos pasos
            </h3>
            <div className="text-left space-y-2">
              <p className="text-blue-800">
                1. Recibirás un email de confirmación con los detalles de tu suscripción
              </p>
              <p className="text-blue-800">
                2. Puedes empezar a usar MENTALIA inmediatamente en WhatsApp
              </p>
              <p className="text-blue-800">
                3. Tu facturación se renovará automáticamente cada mes
              </p>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/34600000000?text=Hola%2C%20acabo%20de%20suscribirme%20a%20MENTALIA%20y%20quiero%20empezar"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-lg font-medium"
            >
              Empezar en WhatsApp
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
            
            <Link
              href="/"
              className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-lg font-medium"
            >
              Volver al inicio
            </Link>
          </div>

          {/* Información de soporte */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-gray-600">
              ¿Tienes alguna pregunta? {' '}
              <Link href="/contacto" className="text-blue-600 hover:text-blue-700 font-medium">
                Contáctanos
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-2xl p-8 shadow-lg text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Cargando...
        </h2>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <SuccessContent />
    </Suspense>
  );
} 