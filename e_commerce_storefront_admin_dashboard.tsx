import React, { useState, useEffect, useRef } from 'react';
import { 
  ShoppingBag, ShieldCheck, Zap, User, Settings, Layers, CreditCard, 
  HelpCircle, MessageSquare, Bell, Image as ImageIcon, Search, Trash2, 
  Plus, Edit, Eye, EyeOff, Sparkles, Sliders, CheckCircle, AlertTriangle, 
  ExternalLink, BarChart3, Users, DollarSign, Package, LogOut, ChevronRight, 
  Globe, Moon, Sun, ArrowRight, RefreshCw, Download, Radio, Shield, Star, 
  Check, X, FileText, Lock, Mail, Layout, Grid, List, Key, Play
} from 'lucide-react';

// Custom SVG Icon for Discord to avoid missing icon exports
function DiscordIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.893.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  );
}

// --- INITIAL STATE & MOCK DATA ---
const INITIAL_SETTINGS = {
  // Particles
  particlesEnabled: true,
  particleSpeed: 2,
  particleCount: 25,

  // Dark Mode & Layout
  darkMode: true,
  
  // Custom Cursor
  customCursorEnabled: false,
  customCursorUrl: 'https://cdn-icons-png.flaticon.com/512/1077/1077012.png',

  // Banners & Hero
  bannerHeight: 320, // px
  bannerWidthMode: 'full', // 'full' or 'container'
  welcomeTitle: 'ยินดีต้อนรับสู่ CyberStore Thailand',
  welcomeSubtitle: 'แหล่งรวมสินค้าราคาถูก บอทเกม ไอดีเกม และบริการอัตโนมัติ 24 ชม.',
  welcomeCtaText: 'เลือกซื้อสินค้าเลย',
  welcomeStyle: 'style1', // style1, style2, style3

  // Rainbow Features
  rainbowAuthButtons: true,
  rainbowAnnounceFrame: true,
  rainbowAnnounceBg: true,
  rainbowStatsBg: true,
  rainbowPurchaseCard: true,

  // Card Design
  cardStyle: 'glossy', // glossy, rainbow, minimal
  cardImgPosition: 'top', // top, left, right
  cardDetailPosition: 'inside', // inside, bottom
  cardSize: 'medium', // small, medium, large
  grayscaleOutOfStock: true,
  showWeeklyBestSellers: true,

  // Recent Purchases Marquee
  recentPurchasesScroll: true,
  recentPurchaseStyle: 'rainbow', // rainbow, glass, dark

  // Stats Display
  statsLayout: 'grid-2', // grid-1, grid-2

  // Contact & Placement
  showContactOnHome: true,
  contactOrder: 'bottom', // top, bottom

  // Topup & Warning
  paymentWarning: '⚠️ กรุณาตรวจสอบยอดเงินและหมายเลขบัญชีให้ถูกต้องก่อนทำรายการ หากโอนผิดจะไม่สามารถคืนเงินได้',

  // Popup Announcement Placement
  announcementPopupPages: {
    home: true,
    topup: false,
    products: false
  },

  // Auth Settings
  enableEmailRegister: true,
  enableGoogleLogin: true,
  enableDiscordLogin: true,
  requireGmailDomain: true,
};

