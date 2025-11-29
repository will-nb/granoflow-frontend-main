import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

/**
 * Geo Blocking Modal Component
 * 
 * Shows a full-screen blocking modal for visitors from blocked countries.
 * 
 * Configuration:
 * - To change blocked countries: modify BLOCKED_COUNTRIES in src/utils/geoBlock.ts
 * - To change China site URL: modify CHINA_SITE_URL in src/utils/geoBlock.ts
 */

interface GeoBlockModalProps {
  isBlocked: boolean;
  onRedirect: () => void;
}

export function GeoBlockModal({ isBlocked, onRedirect }: GeoBlockModalProps) {
  useEffect(() => {
    if (isBlocked) {
      // Disable body scrolling when modal is shown
      document.body.style.overflow = 'hidden';
    } else {
      // Re-enable scrolling when modal is hidden
      document.body.style.overflow = '';
    }

    // Cleanup: restore scrolling when component unmounts
    return () => {
      document.body.style.overflow = '';
    };
  }, [isBlocked]);

  return (
    <AnimatePresence>
      {isBlocked && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Semi-transparent dark background */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

          {/* Modal Card */}
          <motion.div
            className="relative z-10 mx-4 max-w-lg w-full rounded-3xl bg-slate-900/95 backdrop-blur-xl border border-white/10 shadow-2xl p-8 md:p-10"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Content */}
            <div className="text-center space-y-6">
              {/* Title */}
              <h2 className="text-2xl md:text-3xl font-medium text-white mb-4">
                Regional Access Notice
              </h2>

              {/* English Text */}
              <div className="space-y-3">
                <p className="text-gray-300 text-base leading-relaxed">
                  Due to regional regulations and service availability, this global site is not accessible from your current country/region.
                </p>
                <p className="text-gray-300 text-base leading-relaxed">
                  Please visit our China site for localized services and content.
                </p>
              </div>

              {/* Chinese Text */}
              <div className="space-y-3 pt-4 border-t border-white/10">
                <p className="text-gray-300 text-base leading-relaxed">
                  由于区域合规及服务策略原因，我们暂不在您当前所在地区通过此全球站点提供服务。
                </p>
                <p className="text-gray-300 text-base leading-relaxed">
                  请访问我们的中国官网获取本地化服务与内容。
                </p>
              </div>

              {/* Button */}
              <div className="pt-6">
                <button
                  onClick={onRedirect}
                  className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-violet-500 to-indigo-500 hover:from-violet-600 hover:to-indigo-600 text-white font-medium text-base transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-violet-500/50 transform hover:scale-[1.02]"
                >
                  Go to China site / 前往中国官网
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}



