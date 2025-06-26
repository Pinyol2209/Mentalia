"use client";

import Link from "next/link";
import { ArrowLeft, Check, MessageCircle, Star } from "lucide-react";
import Footer from '@/components/Footer'

export default function PricingPage() {
  const handlePlanSelection = (planType: string) => {
    const messages = {
      'gratis': 'Hola, me interesa el Plan Gratuito de MENTALIA',
      'personal': 'Hola, me interesa el Plan Personal de MENTALIA (4,99€/mes)',
      'plus': 'Hola, me interesa el Plan Plus de MENTALIA (9,99€/mes)',
      'familiar': 'Hola, me interesa el Plan Familiar de MENTALIA (14,99€/mes)',
      'empresas': 'Hola, me interesa el Plan Empresas de MENTALIA'
    };
    
    const message = messages[planType as keyof typeof messages] || 'Hola, me interesa MENTALIA';
    window.open(`https://wa.me/34600000000?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700">
                <ArrowLeft className="w-5 h-5" />
                <span>Volver</span>
              </Link>
              <div className="h-6 w-px bg-gray-200"></div>
              <h1 className="text-2xl font-bold text-blue-600">MENTALIA</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Planes y Precios
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Recibe apoyo emocional ilimitado cuando pagas anualmente, y ahorra en tu plan.
          </p>

          {/* Toggle Monthly/Annual */}
          <div className="inline-flex items-center bg-gray-100 rounded-lg p-1 mb-16">
            <button className="px-6 py-2 text-lg font-medium text-gray-700 rounded-md">
              Mensual
            </button>
            <button className="px-6 py-2 text-lg font-medium text-white bg-blue-600 rounded-md">
              Anual
            </button>
            <span className="ml-3 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
              Ahorra 36%
            </span>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Plan Gratis */}
            <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-shadow">
              <div className="mb-8">
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">Gratis</h3>
                <div className="flex items-baseline mb-4">
                  <span className="text-5xl font-bold text-gray-900">0€</span>
                </div>
                <p className="text-gray-600 text-lg">Por usuario/mes, facturado anualmente</p>
              </div>
              
              <div className="mb-8">
                <p className="text-gray-900 font-medium mb-6 text-lg">Para probar nuestro servicio</p>
                
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 text-lg">3 consultas por mes</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 text-lg">Respuestas básicas de la IA</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 text-lg">Horario limitado 9h-20h</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 text-lg">Cuenta personal única</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 text-lg">Sin ejercicios guiados</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 text-lg">Sin seguimiento emocional</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 text-lg">Sin informes</span>
                  </li>
                </ul>
              </div>
              
              <button className="w-full bg-white border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-50 transition-colors" onClick={() => handlePlanSelection('gratis')}>
                Empezar gratis
              </button>
            </div>

            {/* Plan Personal - POPULAR */}
            <div className="bg-white border-2 border-blue-600 rounded-2xl p-8 relative shadow-lg">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Más Popular
                </span>
              </div>
              
              <div className="mb-8">
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">Personal</h3>
                <div className="flex items-baseline mb-4">
                  <span className="text-5xl font-bold text-gray-900">4,99€</span>
                </div>
                <p className="text-gray-600 text-lg">Por usuario/mes, facturado anualmente</p>
              </div>
              
              <div className="mb-8">
                <p className="text-gray-900 font-medium mb-6 text-lg">Ideal para uso personal</p>
                
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 text-lg">Consultas ilimitadas 24/7</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 text-lg">Ejercicios de respiración guiados</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 text-lg">Personalidad de IA configurable</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 text-lg">Journaling emocional</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 text-lg">100% vía WhatsApp</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 text-lg">Sin historial emocional</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 text-lg">Sin informes mensuales</span>
                  </li>
                </ul>
              </div>
              
              <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors" onClick={() => handlePlanSelection('personal')}>
                Empezar con Personal
              </button>
            </div>

            {/* Plan Plus */}
            <div className="bg-gray-900 text-white rounded-2xl p-8 hover:shadow-lg transition-shadow">
              <div className="mb-8">
                <h3 className="text-2xl font-semibold text-white mb-2">Plus</h3>
                <div className="flex items-baseline mb-4">
                  <span className="text-5xl font-bold text-white">9,99€</span>
                </div>
                <p className="text-gray-300 text-lg">Por usuario/mes, facturado anualmente</p>
              </div>
              
              <div className="mb-8">
                <p className="text-white font-medium mb-6 text-lg">Para seguimiento completo</p>
                
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300 text-lg">Todo lo del plan Personal</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300 text-lg">Historial emocional completo</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300 text-lg">Revisión semanal de progreso</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300 text-lg">Audio motivacional diario</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300 text-lg">Informe mensual PDF detallado</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300 text-lg">30 técnicas de relajación</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300 text-lg">Soporte prioritario</span>
                  </li>
                </ul>
              </div>
              
              <button className="w-full bg-white text-gray-900 py-3 px-6 rounded-lg font-medium hover:bg-gray-100 transition-colors" onClick={() => handlePlanSelection('plus')}>
                Empezar con Plus
              </button>
            </div>
          </div>

          {/* Planes adicionales */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {/* Plan Familiar */}
            <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-shadow">
              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">Familiar</h3>
                <div className="flex items-baseline mb-4">
                  <span className="text-4xl font-bold text-purple-600">14,99€</span>
                  <span className="text-gray-600 ml-2">/mes</span>
                </div>
                <p className="text-gray-600 text-lg">Hasta 3 miembros de la familia</p>
              </div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 text-lg">Todo del Plan Plus para cada miembro</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 text-lg">IA personalizada por persona</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 text-lg">Privacidad total garantizada</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 text-lg">Ideal para parejas y adolescentes</span>
                </li>
              </ul>
              
              <button className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-purple-700 transition-colors" onClick={() => handlePlanSelection('familiar')}>
                Elegir Familiar
              </button>
            </div>

            {/* Plan Empresas */}
            <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-shadow">
              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">Empresas</h3>
                <div className="flex items-baseline mb-4">
                  <span className="text-4xl font-bold text-orange-600">49€+</span>
                  <span className="text-gray-600 ml-2">/mes</span>
                </div>
                <p className="text-gray-600 text-lg">Para equipos y organizaciones</p>
              </div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 text-lg">Equipos completos sin límite</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 text-lg">Dashboard administrativo</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 text-lg">Salud mental empresarial</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 text-lg">Soporte dedicado 24/7</span>
                </li>
              </ul>
              
              <button className="w-full bg-orange-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-orange-700 transition-colors" onClick={() => handlePlanSelection('empresas')}>
                Contactar Ventas
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Extras Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Complementos Disponibles</h2>
            <p className="text-xl text-gray-600">Mejora tu experiencia con contenido premium</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 text-center border border-gray-200">
              <div className="w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <Star className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Ejercicios Premium</h3>
              <p className="text-gray-600 text-lg mb-4">Técnicas avanzadas y experiencias guiadas especializadas</p>
              <div className="text-2xl font-bold text-blue-600 mb-2">1,99€</div>
              <p className="text-xs text-gray-500">por ejercicio</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 text-center border border-gray-200">
              <div className="w-12 h-12 bg-purple-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Modo Filosófico</h3>
              <p className="text-gray-600 text-lg mb-4">Perspectiva más profunda y reflexiva para tus inquietudes</p>
              <div className="text-2xl font-bold text-purple-600 mb-2">0,99€</div>
              <p className="text-xs text-gray-500">compra única</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 text-center border border-gray-200">
              <div className="w-12 h-12 bg-amber-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Modo Espiritual</h3>
              <p className="text-gray-600 text-lg mb-4">Enfoque espiritual y trascendente para tu crecimiento personal</p>
              <div className="text-2xl font-bold text-amber-600 mb-2">0,99€</div>
              <p className="text-xs text-gray-500">compra única</p>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Methods & Note */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Métodos de Pago Seguros</h2>
          <div className="flex justify-center items-center space-x-8 mb-12">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <span className="text-gray-700 font-medium">Stripe</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <span className="text-gray-700 font-medium">Gumroad</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-blue-800 rounded-lg flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <span className="text-gray-700 font-medium">PayPal</span>
            </div>
          </div>
          
          <div className="bg-blue-50 rounded-xl p-6 text-left max-w-2xl mx-auto">
            <div className="flex items-start space-x-3">
              <MessageCircle className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Nota Psicológica</h3>
                <p className="text-gray-700 text-lg">
                  El 70% de las personas no buscan ayuda hasta que realmente la necesitan. 
                  Por eso ofrecemos una experiencia gratuita que genera conexión emocional real, 
                  multiplicando las conversiones cuando surge la necesidad genuina.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            ¿Listo para empezar tu viaje emocional?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Únete a miles de personas que ya cuidan su bienestar mental con MENTALIA
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
              <MessageCircle className="w-5 h-5" />
              <span>Empezar Gratis en WhatsApp</span>
            </button>
            <button className="border border-gray-600 text-gray-300 px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors">
              Agendar Demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
} 