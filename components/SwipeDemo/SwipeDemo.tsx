'use client';

import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';

const MOCK_PRODUCTS = [
  { 
    id: 1, 
    name: 'Elegant Black Dress', 
    price: '$89', 
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=600&fit=crop&auto=format',
    brand: 'Modest Fashion Co.'
  },
  { 
    id: 2, 
    name: 'White Hijab Set', 
    price: '$65', 
    image: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=400&h=600&fit=crop&auto=format',
    brand: 'Elegance'
  },
  { 
    id: 3, 
    name: 'Modest Abaya', 
    price: '$120', 
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25977d?w=400&h=600&fit=crop&auto=format',
    brand: 'Islamic Wear'
  },
  { 
    id: 4, 
    name: 'Summer Maxi Dress', 
    price: '$75', 
    image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e5?w=400&h=600&fit=crop&auto=format',
    brand: 'Modern Modest'
  },
  { 
    id: 5, 
    name: 'Casual Tunic', 
    price: '$55', 
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=600&fit=crop&auto=format',
    brand: 'Everyday Wear'
  },
];

export default function SwipeDemo() {
  const t = useTranslations('swipeDemo');
  const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.3 });
  const [cards] = useState(MOCK_PRODUCTS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  // Only run animations on client side
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Auto-play animation when in view
  useEffect(() => {
    if (!inView) return;

    // Reset and start auto-swipe
    setCurrentIndex(0);
    
    const autoSwipeInterval = setInterval(() => {
      setCurrentIndex(prev => {
        if (prev >= cards.length - 1) {
          return 0; // Loop back to start
        }
        return prev + 1;
      });
    }, 2500); // Swipe every 2.5 seconds

    return () => clearInterval(autoSwipeInterval);
  }, [inView, cards.length]);

  const handleSwipe = (direction: 'left' | 'right' | 'up') => {
    if (currentIndex >= cards.length) return;
    
    setTimeout(() => {
      setCurrentIndex(prev => prev + 1);
    }, 300);
  };

  const handleUndo = () => {
    if (currentIndex === 0) return;
    setCurrentIndex(prev => prev - 1);
  };

  const resetDemo = () => {
    setCurrentIndex(0);
  };

  return (
    <section id="demo" ref={ref} className="py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-6 text-black">
            {t('title')}
          </h2>
          <p className="text-xl text-gray-600">{t('subtitle')}</p>
        </motion.div>

        {/* iPhone Mockup */}
        <div className="relative flex items-center justify-center">
          {/* Swipe Hint Arrows - Handwritten Style */}
          {isMounted && currentIndex === 0 && inView && (
            <>
              {/* Left Arrow - Red/Pink */}
              <motion.div
                initial={{ opacity: 0, x: 20, rotate: -10 }}
                animate={{ 
                  opacity: [0, 1, 1, 0],
                  x: [20, -10, -10, -30],
                  rotate: [-10, -5, -5, 0]
                }}
                transition={{ 
                  duration: 2.5,
                  delay: 0.3,
                  times: [0, 0.2, 0.8, 1],
                  repeat: Infinity,
                  repeatDelay: 2.5
                }}
                className="absolute left-8 top-1/2 -translate-y-1/2 z-10 pointer-events-none"
              >
                <svg width="120" height="80" viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path 
                    d="M100 40C100 40 60 35 40 40C20 45 10 40 10 40M10 40L25 30M10 40L25 50" 
                    stroke="#EF4444" 
                    strokeWidth="4" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    style={{
                      filter: 'drop-shadow(0 2px 8px rgba(239, 68, 68, 0.3))'
                    }}
                  />
                </svg>
              </motion.div>

              {/* Right Arrow - Green */}
              <motion.div
                initial={{ opacity: 0, x: -20, rotate: 10 }}
                animate={{ 
                  opacity: [0, 1, 1, 0],
                  x: [-20, 10, 10, 30],
                  rotate: [10, 5, 5, 0]
                }}
                transition={{ 
                  duration: 2.5,
                  delay: 0.3,
                  times: [0, 0.2, 0.8, 1],
                  repeat: Infinity,
                  repeatDelay: 2.5
                }}
                className="absolute right-8 top-1/2 -translate-y-1/2 z-10 pointer-events-none"
              >
                <svg width="120" height="80" viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path 
                    d="M20 40C20 40 60 35 80 40C100 45 110 40 110 40M110 40L95 30M110 40L95 50" 
                    stroke="#10B981" 
                    strokeWidth="4" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    style={{
                      filter: 'drop-shadow(0 2px 8px rgba(16, 185, 129, 0.3))'
                    }}
                  />
                </svg>
              </motion.div>
            </>
          )}

          {/* Device */}
          <div className="relative">
            {/* iPhone Frame */}
            <div className="relative w-[375px] h-[812px] bg-black rounded-[60px] shadow-2xl border-[14px] border-black overflow-hidden">
              {/* Notch */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-7 bg-black rounded-b-3xl z-50" />
              
              {/* Screen */}
              <div className="relative w-full h-full bg-gray-50 overflow-hidden">
                {/* App Bar */}
                <div className="absolute top-0 left-0 right-0 bg-white z-40 shadow-sm">
                  {/* Status Bar */}
                  <div className="h-11 flex items-center justify-between px-8 pt-2">
                    <span className="text-sm font-semibold text-black">9:41</span>
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                      </svg>
                      <svg className="w-6 h-3" fill="currentColor" viewBox="0 0 24 24">
                        <rect x="1" y="4" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="2" fill="black" />
                        <rect x="3" y="6" width="14" height="8" fill="currentColor" />
                      </svg>
                    </div>
                  </div>

                  {/* App Header */}
                  <div className="px-6 py-3 flex items-center justify-center">
                    <h1 className="text-xl font-bold text-black">swipee</h1>
                  </div>
                </div>

                {/* Swipe Cards Area */}
                <div className="absolute top-[115px] left-0 right-0 bottom-[180px] flex items-center justify-center px-4">
                  <div className="relative w-full h-full max-w-[340px]">
                    {cards.slice(currentIndex, currentIndex + 3).map((product, index) => (
                      <SwipeCard
                        key={`${product.id}-${currentIndex + index}`}
                        product={product}
                        index={index}
                        isTopCard={index === 0}
                        onSwipe={handleSwipe}
                        shouldPlayHint={inView}
                      />
                    ))}

                    {/* Empty State - Hidden during auto-play */}
                    {currentIndex >= cards.length && !inView && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute inset-0 flex items-center justify-center bg-white rounded-3xl shadow-xl"
                      >
                        <div className="text-center p-6">
                          <p className="text-xl font-bold text-gray-800 mb-4">
                            That&apos;s all for now! 🎉
                          </p>
                          <button
                            onClick={resetDemo}
                            className="px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
                          >
                            Restart Demo
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Action Buttons (After Cards) */}
                <div className="absolute bottom-[80px] left-0 right-0 px-8 py-4 z-30">
                  <div className="flex justify-center items-center gap-4">
                    {/* Dislike Button */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleSwipe('left')}
                      disabled={currentIndex >= cards.length}
                      className="flex-1 max-w-[150px] h-14 rounded-2xl bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                    >
                      <svg className="w-7 h-7 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
                      </svg>
                    </motion.button>

                    {/* Like Button */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleSwipe('right')}
                      disabled={currentIndex >= cards.length}
                      className="flex-1 max-w-[150px] h-14 rounded-full bg-black flex items-center justify-center hover:bg-gray-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                    >
                      <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                      </svg>
                    </motion.button>
                  </div>
                </div>

                {/* Bottom Navigation */}
                <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 flex justify-around items-center z-30">
                  <button className="flex flex-col items-center gap-1">
                    <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                    </svg>
                    <span className="text-xs font-medium text-black">Discover</span>
                  </button>
                  <button className="flex flex-col items-center gap-1">
                    <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <span className="text-xs font-medium text-gray-400">Liked</span>
                  </button>
                  <button className="flex flex-col items-center gap-1">
                    <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <span className="text-xs font-medium text-gray-400">Chat</span>
                  </button>
                  <button className="flex flex-col items-center gap-1">
                    <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    <span className="text-xs font-medium text-gray-400">Shop</span>
                  </button>
                  <button className="flex flex-col items-center gap-1">
                    <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="text-xs font-medium text-gray-400">Profile</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Device Side Buttons */}
            <div className="absolute right-0 top-32 w-1 h-16 bg-black rounded-l-sm" />
            <div className="absolute left-0 top-24 w-1 h-8 bg-black rounded-r-sm" />
            <div className="absolute left-0 top-40 w-1 h-12 bg-black rounded-r-sm" />
          </div>
        </div>
      </div>
    </section>
  );
}

