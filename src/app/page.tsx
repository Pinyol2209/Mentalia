'use client'

import Link from 'next/link'
import { useState } from 'react'
import { 
  Users, 
  Heart, 
  Gift,
  Sparkles,
  Smartphone,
  Brain,
  Target,
  Zap,
  Music,
  Lightbulb,
  FileText,
  Headphones
} from "lucide-react";
import Footer from '@/components/Footer'

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [showAllServices, setShowAllServices] = useState(false);

  // Service categories data
  const categories = ['Todos', 'Ansiedad', 'Estrés', 'Relaciones', 'Autoestima', 'Meditación', 'Ejercicios', 'Motivación'];
  
  // Services data with categories
  const allServices = [
    {
      id: 1,
      title: "Respiración Guiada",
      description: "Ejercicios de respiración de 3-10 minutos para calmar la ansiedad",
      icon: Brain,
      iconColor: "text-red-600",
      bgColor: "bg-red-100",
      badge: "✓ Técnicas Populares",
      categories: ['Ansiedad', 'Estrés', 'Meditación']
    },
    {
      id: 2,
      title: "Journaling Emocional",
      description: "Reflexiona y organiza tus pensamientos con ejercicios guiados",
      icon: FileText,
      iconColor: "text-gray-600",
      bgColor: "bg-gray-100",
      badge: "✓ Técnicas Populares",
      categories: ['Autoestima', 'Estrés']
    },
    {
      id: 3,
      title: "Autoestima Plus",
      description: "Ejercicios diarios para fortalecer tu confianza personal",
      icon: Target,
      iconColor: "text-yellow-600",
      bgColor: "bg-yellow-100",
      badge: "✓ Mejor Calificado",
      categories: ['Autoestima']
    },
    {
      id: 4,
      title: "Motivación Diaria",
      description: "Audios motivacionales personalizados según tu estado de ánimo",
      icon: Zap,
      iconColor: "text-blue-600",
      bgColor: "bg-blue-100",
      badge: "✓ Mejor Calificado",
      categories: ['Motivación']
    },
    {
      id: 5,
      title: "Relaciones Saludables",
      description: "Consejos para mejorar la comunicación y vínculos",
      icon: Heart,
      iconColor: "text-orange-600",
      bgColor: "bg-orange-100",
      badge: "✓ Nuevos Servicios",
      categories: ['Relaciones']
    },
    {
      id: 6,
      title: "Relajación con Audio",
      description: "Sonidos y música especializados para reducir el estrés",
      icon: Music,
      iconColor: "text-red-600",
      bgColor: "bg-red-100",
      badge: "✓ Técnicas Populares",
      categories: ['Estrés', 'Meditación']
    },
    {
      id: 7,
      title: "Crecimiento Personal",
      description: "Herramientas para desarrollar tu potencial emocional",
      icon: Lightbulb,
      iconColor: "text-green-600",
      bgColor: "bg-green-100",
      badge: "✓ Mejor Calificado",
      categories: ['Autoestima', 'Motivación']
    },
    {
      id: 8,
      title: "Mindfulness Práctico",
      description: "Técnicas de atención plena adaptadas a tu rutina diaria",
      icon: Brain,
      iconColor: "text-blue-600",
      bgColor: "bg-blue-100",
      badge: "✓ Mejor Calificado",
      categories: ['Meditación', 'Estrés']
    },
    // Additional services that show when "Ver Más" is clicked
    {
      id: 9,
      title: "Gestión de Ansiedad",
      description: "Técnicas avanzadas para controlar y reducir la ansiedad",
      icon: Brain,
      iconColor: "text-purple-600",
      bgColor: "bg-purple-100",
      badge: "✓ Especializado",
      categories: ['Ansiedad']
    },
    {
      id: 10,
      title: "Ejercicios de Fortaleza",
      description: "Rutinas mentales para desarrollar resistencia emocional",
      icon: Target,
      iconColor: "text-indigo-600",
      bgColor: "bg-indigo-100",
      badge: "✓ Avanzado",
      categories: ['Ejercicios', 'Autoestima']
    },
    {
      id: 11,
      title: "Comunicación Asertiva",
      description: "Mejora tus habilidades de comunicación en relaciones",
      icon: Users,
      iconColor: "text-pink-600",
      bgColor: "bg-pink-100",
      badge: "✓ Relaciones",
      categories: ['Relaciones']
    },
    {
      id: 12,
      title: "Motivación Matutina",
      description: "Rutinas energizantes para empezar el día con positividad",
      icon: Sparkles,
      iconColor: "text-amber-600",
      bgColor: "bg-amber-100",
      badge: "✓ Popular",
      categories: ['Motivación', 'Ejercicios']
    }
  ];

  // Filter services based on selected category
  const filteredServices = selectedCategory === 'Todos' 
    ? allServices 
    : allServices.filter(service => service.categories.includes(selectedCategory));

  // Show only first 8 services initially, or all if "Ver Más" was clicked
  const servicesToShow = showAllServices ? filteredServices : filteredServices.slice(0, 8);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setShowAllServices(false); // Reset "Ver Más" when changing category
  };

  const handleVerMas = () => {
    setShowAllServices(true);
  };

  const handleEmpezarGratis = () => {
    // Redirect to WhatsApp or show modal
    window.open('https://wa.me/34600000000?text=Hola%2C%20me%20interesa%20empezar%20con%20el%20plan%20gratuito%20de%20MENTALIA', '_blank');
  };

  const handleEmpezarWhatsApp = () => {
    window.open('https://wa.me/34600000000?text=Hola%2C%20quiero%20empezar%20con%20MENTALIA', '_blank');
  };

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
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header - Sticky/Fixed */}
      <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50 backdrop-blur-sm bg-white/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-3xl font-bold text-blue-600">MENTALIA</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#inicio" className="text-lg text-gray-700 hover:text-blue-600 font-medium">Inicio</a>
              <Link href="/como-funciona" className="text-lg text-gray-700 hover:text-blue-600 font-medium">¿Cómo funciona?</Link>
              <Link href="/servicios" className="text-lg text-gray-700 hover:text-blue-600 font-medium">Servicios</Link>
              <Link href="/pricing" className="text-lg text-gray-700 hover:text-blue-600 font-medium">Precios</Link>
              <Link href="/contacto" className="text-lg text-gray-700 hover:text-blue-600 font-medium">Contacto</Link>
            </nav>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-md text-lg hover:bg-blue-700 transition-colors" onClick={handleEmpezarWhatsApp}>
              ¿Te interesa?
            </button>
          </div>
        </div>
      </header>

      {/* Main Content - flex-grow para empujar el footer hacia abajo */}
      <main className="flex-grow">
        {/* Espaciado para compensar el header fijo */}
        <div className="pt-24"></div>

        {/* Hero Section */}
        <section className="bg-gray-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-8xl md:text-7xl font-bold text-gray-900 mb-8">
              Cuida tu bienestar emocional,<br />
              MENTALIA es tu apoyo<br />
              las 24 horas
            </h2>
            <p className="text-2xl text-gray-600 mb-10 max-w-3xl mx-auto">
              Conversa, reflexiona y encuentra equilibrio sin preocupaciones con tu asistente de bienestar emocional
            </p>
            <button className="bg-blue-600 text-white px-10 py-4 rounded-md text-xl font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 mx-auto" onClick={handleEmpezarWhatsApp}>
              <Smartphone className="w-6 h-6" />
              <span>Empezar en WhatsApp</span>
            </button>
          </div>
        </section>

        {/* Image Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative h-96 rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-80"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <h3 className="text-4xl font-bold mb-6">Tu mente, en buenas manos 24/7</h3>
                  <p className="text-xl">Apoyo emocional inmediato por WhatsApp</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 bg-gray-50" id="servicios">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h3 className="text-5xl font-bold text-gray-900 mb-6">Nuestros Servicios</h3>
              <p className="text-xl text-gray-600">
                Porque ofrecemos experiencias que pueden no estar disponibles<br />
                en otros lugares
              </p>
            </div>

            {/* Service Categories */}
            <div className="flex flex-wrap gap-4 justify-center mb-16">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`px-6 py-3 rounded-md text-lg transition-colors ${
                    selectedCategory === category 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                  onClick={() => handleCategoryClick(category)}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Service Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {servicesToShow.map((service) => (
                <div key={service.id} className="product-card p-8">
                  <div className={`w-20 h-20 ${service.bgColor} rounded-lg mb-6 flex items-center justify-center`}>
                    <service.icon className={`w-10 h-10 ${service.iconColor}`} />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-4">{service.title}</h4>
                  <p className="text-base text-gray-600 mb-6">{service.description}</p>
                  <span className="text-sm text-blue-600 font-medium">{service.badge}</span>
                </div>
              ))}
            </div>

            <div className="text-center mt-16">
              {!showAllServices && filteredServices.length > 8 && (
                <button
                  className="border border-blue-600 text-blue-600 px-8 py-3 rounded-md text-lg hover:bg-blue-50 transition-colors"
                  onClick={handleVerMas}
                >
                  Ver Más
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-20 bg-white" id="precios">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h3 className="text-5xl font-bold text-gray-900 mb-6">Planes y Precios</h3>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Barrera de entrada baja para que pruebes nuestro apoyo emocional.<br />
                Escoge el plan que mejor se adapte a tus necesidades.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
              {/* Plan Gratis */}
              <div className="bg-gray-50 rounded-xl p-8 border-2 border-gray-200 hover:border-gray-300 transition-colors">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Gift className="w-8 h-8 text-gray-600" />
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-2">Plan Gratis</h4>
                  <div className="text-3xl font-bold text-gray-600 mb-2">0€</div>
                  <p className="text-sm text-gray-500">Para probar</p>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-sm">3 consultas/mes</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-sm">Respuestas básicas</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-sm">Horario 9h-20h</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">✗</span>
                    <span className="text-sm text-gray-400">Sin ejercicios guiados</span>
                  </li>
                </ul>
                <button className="w-full bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700 transition-colors" onClick={handleEmpezarGratis}>
                  Empezar Gratis
                </button>
              </div>

              {/* Plan Personal */}
              <div className="bg-white rounded-xl p-8 border-2 border-blue-200 hover:border-blue-300 transition-colors shadow-lg">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Heart className="w-8 h-8 text-blue-600" />
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-2">Plan Personal</h4>
                  <div className="text-3xl font-bold text-blue-600 mb-2">4,99€</div>
                  <p className="text-sm text-gray-500">por mes</p>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-sm">Soporte 24/7</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-sm">Consultas ilimitadas</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-sm">Ejercicios guiados</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-sm">Personalidad configurable</span>
                  </li>
                </ul>
                <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors" onClick={() => handlePlanSelection('personal')}>
                  Elegir Personal
                </button>
                <p className="text-xs text-center mt-2 text-gray-500">Menos que un café semanal</p>
              </div>

              {/* Plan Plus - POPULAR */}
              <div className="bg-gradient-to-b from-blue-50 to-white rounded-xl p-8 border-2 border-blue-500 hover:border-blue-600 transition-colors shadow-xl relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">MÁS POPULAR</span>
                </div>
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-2">Plan Plus</h4>
                  <div className="text-3xl font-bold text-blue-600 mb-2">9,99€</div>
                  <p className="text-sm text-gray-500">por mes</p>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-sm">Todo del Plan Personal</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-sm">Historial emocional</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-sm">Revisión semanal</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-sm">Audio motivacional diario</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-sm">Informe mensual PDF</span>
                  </li>
                </ul>
                <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors" onClick={() => handlePlanSelection('plus')}>
                  Elegir Plus
                </button>
              </div>

              {/* Plan Familiar */}
              <div className="bg-white rounded-xl p-8 border-2 border-purple-200 hover:border-purple-300 transition-colors shadow-lg">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-purple-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="w-8 h-8 text-purple-600" />
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-2">Plan Familiar</h4>
                  <div className="text-3xl font-bold text-purple-600 mb-2">14,99€</div>
                  <p className="text-sm text-gray-500">por mes</p>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-sm">Hasta 3 miembros</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-sm">IA separada para cada uno</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-sm">Todo del Plan Plus</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-sm">Ideal parejas/familias</span>
                  </li>
                </ul>
                <button className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors" onClick={() => handlePlanSelection('familiar')}>
                  Elegir Familiar
                </button>
              </div>

              {/* Plan Empresas */}
              <div className="bg-white rounded-xl p-8 border-2 border-orange-200 hover:border-orange-300 transition-colors shadow-lg">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-orange-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Headphones className="w-8 h-8 text-orange-600" />
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-2">Plan Empresas</h4>
                  <div className="text-3xl font-bold text-orange-600 mb-2">49€+</div>
                  <p className="text-sm text-gray-500">por mes</p>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-sm">Equipos completos</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-sm">Dashboard admin</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-sm">Salud mental empresarial</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-sm">Soporte dedicado</span>
                  </li>
                </ul>
                <button className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 transition-colors" onClick={() => handlePlanSelection('empresas')}>
                  Contactar
                </button>
              </div>
            </div>

            {/* Extras */}
            <div className="mt-16 text-center">
              <h4 className="text-2xl font-bold text-gray-900 mb-8">Extras Disponibles</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <Gift className="w-6 h-6 text-blue-600" />
                  </div>
                  <h5 className="text-lg font-semibold mb-2">Ejercicios Premium</h5>
                  <p className="text-sm text-gray-600 mb-4">Experiencias guiadas especializadas</p>
                  <div className="text-xl font-bold text-blue-600">1,99€ c/u</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <Lightbulb className="w-6 h-6 text-purple-600" />
                  </div>
                  <h5 className="text-lg font-semibold mb-2">Modo Filosófico</h5>
                  <p className="text-sm text-gray-600 mb-4">Perspectiva más profunda y reflexiva</p>
                  <div className="text-xl font-bold text-blue-600">0,99€</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="w-12 h-12 bg-amber-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-amber-600" />
                  </div>
                  <h5 className="text-lg font-semibold mb-2">Modo Espiritual</h5>
                  <p className="text-sm text-gray-600 mb-4">Enfoque más espiritual y trascendente</p>
                  <div className="text-xl font-bold text-blue-600">0,99€</div>
                </div>
              </div>
            </div>

            {/* Ver precios detallados */}
            <div className="text-center mt-12">
              <Link href="/pricing" className="inline-flex items-center space-x-2 bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                <span>Ver Precios Detallados</span>
              </Link>
            </div>

            {/* Payment Methods */}
            <div className="mt-16 text-center bg-gray-50 rounded-xl p-8">
              <h4 className="text-xl font-bold text-gray-900 mb-6">Métodos de Pago Seguros</h4>
              <div className="flex justify-center items-center space-x-8 flex-wrap gap-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">S</span>
                  </div>
                  <span className="text-sm font-medium">Stripe</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">G</span>
                  </div>
                  <span className="text-sm font-medium">Gumroad</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-blue-800 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">PP</span>
                  </div>
                  <span className="text-sm font-medium">PayPal</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-4">
                💡 <strong>Nota:</strong> El 70% de las personas no buscan ayuda hasta que la necesitan.<br />
                Prueba gratis y descubre cómo MENTALIA puede acompañarte.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h3 className="text-5xl font-bold text-white mb-10">
              Entonces, ¿te interesa empezar?
            </h3>
            <button className="bg-white text-blue-600 px-10 py-4 rounded-md text-xl font-medium hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2 mx-auto" onClick={handleEmpezarWhatsApp}>
              <Smartphone className="w-6 h-6" />
              <span>Chatea ahora</span>
            </button>
          </div>
        </section>
      </main>

      {/* Footer - Sticky bottom */}
      <Footer />
    </div>
  );
}
