import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300 border-t border-gray-700">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-10">
          {/* Company Info */}
          <div>
            <h3 className="text-3xl font-extrabold bg-gradient-to-r from-primary-400 to-primary-500 bg-clip-text text-transparent mb-4">Bagco</h3>
            <p className="mb-4 leading-relaxed text-gray-400">
              Custom printed bags, pharmacy bags, dispensary bags, and more. 
              Based in Indian Trail, NC. Quality paper bags for your business.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6 text-lg">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="hover:text-white transition-colors text-gray-400 hover:text-primary-400">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors text-gray-400 hover:text-primary-400">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/catalog" className="hover:text-white transition-colors text-gray-400 hover:text-primary-400">
                  Catalog
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-white transition-colors text-gray-400 hover:text-primary-400">
                  Gallery
                </Link>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-white font-bold mb-6 text-lg">Collections</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/catalog/pharmacy" className="hover:text-white transition-colors text-gray-400 hover:text-primary-400">
                  Pharmacy Bags
                </Link>
              </li>
              <li>
                <Link href="/catalog/veterinary" className="hover:text-white transition-colors text-gray-400 hover:text-primary-400">
                  Veterinary Bags
                </Link>
              </li>
              <li>
                <Link href="/catalog/custom" className="hover:text-white transition-colors text-gray-400 hover:text-primary-400">
                  Custom Gallery
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-6 text-lg">Contact</h4>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-start">
                <svg className="w-5 h-5 mr-2 mt-0.5 text-primary-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>info@bagco.com</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 mr-2 mt-0.5 text-primary-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+12525161944" className="hover:text-primary-400 transition-colors">(252) 516-1944</a>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 mr-2 mt-0.5 text-primary-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>912 Houston Drive<br />Monroe, NC 28110</span>
              </li>
              <li className="pt-4">
                <Link 
                  href="/contact" 
                  className="inline-block bg-gradient-to-r from-primary-600 to-primary-700 text-white px-6 py-3 rounded-xl font-semibold hover:from-primary-700 hover:to-primary-800 transition-all shadow-lg hover:shadow-xl"
                >
                  Get Quote
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 text-center">
          <p className="text-gray-500">&copy; {new Date().getFullYear()} Bagco. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
