import Link from 'next/link'

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 py-28 md:py-40 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-extrabold mb-6 tracking-tight">
              Bagco
            </h1>
            <p className="text-2xl md:text-3xl mb-4 text-primary-100 font-light">
              Paper Bags Made to Order
            </p>
            <p className="text-lg md:text-xl mb-10 text-primary-200 max-w-2xl mx-auto">
              Custom printed bags, pharmacy bags, dispensary bags, and more. 
              Work with our in-house designers or use your existing branding.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/catalog" 
                className="bg-white text-primary-700 px-10 py-4 rounded-xl font-semibold hover:bg-primary-50 transition-all shadow-xl hover:shadow-2xl hover:scale-105 transform duration-300"
              >
                View Catalog
              </Link>
              <Link 
                href="/contact" 
                className="bg-primary-500 text-white px-10 py-4 rounded-xl font-semibold hover:bg-primary-400 transition-all shadow-xl hover:shadow-2xl hover:scale-105 transform duration-300 border-2 border-white/30"
              >
                Get Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800">Custom Printed Bags</h3>
              <p className="text-gray-600 leading-relaxed">Work with our in-house designers to create the perfect bag for your business. We work with your existing logo and branding.</p>
            </div>
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800">Pharmacy & More</h3>
              <p className="text-gray-600 leading-relaxed">Pharmacy bags, dispensary bags, veterinary bags, winery bags, holiday and pride bags.</p>
            </div>
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 002 2h2.945m-2.945 0a2 2 0 00-2 2v1a2 2 0 002 2h8a2 2 0 002-2v-1a2 2 0 00-2-2m-2.945 0H21a2 2 0 002-2V9a2 2 0 00-2-2h-2.945m-2.945 0a2 2 0 01-2-2V4a2 2 0 012-2h2.945M21 11V9a2 2 0 00-2-2h-2.945" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800">Based in North Carolina</h3>
              <p className="text-gray-600 leading-relaxed">Serving businesses from Indian Trail, NC. Quality paper bags and packaging you can count on.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">Ready to Get Started?</h2>
          <p className="text-xl md:text-2xl mb-10 text-primary-100 max-w-2xl mx-auto">Contact us today for a custom quote on your paper bag needs.</p>
          <Link 
            href="/contact" 
            className="bg-white text-primary-700 px-10 py-5 rounded-xl font-bold text-lg hover:bg-primary-50 transition-all shadow-2xl hover:shadow-3xl hover:scale-105 transform duration-300 inline-block"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  )
}
