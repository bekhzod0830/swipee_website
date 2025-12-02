'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';

export default function VisualSearchDemo() {
  const t = useTranslations('visualSearchDemo');
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.5 });
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [autoPlayStarted, setAutoPlayStarted] = useState(false);

  const MOCK_RESULTS = [
    { 
      id: 1, 
      name: t('product1Name'), 
      price: t('product1Price'), 
      match: '95%',
      image: '/visual_search/rec_images/rec1.png'
    },
    { 
      id: 2, 
      name: t('product2Name'), 
      price: t('product2Price'), 
      match: '92%',
      image: '/visual_search/rec_images/rec2.png'
    },
    { 
      id: 3, 
      name: t('product3Name'), 
      price: t('product3Price'), 
      match: '88%',
      image: '/visual_search/rec_images/rec3.png'
    },
    { 
      id: 4, 
      name: t('product4Name'), 
      price: t('product4Price'), 
      match: '85%',
      image: '/visual_search/rec_images/rec4.png'
    },
  ];

  const SAMPLE_UPLOAD_IMAGE = '/visual_search/searching_image/searching.png';

  // Auto-play animation when section comes into view
  useEffect(() => {
    if (inView && !autoPlayStarted) {
      setAutoPlayStarted(true);
      // Wait 1 second, then show uploaded image
      setTimeout(() => {
        setUploadedImage(SAMPLE_UPLOAD_IMAGE);
        setIsSearching(true);
        
        // After 2 seconds, show results
        setTimeout(() => {
          setIsSearching(false);
          setShowResults(true);
        }, 2000);
      }, 1000);
    }
  }, [inView, autoPlayStarted]);

  return (
    <section ref={ref} className="py-32 bg-gray-50 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16 px-4"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 text-black">
            {t('title')}
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600">{t('subtitle')}</p>
        </motion.div>

        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-start">
            {/* Upload Area */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl border-2 border-dashed border-gray-300 overflow-hidden">
                
                {!uploadedImage && !isSearching && !showResults && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                    <svg
                      className="w-24 h-24 text-gray-400 mb-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    <p className="text-xl font-semibold text-center mb-2 text-gray-700">
                      {t('upload')}
                    </p>
                    <p className="text-sm text-gray-500 text-center">
                      Watch the AI search in action
                    </p>
                  </div>
                )}

                {uploadedImage && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={uploadedImage}
                      alt="Uploaded dress"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </motion.div>
                )}

                {isSearching && (
                  <div className="absolute inset-0 bg-white/80 flex flex-col items-center justify-center backdrop-blur-sm">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-16 h-16 border-4 border-gray-300 border-t-black rounded-full mb-4"
                    />
                    <p className="text-xl font-semibold text-black">{t('searching')}</p>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Results */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {!showResults ? (
                <div className="flex items-center justify-center h-full">
                  <p className="text-gray-600 text-center text-lg">
                    Upload an image to see AI-powered results
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-lg font-semibold mb-6 text-black"
                  >
                    {t('resultsFound', { count: MOCK_RESULTS.length })}
                  </motion.p>
                  
                  {MOCK_RESULTS.map((result, index) => (
                    <motion.div
                      key={result.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-4 p-4 bg-white rounded-2xl hover:bg-gray-50 transition-colors cursor-pointer shadow-sm"
                    >
                      <div className="w-20 h-20 bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl flex-shrink-0 relative overflow-hidden">
                        <Image
                          src={result.image}
                          alt={result.name}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold mb-1 text-black">{result.name}</h4>
                        <p className="text-sm text-gray-600">{result.price}</p>
                      </div>
                      <div className="text-green-600 font-semibold">
                        {result.match}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
