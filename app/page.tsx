'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Home() {
  // Generate hexagon vertices (6 corners)
  const hexPoints = [...Array(6)].map((_, i) => {
    const angle = (Math.PI / 3) * i - Math.PI / 2;
    return {
      x: Math.cos(angle) * 200,
      y: Math.sin(angle) * 200,
    };
  });

  // Generate hexagon edges (6 segments connecting vertices)
  const hexEdges = hexPoints.map((point, i) => {
    const nextPoint = hexPoints[(i + 1) % hexPoints.length];
    return {
      id: i,
      start: point,
      end: nextPoint,
      length: Math.hypot(nextPoint.x - point.x, nextPoint.y - point.y),
    };
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Hexagon Logo */}
      <section className="relative h-screen">
        <div className="relative w-full h-screen flex items-center justify-center bg-black overflow-hidden">
          {/* Grid background */}
          <div className="absolute inset-0 opacity-20">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path
                    d="M 40 0 L 0 0 0 40"
                    fill="none"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="1"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          {/* Central content container */}
          <div className="relative w-full h-full flex items-center justify-center">
            {/* SVG definitions */}
            <svg width="0" height="0">
              <defs>
                {/* Glow filter */}
                <filter id="glow">
                  <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

                {/* Stronger glow filter for traveling lights */}
                <filter id="strongGlow">
                  <feGaussianBlur stdDeviation="8" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

                {/* Gradients for hexagon edge traveling lights */}
                {[1, 1.3, 1.6].map((scale, layerIndex) =>
                  hexEdges.map(edge => (
                    <linearGradient
                      key={`hex-gradient-${layerIndex}-${edge.id}`}
                      id={`hexGradient-${layerIndex}-${edge.id}`}
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop offset="0%" stopColor="rgba(6, 182, 212, 0)" />
                      <stop offset="10%" stopColor="rgba(6, 182, 212, 0)" />
                      <stop offset="30%" stopColor="rgba(6, 182, 212, 1)" />
                      <stop offset="50%" stopColor="rgba(6, 255, 255, 1)" />
                      <stop offset="70%" stopColor="rgba(6, 182, 212, 1)" />
                      <stop offset="90%" stopColor="rgba(6, 182, 212, 0)" />
                      <stop offset="100%" stopColor="rgba(6, 182, 212, 0)" />
                    </linearGradient>
                  ))
                )}
              </defs>
            </svg>

            {/* Hexagon structure */}
            <div className="relative z-10">
              {/* Hexagon layers */}
              {[1, 1.3, 1.6].map((scale, layerIndex) => (
                <motion.svg
                  key={layerIndex}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  width="500"
                  height="500"
                  viewBox="-250 -250 500 500"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: layerIndex * 0.2 }}
                >
                  {/* Animated background hexagon edges */}
                  {hexEdges.map(edge => (
                    <motion.line
                      key={`hex-bg-${edge.id}`}
                      x1={edge.start.x * scale}
                      y1={edge.start.y * scale}
                      x2={edge.end.x * scale}
                      y2={edge.end.y * scale}
                      stroke="rgba(6, 182, 212, 0.3)"
                      strokeWidth="1"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{
                        pathLength: [0, 1, 1],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: layerIndex * 0.3 + edge.id * 0.15,
                        ease: 'easeInOut',
                        repeatDelay: 0.5,
                      }}
                    />
                  ))}

                  {hexEdges.map(edge => {
                    const edgeLength = edge.length * scale;
                    const segmentWidth = 60;
                    return (
                      <motion.line
                        key={`hex-light-${edge.id}`}
                        x1={edge.start.x * scale}
                        y1={edge.start.y * scale}
                        x2={edge.end.x * scale}
                        y2={edge.end.y * scale}
                        stroke={`url(#hexGradient-${layerIndex}-${edge.id})`}
                        strokeWidth="6"
                        strokeDasharray={segmentWidth}
                        strokeLinecap="round"
                        filter="url(#strongGlow)"
                        animate={{
                          strokeDashoffset: [edgeLength, -segmentWidth],
                        }}
                        transition={{
                          duration: 1.2,
                          repeat: Infinity,
                          delay: edge.id * 0.2 + layerIndex * 0.15,
                          ease: 'linear',
                          repeatType: 'loop',
                        }}
                      />
                    );
                  })}

                  {hexPoints.map((point, i) => (
                    <motion.circle
                      key={`vertex-${i}`}
                      cx={point.x * scale}
                      cy={point.y * scale}
                      r="4"
                      fill="#06b6d4"
                      filter="url(#glow)"
                      initial={{ scale: 0 }}
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.6, 1, 0.6],
                      }}
                      transition={{
                        scale: { duration: 2, repeat: Infinity, delay: i * 0.2 + layerIndex * 0.3 },
                        opacity: {
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.2 + layerIndex * 0.3,
                        },
                      }}
                    />
                  ))}
                </motion.svg>
              ))}
              <Image
                src="/pcs-logo.png"
                alt="PCS Logo"
                width={300}
                height={300}
                className="w-56 h-56 object-contain"
              />
            </div>
          </div>
        </div>

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
              Dostarczamy nowoczesne rozwiązania technologiczne, które przekształcają Twój biznes i
              prowadzą do sukcesu w erze cyfrowej.
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
                  Jesteśmy firmą specjalizującą się w tworzeniu zaawansowanych rozwiązań IT. Od
                  ponad 15 lat pomagamy firmom w transformacji cyfrowej i osiąganiu celów
                  biznesowych poprzez innowacyjne technologie.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  Nasz zespół ekspertów łączy pasję do technologii z głębokim zrozumieniem potrzeb
                  biznesowych. Realizujemy projekty od etapu planowania po wdrożenie i wsparcie.
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
