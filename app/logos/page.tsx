'use client';

import { motion } from 'framer-motion';
import LogoHexagonFlow from '../components/logos/LogoHexagonFlow';

export default function LogosShowcase() {

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Logo */}
      <section className="relative h-screen">
        <LogoHexagonFlow />

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <svg
            className="w-6 h-6 text-white/60"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </section>

      {/* Content Section */}
      <section className="relative bg-white py-24 px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6">
              Innowacyjne Rozwiązania
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Dostarczamy nowoczesne rozwiązania technologiczne, które przekształcają Twój biznes
              i prowadzą do sukcesu w erze cyfrowej.
            </p>
          </motion.div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-12 mb-24">
            {[
              {
                title: 'Technologia',
                description:
                  'Wykorzystujemy najnowsze technologie i narzędzia, aby dostarczać rozwiązania na najwyższym poziomie.',
              },
              {
                title: 'Innowacja',
                description:
                  'Ciągle poszukujemy nowych sposobów rozwiązywania problemów i ulepszania procesów biznesowych.',
              },
              {
                title: 'Jakość',
                description:
                  'Każdy projekt realizujemy z najwyższą starannością, dbając o każdy szczegół i satysfakcję klienta.',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="p-8 border border-slate-200 hover:border-slate-300 transition-colors"
              >
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          {/* About Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-24"
          >
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-bold text-slate-900 mb-6">O Nas</h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Jesteśmy firmą specjalizującą się w tworzeniu zaawansowanych rozwiązań IT.
                  Od ponad 15 lat pomagamy firmom w transformacji cyfrowej i osiąganiu celów biznesowych
                  poprzez innowacyjne technologie.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  Nasz zespół ekspertów łączy pasję do technologii z głębokim zrozumieniem potrzeb biznesowych.
                  Realizujemy projekty od etapu planowania po wdrożenie i wsparcie.
                </p>
              </div>
              <div className="space-y-6">
                {[
                  { label: 'Doświadczenie', value: '15+ lat' },
                  { label: 'Projekty', value: '500+' },
                  { label: 'Klienci', value: '200+' },
                  { label: 'Zespół', value: '50+ osób' },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex justify-between items-center p-6 border-l-4 border-slate-900 bg-slate-50"
                  >
                    <span className="text-slate-600 font-medium">{stat.label}</span>
                    <span className="text-2xl font-bold text-slate-900">{stat.value}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Services Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-24"
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-12 text-center">Usługi</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: 'Rozwój Oprogramowania',
                  description:
                    'Tworzymy dedykowane aplikacje webowe i mobilne dostosowane do unikalnych potrzeb Twojej firmy.',
                },
                {
                  title: 'Konsultacje IT',
                  description:
                    'Doradztwo strategiczne w zakresie wyboru technologii i optymalizacji procesów IT.',
                },
                {
                  title: 'Infrastruktura Cloud',
                  description:
                    'Migracja do chmury i zarządzanie infrastrukturą cloudową dla maksymalnej wydajności.',
                },
                {
                  title: 'Bezpieczeństwo',
                  description:
                    'Kompleksowe rozwiązania zabezpieczeń IT chroniące Twoje dane i systemy przed zagrożeniami.',
                },
              ].map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="p-8 bg-slate-50 hover:bg-slate-100 transition-colors"
                >
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">{service.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{service.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center py-16 bg-slate-900 text-white -mx-8 px-8"
          >
            <h2 className="text-4xl font-bold mb-6">Skontaktuj się z nami</h2>
            <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
              Gotowy na transformację cyfrową? Porozmawiajmy o Twoim projekcie i poznajmy możliwości
              współpracy. Nasz zespół jest tutaj, aby pomóc.
            </p>
            <button className="px-8 py-4 bg-white text-slate-900 font-semibold hover:bg-slate-100 transition-colors">
              Skontaktuj się
            </button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 px-8">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-slate-400">© 2025 PCS. Wszelkie prawa zastrzeżone.</p>
        </div>
      </footer>
    </div>
  );
}
