'use client';

import Link from "next/link";
import { useState } from "react";
import { 
  ArrowLeft,
  Send,
  Mail,
  Smartphone,
  Clock,
  MessageCircle
} from "lucide-react";

export default function ContactoPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    try {
      // Here you would typically send the data to your backend
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // For now, we'll open WhatsApp with the message
      const whatsappMessage = `Hola, me gustaría contactar con MENTALIA.
      
Nombre: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Teléfono: ${formData.phone}
Mensaje: ${formData.message}`;
      
      window.open(`https://wa.me/34600000000?text=${encodeURIComponent(whatsappMessage)}`, '_blank');
      
      setSubmitStatus('success');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: ''
      });
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppDirect = () => {
    window.open('https://wa.me/34600000000?text=Hola%2C%20me%20gustaría%20contactar%20con%20MENTALIA', '_blank');
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

      {/* Main Contact Section */}
      <div className="min-h-screen flex">
        {/* Left Side - Dark */}
        <div className="flex-1 bg-gray-900 flex items-center justify-center relative overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-20 w-32 h-32 border-2 border-blue-400 rounded-full opacity-20"></div>
            <div className="absolute top-40 left-40 w-24 h-24 border border-blue-300 border-dashed rounded-full opacity-30"></div>
            <div className="absolute bottom-32 left-32 w-40 h-40 border-2 border-blue-500 rounded-full opacity-15"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-blue-400 border-dashed rounded-full opacity-10"></div>
            <div className="absolute bottom-20 right-20 w-28 h-28 border-2 border-blue-300 rounded-full opacity-25"></div>
          </div>
          
          <div className="relative z-10 text-center px-8">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-8 leading-tight">
              Nos encantaría
              <br />
              escucharte
            </h2>
            <p className="text-xl text-blue-200 mb-12 max-w-md mx-auto">
              Estamos aquí para apoyarte en tu viaje hacia el bienestar emocional
            </p>
            
            {/* Quick Contact Info */}
            <div className="space-y-6 text-left max-w-sm mx-auto">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                  <Smartphone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-white font-medium">WhatsApp</p>
                  <p className="text-blue-200">+34 600 000 000</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-white font-medium">Email</p>
                  <p className="text-blue-200">hola@mentalia.es</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-white font-medium">Disponibilidad</p>
                  <p className="text-blue-200">24/7 vía WhatsApp</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Contact Form */}
        <div className="flex-1 bg-white flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Contáctanos</h3>
              <p className="text-lg text-gray-600">
                Completa el formulario y nos pondremos en contacto contigo lo antes posible.
              </p>
            </div>

            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-800">¡Mensaje enviado correctamente! Te contactaremos pronto.</p>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800">Error al enviar el mensaje. Inténtalo de nuevo.</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-lg font-medium text-gray-700 mb-2">
                    NOMBRE
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="Introduce tu nombre"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-lg"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-lg font-medium text-gray-700 mb-2">
                    APELLIDOS
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Introduce tus apellidos"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-lg"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-lg font-medium text-gray-700 mb-2">
                  EMAIL
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Introduce tu email"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-lg"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-lg font-medium text-gray-700 mb-2">
                  TELÉFONO
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Introduce tu número de teléfono"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-lg"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-lg font-medium text-gray-700 mb-2">
                  MENSAJE
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Cuéntanos cómo podemos ayudarte..."
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none text-lg"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <span>Enviando...</span>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Enviar mensaje</span>
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 pt-8 border-t border-gray-200">
              <p className="text-lg text-gray-600 mb-4">
                <strong>CONTACTO DIRECTO</strong>
                <br />
                Para una respuesta más rápida, contáctanos directamente:
              </p>
              <button
                onClick={handleWhatsAppDirect}
                className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center space-x-2 text-lg"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Escribir por WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Info Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Otras formas de contactarnos</h2>
            <p className="text-xl text-gray-600">Estamos aquí para ayudarte de la manera que prefieras</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 text-center shadow-sm border border-gray-200">
              <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                <MessageCircle className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">WhatsApp</h3>
              <p className="text-lg text-gray-600 mb-4">
                La forma más rápida de obtener ayuda inmediata
              </p>
              <p className="text-blue-600 font-medium text-lg">+34 600 000 000</p>
            </div>

            <div className="bg-white rounded-xl p-8 text-center shadow-sm border border-gray-200">
              <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                <Mail className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Email</h3>
              <p className="text-lg text-gray-600 mb-4">
                Para consultas más detalladas o colaboraciones
              </p>
              <p className="text-green-600 font-medium text-lg">hola@mentalia.es</p>
            </div>

            <div className="bg-white rounded-xl p-8 text-center shadow-sm border border-gray-200">
              <div className="w-16 h-16 bg-purple-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                <Clock className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Horarios</h3>
              <p className="text-lg text-gray-600 mb-4">
                IA disponible 24/7 - Soporte humano L-V 9:00-18:00
              </p>
              <p className="text-purple-600 font-medium text-lg">Zona horaria CET</p>
            </div>
          </div>
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
                <li><Link href="/contacto" className="hover:text-white">Contacto</Link></li>
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