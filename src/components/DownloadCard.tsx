import React, { useEffect, useState } from 'react';
import { Download, ArrowRight, Store, Clock, Info } from "lucide-react";
import { motion } from 'motion/react';
import { createPortal } from "react-dom";
import { useLanguage } from '../hooks/useLanguage';
import { Tooltip, TooltipTrigger, TooltipContent } from './ui/tooltip';

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
  const [showBetaDialog, setShowBetaDialog] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const { t } = useLanguage();
  const disabledContentStyle: React.CSSProperties = { opacity: 0.85 };
  const tooltipPanelClass =
    "relative rounded-2xl bg-black/85 px-4 py-3 shadow-[0_18px_40px_rgba(2,6,23,0.65)] text-white";
  const renderTooltipBody = () => (
    <>
      <div className="relative overflow-hidden rounded-xl">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-violet-500/35 via-indigo-500/15 to-cyan-400/30 opacity-70 blur-lg" />
        <div className="relative flex items-center gap-3 px-1 py-0.5">
          <div className="rounded-full border border-white/20 bg-white/10 p-1.5 text-violet-200 shadow-inner shadow-white/30">
            <Info className="h-3.5 w-3.5" />
          </div>
          <p style={disabledContentStyle} className="text-sm leading-relaxed text-white">
            {t.comingSoon}
          </p>
        </div>
      </div>
    </>
  );

  useEffect(() => {
    setIsClient(true);
  }, []);

  // 检查是否是 Google Play 链接
  const isGooglePlayLink = (store: StoreLink) => {
    // 包含 Google Play Store 域名或者是我们的测试链接，或者 store name 匹配任意一种语言的 Google Play 按钮文案
    return store.url.includes('play.google.com') || 
           store.name === t.stores.googlePlay;
  };

  // 检查是否是需要禁用的商店链接（敬请期待）
  const isComingSoonStore = (store: StoreLink) => {
    const storeName = store.name;
    const platformName = platform.toLowerCase();
    
    // iOS的App Store和TestFlight
    if (platformName === 'ios' || platformName.includes('ios')) {
      if (storeName === t.stores.appStore || storeName === t.stores.testFlight) {
        return true;
      }
    }
    
    // Windows的Microsoft Store
    if (platformName === 'windows' || platformName.includes('windows')) {
      if (storeName === t.stores.microsoftStore) {
        return true;
      }
    }
    
    // macOS的App Store（注意：Mac OS toLowerCase后是"mac os"）
    if (platformName.includes('mac')) {
      if (storeName === t.stores.appStore) {
        return true;
      }
    }
    
    // Linux的Snap Store和Flathub
    if (platformName === 'linux' || platformName.includes('linux')) {
      if (storeName === t.stores.snapStore || storeName === t.stores.flathub) {
        return true;
      }
    }
    
    return false;
  };

  // 处理商店链接点击
  const handleStoreClick = (store: StoreLink) => {
    // 如果是敬请期待的商店，不执行任何操作
    if (isComingSoonStore(store)) {
      return;
    }
    if (isGooglePlayLink(store)) {
      setShowBetaDialog(true);
    } else {
      window.open(store.url, '_blank');
    }
  };

  // 处理申请内测
  const handleApplyForBeta = () => {
    window.open('https://groups.google.com/g/granoflow-testers', '_blank');
    setShowBetaDialog(false);
  };

  return (
    <>
      {isClient && showBetaDialog && createPortal(
        <div 
          className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
          style={{ zIndex: 2147483647, position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
        >
          <div 
            className="w-full max-w-[400px] rounded-2xl border border-white/[0.08] bg-slate-900/95 p-8 text-white shadow-2xl"
            style={{ position: 'relative', zIndex: 2147483647, maxWidth: '400px' }}
          >
            <div className="mb-8 text-center space-y-2">
              <h3 className="text-xl font-medium tracking-tight">{t.beta.title}</h3>
              <p className="text-[15px] text-gray-400 leading-relaxed">{t.beta.message}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                onClick={() => setShowBetaDialog(false)}
                className="flex-1 sm:flex-none justify-center rounded-lg px-4 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-white/5 transition whitespace-nowrap"
              >
                {t.beta.cancel}
              </button>
              <button
                onClick={handleApplyForBeta}
                className="flex-1 sm:flex-none justify-center rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-2.5 text-sm font-medium text-white shadow-lg shadow-violet-500/20 transition hover:from-violet-500 hover:to-indigo-500 whitespace-nowrap"
              >
                {t.beta.applyForBeta}
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

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
          
          {/* 描述 - 固定两行文字高度确保对齐，靠上对齐 */}
          <div className="mb-8 flex-shrink-0 h-14 flex items-start justify-center">
            <p className="text-gray-400 text-sm leading-relaxed text-center px-2">
              {description}
            </p>
          </div>
          
          {/* 按钮区域 - 占据剩余空间并底部对齐 */}
          <div className="w-full mt-auto flex flex-col">
            {/* 主要按钮：Direct Download 或 App Store（iOS） */}
            {downloadUrl ? (
              <button
                onClick={() => window.open(downloadUrl, '_blank')}
                className="w-full group/btn relative overflow-hidden rounded-xl px-6 py-3 min-h-[3rem] bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white transition-all duration-300 shadow-lg hover:shadow-violet-500/50 cursor-pointer"
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
            ) : storeLinks && storeLinks.length > 0 ? (
              // iOS 情况：第一个商店按钮（App Store）显示为主要按钮样式
              (() => {
                const firstStore = storeLinks[0];
                const isComingSoon = isComingSoonStore(firstStore);
                const buttonContent = (
                  <button
                    onClick={() => handleStoreClick(firstStore)}
                    disabled={isComingSoon}
                    className={`w-full group/btn relative overflow-hidden rounded-xl px-6 py-3 min-h-[3rem] transition-all duration-300 ${
                      isComingSoon
                        ? 'bg-white/[0.03] border border-white/[0.08] text-gray-500 cursor-not-allowed backdrop-blur-sm'
                        : 'bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-lg hover:shadow-violet-500/50 cursor-pointer'
                    }`}
                  >
                    {!isComingSoon && (
                      <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300"></div>
                    )}
                    
                    <div
                      className="relative flex items-center justify-center space-x-2"
                      style={isComingSoon ? disabledContentStyle : undefined}
                    >
                      <Store className="h-4 w-4 flex-shrink-0" />
                      <span className="text-sm whitespace-pre-line text-center leading-tight">{firstStore.name}</span>
                      {!isComingSoon ? (
                        <motion.div
                          animate={{ x: isHovered ? 4 : 0 }}
                          transition={{ duration: 0.3 }}
                          className="flex-shrink-0"
                        >
                          <ArrowRight className="h-4 w-4" />
                        </motion.div>
                      ) : (
                        <Clock className="h-3.5 w-3.5 opacity-50" />
                      )}
                    </div>
                  </button>
                );

                if (isComingSoon) {
                  return (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        {buttonContent}
                      </TooltipTrigger>
                      <TooltipContent
                        sideOffset={12}
                        align="center"
                        className={tooltipPanelClass}
                        style={{ backgroundColor: 'rgba(5,3,18,0.85)' }}
                      >
                        {renderTooltipBody()}
                      </TooltipContent>
                    </Tooltip>
                  );
                }
                return buttonContent;
              })()
            ) : null}

            {/* 次要按钮区域：应用商店链接 */}
            {storeLinks && storeLinks.length > 0 && (
              <div className="w-full mt-3 space-y-2">
                {/* 如果有 downloadUrl，显示所有商店链接；如果没有 downloadUrl，跳过第一个（已在上面显示为主要按钮） */}
                {storeLinks.slice(downloadUrl ? 0 : 1).map((store) => {
                  const isComingSoon = isComingSoonStore(store);
                  const buttonContent = (
                    <button
                      key={store.name}
                      onClick={() => handleStoreClick(store)}
                      disabled={isComingSoon}
                      className={`w-full group/store relative overflow-hidden rounded-lg px-4 py-2.5 transition-all duration-300 ${
                        isComingSoon
                          ? 'bg-transparent border border-white/5 text-gray-600 cursor-not-allowed backdrop-blur-[2px]'
                          : 'bg-white/5 hover:bg-white/10 border border-white/10 hover:border-violet-500/50 text-gray-300 hover:text-white cursor-pointer'
                      }`}
                    >
                      <div
                        className="relative flex items-center justify-center space-x-2"
                        style={isComingSoon ? disabledContentStyle : undefined}
                      >
                        <Store className="h-3.5 w-3.5" />
                        <span className="text-xs">{store.name}</span>
                        {isComingSoon && <Clock className="h-3 w-3 opacity-40 ml-1" />}
                      </div>
                    </button>
                  );

                  if (isComingSoon) {
                    return (
                      <Tooltip key={store.name}>
                        <TooltipTrigger asChild>
                          {buttonContent}
                        </TooltipTrigger>
                        <TooltipContent
                          sideOffset={12}
                          align="center"
                          className={tooltipPanelClass}
                          style={{ backgroundColor: 'rgba(5,3,18,0.85)' }}
                        >
                          {renderTooltipBody()}
                        </TooltipContent>
                      </Tooltip>
                    );
                  }
                  return buttonContent;
                })}
                {/* 占位元素：确保所有卡片按钮区域高度一致
                    - 有 downloadUrl 且只有 1 个 storeLinks：需要 1 个占位（Android, Windows, Mac OS）
                    - 没有 downloadUrl 且有 2 个 storeLinks：需要 1 个占位（iOS）
                    - 有 downloadUrl 且有 2 个 storeLinks：不需要占位（Linux）
                */}
                {((downloadUrl && storeLinks.length === 1) || (!downloadUrl && storeLinks.length === 2)) && (
                  <button
                    className="w-full rounded-lg px-4 py-2.5 bg-white/5 border border-white/10 opacity-0 pointer-events-none invisible"
                    disabled
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <Store className="h-3.5 w-3.5" />
                      <span className="text-xs">Placeholder</span>
                    </div>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
    </>
  );
}