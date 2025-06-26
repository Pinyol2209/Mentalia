import Link from 'next/link'
import { Twitter, Instagram, Linkedin, Github } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900">MENTALIA</h3>
            </div>
            <p className="text-gray-600 text-sm mb-6 max-w-xs">
              MENTALIA ofrece apoyo emocional 24/7 por WhatsApp — 
              haciendo que el bienestar mental sea más accesible, comprensible y efectivo.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Product Column */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">Producto</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/servicios" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Servicios
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Precios
                </Link>
              </li>
              <li>
                <Link href="/como-funciona" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  ¿Cómo funciona?
                </Link>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Novedades
                </a>
              </li>
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">Recursos</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Documentación
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Tutoriales
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <Link href="/contacto" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Soporte
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">Empresa</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Acerca de
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Carreras
                </a>
              </li>
              <li>
                <Link href="/contacto" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Contacto
                </Link>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Socios
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-8 mt-8 border-t border-gray-100">
          <p className="text-sm text-gray-500 mb-4 sm:mb-0">
            © 2025 MENTALIA. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
              Política de Privacidad
            </a>
            <a href="#" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
              Términos de Servicio
            </a>
            <a href="#" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
              Configuración de Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
} 