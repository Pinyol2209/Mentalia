import Link from 'next/link'
import { Twitter, Instagram, Linkedin, Github } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-50 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Contenedor principal con border radius */}
        <div className="bg-white rounded-3xl p-16 shadow-sm border border-gray-100 relative overflow-hidden">
          
          {/* Contenido principal */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-20">
            
            {/* Columna 1 - Descripción (más ancha) */}
            <div className="md:col-span-5">
              <p className="text-gray-600 text-lg leading-relaxed mb-10">
                MENTALIA ofrece apoyo emocional 24/7 por WhatsApp — 
                haciendo que el bienestar mental sea más accesible, comprensible y efectivo.
              </p>
              
              {/* Redes sociales */}
              <div className="flex space-x-6">
                <Link 
                  href="https://twitter.com" 
                  className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <Twitter className="w-6 h-6 text-gray-600" />
                </Link>
                <Link 
                  href="https://instagram.com" 
                  className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <Instagram className="w-6 h-6 text-gray-600" />
                </Link>
                <Link 
                  href="https://linkedin.com" 
                  className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <Linkedin className="w-6 h-6 text-gray-600" />
                </Link>
                <Link 
                  href="https://github.com" 
                  className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <Github className="w-6 h-6 text-gray-600" />
                </Link>
              </div>
            </div>

            {/* Columna 2 - Producto */}
            <div className="md:col-span-2">
              <h3 className="text-xl font-semibold text-gray-900 mb-8">Producto</h3>
              <ul className="space-y-5">
                <li>
                  <Link href="/servicios" className="text-gray-600 hover:text-gray-900 transition-colors text-lg">
                    Servicios
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="text-gray-600 hover:text-gray-900 transition-colors text-lg">
                    Precios
                  </Link>
                </li>
                <li>
                  <Link href="/como-funciona" className="text-gray-600 hover:text-gray-900 transition-colors text-lg">
                    ¿Cómo funciona?
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors text-lg">
                    Novedades
                  </Link>
                </li>
              </ul>
            </div>

            {/* Columna 3 - Recursos */}
            <div className="md:col-span-2">
              <h3 className="text-xl font-semibold text-gray-900 mb-8">Recursos</h3>
              <ul className="space-y-5">
                <li>
                  <Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors text-lg">
                    Documentación
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors text-lg">
                    Tutoriales
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors text-lg">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/contacto" className="text-gray-600 hover:text-gray-900 transition-colors text-lg">
                    Soporte
                  </Link>
                </li>
              </ul>
            </div>

            {/* Columna 4 - Empresa */}
            <div className="md:col-span-3">
              <h3 className="text-xl font-semibold text-gray-900 mb-8">Empresa</h3>
              <ul className="space-y-5">
                <li>
                  <Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors text-lg">
                    Acerca de
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors text-lg">
                    Carreras
                  </Link>
                </li>
                <li>
                  <Link href="/contacto" className="text-gray-600 hover:text-gray-900 transition-colors text-lg">
                    Contacto
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors text-lg">
                    Socios
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Línea separadora y copyright */}
          <div className="border-t border-gray-200 pt-10">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-6 sm:space-y-0">
              <p className="text-gray-500 text-base">
                © 2025 MENTALIA. All rights reserved.
              </p>
              <div className="flex flex-wrap gap-8 text-base">
                <Link href="#" className="text-gray-500 hover:text-gray-700 transition-colors">
                  Política de Privacidad
                </Link>
                <Link href="#" className="text-gray-500 hover:text-gray-700 transition-colors">
                  Términos de Servicio
                </Link>
                <Link href="#" className="text-gray-500 hover:text-gray-700 transition-colors">
                  Configuración de Cookies
                </Link>
              </div>
            </div>
          </div>

          {/* MENTALIA cortado por la mitad en la parte inferior */}
          <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2">
            <div className="text-9xl font-bold text-gray-100 select-none pointer-events-none">
              MENTALIA
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 