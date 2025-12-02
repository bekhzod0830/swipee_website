'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';

export default function Features() {
  const t = useTranslations('features');
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const features = [
    {
      key: 'visualSearch',
      image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&h=600&fit=crop&auto=format',
      gradient: 'from-purple-500/10 to-pink-500/10',
      iconColor: 'text-purple-600',
    },
    {
      key: 'swipeDiscovery',
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&h=600&fit=crop&auto=format',
      gradient: 'from-blue-500/10 to-cyan-500/10',
      iconColor: 'text-blue-600',
    },
    {
      key: 'modestFashion',
      image: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=800&h=600&fit=crop&auto=format',
      gradient: 'from-green-500/10 to-emerald-500/10',
      iconColor: 'text-green-600',
    },
    {
      key: 'smartRecommendations',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop&auto=format',
      gradient: 'from-orange-500/10 to-red-500/10',
      iconColor: 'text-orange-600',
    },
  ];

  return (
    <section id="features" ref={ref} className="py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-6">
            {t('title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t('subtitle')}</p>
        </motion.div>

        {/* Features List */}
        <div className="space-y-32">
          {features.map((feature, index) => (
            <motion.div
              key={feature.key}
              initial={{ opacity: 0, y: 60 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className={`grid md:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'md:grid-flow-dense' : ''
              }`}
            >
              {/* Image */}
              <motion.div
                className={`relative ${index % 2 === 1 ? 'md:col-start-2' : ''}`}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src={feature.image}
                    alt={t(`${feature.key}.title` as any)}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} mix-blend-multiply`} />
                </div>
                
                {/* Floating number badge */}
                <div className="absolute -top-6 -left-6 w-16 h-16 bg-black text-white rounded-full flex items-center justify-center text-2xl font-bold shadow-xl">
                  {index + 1}
                </div>
              </motion.div>

              {/* Content */}
              <div className={index % 2 === 1 ? 'md:col-start-1 md:row-start-1' : ''}>
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.8, delay: index * 0.2 + 0.2 }}
                >
                  <h3 className="text-4xl md:text-5xl font-bold mb-6">
                    {t(`${feature.key}.title` as any)}
                  </h3>
                  <p className="text-xl text-gray-600 leading-relaxed">
                    {t(`${feature.key}.description` as any)}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
