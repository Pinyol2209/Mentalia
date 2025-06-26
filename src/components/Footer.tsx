import Link from 'next/link'
import { Twitter, Instagram, Linkedin, Github } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-50 py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Contenedor principal con border radius y más sombra */}
        <div className="bg-white rounded-3xl p-16 shadow-xl border border-gray-100 relative">
          
          {/* Contenido principal */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-20">
            
            {/* Columna 1 - Descripción (más ancha) */}
            <div className="md:col-span-5">
              <p className="text-gray-600 text-base leading-relaxed mb-10">
                MENTALIA ofrece apoyo emocional 24/7 por WhatsApp — 
                haciendo que el bienestar mental sea más accesible, comprensible y efectivo.
              </p>
              
              {/* Redes sociales */}
              <div className="flex space-x-6">
                <Link 
                  href="https://twitter.com" 
                  className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <Twitter className="w-5 h-5 text-gray-600" />
                </Link>
                <Link 
                  href="https://instagram.com" 
                  className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <Instagram className="w-5 h-5 text-gray-600" />
                </Link>
                <Link 
                  href="https://linkedin.com" 
                  className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <Linkedin className="w-5 h-5 text-gray-600" />
                </Link>
                <Link 
                  href="https://github.com" 
                  className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <Github className="w-5 h-5 text-gray-600" />
                </Link>
              </div>
            </div>

            {/* Columna 2 - Producto */}
            <div className="md:col-span-2">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Producto</h3>
              <ul className="space-y-4">
                <li>
                  <Link href="/servicios" className="text-gray-600 hover:text-gray-900 transition-colors text-base">
                    Servicios
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="text-gray-600 hover:text-gray-900 transition-colors text-base">
                    Precios
                  </Link>
                </li>
                <li>
                  <Link href="/como-funciona" className="text-gray-600 hover:text-gray-900 transition-colors text-base">
                    ¿Cómo funciona?
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors text-base">
                    Novedades
                  </Link>
                </li>
              </ul>
            </div>

            {/* Columna 3 - Recursos */}
            <div className="md:col-span-2">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Recursos</h3>
              <ul className="space-y-4">
                <li>
                  <Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors text-base">
                    Documentación
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors text-base">
                    Tutoriales
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors text-base">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/contacto" className="text-gray-600 hover:text-gray-900 transition-colors text-base">
                    Soporte
                  </Link>
                </li>
              </ul>
            </div>

            {/* Columna 4 - Empresa */}
            <div className="md:col-span-3">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Empresa</h3>
              <ul className="space-y-4">
                <li>
                  <Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors text-base">
                    Acerca de
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors text-base">
                    Carreras
                  </Link>
                </li>
                <li>
                  <Link href="/contacto" className="text-gray-600 hover:text-gray-900 transition-colors text-base">
                    Contacto
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors text-base">
                    Socios
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Línea separadora y copyright */}
          <div className="border-t border-gray-200 pt-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
              <p className="text-gray-500 text-sm">
                © 2025 MENTALIA. All rights reserved.
              </p>
              <div className="flex flex-wrap gap-6 text-sm">
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
        </div>

        {/* MENTALIA cortado por la mitad - FUERA del contenedor */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 pointer-events-none">
          <div className="text-6xl font-bold text-gray-200 select-none">
            MENTALIA
          </div>
        </div>
      </div>
    </footer>
  );
} 