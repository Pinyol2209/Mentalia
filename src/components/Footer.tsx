import Link from 'next/link'
import { Twitter, Instagram, Linkedin, Github } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Contenedor principal con border radius */}
        <div className="bg-white rounded-3xl p-12 shadow-sm border border-gray-100 relative overflow-hidden">
          
          {/* Contenido principal */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            
            {/* Columna 1 - Descripción */}
            <div>
              <p className="text-gray-600 text-base leading-relaxed mb-8">
                MENTALIA ofrece apoyo emocional 24/7 por WhatsApp — 
                haciendo que el bienestar mental sea más accesible, comprensible y efectivo.
              </p>
              
              {/* Redes sociales */}
              <div className="flex space-x-4">
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
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Producto</h3>
              <ul className="space-y-4">
                <li>
                  <Link href="/servicios" className="text-gray-600 hover:text-gray-900 transition-colors">
                    Servicios
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="text-gray-600 hover:text-gray-900 transition-colors">
                    Precios
                  </Link>
                </li>
                <li>
                  <Link href="/como-funciona" className="text-gray-600 hover:text-gray-900 transition-colors">
                    ¿Cómo funciona?
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                    Novedades
                  </Link>
                </li>
              </ul>
            </div>

            {/* Columna 3 - Recursos y Empresa */}
            <div className="space-y-8">
              {/* Recursos */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Recursos</h3>
                <ul className="space-y-4">
                  <li>
                    <Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                      Documentación
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                      Tutoriales
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link href="/contacto" className="text-gray-600 hover:text-gray-900 transition-colors">
                      Soporte
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Empresa */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Empresa</h3>
                <ul className="space-y-4">
                  <li>
                    <Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                      Acerca de
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                      Carreras
                    </Link>
                  </li>
                  <li>
                    <Link href="/contacto" className="text-gray-600 hover:text-gray-900 transition-colors">
                      Contacto
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                      Socios
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Línea separadora y copyright */}
          <div className="border-t border-gray-200 pt-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
              <p className="text-gray-500 text-sm">
                © 2025 MENTALIA. All rights reserved.
              </p>
              <div className="flex space-x-6 text-sm">
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
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="text-8xl font-bold text-gray-100 select-none pointer-events-none">
              MENTALIA
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 