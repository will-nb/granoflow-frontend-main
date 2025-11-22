import { Download, ArrowRight, Store } from "lucide-react";
import { motion } from 'motion/react';
import { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';

interface StoreLink {
  name: string;
  url: string;
}

interface DownloadCardProps {
  platform: string;
  icon: React.ReactNode;
  downloadUrl: string;
  description: string;
  storeLinks?: StoreLink[];
}

export function DownloadCard({ platform, icon, downloadUrl, description, storeLinks }: DownloadCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { t } = useLanguage();

  return (
    <motion.div
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      {/* 卡片光晕效果 */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-2xl opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500"></div>
      
      {/* 主卡片 */}
      <div className="relative rounded-2xl p-8 backdrop-blur-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 overflow-hidden h-[420px] flex flex-col">
        {/* 顶部装饰线 */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
        
        <div className="flex flex-col items-center text-center h-full">
          {/* 图标容器 */}
          <motion.div 
            className="mb-6 text-violet-400 relative flex-shrink-0"
            animate={{ 
              scale: isHovered ? 1.1 : 1,
              rotate: isHovered ? 5 : 0
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute inset-0 bg-violet-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            {icon}
          </motion.div>
          
          {/* 平台名称 */}
          <h3 className="mb-3 text-white group-hover:text-violet-300 transition-colors duration-300 flex-shrink-0">
            {platform}
          </h3>
          
          {/* 描述 */}
          <p className="text-gray-400 mb-8 text-sm leading-relaxed flex-shrink-0">
            {description}
          </p>
          
          {/* 按钮区域 - 占据剩余空间并底部对齐 */}
          <div className="w-full mt-auto flex flex-col space-y-3">
            {/* 下载按钮 */}
            {downloadUrl && (
              <button
                onClick={() => window.open(downloadUrl, '_blank')}
                className="w-full group/btn relative overflow-hidden rounded-xl px-6 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white transition-all duration-300 shadow-lg hover:shadow-violet-500/50"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300"></div>
                
                <div className="relative flex items-center justify-center space-x-2">
                  <Download className="h-4 w-4" />
                  <span className="text-sm">{t.directDownload}</span>
                  <motion.div
                    animate={{ x: isHovered ? 4 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </motion.div>
                </div>
              </button>
            )}

            {/* 应用商店链接 */}
            {storeLinks && storeLinks.length > 0 && (
              <div className="w-full space-y-2">
                {downloadUrl && (
                  <p className="text-xs text-gray-500 text-center">{t.orGetFrom}</p>
                )}
                {storeLinks.map((store) => (
                  <button
                    key={store.name}
                    onClick={() => window.open(store.url, '_blank')}
                    className="w-full group/store relative overflow-hidden rounded-lg px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-violet-500/50 text-gray-300 hover:text-white transition-all duration-300"
                  >
                    <div className="relative flex items-center justify-center space-x-2">
                      <Store className="h-3.5 w-3.5" />
                      <span className="text-xs">{store.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}