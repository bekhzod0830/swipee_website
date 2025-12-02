'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';

export default function HowItWorks() {
  const t = useTranslations('howItWorks');
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const steps = [
    { 
      key: 'step1',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=1200&fit=crop&auto=format', // Sign up - person with phone
    },
    { 
      key: 'step2',
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&h=1200&fit=crop&auto=format', // Choose style - fashion selection
    },
    { 
      key: 'step3',
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&h=1200&fit=crop&auto=format', // Swipe products - woman shopping
    },
    { 
      key: 'step4',
      image: 'https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=800&h=1200&fit=crop&auto=format', // AI search - phone camera/search
    },
  ];

  return (
    <section id="how-it-works" ref={ref} className="py-24 bg-white overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16 md:mb-20 px-4"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold mb-3 sm:mb-4 text-gray-900">
            {t('title')}
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600">
            Simple steps to discover your perfect style
          </p>
        </motion.div>

        {/* Horizontal Flow Cards */}
        <div className="flex items-center justify-start md:justify-center gap-3 overflow-x-auto pb-4 px-4 md:px-0 scrollbar-hide">
          {steps.map((step, index) => (
            <div key={step.key} className="flex items-center gap-3 flex-shrink-0">
              {/* Card */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="group relative overflow-hidden rounded-3xl w-[280px] sm:w-[320px] md:w-[340px] h-[420px] sm:h-[460px] md:h-[500px] cursor-pointer shadow-xl"
              >
                {/* Full-bleed Background Image */}
                <Image
                  src={step.image}
                  alt={t(`${step.key}.title`)}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="340px"
                />
                
                {/* Gradient Overlay for Text Contrast */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-transparent" />
                
                {/* Number Badge */}
                <div className="absolute top-4 sm:top-6 right-4 sm:right-6 w-10 h-10 sm:w-12 sm:h-12 bg-white text-black rounded-full flex items-center justify-center text-lg sm:text-xl font-bold shadow-lg">
                  {index + 1}
                </div>
                
                {/* Content - Top Left */}
                <div className="absolute top-4 sm:top-6 left-4 sm:left-6 right-16 sm:right-20">
                  <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2 leading-tight">
                    {t(`${step.key}.title`)}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
                    {t(`${step.key}.description`)}
                  </p>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
