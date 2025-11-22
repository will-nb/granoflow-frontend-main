import { DownloadCard } from "./components/DownloadCard";
import { LanguageSwitcher } from "./components/LanguageSwitcher";
import { TuxIcon } from "./components/TuxIcon";
import { Monitor, Apple, Smartphone, Zap, Lock, Clock, Heart, Sparkles } from "lucide-react";
import logo from 'figma:asset/712b2a945033a7b6ba74878dfb55cbe9f1c0020e.png';
import { motion } from 'motion/react';
import { useEffect } from 'react';
import { LanguageProvider, useLanguage } from './hooks/useLanguage';

function AppContent() {
  const { t } = useLanguage();

  useEffect(() => {
    document.title = t.appName;
  }, [t]);

  // Google Analytics
  useEffect(() => {
    // 添加 gtag.js 脚本
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = 'https://www.googletagmanager.com/gtag/js?id=G-K49168HFM0';
    document.head.appendChild(script1);

    // 添加配置脚本
    const script2 = document.createElement('script');
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-K49168HFM0');
    `;
    document.head.appendChild(script2);

    return () => {
      // 清理脚本（可选）
      if (script1.parentNode) script1.parentNode.removeChild(script1);
      if (script2.parentNode) script2.parentNode.removeChild(script2);
    };
  }, []);

  const downloads = [
    {
      platform: t.platforms.android,
      icon: <Smartphone size={48} />,
      downloadUrl: "https://d.granoflow.com/release/app-arm64-v8a-release.apk",
      description: t.platformDescriptions.android,
      storeLinks: [
        {
          name: t.stores.googlePlay,
          url: "https://play.google.com/store/apps/details?id=com.granoflow.lite"
        }
      ]
    },
    {
      platform: t.platforms.ios,
      icon: <Apple size={48} />,
      downloadUrl: "https://apps.apple.com/app/granoflow-lite/id123456789",
      description: t.platformDescriptions.ios,
      storeLinks: [
        {
          name: t.stores.testFlight,
          url: "https://testflight.apple.com/join/granoflow-lite"
        }
      ]
    },
    {
      platform: t.platforms.windows,
      icon: <Monitor size={48} />,
      downloadUrl: "https://d.granoflow.com/release/granoflow-lite-windows-x64-unsigned.zip",
      description: t.platformDescriptions.windows,
      storeLinks: [
        {
          name: t.stores.microsoftStore,
          url: "https://www.microsoft.com/store/apps/granoflow-lite"
        }
      ]
    },
    {
      platform: t.platforms.macos,
      icon: <Apple size={48} />,
      downloadUrl: "https://d.granoflow.com/release/granoflow-lite-macos.dmg",
      description: t.platformDescriptions.macos,
      storeLinks: [
        {
          name: t.stores.appStore,
          url: "https://apps.apple.com/app/granoflow-lite/id123456789"
        }
      ]
    },
    {
      platform: t.platforms.linux,
      icon: <TuxIcon size={48} />,
      downloadUrl: "https://d.granoflow.com/release/granoflow-lite-linux.AppImage",
      description: t.platformDescriptions.linux,
      storeLinks: [
        {
          name: t.stores.snapStore,
          url: "https://snapcraft.io/granoflow-lite"
        },
        {
          name: t.stores.flathub,
          url: "https://flathub.org/apps/com.granoflow.lite"
        }
      ]
    }
  ];

  const features = [
    {
      icon: <Zap size={24} />,
      title: t.features.immersive.title,
      description: t.features.immersive.description,
      color: "from-violet-500 to-purple-500"
    },
    {
      icon: <Lock size={24} />,
      title: t.features.privacy.title,
      description: t.features.privacy.description,
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Clock size={24} />,
      title: t.features.progress.title,
      description: t.features.progress.description,
      color: "from-emerald-500 to-teal-500"
    },
    {
      icon: <Heart size={24} />,
      title: t.features.free.title,
      description: t.features.free.description,
      color: "from-pink-500 to-rose-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(56,189,248,0.15),rgba(255,255,255,0))]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(139,92,246,0.1),rgba(255,255,255,0))]"></div>
      
      {/* 网格背景 */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:72px_72px]"></div>

      {/* 语言切换器 - 固定在右上角 */}
      <div className="fixed top-6 right-6 z-50">
        <LanguageSwitcher />
      </div>

      <div className="container mx-auto px-4 py-16 max-w-7xl relative z-10">
        {/* 头部区域 */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="flex justify-center mb-6"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative">
              {/* Logo 光晕效果 */}
              <div className="absolute -inset-3 bg-gradient-to-r from-violet-600 via-purple-600 to-cyan-600 rounded-[1.5rem] opacity-30 blur-xl"></div>
              
              <div className="relative w-32 h-32 rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-slate-800/80 via-slate-700/60 to-slate-900/80 backdrop-blur-sm flex items-center justify-center border border-white/20">
                <img
                  src={logo}
                  alt="App Logo"
                  className="w-24 h-24 object-contain"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h1 className="mb-6 flex items-center justify-center flex-wrap gap-3 text-4xl md:text-5xl lg:text-6xl">
              <span className="bg-gradient-to-r from-white via-purple-200 to-purple-300 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(168,85,247,0.5)]">
                GranoFlow
              </span>
              <span className="bg-gradient-to-r from-cyan-400 via-cyan-300 to-cyan-200 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(34,211,238,0.6)]">
                全球
              </span>
            </h1>
            
            <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed mb-2 text-lg">
              {t.tagline}
            </p>
            <p className="text-gray-400 max-w-xl mx-auto mb-8">
              {t.description}
            </p>
            
            <div className="inline-flex items-center space-x-3 px-6 py-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="flex items-center space-x-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500 shadow-lg shadow-green-500/50"></span>
                </span>
                <span className="text-gray-300 text-sm">{t.version}: V0.1.0</span>
              </div>
              <span className="text-gray-600">•</span>
              <span className="text-gray-400 text-sm">{t.updatedOn} 2025-11-16</span>
            </div>
          </motion.div>
        </motion.div>

        {/* 下载区域 */}
        <motion.div 
          className="mb-20"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex items-center justify-center mb-10">
            <Sparkles className="text-violet-400 mr-2" size={24} />
            <h2 className="text-center bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              {t.selectPlatform}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
            {downloads.map((download, index) => (
              <motion.div
                key={download.platform}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              >
                <DownloadCard
                  platform={download.platform}
                  icon={download.icon}
                  downloadUrl={download.downloadUrl}
                  description={download.description}
                  storeLinks={download.storeLinks}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 功能特性 */}
        <motion.div 
          className="relative rounded-3xl p-10 backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          {/* 特性标题光晕 */}
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-64 h-64 bg-gradient-to-r from-violet-600/20 to-purple-600/20 rounded-full blur-3xl"></div>
          
          <h2 className="text-center mb-12 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent relative">
            {t.mainFeatures}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="group relative rounded-2xl p-6 bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-violet-500/10"
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
              >
                <div className="flex items-start space-x-4">
                  <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-2 text-white">{feature.title}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 页脚 */}
        <motion.div 
          className="text-center mt-16 text-gray-400 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <p className="text-gray-500">{t.footer.copyright}</p>
          <p className="mt-3 flex items-center justify-center space-x-4">
            <a 
              href="https://granoflow.github.io/granoflow-docs/privacy.html" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-violet-400 transition-colors duration-200"
            >
              {t.footer.privacy}
            </a>
            <span className="text-gray-700">·</span>
            <a 
              href="#" 
              className="hover:text-violet-400 transition-colors duration-200"
            >
              {t.footer.terms}
            </a>
            <span className="text-gray-700">·</span>
            <a 
              href="https://github.com/granoflow/granoflow-docs" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-violet-400 transition-colors duration-200"
            >
              {t.footer.contact}
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}