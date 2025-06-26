'use client'

import Link from 'next/link'
import Image from 'next/image'
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
  Check
} from "lucide-react";
import Footer from '@/components/Footer'
import { getStripe } from '../../lib/stripe'

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [showAllServices, setShowAllServices] = useState(false);
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('yearly');
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

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
    // Redirect to WhatsApp for free plan
    window.open('https://wa.me/34600000000?text=Hola%2C%20me%20interesa%20empezar%20con%20el%20plan%20gratuito%20de%20MENTALIA', '_blank');
  };

  const handleEmpezarWhatsApp = () => {
    window.open('https://wa.me/34600000000?text=Hola%2C%20quiero%20empezar%20con%20MENTALIA', '_blank');
  };

  // Función para manejar el pago con Stripe
  const handleStripeCheckout = async (planType: string) => {
    if (planType === 'gratis') {
      handleEmpezarGratis();
      return;
    }

    setLoadingPlan(planType);

    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          planType,
          billingPeriod,
        }),
      });

      const { sessionId } = await response.json();

      if (sessionId) {
        const stripe = await getStripe();
        await stripe?.redirectToCheckout({ sessionId });
      } else {
        throw new Error('No se pudo crear la sesión de pago');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Hubo un error al procesar el pago. Por favor, inténtalo de nuevo.');
    } finally {
      setLoadingPlan(null);
    }
  };

  // Precios según el período de facturación
  const getPricing = (planType: string) => {
    const prices = {
      personal: { monthly: 4.99, yearly: 59.88 },
      plus: { monthly: 9.99, yearly: 119.88 },
      familiar: { monthly: 14.99, yearly: 179.88 },
      empresas: { monthly: 49.00, yearly: 588.00 },
    };

    return prices[planType as keyof typeof prices]?.[billingPeriod] || 0;
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
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left content */}
              <div className="text-center lg:text-left">
                <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight">
                  Cuida tu bienestar emocional,<br />
                  MENTALIA es tu apoyo<br />
                  las 24 horas
                </h2>
                <p className="text-2xl text-gray-600 mb-10 max-w-2xl">
                  Conversa, reflexiona y encuentra equilibrio sin preocupaciones con tu asistente de bienestar emocional
                </p>
                <button className="bg-blue-600 text-white px-10 py-4 rounded-md text-xl font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 mx-auto lg:mx-0" onClick={handleEmpezarWhatsApp}>
                  <Smartphone className="w-6 h-6" />
                  <span>Empezar en WhatsApp</span>
                </button>
              </div>
              
              {/* Right image */}
              <div className="flex justify-center lg:justify-end">
                <div className="relative">
                  <Image 
                    src="/image1.png" 
                    alt="MENTALIA - Bienestar emocional" 
                    width={512}
                    height={512}
                    className="w-full max-w-lg h-auto rounded-2xl shadow-2xl"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Image Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative h-96 rounded-2xl overflow-hidden">
              <Image 
                src="/imagen2.jpg" 
                alt="MENTALIA - Bienestar emocional 24/7" 
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
              />
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
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
                Recibe apoyo emocional ilimitado cuando pagas anualmente, y ahorra en tu plan.
              </p>

              {/* Toggle Monthly/Annual */}
              <div className="inline-flex items-center bg-gray-100 rounded-lg p-1 mb-16">
                <button 
                  className={`px-6 py-2 text-lg font-medium rounded-md transition-colors ${
                    billingPeriod === 'monthly' 
                      ? 'text-white bg-blue-600' 
                      : 'text-gray-700'
                  }`}
                  onClick={() => setBillingPeriod('monthly')}
                >
                  Mensual
                </button>
                <button 
                  className={`px-6 py-2 text-lg font-medium rounded-md transition-colors ${
                    billingPeriod === 'yearly' 
                      ? 'text-white bg-blue-600' 
                      : 'text-gray-700'
                  }`}
                  onClick={() => setBillingPeriod('yearly')}
                >
                  Anual
                </button>
                {billingPeriod === 'yearly' && (
                  <span className="ml-3 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    Ahorra 36%
                  </span>
                )}
              </div>
            </div>

            {/* Main Pricing Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              
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
                
                <button className="w-full bg-white border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-50 transition-colors" onClick={handleEmpezarGratis}>
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
                    <span className="text-5xl font-bold text-gray-900">
                      €{getPricing('personal')}
                    </span>
                    {billingPeriod === 'yearly' && (
                      <span className="text-gray-600 ml-2">/año</span>
                    )}
                    {billingPeriod === 'monthly' && (
                      <span className="text-gray-600 ml-2">/mes</span>
                    )}
                  </div>
                  <p className="text-gray-600 text-lg">
                    {billingPeriod === 'yearly' 
                      ? 'Equivale a €4.99/mes, facturado anualmente' 
                      : 'Por usuario/mes, facturado mensualmente'
                    }
                  </p>
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
                
                <button 
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center" 
                  onClick={() => handleStripeCheckout('personal')}
                  disabled={loadingPlan === 'personal'}
                >
                  {loadingPlan === 'personal' ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Procesando...
                    </>
                  ) : (
                    'Empezar con Personal'
                  )}
                </button>
              </div>

              {/* Plan Plus */}
              <div className="bg-gray-900 text-white rounded-2xl p-8 hover:shadow-lg transition-shadow">
                <div className="mb-8">
                  <h3 className="text-2xl font-semibold text-white mb-2">Plus</h3>
                  <div className="flex items-baseline mb-4">
                    <span className="text-5xl font-bold text-white">
                      €{getPricing('plus')}
                    </span>
                    {billingPeriod === 'yearly' && (
                      <span className="text-gray-300 ml-2">/año</span>
                    )}
                    {billingPeriod === 'monthly' && (
                      <span className="text-gray-300 ml-2">/mes</span>
                    )}
                  </div>
                  <p className="text-gray-300 text-lg">
                    {billingPeriod === 'yearly' 
                      ? 'Equivale a €9.99/mes, facturado anualmente' 
                      : 'Por usuario/mes, facturado mensualmente'
                    }
                  </p>
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
                
                <button 
                  className="w-full bg-white text-gray-900 py-3 px-6 rounded-lg font-medium hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center" 
                  onClick={() => handleStripeCheckout('plus')}
                  disabled={loadingPlan === 'plus'}
                >
                  {loadingPlan === 'plus' ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900 mr-2"></div>
                      Procesando...
                    </>
                  ) : (
                    'Empezar con Plus'
                  )}
                </button>
              </div>
            </div>

            {/* Planes adicionales */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {/* Plan Familiar */}
              <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-shadow">
                <div className="mb-6">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">Familiar</h3>
                  <div className="flex items-baseline mb-4">
                    <span className="text-4xl font-bold text-purple-600">
                      €{getPricing('familiar')}
                    </span>
                    {billingPeriod === 'yearly' && (
                      <span className="text-gray-600 ml-2">/año</span>
                    )}
                    {billingPeriod === 'monthly' && (
                      <span className="text-gray-600 ml-2">/mes</span>
                    )}
                  </div>
                  <p className="text-gray-600 text-lg">
                    {billingPeriod === 'yearly' 
                      ? 'Hasta 3 miembros, equivale a €14.99/mes' 
                      : 'Hasta 3 miembros de la familia'
                    }
                  </p>
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
                
                <button 
                  className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center" 
                  onClick={() => handleStripeCheckout('familiar')}
                  disabled={loadingPlan === 'familiar'}
                >
                  {loadingPlan === 'familiar' ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Procesando...
                    </>
                  ) : (
                    'Elegir Familiar'
                  )}
                </button>
              </div>

              {/* Plan Empresas */}
              <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-shadow">
                <div className="mb-6">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">Empresas</h3>
                  <div className="flex items-baseline mb-4">
                    <span className="text-4xl font-bold text-orange-600">
                      €{getPricing('empresas')}
                    </span>
                    {billingPeriod === 'yearly' && (
                      <span className="text-gray-600 ml-2">/año</span>
                    )}
                    {billingPeriod === 'monthly' && (
                      <span className="text-gray-600 ml-2">/mes</span>
                    )}
                  </div>
                  <p className="text-gray-600 text-lg">
                    {billingPeriod === 'yearly' 
                      ? 'Para equipos y organizaciones, facturado anualmente' 
                      : 'Para equipos y organizaciones'
                    }
                  </p>
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
                
                <button 
                  className="w-full bg-orange-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center" 
                  onClick={() => handleStripeCheckout('empresas')}
                  disabled={loadingPlan === 'empresas'}
                >
                  {loadingPlan === 'empresas' ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Procesando...
                    </>
                  ) : (
                    'Contactar Ventas'
                  )}
                </button>
              </div>
            </div>

            {/* Complementos Disponibles */}
            <div className="mb-16">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Complementos Disponibles</h2>
                <p className="text-xl text-gray-600">Mejora tu experiencia con contenido premium</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white rounded-xl p-6 text-center border border-gray-200">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <Gift className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Ejercicios Premium</h3>
                  <p className="text-gray-600 text-lg mb-4">Técnicas avanzadas y experiencias guiadas especializadas</p>
                  <div className="text-2xl font-bold text-blue-600 mb-2">1,99€</div>
                  <p className="text-xs text-gray-500">por ejercicio</p>
                </div>
                
                <div className="bg-white rounded-xl p-6 text-center border border-gray-200">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <Lightbulb className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Modo Filosófico</h3>
                  <p className="text-gray-600 text-lg mb-4">Perspectiva más profunda y reflexiva para tus inquietudes</p>
                  <div className="text-2xl font-bold text-purple-600 mb-2">0,99€</div>
                  <p className="text-xs text-gray-500">compra única</p>
                </div>
                
                <div className="bg-white rounded-xl p-6 text-center border border-gray-200">
                  <div className="w-12 h-12 bg-amber-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-amber-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Modo Espiritual</h3>
                  <p className="text-gray-600 text-lg mb-4">Enfoque espiritual y trascendente para tu crecimiento personal</p>
                  <div className="text-2xl font-bold text-amber-600 mb-2">0,99€</div>
                  <p className="text-xs text-gray-500">compra única</p>
                </div>
              </div>
            </div>

            {/* Ver precios detallados */}
            <div className="text-center mb-16">
              <Link href="/pricing" className="inline-flex items-center space-x-2 bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                <span>Ver Precios Detallados</span>
              </Link>
            </div>

            {/* Payment Methods */}
            <div className="text-center bg-gray-50 rounded-xl p-8 mb-16">
              <h4 className="text-xl font-bold text-gray-900 mb-6">Métodos de Pago Seguros</h4>
              <div className="flex justify-center items-center space-x-8 flex-wrap gap-4 mb-6">
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
              
              <div className="bg-blue-50 rounded-xl p-6 text-left max-w-2xl mx-auto">
                <div className="flex items-start space-x-3">
                  <Brain className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
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
