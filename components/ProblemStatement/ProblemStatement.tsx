'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';

export default function ProblemStatement() {
  const t = useTranslations('problem');
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const painPoints = [
    { 
      key: 'pain1', 
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=400&fit=crop&auto=format'
    },
    { 
      key: 'pain2', 
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=400&fit=crop&auto=format'
    },
    { 
      key: 'pain3', 
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=400&fit=crop&auto=format'
    },
  ];

  return (
    <section ref={ref} className="py-40 bg-black text-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-6">
            {t('title')}
          </h2>
          <p className="text-xl text-gray-400">{t('subtitle')}</p>
        </motion.div>

        {/* Pain Points */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {painPoints.map((point, index) => (
            <motion.div
              key={point.key}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
              className="text-center"
            >
              <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden">
                <Image
                  src={point.image}
                  alt={t(point.key as any)}
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  sizes="192px"
                />
              </div>
              <p className="text-lg">{t(point.key as any)}</p>
            </motion.div>
          ))}
        </div>

        {/* Solution CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <div className="inline-block px-8 py-4 bg-white text-black text-2xl font-bold rounded-full">
            {t('solution')} ✨
          </div>
        </motion.div>
      </div>
    </section>
  );
}