const INITIAL_PRODUCTS = [
  {
    id: 'prod-1',
    name: 'Netflix Premium 4K (1 Month Private)',
    category: 'ID Premium',
    price: 120,
    originalPrice: 150,
    image: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=500&q=80',
    stock: 14,
    grayscaleOnOutOfStock: true,
    isBestSeller: true,
    isRecommended: true,
    showOnHome: true,
    description: 'แอคเคาท์ Netflix แบบส่วนตัว ดูได้ 4 จอพร้อมกัน ความคมชัดสูงสุด Ultra HD 4K สตรีมไม่มีสะดุด',
    warranty: 'รับประกันตลอด 30 วัน เปลี่ยนใหม่ทันทีหากมีปัญหา',
    notes: 'ห้ามเปลี่ยนรหัสผ่าน หรือแก้ไขข้อมูลการชำระเงินเด็ดขาด',
    usageGuide: '1. ล็อกอินด้วย Email & Password ที่ได้รับ\n2. เลือก Profile ของท่านแล้วเริ่มรับชมได้ทันที',
    variants: [
      { name: '1 เดือน (1 จอ)', price: 45, image: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=100&q=80' },
      { name: '1 เดือน (ส่วนตัว 4 จอ)', price: 120, image: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=100&q=80' }
    ],
    stockItems: ['net1@mail.com:pass123', 'net2@mail.com:pass456', 'net3@mail.com:pass789']
  },
  {
    id: 'prod-2',
    name: 'YouTube Premium Family Slot (1 Month)',
    category: 'ID Premium',
    price: 35,
    originalPrice: 59,
    image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=500&q=80',
    stock: 0, // หมดเพื่อโชว์ Grayscale
    grayscaleOnOutOfStock: true,
    isBestSeller: true,
    isRecommended: false,
    showOnHome: true,
    description: 'รับดึงเข้ากลุ่มครอบครัว YouTube ฟังเพลง YouTube Music แบบไม่มีโฆษณาคั่น',
    warranty: 'รับประกัน 30 วันเต็ม',
    notes: 'ต้องไม่เคยย้ายครอบครัวเกิน 2 ครั้งในรอบ 1 ปีที่ผ่านมา',
    usageGuide: 'กดยอมรับคำเชิญทาง Email ที่ระบบส่งให้',
    variants: [],
    stockItems: []
  },
  {
    id: 'prod-3',
    name: 'Discord Nitro 1 Month Boost Gift',
    category: 'Key & Gift',
    price: 149,
    originalPrice: 199,
    image: 'https://images.unsplash.com/photo-1614680376593-902f749f7ba3?w=500&q=80',
    stock: 8,
    grayscaleOnOutOfStock: true,
    isBestSeller: false,
    isRecommended: true,
    showOnHome: true,
    description: 'Nitro Boost 2 Server Boosts + Custom Emotes, HD Streaming และสิทธิ์พิเศษมากมาย',
    warranty: 'เคลมโค้ดได้ภายใน 24 ชม. หลังซื้อ',
    notes: 'ใช้งานได้กับบัญชีที่ไม่เคยมี Nitro ในระยะเวลา 12 เดือนล่าสุด',
    usageGuide: 'นำลิงก์ Gift ที่ได้รับไปวางในช่องแชท Discord แล้วกด Claim ได้เลย',
    variants: [],
    stockItems: ['https://discord.gift/mockcode1', 'https://discord.gift/mockcode2']
  }
];

const INITIAL_PURCHASES = [
  { id: 'tx-101', user: 'Somchai_99', product: 'Netflix Premium 4K', amount: 120, time: '2 นาทีที่แล้ว' },
  { id: 'tx-102', user: 'GamerX_Pro', product: 'Discord Nitro 1 Month', amount: 149, time: '5 นาทีที่แล้ว' },
  { id: 'tx-103', user: 'Ninja_TH', product: 'YouTube Premium Slot', amount: 35, time: '12 นาทีที่แล้ว' },
  { id: 'tx-104', user: 'Alex_V', product: 'Netflix Premium 4K', amount: 120, time: '18 นาทีที่แล้ว' },
  { id: 'tx-105', user: 'Karn_Dev', product: 'Discord Nitro 1 Month', amount: 149, time: '25 นาทีที่แล้ว' },
];

const INITIAL_FAQS = [
  { id: 'faq-1', question: 'สั่งซื้อแล้วได้รับสินค้าอย่างไร?', answer: 'ระบบเป็นแบบอัตโนมัติ 24 ชม. หลังจากชำระเงิน สินค้าจะแสดงบนหน้าจอทันทีและเก็บบันทึกไว้ในประวัติการสั่งซื้อของคุณ', showOnHome: true, showOnTopup: true, showOnContact: true, showOnFAQ: true },
  { id: 'faq-2', question: 'เติมเงินผ่านช่องทางไหนได้บ้าง?', answer: 'รองรับการเติมเงินผ่าน TrueMoney Wallet (ซองอั่งเปา), ธนาคารพร้อมเพย์ (Scan QR Code) อัตโนมัติ', showOnHome: true, showOnTopup: true, showOnContact: false, showOnFAQ: true },
  { id: 'faq-3', question: 'สินค้ามีปัญหา ต้องทำอย่างไร?', answer: 'สามารถติดต่อทีมงานผ่านหน้า "ติดต่อเรา" หรือ Discord Support พร้อมแนบเลข Order ID เพื่อขอเคลมสินค้า', showOnHome: true, showOnTopup: false, showOnContact: true, showOnFAQ: true },
];

const INITIAL_RANKS = [
  { id: 'rank-1', name: 'Member', minSpent: 0, discount: 0, badgeColor: 'bg-slate-700' },
  { id: 'rank-2', name: 'VIP Agent', minSpent: 1000, discount: 5, badgeColor: 'bg-indigo-600' },
  { id: 'rank-3', name: 'Gold Partner', minSpent: 5000, discount: 10, badgeColor: 'bg-amber-500' },
];

export default function App() {
  // Navigation State
  const [currentTab, setCurrentTab] = useState('home'); // 'home', 'products', 'topup', 'faq', 'contact', 'admin'
  const [adminTab, setAdminTab] = useState('dashboard'); // 'dashboard', 'products', 'appearance', 'auth', 'topup', 'ranks', 'webhooks', 'export'

  // Application Data States
  const [settings, setSettings] = useState(INITIAL_SETTINGS);
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [purchases, setPurchases] = useState(INITIAL_PURCHASES);
  const [faqs, setFaqs] = useState(INITIAL_FAQS);
  const [ranks, setRanks] = useState(INITIAL_RANKS);
  
  // UI Interaction States
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'register'
  const [currentUser, setCurrentUser] = useState(null);
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const [toastMessage, setToastMessage] = useState(null);

  // Form States for Stock Deletion Feature
  const [deleteStockQuery, setDeleteStockQuery] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);

  // Custom Cursor Style Hook
  useEffect(() => {
    if (settings.customCursorEnabled && settings.customCursorUrl) {
      document.body.style.cursor = `url(${settings.customCursorUrl}), auto`;
    } else {
      document.body.style.cursor = 'default';
    }
  }, [settings.customCursorEnabled, settings.customCursorUrl]);

  // Toast Helper
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Filter Categories
  const categories = ['All', ...new Set(products.map(p => p.category))];

  return (
    <div className={`min-h-screen ${settings.darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-800'} font-sans relative transition-colors duration-300`}>
      
      {/* Background Particles Canvas */}
      {settings.particlesEnabled && <ParticleBackground speed={settings.particleSpeed} count={settings.particleCount} />}

      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-indigo-600 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-bounce">
          <Sparkles className="w-5 h-5" />
          <span className="font-medium text-sm">{toastMessage}</span>
        </div>
      )}

      {/* Announcement Popup */}
      {showAnnouncement && settings.announcementPopupPages[currentTab] && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`max-w-md w-full bg-slate-900 border ${settings.rainbowAnnounceFrame ? 'border-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 p-[2px]' : 'border-slate-800'} rounded-2xl shadow-2xl overflow-hidden`}>
            <div className="bg-slate-900 p-6 rounded-[14px]">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-amber-400 animate-ring" />
                  <h3 className="font-bold text-lg text-white">ประกาศจากทางร้าน</h3>
                </div>
                <button onClick={() => setShowAnnouncement(false)} className="text-slate-400 hover:text-white p-1">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-sm text-slate-300 mb-6 leading-relaxed">
                🎉 ต้อนรับเข้าสู่ระบบเวอร์ชันใหม่! อัปเดตรระบบเติมเงินอัตโนมัติ พร้อมส่วนลดตัวแทนจำหน่ายสูงสุด 10% เมื่อซื้อสินค้าในราคาส่ง
              </p>
              <button 
                onClick={() => setShowAnnouncement(false)}
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 font-medium rounded-xl text-white transition-all duration-200"
              >
                รับทราบและเข้าสู่เว็บไซต์
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Top Navbar */}
      <nav className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-md border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentTab('home')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-white via-indigo-200 to-indigo-400 bg-clip-text text-transparent">
                CYBERSTORE
              </span>
              <span className="text-[10px] block font-mono text-indigo-400 uppercase tracking-widest">Digital Shop</span>
            </div>
          </div>

          {/* Nav Items */}
          <div className="hidden md:flex items-center gap-1 bg-slate-950/50 p-1.5 rounded-full border border-slate-800">
            <NavButton active={currentTab === 'home'} onClick={() => setCurrentTab('home')} icon={<Globe className="w-4 h-4" />}>หน้าหลัก</NavButton>
            <NavButton active={currentTab === 'products'} onClick={() => setCurrentTab('products')} icon={<Package className="w-4 h-4" />}>สินค้าทั้งหมด</NavButton>
            <NavButton active={currentTab === 'topup'} onClick={() => setCurrentTab('topup')} icon={<CreditCard className="w-4 h-4" />}>เติมเงิน</NavButton>
            <NavButton active={currentTab === 'faq'} onClick={() => setCurrentTab('faq')} icon={<HelpCircle className="w-4 h-4" />}>Q&A FAQ</NavButton>
            <NavButton active={currentTab === 'contact'} onClick={() => setCurrentTab('contact')} icon={<MessageSquare className="w-4 h-4" />}>ติดต่อเรา</NavButton>
          </div>

          {/* Actions & User Info */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setCurrentTab(currentTab === 'admin' ? 'home' : 'admin')} 
              className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition"
              title="สลับไปหน้าแอดมิน"
            >
              <Settings className="w-5 h-5 text-indigo-400" />
            </button>

            {currentUser ? (
              <div className="flex items-center gap-3 bg-slate-800/60 pl-3 pr-2 py-1.5 rounded-xl border border-slate-700">
                <div className="text-right">
                  <div className="text-xs font-bold text-white">{currentUser.name}</div>
                  <div className="text-[10px] text-emerald-400 font-mono">฿{currentUser.balance.toFixed(2)}</div>
                </div>
                <button onClick={() => setCurrentUser(null)} className="p-1.5 text-slate-400 hover:text-red-400">
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => { setAuthMode('login'); setShowAuthModal(true); }}
                  className={`px-4 py-2 text-sm font-semibold rounded-xl text-white transition-all shadow-md ${
                    settings.rainbowAuthButtons 
                      ? 'bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:opacity-90 animate-gradient-x' 
                      : 'bg-indigo-600 hover:bg-indigo-500'
                  }`}
                >
                  เข้าสู่ระบบ
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* --- RENDER FRONTEND PAGES --- */}
      {currentTab !== 'admin' && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

          {/* Recent Purchase Marquee Ticker */}
          {settings.recentPurchasesScroll && (
            <div className="mb-8 overflow-hidden rounded-xl bg-slate-900/60 border border-slate-800 p-2 relative">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5 px-3 py-1 bg-indigo-500/20 text-indigo-400 text-xs font-bold rounded-lg whitespace-nowrap">
                  <Sparkles className="w-3.5 h-3.5" /> ล่าสุด
                </span>
                <div className="flex gap-4 animate-marquee whitespace-nowrap overflow-x-auto no-scrollbar">
                  {purchases.map((p) => (
                    <div 
                      key={p.id} 
                      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium ${
                        settings.recentPurchaseStyle === 'rainbow'
                          ? 'bg-gradient-to-r from-indigo-900/40 via-purple-900/40 to-pink-900/40 border border-indigo-500/30 text-indigo-200'
                          : 'bg-slate-800/80 text-slate-300'
                      }`}
                    >
                      <span className="text-slate-400">{p.user}</span>
                      <span className="text-indigo-400">ซื้อ</span>
                      <span className="font-semibold text-white">{p.product}</span>
                      <span className="text-emerald-400 font-mono">฿{p.amount}</span>
                      <span className="text-[10px] text-slate-500">({p.time})</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Custom Banner / Hero Section */}
          {currentTab === 'home' && (
            <div 
              style={{ height: `${settings.bannerHeight}px` }} 
              className="w-full rounded-3xl bg-gradient-to-r from-indigo-900 via-slate-900 to-purple-950 border border-slate-800 relative overflow-hidden mb-12 flex flex-col justify-center px-8 sm:px-12 shadow-2xl"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(99,102,241,0.15),transparent_50%)]" />
              <div className="relative z-10 max-w-2xl">
                <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-semibold rounded-full uppercase tracking-wider mb-4 inline-block">
                  Automated Digital Store
                </span>
                <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4 leading-tight">
                  {settings.welcomeTitle}
                </h1>
                <p className="text-slate-300 text-sm sm:text-base mb-6 leading-relaxed">
                  {settings.welcomeSubtitle}
                </p>
                <div className="flex gap-3">
                  <button 
                    onClick={() => setCurrentTab('products')}
                    className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-indigo-600/30 flex items-center gap-2"
                  >
                    {settings.welcomeCtaText} <ArrowRight className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => setCurrentTab('topup')}
                    className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-xl border border-slate-700 transition"
                  >
                    เติมเงินเครดิต
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Stats Bar (Horizontal 1 row or 2 rows layout) */}
          {currentTab === 'home' && (
            <div className={`grid ${settings.statsLayout === 'grid-1' ? 'grid-cols-1 md:grid-cols-3' : 'grid-cols-2 md:grid-cols-4'} gap-4 mb-12`}>
              <StatCard 
                icon={<Package className="w-6 h-6 text-indigo-400" />} 
                label="สินค้าพร้อมจำหน่าย" 
                value={`${products.reduce((acc, p) => acc + p.stock, 0)} ชิ้น`} 
                rainbow={settings.rainbowStatsBg}
              />
              <StatCard 
                icon={<ShoppingBag className="w-6 h-6 text-emerald-400" />} 
                label="ยอดสั่งซื้อสำเร็จ" 
                value="1,420+ รายการ" 
                rainbow={settings.rainbowStatsBg}
              />
              <StatCard 
                icon={<Users className="w-6 h-6 text-purple-400" />} 
                label="สมาชิกทั้งหมด" 
                value="3,890 คน" 
                rainbow={settings.rainbowStatsBg}
              />
              <StatCard 
                icon={<ShieldCheck className="w-6 h-6 text-amber-400" />} 
                label="สถานะระบบ" 
                value="ออนไลน์ 100%" 
                rainbow={settings.rainbowStatsBg}
              />
            </div>
          )}

          {/* MAIN PAGE CONTENTS BY TAB */}
          {currentTab === 'home' && (
            <div className="space-y-12">
              {/* Weekly Best Sellers (Toggleable) */}
              {settings.showWeeklyBestSellers && (
                <section>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                      <h2 className="text-xl font-bold text-white">สินค้าขายดีประจำสัปดาห์</h2>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.filter(p => p.isBestSeller && p.showOnHome).map(product => (
                      <ProductCard 
                        key={product.id} 
                        product={product} 
                        settings={settings} 
                        onSelect={() => setSelectedProduct(product)} 
                      />
                    ))}
                  </div>
                </section>
              )}

              {/* All Home Products */}
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-white">สินค้าแนะนำหน้าหลัก</h2>
                  <button onClick={() => setCurrentTab('products')} className="text-sm text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1">
                    ดูทั้งหมด <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.filter(p => p.showOnHome).map(product => (
                    <ProductCard 
                      key={product.id} 
                      product={product} 
                      settings={settings} 
                      onSelect={() => setSelectedProduct(product)} 
                    />
                  ))}
                </div>
              </section>

              {/* Home FAQs */}
              <section className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
                <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-indigo-400" /> คำถามที่พบบ่อย (FAQ)
                </h2>
                <div className="space-y-3">
                  {faqs.filter(f => f.showOnHome).map(faq => (
                    <div key={faq.id} className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                      <div className="font-semibold text-slate-200 text-sm mb-1">{faq.question}</div>
                      <div className="text-xs text-slate-400">{faq.answer}</div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Contact Block (Toggleable on Home) */}
              {settings.showContactOnHome && (
                <section className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 p-6 rounded-2xl border border-indigo-500/20 flex flex-col md:flex-row items-center justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-lg text-white">ต้องการความช่วยเหลือเพิ่มเติม?</h3>
                    <p className="text-sm text-slate-300">ทีมงานพร้อมให้บริการและตอบคำถามตลอด 24 ชั่วโมง</p>
                  </div>
                  <button 
                    onClick={() => setCurrentTab('contact')}
                    className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-xl shadow-md whitespace-nowrap"
                  >
                    ติดต่อฝ่ายซัพพอร์ต
                  </button>
                </section>
              )}
            </div>
          )}

          {/* PRODUCTS CATALOG PAGE */}
          {currentTab === 'products' && (
            <div>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                  <h1 className="text-2xl font-bold text-white mb-1">หมวดหมู่สินค้าทั้งหมด</h1>
                  <p className="text-sm text-slate-400">เลือกซื้อสินค้าราคาส่ง ไอดีพรีเมียม และบริการต่างๆ</p>
                </div>
                {/* Category Filter Pills */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                        activeCategory === cat 
                          ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' 
                          : 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-slate-800'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products
                  .filter(p => activeCategory === 'All' || p.category === activeCategory)
                  .map(product => (
                    <ProductCard 
                      key={product.id} 
                      product={product} 
                      settings={settings} 
                      onSelect={() => setSelectedProduct(product)} 
                    />
                  ))}
              </div>
            </div>
          )}

          {/* TOPUP PAGE */}
          {currentTab === 'topup' && (
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
                <h1 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-indigo-400" /> เติมเงินเข้าระบบ
                </h1>
                <p className="text-xs text-slate-400 mb-6">รองรับซองอั่งเปา TrueMoney Wallet และ Scan QR Code พร้อมเพย์</p>

                {/* Payment Warning Banner */}
                {settings.paymentWarning && (
                  <div className="mb-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex gap-3">
                    <AlertTriangle className="w-5 h-5 shrink-0 text-amber-400" />
                    <div>{settings.paymentWarning}</div>
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-2">กรอกลิงก์ซองอั่งเปา TrueMoney Wallet</label>
                    <input 
                      type="text" 
                      placeholder="https://gift.truemoney.com/campaign/?v=..." 
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <button 
                    onClick={() => showToast('ระบบตรวจสอบสลิป/อั่งเปาอัตโนมัติทำงานเรียบร้อยแล้ว')}
                    className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 font-bold rounded-xl text-white shadow-lg transition"
                  >
                    ยืนยันการเติมเงิน
                  </button>
                </div>
              </div>

              {/* FAQs on Topup page */}
              <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
                <h2 className="text-sm font-bold text-white mb-3">ข้อควรรู้เกี่ยวกับการเติมเงิน</h2>
                <div className="space-y-2">
                  {faqs.filter(f => f.showOnTopup).map(f => (
                    <div key={f.id} className="text-xs text-slate-400">• {f.question}: <span className="text-slate-300">{f.answer}</span></div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* FAQ PAGE */}
          {currentTab === 'faq' && (
            <div className="max-w-3xl mx-auto space-y-4">
              <h1 className="text-2xl font-bold text-white mb-6">คำถามที่พบบ่อย (Q&A)</h1>
              {faqs.filter(f => f.showOnFAQ).map(faq => (
                <div key={faq.id} className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
                  <h3 className="font-bold text-indigo-300 text-base mb-2 flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-indigo-400" /> {faq.question}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed pl-6">{faq.answer}</p>
                </div>
              ))}
            </div>
          )}

          {/* CONTACT PAGE */}
          {currentTab === 'contact' && (
            <div className="max-w-xl mx-auto bg-slate-900 p-8 rounded-2xl border border-slate-800 text-center space-y-6">
              <div className="w-16 h-16 bg-indigo-600/20 text-indigo-400 rounded-2xl flex items-center justify-center mx-auto">
                <MessageSquare className="w-8 h-8" />
              </div>
              <h1 className="text-2xl font-bold text-white">ช่องทางการติดต่อฝ่ายบริการลูกค้า</h1>
              <p className="text-sm text-slate-400">ติดปัญหาการใช้งาน ชำระเงินไม่เข้า หรือต้องการสอบถามข้อมูลเพิ่มเติม</p>

              <div className="space-y-3 pt-4">
                <a href="#" className="flex items-center justify-between p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-indigo-500/50 transition">
                  <div className="flex items-center gap-3">
                    <DiscordIcon className="w-5 h-5 text-indigo-400" />
                    <span className="text-sm font-semibold text-white">Discord Community Support</span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-500" />
                </a>
                <a href="#" className="flex items-center justify-between p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-indigo-500/50 transition">
                  <div className="flex items-center gap-3">
                    <MessageSquare className="w-5 h-5 text-emerald-400" />
                    <span className="text-sm font-semibold text-white">Facebook Fanpage</span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-500" />
                </a>
              </div>
            </div>
          )}

        </main>
      )}

      {/* --- RENDER ADMIN BACKOFFICE DASHBOARD (`/admin/*`) --- */}
      {currentTab === 'admin' && (
        <div className="min-h-[calc(100vh-64px)] bg-slate-950 flex flex-col md:flex-row">
          
          {/* Admin Sidebar Navigation */}
          <aside className="w-full md:w-64 bg-slate-900 border-r border-slate-800 p-4 shrink-0">
            <div className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Admin Control Center
            </div>
            <div className="space-y-1">
              <AdminNavButton active={adminTab === 'dashboard'} onClick={() => setAdminTab('dashboard')} icon={<BarChart3 className="w-4 h-4" />}>Dashboard สถิติ</AdminNavButton>
              <AdminNavButton active={adminTab === 'products'} onClick={() => setAdminTab('products')} icon={<Package className="w-4 h-4" />}>จัดการสินค้า & สต็อก</AdminNavButton>
              <AdminNavButton active={adminTab === 'appearance'} onClick={() => setAdminTab('appearance')} icon={<Sliders className="w-4 h-4" />}>จัดการรูปแบบเว็บ (Theme)</AdminNavButton>
              <AdminNavButton active={adminTab === 'auth'} onClick={() => setAdminTab('auth')} icon={<Lock className="w-4 h-4" />}>ตั้งค่าการเข้าสู่ระบบ</AdminNavButton>
              <AdminNavButton active={adminTab === 'topup'} onClick={() => setAdminTab('topup')} icon={<CreditCard className="w-4 h-4" />}>ตั้งค่าการเติมเงิน</AdminNavButton>
              <AdminNavButton active={adminTab === 'ranks'} onClick={() => setAdminTab('ranks')} icon={<Shield className="w-4 h-4" />}>ตั้งค่ายศตัวแทน</AdminNavButton>
              <AdminNavButton active={adminTab === 'webhooks'} onClick={() => setAdminTab('webhooks')} icon={<Radio className="w-4 h-4" />}>Webhook ลูกค้า</AdminNavButton>
              <AdminNavButton active={adminTab === 'export'} onClick={() => setAdminTab('export')} icon={<Download className="w-4 h-4" />}>ส่งออกข้อมูล (Export)</AdminNavButton>
            </div>
          </aside>

          {/* Admin Main Workspace */}
          <main className="flex-1 p-6 md:p-8 overflow-y-auto max-w-6xl">
            
            {/* 1. ADMIN DASHBOARD */}
            {adminTab === 'dashboard' && (
              <div className="space-y-6">
                <h1 className="text-2xl font-bold text-white">แอดมินแดชบอร์ดภาพรวม (New Dashboard UI)</h1>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800">
                    <div className="text-slate-400 text-xs font-medium mb-1">รายได้รวมวันนี้</div>
                    <div className="text-3xl font-extrabold text-emerald-400 font-mono">฿14,250.00</div>
                  </div>
                  <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800">
                    <div className="text-slate-400 text-xs font-medium mb-1">คำสั่งซื้อสำเร็จทั้งหมด</div>
                    <div className="text-3xl font-extrabold text-indigo-400 font-mono">1,420 รายการ</div>
                  </div>
                  <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800">
                    <div className="text-slate-400 text-xs font-medium mb-1">สมาชิกทั้งหมด</div>
                    <div className="text-3xl font-extrabold text-purple-400 font-mono">3,890 บัญชี</div>
                  </div>
                </div>

                {/* Sales Activity */}
                <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
                  <h3 className="font-bold text-white text-base mb-4">กิจกรรมการสั่งซื้อล่าสุด</h3>
                  <div className="space-y-3">
                    {purchases.map(p => (
                      <div key={p.id} className="flex justify-between items-center p-3 bg-slate-950 rounded-xl text-sm border border-slate-800/60">
                        <div>
                          <span className="font-bold text-white">{p.user}</span> สั่งซื้อ <span className="text-indigo-300">{p.product}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-emerald-400 font-mono font-bold">฿{p.amount}</div>
                          <div className="text-[10px] text-slate-500">{p.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 2. PRODUCT MANAGEMENT (`/admin/products`) */}
            {adminTab === 'products' && (
              <div className="space-y-8">
                <div className="flex justify-between items-center">
                  <h1 className="text-2xl font-bold text-white">จัดการสินค้า & สต็อก</h1>
                  <button 
                    onClick={() => {
                      const newProd = {
                        id: `prod-${Date.now()}`,
                        name: 'สินค้าใหม่ตัวอย่าง',
                        category: 'Digital Item',
                        price: 99,
                        originalPrice: 120,
                        image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500&q=80',
                        stock: 5,
                        grayscaleOnOutOfStock: true,
                        isBestSeller: false,
                        isRecommended: false,
                        showOnHome: true,
                        description: 'รายละเอียดสินค้า...',
                        warranty: '7 วัน',
                        notes: 'ข้อควรระวังในการใช้งาน',
                        usageGuide: 'คู่มือการใช้งาน',
                        variants: [],
                        stockItems: ['item1', 'item2']
                      };
                      setProducts([...products, newProd]);
                      showToast('เพิ่มสินค้าใหม่เรียบร้อย');
                    }}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-sm flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" /> เพิ่มสินค้าใหม่
                  </button>
                </div>

                {/* Stock Search & Global Clear Utility */}
                <div className="p-5 bg-red-950/20 border border-red-500/30 rounded-2xl space-y-3">
                  <div className="flex items-center gap-2 text-red-400 font-bold text-sm">
                    <Trash2 className="w-4 h-4" /> ระบบค้นหาและลบสต็อกสินค้าทั้งหมด (Stock Auto-Purge)
                  </div>
                  <p className="text-xs text-slate-400">ใส่คำค้นหาข้อมูลในสต็อก (เช่น password หรือ domain) แล้วระบบจะค้นหาและลบสต็อกสินค้านั้นๆ ที่ตรงกับคำค้นหาทันที</p>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      placeholder="ใส่คำค้นหาในสต็อกที่ต้องการลบ..." 
                      value={deleteStockQuery} 
                      onChange={(e) => setDeleteStockQuery(e.target.value)} 
                      className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white"
                    />
                    <button 
                      onClick={() => {
                        if (!deleteStockQuery) return;
                        setProducts(products.map(p => ({
                          ...p,
                          stockItems: p.stockItems.filter(item => !item.includes(deleteStockQuery)),
                          stock: p.stockItems.filter(item => !item.includes(deleteStockQuery)).length
                        })));
                        showToast(`ลบข้อมูลสต็อกที่มีคำว่า "${deleteStockQuery}" เรียบร้อยแล้ว`);
                        setDeleteStockQuery('');
                      }}
                      className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-xl"
                    >
                      ค้นหาและลบทันที
                    </button>
                  </div>
                </div>

                {/* Products List Table */}
                <div className="space-y-4">
                  {products.map(prod => (
                    <div key={prod.id} className="p-5 bg-slate-900 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <img src={prod.image} className="w-16 h-16 rounded-xl object-cover border border-slate-800" alt="" />
                        <div>
                          <div className="font-bold text-white text-base">{prod.name}</div>
                          <div className="text-xs text-slate-400 flex items-center gap-3 mt-1">
                            <span>หมวดหมู่: <span className="text-indigo-400">{prod.category}</span></span>
                            <span>ราคา: <span className="text-emerald-400 font-mono">฿{prod.price}</span></span>
                            <span>สต็อกคงเหลือ: <span className="font-bold text-white">{prod.stockItems.length}</span></span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 flex-wrap">
                        {/* Toggle Show on Home */}
                        <button 
                          onClick={() => {
                            setProducts(products.map(p => p.id === prod.id ? { ...p, showOnHome: !p.showOnHome } : p));
                          }}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium border ${prod.showOnHome ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30' : 'bg-slate-800 text-slate-500 border-slate-700'}`}
                        >
                          {prod.showOnHome ? 'แสดงหน้าหลัก' : 'ซ่อนจากหน้าหลัก'}
                        </button>

                        {/* Toggle Grayscale on Out of Stock */}
                        <button 
                          onClick={() => {
                            setProducts(products.map(p => p.id === prod.id ? { ...p, grayscaleOnOutOfStock: !p.grayscaleOnOutOfStock } : p));
                          }}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium border ${prod.grayscaleOnOutOfStock ? 'bg-purple-500/20 text-purple-300 border-purple-500/30' : 'bg-slate-800 text-slate-500 border-slate-700'}`}
                        >
                          Grayscale สต็อกหมด
                        </button>

                        <button 
                          onClick={() => setEditingProduct(prod)}
                          className="p-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-slate-300"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. APPEARANCE MANAGEMENT (`/admin/settings-appearance`) */}
            {adminTab === 'appearance' && (
              <div className="space-y-8">
                <div>
                  <h1 className="text-2xl font-bold text-white mb-1">จัดการรูปแบบเว็บ & ดีไซน์ (Settings Appearance)</h1>
                  <p className="text-sm text-slate-400">ปรับแต่ง Particles, Custom Cursor, Rainbow Theme, Card Layouts และขนาด Banners</p>
                </div>

                {/* Section A: Banner & Hero Customization */}
                <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
                  <h2 className="text-base font-bold text-white flex items-center gap-2">
                    <ImageIcon className="w-5 h-5 text-indigo-400" /> ปรับขนาดแบนเนอร์ & UI ต้อนรับ
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-2">ความสูงแบนเนอร์ (Banner Height): {settings.bannerHeight}px</label>
                      <input 
                        type="range" 
                        min="200" 
                        max="500" 
                        value={settings.bannerHeight} 
                        onChange={(e) => setSettings({ ...settings, bannerHeight: Number(e.target.value) })}
                        className="w-full accent-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-2">ข้อความหัวเรื่องต้อนรับ (Welcome Title)</label>
                      <input 
                        type="text" 
                        value={settings.welcomeTitle} 
                        onChange={(e) => setSettings({ ...settings, welcomeTitle: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Section B: Particles & Custom Cursor */}
                <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
                  <h2 className="text-base font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-purple-400" /> ระบบ Particles & รูปเคอร์เซอร์เมาส์ (Custom Cursor)
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex items-center justify-between p-4 bg-slate-950 rounded-xl border border-slate-800">
                      <div>
                        <div className="text-sm font-semibold text-white">เปิด/ปิด Particles พื้นหลัง</div>
                        <div className="text-xs text-slate-500">แสดงเอฟเฟกต์อนุภาคเคลื่อนไหว</div>
                      </div>
                      <input 
                        type="checkbox" 
                        checked={settings.particlesEnabled} 
                        onChange={(e) => setSettings({ ...settings, particlesEnabled: e.target.checked })}
                        className="w-5 h-5 accent-indigo-600 rounded"
                      />
                    </div>

                    <div className="space-y-2 p-4 bg-slate-950 rounded-xl border border-slate-800">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-white">รูปเคอร์เซอร์เมาส์ (Custom Cursor)</span>
                        <input 
                          type="checkbox" 
                          checked={settings.customCursorEnabled} 
                          onChange={(e) => setSettings({ ...settings, customCursorEnabled: e.target.checked })}
                          className="w-5 h-5 accent-indigo-600 rounded"
                        />
                      </div>
                      <input 
                        type="text" 
                        placeholder="URL รูปภาพ Cursor (.png)" 
                        value={settings.customCursorUrl} 
                        onChange={(e) => setSettings({ ...settings, customCursorUrl: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Section C: Rainbow Toggles */}
                <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
                  <h2 className="text-base font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-amber-400" /> ตั้งค่าเอฟเฟกต์สีสายรุ้ง (Rainbow Styling Options)
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <RainbowToggle 
                      label="ปุ่มเข้าสู่ระบบสีสายรุ้ง" 
                      checked={settings.rainbowAuthButtons} 
                      onChange={(v) => setSettings({ ...settings, rainbowAuthButtons: v })} 
                    />
                    <RainbowToggle 
                      label="กรอบประกาศสายรุ้ง" 
                      checked={settings.rainbowAnnounceFrame} 
                      onChange={(v) => setSettings({ ...settings, rainbowAnnounceFrame: v })} 
                    />
                    <RainbowToggle 
                      label="การ์ดสถิติสีสายรุ้ง" 
                      checked={settings.rainbowStatsBg} 
                      onChange={(v) => setSettings({ ...settings, rainbowStatsBg: v })} 
                    />
                    <RainbowToggle 
                      label="ประวัติซื้อขายสีสายรุ้ง" 
                      checked={settings.rainbowPurchaseCard} 
                      onChange={(v) => setSettings({ ...settings, rainbowPurchaseCard: v })} 
                    />
                  </div>
                </div>

                {/* Section D: Card Layout Customization */}
                <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
                  <h2 className="text-base font-bold text-white flex items-center gap-2">
                    <Layout className="w-5 h-5 text-indigo-400" /> ปรับดีไซน์การ์ดสินค้า (Card Layout & Positioning)
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-2">ตำแหน่งรูปภาพสินค้า</label>
                      <select 
                        value={settings.cardImgPosition} 
                        onChange={(e) => setSettings({ ...settings, cardImgPosition: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white"
                      >
                        <option value="top">ด้านบน (Top Banner)</option>
                        <option value="left">ด้านซ้าย (Left Side)</option>
                        <option value="right">ด้านขวา (Right Side)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-2">การแสดงผลประวัติการซื้อขาย</label>
                      <select 
                        value={settings.recentPurchasesScroll ? 'scroll' : 'static'} 
                        onChange={(e) => setSettings({ ...settings, recentPurchasesScroll: e.target.value === 'scroll' })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white"
                      >
                        <option value="scroll">เลื่อนอัตโนมัติ (Horizontal Scroll Marquee)</option>
                        <option value="static">แบบกล่องคงที่ (Static List)</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button 
                    onClick={() => showToast('บันทึกการตั้งค่ารูปแบบเว็บไซต์เรียบร้อย')}
                    className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 font-bold text-white text-sm rounded-xl shadow-lg"
                  >
                    บันทึกการตั้งค่าทั้งหมด
                  </button>
                </div>
              </div>
            )}

            {/* 4. AUTH SETTINGS (`/admin/settings-auth`) */}
            {adminTab === 'auth' && (
              <div className="space-y-6">
                <h1 className="text-2xl font-bold text-white">ตั้งค่าการเข้าสู่ระบบ (Auth Settings)</h1>
                <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between p-4 bg-slate-950 rounded-xl border border-slate-800">
                    <div>
                      <div className="text-sm font-semibold text-white">เปิด/ปิด การสมัครด้วยอีเมล (Email Signup)</div>
                      <div className="text-xs text-slate-500">อนุญาตให้ผู้ใช้สมัครสมาชิกผ่าน Email/Password</div>
                    </div>
                    <input 
                      type="checkbox" 
                      checked={settings.enableEmailRegister} 
                      onChange={(e) => setSettings({ ...settings, enableEmailRegister: e.target.checked })}
                      className="w-5 h-5 accent-indigo-600 rounded"
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-slate-950 rounded-xl border border-slate-800">
                    <div>
                      <div className="text-sm font-semibold text-white">ตรวจสอบอีเมลจริง (@gmail.com Check)</div>
                      <div className="text-xs text-slate-500">บังคับให้สมัครด้วยอีเมลลงท้ายด้วย @gmail.com เท่านั้น</div>
                    </div>
                    <input 
                      type="checkbox" 
                      checked={settings.requireGmailDomain} 
                      onChange={(e) => setSettings({ ...settings, requireGmailDomain: e.target.checked })}
                      className="w-5 h-5 accent-indigo-600 rounded"
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-slate-950 rounded-xl border border-slate-800">
                    <div>
                      <div className="text-sm font-semibold text-white">เข้าสู่ระบบด้วย Google OAuth</div>
                      <div className="text-xs text-slate-500">แสดงปุ่ม Login With Google</div>
                    </div>
                    <input 
                      type="checkbox" 
                      checked={settings.enableGoogleLogin} 
                      onChange={(e) => setSettings({ ...settings, enableGoogleLogin: e.target.checked })}
                      className="w-5 h-5 accent-indigo-600 rounded"
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-slate-950 rounded-xl border border-slate-800">
                    <div>
                      <div className="text-sm font-semibold text-white">เข้าสู่ระบบด้วย Discord OAuth</div>
                      <div className="text-xs text-slate-500">แสดงปุ่ม Login With Discord</div>
                    </div>
                    <input 
                      type="checkbox" 
                      checked={settings.enableDiscordLogin} 
                      onChange={(e) => setSettings({ ...settings, enableDiscordLogin: e.target.checked })}
                      className="w-5 h-5 accent-indigo-600 rounded"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 5. TOPUP SETTINGS (`/admin/topup`) */}
            {adminTab === 'topup' && (
              <div className="space-y-6">
                <h1 className="text-2xl font-bold text-white">ตั้งค่าการเติมเงิน & คำเตือนชำระเงิน</h1>
                <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-2">ข้อความคำเตือนในการชำระเงิน (Payment Warning Alert)</label>
                    <textarea 
                      rows={3} 
                      value={settings.paymentWarning} 
                      onChange={(e) => setSettings({ ...settings, paymentWarning: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs text-white"
                    />
                  </div>
                  <button 
                    onClick={() => showToast('บันทึกคำเตือนการชำระเงินเรียบร้อย')}
                    className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 font-bold text-white text-xs rounded-xl"
                  >
                    บันทึกข้อความ
                  </button>
                </div>
              </div>
            )}

            {/* 6. AGENT RANKS (`/admin/ranks`) */}
            {adminTab === 'ranks' && (
              <div className="space-y-6">
                <h1 className="text-2xl font-bold text-white">ตั้งค่ายศตัวแทนจำหน่าย (Reseller Ranks)</h1>
                <div className="space-y-4">
                  {ranks.map(r => (
                    <div key={r.id} className="p-5 bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 text-xs font-bold text-white rounded-lg ${r.badgeColor}`}>{r.name}</span>
                        <span className="text-xs text-slate-400">ยอดเติมเงินสะสมขั้นต่ำ: <span className="font-mono text-emerald-400">฿{r.minSpent}</span></span>
                      </div>
                      <div className="text-sm font-bold text-indigo-400">ส่วนลดสินค้า: {r.discount}%</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 7. WEBHOOKS & EXPORT */}
            {adminTab === 'webhooks' && (
              <div className="space-y-6">
                <h1 className="text-2xl font-bold text-white">ระบบ Webhook แจ้งเตือนสั่งซื้อ</h1>
                <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-2">Discord Webhook URL</label>
                    <input 
                      type="text" 
                      placeholder="https://discord.com/api/webhooks/..." 
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white"
                    />
                  </div>
                  <button onClick={() => showToast('ทดสอบการส่ง Webhook สำเร็จ')} className="px-4 py-2 bg-indigo-600 font-bold text-white text-xs rounded-xl">
                    ส่งข้อความทดสอบ
                  </button>
                </div>
              </div>
            )}

            {adminTab === 'export' && (
              <div className="space-y-6">
                <h1 className="text-2xl font-bold text-white">ระบบส่งออกข้อมูล (Advanced Export)</h1>
                <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
                  <p className="text-xs text-slate-400">เลือกระบบที่ต้องการดาวน์โหลดรายงานในรูปแบบ CSV / JSON</p>
                  <div className="flex gap-3">
                    <button onClick={() => showToast('ส่งออกรายงานประวัติการสั่งซื้อเรียบร้อย')} className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 font-bold text-xs text-white rounded-xl border border-slate-700 flex items-center gap-2">
                      <Download className="w-4 h-4" /> Export Sales Orders (CSV)
                    </button>
                    <button onClick={() => showToast('ส่งออกรายงานสต็อกสินค้าเรียบร้อย')} className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 font-bold text-xs text-white rounded-xl border border-slate-700 flex items-center gap-2">
                      <Download className="w-4 h-4" /> Export Stock Data (JSON)
                    </button>
                  </div>
                </div>
              </div>
            )}

          </main>
        </div>
      )}

      {/* --- MODALS --- */}

      {/* Product Detail & Buy Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-2xl w-full bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="p-6 border-b border-slate-800 flex justify-between items-start">
              <div className="flex gap-4">
                <img src={selectedProduct.image} className="w-16 h-16 rounded-xl object-cover border border-slate-800" alt="" />
                <div>
                  <h3 className="font-bold text-lg text-white">{selectedProduct.name}</h3>
                  <div className="text-xs text-indigo-400">{selectedProduct.category}</div>
                  <div className="text-xl font-extrabold text-emerald-400 font-mono mt-1">฿{selectedProduct.price}</div>
                </div>
              </div>
              <button onClick={() => setSelectedProduct(null)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 text-xs text-slate-300">
              <div>
                <div className="font-bold text-white mb-1">รายละเอียดสินค้า</div>
                <p className="leading-relaxed text-slate-400">{selectedProduct.description}</p>
              </div>

              {selectedProduct.warranty && (
                <div className="p-3 bg-indigo-950/30 border border-indigo-500/20 rounded-xl">
                  <div className="font-bold text-indigo-300">ระยะเวลาประกัน</div>
                  <div>{selectedProduct.warranty}</div>
                </div>
              )}

              {selectedProduct.notes && (
                <div className="p-3 bg-amber-950/30 border border-amber-500/20 rounded-xl text-amber-300">
                  <div className="font-bold">หมายเหตุสำคัญ</div>
                  <div>{selectedProduct.notes}</div>
                </div>
              )}

              {selectedProduct.usageGuide && (
                <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl">
                  <div className="font-bold text-white mb-1">วิธีการใช้งานสินค้า</div>
                  <pre className="font-sans whitespace-pre-wrap text-slate-400">{selectedProduct.usageGuide}</pre>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-slate-800 bg-slate-950 flex justify-end gap-3">
              <button onClick={() => setSelectedProduct(null)} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold">
                ยกเลิก
              </button>
              <button 
                onClick={() => {
                  setSelectedProduct(null);
                  showToast(`สั่งซื้อ ${selectedProduct.name} สำเร็จแล้ว!`);
                }}
                disabled={selectedProduct.stock <= 0}
                className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 text-white rounded-xl text-xs font-bold shadow-lg"
              >
                {selectedProduct.stock > 0 ? 'ยืนยันการสั่งซื้อทันที' : 'สินค้าหมด'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Authentication Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl relative">
            <button onClick={() => setShowAuthModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-bold text-xl text-white mb-2">{authMode === 'login' ? 'เข้าสู่ระบบ' : 'สมัครสมาชิกใหม่'}</h3>
            <p className="text-xs text-slate-400 mb-6">กรอกข้อมูลเพื่อเข้าสู่บัญชีของคุณ</p>

            {/* Social Logins */}
            <div className="space-y-2 mb-6">
              {settings.enableGoogleLogin && (
                <button 
                  onClick={() => {
                    setCurrentUser({ name: 'Google User', balance: 500 });
                    setShowAuthModal(false);
                    showToast('เข้าสู่ระบบด้วย Google สำเร็จ');
                  }}
                  className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-xs font-semibold text-white flex items-center justify-center gap-2"
                >
                  <Globe className="w-4 h-4 text-red-400" /> Continue with Google
                </button>
              )}
              {settings.enableDiscordLogin && (
                <button 
                  onClick={() => {
                    setCurrentUser({ name: 'Discord Gamer', balance: 1000 });
                    setShowAuthModal(false);
                    showToast('เข้าสู่ระบบด้วย Discord สำเร็จ');
                  }}
                  className="w-full py-2.5 bg-indigo-900/50 hover:bg-indigo-900 border border-indigo-700 rounded-xl text-xs font-semibold text-white flex items-center justify-center gap-2"
                >
                  <DiscordIcon className="w-4 h-4 text-indigo-400" /> Login with Discord
                </button>
              )}
            </div>

            {/* Email Pass Form */}
            <form onSubmit={(e) => {
              e.preventDefault();
              setCurrentUser({ name: 'Member_01', balance: 250 });
              setShowAuthModal(false);
              showToast('เข้าสู่ระบบสำเร็จแล้ว');
            }} className="space-y-3">
              <div>
                <label className="block text-xs text-slate-300 mb-1">อีเมลผู้ใช้งาน</label>
                <input 
                  type="email" 
                  required
                  placeholder={settings.requireGmailDomain ? "yourname@gmail.com" : "email@example.com"} 
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-300 mb-1">รหัสผ่าน</label>
                <input 
                  type="password" 
                  required
                  placeholder="••••••••" 
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
              <button 
                type="submit" 
                className={`w-full py-3 font-bold rounded-xl text-xs text-white shadow-lg mt-2 ${
                  settings.rainbowAuthButtons 
                    ? 'bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:opacity-90' 
                    : 'bg-indigo-600 hover:bg-indigo-500'
                }`}
              >
                {authMode === 'login' ? 'เข้าสู่ระบบ' : 'ยืนยันการสมัครสมาชิก'}
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

// --- SUB-COMPONENTS ---

// Canvas Background Particles Component
function ParticleBackground({ speed, count }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2 + 1,
      vx: (Math.random() - 0.5) * speed * 0.5,
      vy: (Math.random() - 0.5) * speed * 0.5,
      alpha: Math.random() * 0.5 + 0.2
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(129, 140, 248, ${p.alpha})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [speed, count]);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-60" />;
}

// Product Card Component
function ProductCard({ product, settings, onSelect }) {
  const isOutOfStock = product.stock <= 0;
  const useGrayscale = isOutOfStock && settings.grayscaleOutOfStock && product.grayscaleOnOutOfStock;

  return (
    <div 
      onClick={onSelect}
      className={`group cursor-pointer rounded-2xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-lg hover:shadow-indigo-500/10 ${
        settings.cardStyle === 'rainbow' ? 'bg-gradient-to-b from-slate-900 via-slate-900 to-indigo-950/40' : ''
      }`}
    >
      <div>
        <div className="relative overflow-hidden aspect-video bg-slate-950">
          <img 
            src={product.image} 
            alt={product.name}
            className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${
              useGrayscale ? 'grayscale contrast-125 opacity-60' : ''
            }`} 
          />
          {product.isBestSeller && (
            <span className="absolute top-3 left-3 px-2.5 py-1 bg-amber-500 text-slate-950 text-[10px] font-extrabold rounded-md shadow-md uppercase tracking-wider">
              Best Seller
            </span>
          )}
          {isOutOfStock && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center">
              <span className="px-3 py-1 bg-red-600 text-white font-extrabold text-xs rounded-lg uppercase tracking-widest shadow-lg">
                สินค้าหมด (Out of Stock)
              </span>
            </div>
          )}
        </div>

        <div className="p-5">
          <div className="text-[10px] font-mono font-semibold text-indigo-400 mb-1">{product.category}</div>
          <h3 className="font-bold text-white text-base leading-snug line-clamp-1 group-hover:text-indigo-300 transition-colors">
            {product.name}
          </h3>
          <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>
      </div>

      <div className="px-5 pb-5 pt-2 border-t border-slate-800/60 flex items-center justify-between">
        <div>
          <span className="text-xs text-slate-500 line-through mr-1.5">฿{product.originalPrice}</span>
          <span className="text-lg font-extrabold text-emerald-400 font-mono">฿{product.price}</span>
        </div>
        <button 
          disabled={isOutOfStock}
          className="px-4 py-2 bg-indigo-600 group-hover:bg-indigo-500 disabled:bg-slate-800 text-white text-xs font-semibold rounded-xl transition shadow-md flex items-center gap-1.5"
        >
          <ShoppingBag className="w-3.5 h-3.5" /> สั่งซื้อ
        </button>
      </div>
    </div>
  );
}

// Nav Buttons
function NavButton({ active, onClick, icon, children }) {
  return (
    <button 
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-2 transition-all ${
        active 
          ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30' 
          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
      }`}
    >
      {icon}
      {children}
    </button>
  );
}

function AdminNavButton({ active, onClick, icon, children }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-3 transition-all ${
        active 
          ? 'bg-indigo-600 text-white shadow-md' 
          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
      }`}
    >
      {icon}
      {children}
    </button>
  );
}

// Stat Card
function StatCard({ icon, label, value, rainbow }) {
  return (
    <div className={`p-5 rounded-2xl border transition-all ${
      rainbow 
        ? 'bg-gradient-to-br from-indigo-950/40 via-slate-900 to-purple-950/40 border-indigo-500/30 shadow-lg' 
        : 'bg-slate-900 border-slate-800'
    }`}>
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800">{icon}</div>
        <div className="text-xs text-slate-400 font-medium">{label}</div>
      </div>
      <div className="text-2xl font-extrabold text-white font-mono">{value}</div>
    </div>
  );
}

// Rainbow Toggle Switch Row
function RainbowToggle({ label, checked, onChange }) {
  return (
    <div className="flex items-center justify-between p-3.5 bg-slate-950 rounded-xl border border-slate-800">
      <span className="text-xs font-medium text-slate-200">{label}</span>
      <input 
        type="checkbox" 
        checked={checked} 
        onChange={(e) => onChange(e.target.checked)}
        className="w-4 h-4 accent-indigo-600 rounded"
      />
    </div>
  );
}