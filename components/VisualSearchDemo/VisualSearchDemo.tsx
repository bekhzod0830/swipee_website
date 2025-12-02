'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';

const MOCK_RESULTS = [
  { 
    id: 1, 
    name: 'Similar Dress', 
    price: '$85', 
    match: '95%',
    image: '/visual_search/rec_images/rec1.png'
  },
  { 
    id: 2, 
    name: 'Similar Style', 
    price: '$78', 
    match: '92%',
    image: '/visual_search/rec_images/rec2.png'
  },
  { 
    id: 3, 
    name: 'Alternative', 
    price: '$90', 
    match: '88%',
    image: '/visual_search/rec_images/rec3.png'
  },
  { 
    id: 4, 
    name: 'Related Item', 
    price: '$82', 
    match: '85%',
    image: '/visual_search/rec_images/rec4.png'
  },
];

const SAMPLE_UPLOAD_IMAGE = '/visual_search/searching_image/searching.png';

export default function VisualSearchDemo() {
  const t = useTranslations('visualSearchDemo');
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [autoPlayStarted, setAutoPlayStarted] = useState(false);

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
    <section ref={ref} className="py-32 bg-black text-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
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

        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Upload Area */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative aspect-square bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl border-2 border-dashed border-gray-700 overflow-hidden">
                
                {!uploadedImage && !isSearching && !showResults && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                    <svg
                      className="w-24 h-24 text-gray-600 mb-6"
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
                    <p className="text-xl font-semibold text-center mb-2">
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
                  <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center backdrop-blur-sm">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-16 h-16 border-4 border-gray-700 border-t-white rounded-full mb-4"
                    />
                    <p className="text-xl font-semibold">{t('searching')}</p>
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
                  <p className="text-gray-500 text-center text-lg">
                    Upload an image to see AI-powered results
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-lg font-semibold mb-6"
                  >
                    {t('resultsFound', { count: MOCK_RESULTS.length })}
                  </motion.p>
                  
                  {MOCK_RESULTS.map((result, index) => (
                    <motion.div
                      key={result.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-4 p-4 bg-gray-900 rounded-2xl hover:bg-gray-800 transition-colors cursor-pointer"
                    >
                      <div className="w-20 h-20 bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl flex-shrink-0 relative overflow-hidden">
                        <Image
                          src={result.image}
                          alt={result.name}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold mb-1">{result.name}</h4>
                        <p className="text-sm text-gray-400">{result.price}</p>
                      </div>
                      <div className="text-green-400 font-semibold">
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
