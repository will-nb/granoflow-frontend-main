export type Language = 'en' | 'zh-CN' | 'zh-HK' | 'zh-TW';

export interface Translations {
  appName: string;
  regionName: string;
  tagline: string;
  description: string;
  version: string;
  updatedOn: string;
  selectPlatform: string;
  download: string;
  downloadNow: string;
  directDownload: string;
  orGetFrom: string;
  mainFeatures: string;
  features: {
    immersive: {
      title: string;
      description: string;
    };
    privacy: {
      title: string;
      description: string;
    };
    progress: {
      title: string;
      description: string;
    };
    free: {
      title: string;
      description: string;
    };
  };
  platforms: {
    android: string;
    ios: string;
    windows: string;
    macos: string;
    linux: string;
  };
  platformDescriptions: {
    android: string;
    ios: string;
    windows: string;
    macos: string;
    linux: string;
  };
  stores: {
    googlePlay: string;
    appStore: string;
    testFlight: string;
    microsoftStore: string;
    snapStore: string;
    flathub: string;
  };
  footer: {
    copyright: string;
    privacy: string;
    terms: string;
    contact: string;
  };
  beta: {
    title: string;
    message: string;
    applyForBeta: string;
    cancel: string;
  };
  comingSoon: string;
}

export const translations: Record<Language, Translations> = {
  'en': {
    appName: 'GranoFlow',
    regionName: 'Global',
    tagline: 'The BEST Task Management Tool - Incredible Focus, Tremendous Productivity!',
    description: 'Simple. Powerful. Amazing. Manage your tasks, track your time, stay in the flow. It\'s that easy, folks!',
    version: 'Latest Version',
    updatedOn: 'Updated',
    selectPlatform: 'Choose Your Platform - All Great Options!',
    download: 'Download',
    downloadNow: 'Download Now',
    directDownload: 'Direct Download',
    orGetFrom: 'or get from',
    mainFeatures: 'Amazing Features - The Best You\'ve Ever Seen!',
    features: {
      immersive: {
        title: 'Incredible Focus Experience',
        description: 'Clean interface, zero distractions. Focus on your tasks, track your time. Get into the flow - it\'s tremendous, believe me!'
      },
      privacy: {
        title: 'Best Privacy Protection',
        description: 'All data stored locally, encrypted backup. Your tasks, your data. Nobody else sees it. The most secure, absolutely tremendous!'
      },
      progress: {
        title: 'Easy Progress Control',
        description: 'Track your time, work at your pace. No pressure, no stress. Just great productivity - the best way to work!'
      },
      free: {
        title: 'Free Forever - Amazing Deal!',
        description: 'All features free forever. No limits, no ads. Just pure productivity. You\'re gonna love it - guaranteed!'
      }
    },
    platforms: {
      android: 'Android',
      ios: 'iOS',
      windows: 'Windows',
      macos: 'Mac OS',
      linux: 'Linux'
    },
    platformDescriptions: {
      android: 'For Android 14 and above',
      ios: 'For iOS 15 and above',
      windows: 'For Windows 10 and above',
      macos: 'For macOS 12+ (Apple Silicon only)',
      linux: 'For Linux (AppImage)'
    },
    stores: {
      googlePlay: 'Apply for Beta Testing',
      appStore: 'Apple App\nStore',
      testFlight: 'TestFlight',
      microsoftStore: 'Microsoft Store',
      snapStore: 'Snap Store',
      flathub: 'Flathub'
    },
    footer: {
      copyright: '© 2025 GranoFlow. All rights reserved.',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      contact: 'Contact Us'
    },
    beta: {
      title: 'Google Play Beta Testing',
      message: 'This app is currently in beta testing. You need to join the beta testing group with your Google Play account to access it.',
      applyForBeta: 'Apply for Beta Testing',
      cancel: 'Cancel'
    },
    comingSoon: 'Coming Soon'
  },
  'zh-CN': {
    appName: 'GranoFlow',
    regionName: '全球',
    tagline: '专注于提高工作效率和专注力的任务管理工具',
    description: '简洁而强大的功能，帮助你轻松管理任务、跟踪进度，维持心流状态',
    version: '最新版本',
    updatedOn: '更新于',
    selectPlatform: '选择您的平台',
    download: '下载',
    downloadNow: '立即下载',
    directDownload: '直接下载',
    orGetFrom: '或从',
    mainFeatures: '主要特性',
    features: {
      immersive: {
        title: '沉浸式工作体验',
        description: '简洁界面无干扰，专注任务与计时。让你全身心投入工作，轻松进入高效心流状态。'
      },
      privacy: {
        title: '数据私有加密',
        description: '所有数据本地存储，加密备份保护隐私。只有你能访问自己的任务，数据安全有保障。'
      },
      progress: {
        title: '轻松掌控进度',
        description: '记录任务时间而非倒计时，按自己的节奏完成工作。跟踪进度不焦虑，专注过程更高效。'
      },
      free: {
        title: '永久免费使用',
        description: '当前所有功能永久免费，不限任务数量。没有广告打扰，专心做好每一件事。'
      }
    },
    platforms: {
      android: 'Android',
      ios: 'iOS',
      windows: 'Windows',
      macos: 'Mac OS',
      linux: 'Linux'
    },
    platformDescriptions: {
      android: '适用于 Android 14 及以上版本',
      ios: '适用于 iOS 15 及以上版本',
      windows: '适用于 Windows 10 及以上版本',
      macos: '适用于 macOS 12+（仅限 Apple Silicon）',
      linux: '适用于 Linux (AppImage)'
    },
    stores: {
      googlePlay: '申请内测',
      appStore: 'App Store',
      testFlight: 'TestFlight',
      microsoftStore: 'Microsoft Store',
      snapStore: 'Snap Store',
      flathub: 'Flathub'
    },
    footer: {
      copyright: '© 2025 GranoFlow. 保留所有权利.',
      privacy: '隐私政策',
      terms: '使用条款',
      contact: '联系我们'
    },
    beta: {
      title: 'Google Play 内测',
      message: '此应用目前处于内测阶段，需要用您的 Google Play 账号加入内测邮件群组。',
      applyForBeta: '申请内测',
      cancel: '取消'
    },
    comingSoon: '敬请期待'
  },
  'zh-HK': {
    appName: 'GranoFlow',
    regionName: '全球',
    tagline: '專注提升工作效率同專注力嘅任務管理工具',
    description: '簡潔又強大嘅功能，幫你輕鬆管理任務、追蹤進度，保持心流狀態',
    version: '最新版本',
    updatedOn: '更新於',
    selectPlatform: '揀你嘅平台',
    download: '下載',
    downloadNow: '即刻下載',
    directDownload: '直接下載',
    orGetFrom: '或從',
    mainFeatures: '主要功能',
    features: {
      immersive: {
        title: '沉浸式工作體驗',
        description: '簡潔介面零干擾，專注任務同計時。令你全情投入工作，輕鬆進入高效心流狀態。'
      },
      privacy: {
        title: '數據私隱加密',
        description: '所有數據本地儲存，加密備份保護私隱。只有你先睇到自己嘅任務，數據安全有保證。'
      },
      progress: {
        title: '輕鬆掌控進度',
        description: '記錄任務時間而非倒數計時，跟住自己嘅節奏完成工作。追蹤進度唔使焦慮，專注過程更高效。'
      },
      free: {
        title: '永久免費使用',
        description: '目前所有功能永久免費，唔限任務數量。冇廣告滋擾，專心做好每件事。'
      }
    },
    platforms: {
      android: 'Android',
      ios: 'iOS',
      windows: 'Windows',
      macos: 'Mac OS',
      linux: 'Linux'
    },
    platformDescriptions: {
      android: '適用於 Android 14 及以上版本',
      ios: '適用於 iOS 15 及以上版本',
      windows: '適用於 Windows 10 及以上版本',
      macos: '適用於 macOS 12+（僅限 Apple Silicon）',
      linux: '適用於 Linux (AppImage)'
    },
    stores: {
      googlePlay: '申請內測',
      appStore: 'App Store',
      testFlight: 'TestFlight',
      microsoftStore: 'Microsoft Store',
      snapStore: 'Snap Store',
      flathub: 'Flathub'
    },
    footer: {
      copyright: '© 2025 GranoFlow. 保留所有權利.',
      privacy: '私隱政策',
      terms: '使用條款',
      contact: '聯絡我哋'
    },
    beta: {
      title: 'Google Play 內測',
      message: '此應用目前處於內測階段，需要用您的 Google Play 帳號加入內測郵件群組。',
      applyForBeta: '申請內測',
      cancel: '取消'
    },
    comingSoon: '敬請期待'
  },
  'zh-TW': {
    appName: 'GranoFlow',
    regionName: '全球',
    tagline: '專注於提升工作效率與專注力的任務管理工具',
    description: '簡約而不失力量的設計，助你從容管理任務、追蹤進度，維持心流的狀態',
    version: '最新版本',
    updatedOn: '更新於',
    selectPlatform: '選擇您的平台',
    download: '下載',
    downloadNow: '立即下載',
    directDownload: '直接下載',
    orGetFrom: '或從',
    mainFeatures: '主要特色',
    features: {
      immersive: {
        title: '沉浸式工作體驗',
        description: '簡潔的介面不受干擾，專注於任務與時間的掌握。讓您全心投入，自然而然地進入高效的心流狀態。'
      },
      privacy: {
        title: '資料隱私加密',
        description: '所有資料在本地儲存，以加密方式備份保護隱私。只有您能夠存取自己的任務，資料安全無虞。'
      },
      progress: {
        title: '從容掌握進度',
        description: '記錄任務時間而非倒數計時，以自己的節奏完成工作。追蹤進度時不感焦慮，專注過程更顯從容。'
      },
      free: {
        title: '永久免費使用',
        description: '目前所有功能永久免費，不限制任務數量。沒有廣告的打擾，專心做好每一件事。'
      }
    },
    platforms: {
      android: 'Android',
      ios: 'iOS',
      windows: 'Windows',
      macos: 'Mac OS',
      linux: 'Linux'
    },
    platformDescriptions: {
      android: '適用於 Android 14 及以上版本',
      ios: '適用於 iOS 15 及以上版本',
      windows: '適用於 Windows 10 及以上版本',
      macos: '適用於 macOS 12+（僅限 Apple Silicon）',
      linux: '適用於 Linux (AppImage)'
    },
    stores: {
      googlePlay: '申請內測',
      appStore: 'App Store',
      testFlight: 'TestFlight',
      microsoftStore: 'Microsoft Store',
      snapStore: 'Snap Store',
      flathub: 'Flathub'
    },
    footer: {
      copyright: '© 2025 GranoFlow. 保留所有權利.',
      privacy: '隱私權政策',
      terms: '使用條款',
      contact: '聯繫我們'
    },
    beta: {
      title: 'Google Play 內測',
      message: '此應用目前處於內測階段，需要用您的 Google Play 帳號加入內測郵件群組。',
      applyForBeta: '申請內測',
      cancel: '取消'
    },
    comingSoon: '敬請期待'
  }
};

export function getDefaultLanguage(): Language {
  if (typeof navigator === 'undefined') return 'zh-CN';
  
  const browserLang = navigator.language.toLowerCase();
  
  if (browserLang.startsWith('en')) return 'en';
  if (browserLang === 'zh-hk' || browserLang === 'zh-mo') return 'zh-HK';
  if (browserLang === 'zh-tw') return 'zh-TW';
  if (browserLang.startsWith('zh')) return 'zh-CN';
  
  return 'zh-CN';
}