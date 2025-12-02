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
    <section ref={ref} className="py-20 sm:py-28 md:py-40 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 px-4 text-white">
            {t('title')}
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 px-4">{t('subtitle')}</p>
        </motion.div>

        {/* Pain Points */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {painPoints.map((point, index) => (
            <motion.div
              key={point.key}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
              className="text-center px-4"
            >
              <div className="relative w-36 h-36 sm:w-44 sm:h-44 md:w-48 md:h-48 mx-auto mb-4 sm:mb-6 rounded-full overflow-hidden">
                <Image
                  src={point.image}
                  alt={t(point.key as any)}
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  sizes="(max-width: 640px) 144px, (max-width: 768px) 176px, 192px"
                />
              </div>
              <p className="text-base sm:text-lg text-white">{t(point.key as any)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