// Interactive Swipe Card Component
interface SwipeCardProps {
  product: typeof MOCK_PRODUCTS[0];
  index: number;
  isTopCard: boolean;
  onSwipe: (direction: 'left' | 'right' | 'up') => void;
  shouldPlayHint: boolean;
}

function SwipeCard({ product, index, isTopCard, onSwipe, shouldPlayHint }: SwipeCardProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);
  
  // Always call these hooks, even if not top card
  const likeOpacity = useTransform(x, [50, 150], [0, 1]);
  const passOpacity = useTransform(x, [-150, -50], [1, 0]);
  const cartOpacity = useTransform(y, [-150, -50], [1, 0]);

  const [hasPlayedHint, setHasPlayedHint] = useState(false);

  // Play shake animation when shouldPlayHint becomes true
  useEffect(() => {
    if (shouldPlayHint && isTopCard && !hasPlayedHint) {
      const timer = setTimeout(() => {
        // Smooth shake animation using animate function
        animate(x, [0, 30, -30, 20, -20, 0], {
          duration: 1.2,
          ease: "easeInOut",
          onComplete: () => setHasPlayedHint(true)
        });
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [shouldPlayHint, isTopCard, hasPlayedHint, x]);

  const handleDragEnd = (_: any, info: any) => {
    if (!isTopCard) return;

    const swipeThresholdX = 100;
    const swipeThresholdY = 150;

    // Check vertical swipe first (up for cart)
    if (info.offset.y < -swipeThresholdY) {
      onSwipe('up');
    }
    // Check horizontal swipes
    else if (info.offset.x > swipeThresholdX) {
      onSwipe('right');
    } else if (info.offset.x < -swipeThresholdX) {
      onSwipe('left');
    }
  };

  return (
    <motion.div
      drag={isTopCard}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      onDragEnd={handleDragEnd}
      style={{
        x: isTopCard ? x : 0,
        y: isTopCard ? y : 0,
        rotate: isTopCard ? rotate : 0,
        opacity: index === 0 ? opacity : 1,
        zIndex: 3 - index,
      }}
      initial={{ scale: 1 - index * 0.05, y: index * 10 }}
      animate={{
        scale: 1 - index * 0.05,
        y: index * 10,
        opacity: 1 - index * 0.3,
      }}
      onAnimationComplete={() => {
        if (isTopCard && !hasPlayedHint && shouldPlayHint) {
          setHasPlayedHint(true);
        }
      }}
      className={`absolute inset-0 ${isTopCard ? 'cursor-grab active:cursor-grabbing' : ''}`}
      whileTap={isTopCard ? { cursor: 'grabbing' } : {}}
    >
      <div className="w-full h-full bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Product Image */}
        <div className="relative w-full h-full">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="340px"
            priority={index === 0}
          />
          {/* Gradient Overlay */}
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black/90 via-black/60 to-transparent" />
          
          {/* Swipe Direction Indicators */}
          {isTopCard && (
            <>
              <motion.div
                style={{ opacity: likeOpacity }}
                className="absolute top-8 right-8 bg-green-500 text-white px-6 py-3 rounded-lg font-bold text-xl rotate-12"
              >
                LIKE
              </motion.div>
              <motion.div
                style={{ opacity: passOpacity }}
                className="absolute top-8 left-8 bg-red-500 text-white px-6 py-3 rounded-lg font-bold text-xl -rotate-12"
              >
                PASS
              </motion.div>
            </>
          )}
          
          {/* Product Info */}
          <div className="absolute bottom-0 left-0 right-0 p-5 text-white z-10">
            <p className="text-xs font-medium mb-1">{product.brand}</p>
            <h3 className="text-lg font-bold mb-1">{product.name}</h3>
            <p className="text-xl font-bold">{product.price}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
