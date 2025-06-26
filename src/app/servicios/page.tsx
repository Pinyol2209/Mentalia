'use client';

import Link from "next/link";
import { 
  ArrowLeft,
  MessageCircle,
  Heart,
  Shield,
  Smartphone,
  Clock,
  CheckCircle,
  Users,
  Star,
  Gift,
  Zap,
  Brain,
  Lock,
  UserCheck,
  PhoneCall
} from "lucide-react";

export default function ServiciosPage() {
  const handleWhatsApp = (message: string) => {
    window.open(`https://wa.me/34600000000?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handlePlanSelection = (planType: string) => {
    const messages = {
      'gratis': 'Hola, me interesa el Plan Gratuito de MENTALIA',
      'personal': 'Hola, me interesa el Plan Personal de MENTALIA (4,99€/mes)',
      'plus': 'Hola, me interesa el Plan Plus de MENTALIA (9,99€/mes)',
      'familiar': 'Hola, me interesa el Plan Familiar de MENTALIA (14,99€/mes)'
    };
    
    const message = messages[planType as keyof typeof messages] || 'Hola, me interesa MENTALIA';
    handleWhatsApp(message);
  };

  return (
    <div className="min-h-screen bg-gray-50">
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
      <section className="py-20 text-center bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Servicios emocionales al alcance de todos, 24/7
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Habla con tu asistente personal por WhatsApp, cuando lo necesites.
          </p>
        </div>
      </section>

      {/* What does Mentalia do */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6 flex items-center justify-center">
              <MessageCircle className="w-10 h-10 text-blue-600 mr-4" />
              ¿Qué hace Mentalia?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-xl p-8 text-center shadow-sm border border-gray-200">
              <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                <Heart className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Escucha sin juzgar</h3>
              <p className="text-lg text-gray-600">Espacio seguro para compartir tus problemas y emociones</p>
            </div>

            <div className="bg-white rounded-xl p-8 text-center shadow-sm border border-gray-200">
              <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                <Brain className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Consejos especializados</h3>
              <p className="text-lg text-gray-600">Basados en psicología y bienestar emocional</p>
            </div>

            <div className="bg-white rounded-xl p-8 text-center shadow-sm border border-gray-200">
              <div className="w-16 h-16 bg-purple-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Ejercicios prácticos</h3>
              <p className="text-lg text-gray-600">Respiración, journaling, meditación y más</p>
            </div>

            <div className="bg-white rounded-xl p-8 text-center shadow-sm border border-gray-200">
              <div className="w-16 h-16 bg-orange-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                <Smartphone className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Siempre disponible</h3>
              <p className="text-lg text-gray-600">24/7 desde tu móvil, privado y seguro</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services by Plan */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6 flex items-center justify-center">
              <Gift className="w-10 h-10 text-blue-600 mr-4" />
              Servicios por plan
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Plan Gratuito */}
            <div className="bg-gray-50 rounded-2xl p-8 border-2 border-gray-200 hover:border-gray-300 transition-colors">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Gift className="w-8 h-8 text-gray-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">🆓 Plan Gratuito</h3>
                <div className="text-3xl font-bold text-gray-600 mb-2">0€</div>
                <p className="text-sm text-gray-500">Para probar</p>
              </div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-lg">3 conversaciones al mes</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-lg">Recomendaciones básicas</span>
                </li>
                <li className="flex items-start">
                  <Clock className="w-5 h-5 text-orange-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-lg">Horario limitado (9:00 a 20:00)</span>
                </li>
                <li className="flex items-start">
                  <Star className="w-5 h-5 text-yellow-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-lg">Ideal para probar</span>
                </li>
              </ul>
              
              <button 
                onClick={() => handlePlanSelection('gratis')}
                className="w-full bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Empezar Gratis
              </button>
            </div>

            {/* Plan Personal */}
            <div className="bg-white rounded-2xl p-8 border-2 border-blue-200 hover:border-blue-300 transition-colors shadow-lg">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Heart className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">🌟 Plan Personal</h3>
                <div className="text-3xl font-bold text-blue-600 mb-2">4,99€</div>
                <p className="text-sm text-gray-500">por mes</p>
              </div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-lg">Chat 24/7 ilimitado</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-lg">Respuestas empáticas y profundas</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-lg">Experiencias guiadas</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-lg">IA con personalidad personalizada</span>
                </li>
              </ul>
              
              <button 
                onClick={() => handlePlanSelection('personal')}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Elegir Personal
              </button>
            </div>

            {/* Plan Plus */}
            <div className="bg-gradient-to-b from-blue-50 to-white rounded-2xl p-8 border-2 border-blue-500 hover:border-blue-600 transition-colors shadow-xl relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">MÁS POPULAR</span>
              </div>
              
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">🔥 Plan Plus</h3>
                <div className="text-3xl font-bold text-blue-600 mb-2">9,99€</div>
                <p className="text-sm text-gray-500">por mes</p>
              </div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-lg">Todo lo anterior +</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-lg">Seguimiento emocional semanal</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-lg">Informe emocional mensual (PDF)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-lg">Mensaje motivacional diario</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-lg">Modo &quot;filósofo&quot;, &quot;coach&quot; o &quot;espiritual&quot;</span>
                </li>
              </ul>
              
              <button 
                onClick={() => handlePlanSelection('plus')}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Elegir Plus
              </button>
            </div>

            {/* Plan Familiar */}
            <div className="bg-white rounded-2xl p-8 border-2 border-purple-200 hover:border-purple-300 transition-colors shadow-lg">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-purple-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">👨‍👩‍👧 Plan Familiar</h3>
                <div className="text-3xl font-bold text-purple-600 mb-2">14,99€</div>
                <p className="text-sm text-gray-500">por mes</p>
              </div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-lg">Hasta 3 usuarios</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-lg">Cada uno con su propia IA</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-lg">Ideal para parejas</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-lg">Padres con hijos adolescentes</span>
                </li>
              </ul>
              
              <button 
                onClick={() => handlePlanSelection('familiar')}
                className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors"
              >
                Elegir Familiar
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Security and Privacy */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6 flex items-center justify-center">
            <Shield className="w-10 h-10 text-green-600 mr-4" />
            Seguridad y privacidad
          </h2>
          
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
            <div className="flex items-center justify-center mb-6">
              <Lock className="w-16 h-16 text-green-600" />
            </div>
            <p className="text-xl text-gray-700 leading-relaxed">
              Todos tus mensajes están protegidos y jamás serán compartidos.
              <br />
              No somos una red social ni recopilamos tus datos para venderlos.
            </p>
          </div>
        </div>
      </section>

      {/* Target Audience */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6 flex items-center justify-center">
              <UserCheck className="w-10 h-10 text-blue-600 mr-4" />
              ¿A quién va dirigido?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-blue-50 rounded-xl p-6 text-center border border-blue-200">
              <Brain className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Personas con ansiedad</h3>
              <p className="text-gray-600">Estrés o desmotivación que buscan apoyo inmediato</p>
            </div>

            <div className="bg-green-50 rounded-xl p-6 text-center border border-green-200">
              <Heart className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Jóvenes</h3>
              <p className="text-gray-600">Que quieren apoyo emocional sin ir a terapia</p>
            </div>

            <div className="bg-purple-50 rounded-xl p-6 text-center border border-purple-200">
              <MessageCircle className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Adultos</h3>
              <p className="text-gray-600">Que necesitan hablar sin juicio ni críticas</p>
            </div>

            <div className="bg-pink-50 rounded-xl p-6 text-center border border-pink-200">
              <Users className="w-12 h-12 text-pink-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Parejas</h3>
              <p className="text-gray-600">Que quieren mejorar su comunicación</p>
            </div>

            <div className="bg-orange-50 rounded-xl p-6 text-center border border-orange-200">
              <Shield className="w-12 h-12 text-orange-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Espacio seguro</h3>
              <p className="text-gray-600">Cualquiera que necesite apoyo emocional</p>
            </div>

            <div className="bg-indigo-50 rounded-xl p-6 text-center border border-indigo-200">
              <Clock className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-3">24/7</h3>
              <p className="text-gray-600">Para quienes necesitan apoyo inmediato</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-6">
            <PhoneCall className="w-16 h-16 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-white mb-6">
            ¿Listo para probarlo?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Escríbenos por WhatsApp y empieza gratis.
          </p>
          <button
            onClick={() => handleWhatsApp('Hola, quiero empezar con MENTALIA')}
            className="bg-white text-blue-600 px-10 py-4 rounded-lg text-xl font-medium hover:bg-gray-100 transition-colors flex items-center justify-center space-x-3 mx-auto"
          >
            <Smartphone className="w-6 h-6" />
            <span>Empezar ahora</span>
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">MENTALIA</h3>
              <p className="text-gray-400 text-sm mb-4">
                Tu mente en buenas manos, 24 horas al día.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Producto</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/servicios" className="hover:text-white">Servicios</Link></li>
                <li><Link href="/pricing" className="hover:text-white">Precios</Link></li>
                <li><Link href="/como-funciona" className="hover:text-white">¿Cómo funciona?</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Soporte</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/como-funciona" className="hover:text-white">Centro de Ayuda</Link></li>
                <li><a href="#" className="hover:text-white">Contacto</a></li>
                <li><a href="#" className="hover:text-white">Estado del Servicio</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">Privacidad</a></li>
                <li><a href="#" className="hover:text-white">Términos</a></li>
                <li><a href="#" className="hover:text-white">Cookies</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">&copy; 2024 MENTALIA. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
} 