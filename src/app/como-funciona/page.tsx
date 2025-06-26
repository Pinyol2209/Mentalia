'use client';

import Link from "next/link";
import { useState } from "react";
import { 
  ArrowLeft, 
  MessageCircle, 
  Smartphone, 
  Heart, 
  Search, 
  ChevronDown, 
  ChevronRight,
  Settings,
  Headphones,
  Package,
  HelpCircle
} from "lucide-react";
import Footer from '@/components/Footer'

export default function ComoFuncionaPage() {
  const [selectedCategory, setSelectedCategory] = useState('general');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<string | null>('about-mentalia');

  const categories = [
    { id: 'general', name: 'General', icon: Settings },
    { id: 'soporte', name: 'Soporte', icon: Headphones },
    { id: 'servicios', name: 'Servicios', icon: Heart },
    { id: 'funcionalidad', name: 'Funcionalidad', icon: Package },
    { id: 'otros', name: 'Otros', icon: HelpCircle }
  ];

  const faqs = {
    general: [
      {
        id: 'about-mentalia',
        question: 'Acerca de MENTALIA',
        answer: `MENTALIA es un innovador asistente de bienestar emocional disponible 24/7 a través de WhatsApp. Estamos emocionados de presentar un nuevo tipo de apoyo digital llamado asistencia emocional automatizada. Los servicios de MENTALIA tienen propiedades únicas: son únicos, fácilmente accesibles, intercambiables y utilizables en múltiples situaciones. Al igual que los recursos físicos, puedes hacer lo que quieras con ellos: conversar en cualquier momento del día, recibir ejercicios personalizados, obtener apoyo inmediato cuando lo necesites, o compartir tus pensamientos en un espacio seguro y confidencial. Pero a diferencia de los recursos físicos, están respaldados por la programabilidad de la inteligencia artificial especializada en bienestar emocional.`
      },
      {
        id: 'como-empezar',
        question: 'Cómo empezar con MENTALIA',
        answer: 'Para comenzar con MENTALIA, simplemente envía un mensaje a nuestro número de WhatsApp. Te guiaremos a través de un proceso de configuración inicial donde podrás personalizar tu experiencia según tus necesidades específicas de bienestar emocional.'
      },
      {
        id: 'que-incluye',
        question: '¿Qué incluye el servicio?',
        answer: 'MENTALIA incluye conversaciones ilimitadas, ejercicios de respiración guiados, técnicas de mindfulness, journaling emocional, seguimiento de tu progreso y apoyo personalizado las 24 horas del día, los 7 días de la semana.'
      }
    ],
    soporte: [
      {
        id: 'disponibilidad',
        question: '¿Cuándo está disponible el soporte?',
        answer: 'El soporte de MENTALIA está disponible 24/7 a través de WhatsApp. Nuestro sistema de IA responde inmediatamente, y para consultas más complejas, nuestro equipo humano está disponible de lunes a viernes de 9:00 a 18:00 (CET).'
      },
      {
        id: 'tipos-soporte',
        question: '¿Qué tipos de soporte ofrecen?',
        answer: 'Ofrecemos soporte emocional inmediato, técnico para el uso de la plataforma, y especializado para situaciones de crisis. También proporcionamos recursos educativos y conexión con profesionales cuando es necesario.'
      }
    ],
    servicios: [
      {
        id: 'respiracion-guiada',
        question: 'Ejercicios de Respiración Guiada',
        answer: 'Nuestros ejercicios de respiración van desde 3 hasta 10 minutos y están diseñados para calmar la ansiedad, reducir el estrés y promover la relajación. Incluyen técnicas como respiración 4-7-8, respiración diafragmática y mindfulness respiratorio.'
      },
      {
        id: 'journaling',
        question: 'Journaling Emocional',
        answer: 'Te guiamos a través de ejercicios de escritura reflexiva que te ayudan a procesar emociones, identificar patrones de pensamiento y desarrollar mayor autoconciencia emocional.'
      }
    ],
    funcionalidad: [
      {
        id: 'como-funciona-ia',
        question: '¿Cómo funciona la IA de MENTALIA?',
        answer: 'Nuestra IA está entrenada específicamente en psicología, técnicas de bienestar emocional y terapia cognitivo-conductual. Analiza tus mensajes para entender tu estado emocional y proporciona respuestas personalizadas y ejercicios apropiados.'
      },
      {
        id: 'privacidad',
        question: '¿Es privada mi información?',
        answer: 'Absolutamente. Todas tus conversaciones están cifradas de extremo a extremo. No compartimos información personal con terceros y cumplimos estrictamente con las regulaciones de protección de datos europeas (GDPR).'
      }
    ],
    otros: [
      {
        id: 'diferencia-terapia',
        question: '¿Es MENTALIA un reemplazo de la terapia tradicional?',
        answer: 'MENTALIA es un complemento, no un reemplazo de la terapia profesional. Ofrecemos apoyo emocional inmediato y herramientas de bienestar, pero siempre recomendamos consultar con profesionales de salud mental para situaciones serias.'
      },
      {
        id: 'costo-beneficio',
        question: '¿Por qué elegir MENTALIA?',
        answer: 'MENTALIA ofrece apoyo inmediato 24/7, es más accesible económicamente que la terapia tradicional, y proporciona herramientas prácticas que puedes usar en cualquier momento y lugar a través de WhatsApp.'
      }
    ]
  };

  const filteredFaqs = faqs[selectedCategory as keyof typeof faqs] || [];

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setExpandedFaq(null);
  };

  const toggleFaq = (faqId: string) => {
    setExpandedFaq(expandedFaq === faqId ? null : faqId);
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
      <section className="py-20 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            ¿Cómo podemos ayudarte?
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Encuentra las preguntas más frecuentes y sus respuestas aquí
          </p>

          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto mb-16">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Haz una pregunta"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-4 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-lg"
            />
          </div>

          {/* Category Icons */}
          <div className="flex flex-wrap justify-center gap-8 mb-16">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className={`flex flex-col items-center p-6 rounded-lg transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${
                  selectedCategory === category.id 
                    ? 'bg-white/20' 
                    : 'bg-gray-100'
                }`}>
                  <category.icon className="w-6 h-6" />
                </div>
                <span className="text-lg font-medium">{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Categorías</h3>
                <nav className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryClick(category.id)}
                      className={`w-full flex items-center px-3 py-2 text-lg font-medium rounded-md transition-colors ${
                        selectedCategory === category.id
                          ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <category.icon className="w-5 h-5 mr-3" />
                      {category.name}
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* FAQ Content */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-lg border border-gray-200 p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-8">Preguntas frecuentes</h2>
                
                <div className="space-y-4">
                  {filteredFaqs.map((faq) => (
                    <div key={faq.id} className="border border-gray-200 rounded-lg">
                      <button
                        onClick={() => toggleFaq(faq.id)}
                        className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                      >
                        <span className="text-xl font-medium text-gray-900 pr-4">{faq.question}</span>
                        {expandedFaq === faq.id ? (
                          <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                        ) : (
                          <ChevronRight className="w-5 h-5 text-gray-500 flex-shrink-0" />
                        )}
                      </button>
                      
                      {expandedFaq === faq.id && (
                        <div className="px-6 pb-6">
                          <div className="pt-4 border-t border-gray-100">
                            <p className="text-lg text-gray-700 leading-relaxed">{faq.answer}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Support */}
              <div className="mt-8 bg-blue-50 rounded-lg p-6 border border-blue-200">
                <div className="flex items-center mb-4">
                  <MessageCircle className="w-6 h-6 text-blue-600 mr-3" />
                  <h3 className="text-lg font-semibold text-gray-900">¿No encuentras lo que buscas?</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Nuestro equipo está aquí para ayudarte. Inicia una conversación directamente en WhatsApp.
                </p>
                <button
                  onClick={() => window.open('https://wa.me/34600000000?text=Hola%2C%20tengo%20una%20pregunta%20sobre%20MENTALIA', '_blank')}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2"
                >
                  <Smartphone className="w-5 h-5" />
                  <span>Contactar Soporte</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            ¿Listo para empezar tu viaje de bienestar emocional?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Únete a miles de personas que ya cuidan su salud mental con MENTALIA
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.open('https://wa.me/34600000000?text=Hola%2C%20quiero%20empezar%20con%20MENTALIA', '_blank')}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
            >
              <Smartphone className="w-5 h-5" />
              <span>Empezar Gratis</span>
            </button>
            <Link
              href="/pricing"
              className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors"
            >
              Ver Precios
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
} 