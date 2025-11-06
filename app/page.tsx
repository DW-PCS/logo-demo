'use client';

import { motion } from 'framer-motion';
import LogoDotsFlow from './components/logos/LogoDotsFlow';

export default function LogosShowcase() {
  return (
    <div className="min-h-screen bg-white">
      <section className="relative">
        <LogoDotsFlow />
      </section>

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
              Lorem Ipsum Dolor
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-24"
          >
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-bold text-slate-900 mb-6">About Us</h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                  fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-24"
          ></motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center py-16 bg-slate-900 text-white -mx-8 px-8"
          >
            <h2 className="text-4xl font-bold mb-6">Get In Touch</h2>
            <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </p>
            <button className="px-8 py-4 bg-white text-slate-900 font-semibold hover:bg-slate-100 transition-colors">
              Contact Us
            </button>
          </motion.div>
        </div>
      </section>

      <footer className="bg-slate-900 text-white py-12 px-8">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-slate-400">© 2025 PCS. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
