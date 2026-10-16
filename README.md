# Notza.shop.xyz
<!DOCTYPE html>
<html lang="th" class="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SURE STORE - Premium Online Store & Admin Dashboard</title>
    
    <!-- Tailwind CSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            darkMode: 'class',
            theme: {
                extend: {
                    colors: {
                        brand: {
                            50: '#f0fdf4',
                            500: '#22c55e',
                            600: '#16a34a',
                            700: '#15803d',
                        }
                    },
                    animation: {
                        'rainbow-border': 'rainbow 6s linear infinite',
                        'float': 'float 3s ease-in-out infinite',
                    },
                    keyframes: {
                        rainbow: {
                            '0%, 100%': { 'background-position': '0% 50%' },
                            '50%': { 'background-position': '100% 50%' },
                        },
                        float: {
                            '0%, 100%': { transform: 'translateY(0px)' },
                            '50%': { transform: 'translateY(-6px)' },
                        }
                    }
                }
            }
        }
    </script>

    <!-- FontAwesome & Google Fonts -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;500;600;700&display=swap" rel="stylesheet">

    <!-- Particles.js CDN -->
    <script src="https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js"></script>

    <style>
        body {
            font-family: 'Kanit', sans-serif;
            overflow-x: hidden;
            user-select: none;
        }

        /* Custom Cursor Rule Dynamic Injection Target */
        #custom-cursor-style {
            /* Will be dynamically updated from JS */
        }

        /* Rainbow Border Effect */
        .rainbow-gradient-bg {
            background: linear-gradient(124deg, #ff2400, #e81d1d, #e8b71d, #e3e81d, #1de840, #1ddde8, #2b1de8, #dd00f3, #dd00f3);
            background-size: 180% 180%;
            animation: rainbow 6s ease infinite;
        }

        .rainbow-card-border {
            position: relative;
            background-clip: padding-box;
            border: 2px solid transparent;
        }
        .rainbow-card-border::before {
            content: '';
            position: absolute;
            top: -2px; right: -2px; bottom: -2px; left: -2px;
            z-index: -1;
            margin: -2px;
            border-radius: inherit;
            background: linear-gradient(124deg, #ff2400, #e8b71d, #1de840, #1ddde8, #dd00f3);
            background-size: 200% 200%;
            animation: rainbow 4s linear infinite;
        }

        /* Canvas Particle Container */
        #particles-js {
            position: fixed;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            z-index: 0;
            pointer-events: none;
        }

        /* Scrollbar Styling */
        ::-webkit-scrollbar {
            width: 6px;
            height: 6px;
        }
        ::-webkit-scrollbar-track {
            background: rgba(15, 23, 42, 0.6);
        }
        ::-webkit-scrollbar-thumb {
            background: #334155;
            border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
            background: #475569;
        }
    </style>
    <style id="dynamic-cursor-holder"></style>
</head>
<body class="bg-slate-950 text-slate-100 min-h-screen flex flex-col relative antialiased selection:bg-purple-600 selection:text-white">

    <!-- Particle Background -->
    <div id="particles-js"></div>

    <!-- Application Shell Container -->
    <div class="relative z-10 flex flex-col min-h-screen">
        
        <!-- Navigation Header -->
        <header class="sticky top-0 z-40 backdrop-blur-md bg-slate-900/80 border-b border-slate-800/80 transition-all">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex items-center justify-between h-16">
                    
                    <!-- Brand Logo -->
                    <div class="flex items-center space-x-3 cursor-pointer" onclick="navigateTo('store')">
                        <div class="w-10 h-10 rounded-xl rainbow-gradient-bg flex items-center justify-center shadow-lg shadow-purple-500/20">
                            <i class="fa-solid fa-gamepad text-xl text-white"></i>
                        </div>
                        <span class="font-bold text-xl tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300">
                            SURE STORE
                        </span>
                    </div>

                    <!-- Store Navigation Links -->
                    <nav class="hidden md:flex space-x-1">
                        <button onclick="navigateTo('store')" id="nav-store" class="px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-slate-800 text-purple-400">
                            <i class="fa-solid fa-store mr-1.5"></i> หน้าร้านค้า
                        </button>
                        <button onclick="navigateTo('preorders')" id="nav-preorders" class="px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-slate-800 text-slate-300">
                            <i class="fa-solid fa-clock-rotate-left mr-1.5"></i> สินค้า Pre-Order
                        </button>
                        <button onclick="navigateTo('faq')" id="nav-faq" class="px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-slate-800 text-slate-300">
                            <i class="fa-solid fa-circle-question mr-1.5"></i> FAQ คำถามที่พบบ่อย
                        </button>
                    </nav>

                    <!-- User Profile & Action Controls -->
                    <div class="flex items-center space-x-3">
                        
                        <!-- Toggle Mode Admin/User Button -->
                        <button onclick="toggleAdminView()" id="btn-toggle-admin" class="px-3 py-1.5 rounded-lg text-xs font-semibold rainbow-card-border bg-slate-900 text-slate-200 hover:text-white transition-all shadow-sm">
                            <i class="fa-solid fa-user-gear mr-1 text-amber-400"></i> <span id="admin-toggle-text">เข้าสู่ระบบแอดมิน</span>
                        </button>

                        <!-- User Wallet Summary / Rank -->
                        <div id="user-info-bar" class="hidden md:flex items-center space-x-2 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700/60">
                            <div class="text-xs">
                                <div class="text-slate-400 flex items-center justify-between">
                                    <span id="user-display-name" class="font-medium text-slate-200">Guest User</span>
                                    <span id="user-rank-badge" class="ml-1 text-[10px] px-1.5 py-0.2 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded">Bronze Agent</span>
                                </div>
                                <div class="font-bold text-emerald-400 flex items-center space-x-1">
                                    <i class="fa-solid fa-wallet text-xs"></i>
                                    <span id="user-balance-display">฿0.00</span>
                                </div>
                            </div>
                            <button onclick="openTopupModal()" class="w-7 h-7 rounded-lg bg-emerald-600/80 hover:bg-emerald-500 flex items-center justify-center text-white text-xs transition-colors" title="เติมเงิน">
                                <i class="fa-solid fa-plus"></i>
                            </button>
                        </div>

                        <!-- Login Modal Trigger / Avatar -->
                        <div id="auth-btn-container">
                            <button onclick="openLoginModal()" class="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-medium text-sm transition-all shadow-md shadow-purple-900/30">
                                <i class="fa-solid fa-right-to-bracket mr-1.5"></i> เข้าสู่ระบบ
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </header>

        <!-- Main Dynamic Content Container -->
        <main class="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
            
            <!-- VIEW 1: STORE FRONT PAGE -->
            <div id="view-store" class="space-y-8 transition-opacity duration-300">
                
                <!-- Category 960x300 Banners Carousel / Display -->
                <div class="relative w-full overflow-hidden rounded-2xl border border-slate-800 shadow-2xl rainbow-card-border">
                    <div class="w-full h-[220px] sm:h-[300px] relative bg-slate-900">
                        <img id="category-banner-img" src="https://placehold.co/960x300/1e1b4b/818cf8?text=GAME+CARDS+%26+VIP+TOP-UP+STORE" class="w-full h-full object-cover transition-all duration-500" alt="Category Banner">
                        <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex flex-col justify-end p-6">
                            <span id="category-banner-tag" class="text-xs uppercase tracking-widest font-semibold text-purple-400 mb-1">หมวดหมู่แนะนำพิเศษ</span>
                            <h2 id="category-banner-title" class="text-2xl sm:text-3xl font-extrabold text-white">ศูนย์รวมสินค้าดิจิทัลความเร็วสูง</h2>
                            <p id="category-banner-desc" class="text-slate-300 text-sm mt-1 max-w-2xl hidden sm:block">รับประกันส่งออเดอร์ทันทีหลังชำระเงิน พร้อมส่วนลดพิเศษตามระดับ Agent Rank</p>
                        </div>
                    </div>
                </div>

                <!-- Quick Horizontal Stats Bar -->
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div class="bg-slate-900/90 border border-slate-800 rounded-xl p-4 flex items-center space-x-3 shadow-sm">
                        <div class="w-10 h-10 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center text-xl">
                            <i class="fa-solid fa-bolt"></i>
                        </div>
                        <div>
                            <div class="text-xs text-slate-400">จัดส่งอัตโนมัติ</div>
                            <div class="font-bold text-slate-200">24/7 ทันที</div>
                        </div>
                    </div>
                    <div class="bg-slate-900/90 border border-slate-800 rounded-xl p-4 flex items-center space-x-3 shadow-sm">
                        <div class="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-xl">
                            <i class="fa-solid fa-shield-halved"></i>
                        </div>
                        <div>
                            <div class="text-xs text-slate-400">ความปลอดภัย</div>
                            <div class="font-bold text-slate-200">รับประกัน 100%</div>
                        </div>
                    </div>
                    <div class="bg-slate-900/90 border border-slate-800 rounded-xl p-4 flex items-center space-x-3 shadow-sm">
                        <div class="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center text-xl">
                            <i class="fa-solid fa-crown"></i>
                        </div>
                        <div>
                            <div class="text-xs text-slate-400">ระดับ Agent</div>
                            <div class="font-bold text-slate-200">ลดสูงสุด 15%</div>
                        </div>
                    </div>
                    <div class="bg-slate-900/90 border border-slate-800 rounded-xl p-4 flex items-center space-x-3 shadow-sm">
                        <div class="w-10 h-10 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center text-xl">
                            <i class="fa-solid fa-headset"></i>
                        </div>
                        <div>
                            <div class="text-xs text-slate-400">ทีมงานบริการ</div>
                            <div class="font-bold text-slate-200">พร้อมดูแลเสมอ</div>
                        </div>
                    </div>
                </div>

                <!-- Products Filter & Search Header -->
                <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                    <div class="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0" id="category-pills">
                        <!-- Category Filter Buttons Generated via JS -->
                    </div>
                    <div class="relative w-full md:w-72">
                        <input type="text" id="store-search-input" onkeyup="renderStoreProducts()" placeholder="ค้นหาสินค้าทั้งหมด..." class="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-sm text-slate-200 focus:outline-none focus:border-purple-500 transition-colors">
                        <i class="fa-solid fa-magnifying-glass absolute left-3 top-3 text-slate-500 text-xs"></i>
                    </div>
                </div>

                <!-- Main Products Grid (380x380 cards design optimized) -->
                <div>
                    <h3 class="text-lg font-bold text-slate-100 mb-4 flex items-center">
                        <i class="fa-solid fa-fire text-amber-500 mr-2"></i> รายการสินค้าพร้อมส่ง
                    </h3>
                    <div id="products-grid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        <!-- Dynamic 380x380 Product Cards Rendered Here -->
                    </div>
                </div>

                <!-- Recommended Products Carousel Section -->
                <div class="pt-6 border-t border-slate-800">
                    <h3 class="text-lg font-bold text-slate-100 mb-4 flex items-center">
                        <i class="fa-solid fa-star text-purple-400 mr-2"></i> สินค้าแนะนำพิเศษสำหรับคุณ
                    </h3>
                    <div id="recommended-products-grid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <!-- Dynamic Recommended Product Cards -->
                    </div>
                </div>

            </div>

            <!-- VIEW 2: PRE-ORDER PRODUCTS PAGE -->
            <div id="view-preorders" class="hidden space-y-6">
                <div class="bg-gradient-to-r from-purple-900/40 via-slate-900 to-indigo-900/40 border border-purple-500/20 rounded-2xl p-6 mb-6">
                    <h2 class="text-2xl font-bold text-white flex items-center">
                        <i class="fa-solid fa-boxes-packing text-purple-400 mr-3"></i> สินค้าสั่งซื้อล่วงหน้า (Pre-Order)
                    </h2>
                    <p class="text-slate-400 text-sm mt-1">มัดจำหรือสั่งจองสินค้าล่วงหน้าพร้อมเลือกตัวเลือก Variant พิเศษ รับของไวเมื่อเปิดตัว</p>
                </div>
                <div id="preorders-grid" class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <!-- Dynamic Pre-Order Product Cards -->
                </div>
            </div>

            <!-- VIEW 3: FAQ SECTION PER SECTION -->
            <div id="view-faq" class="hidden space-y-6">
                <div class="text-center max-w-2xl mx-auto space-y-2 py-4">
                    <h2 class="text-3xl font-extrabold text-white">คำถามที่พบบ่อย (FAQ)</h2>
                    <p class="text-slate-400 text-sm">รวบรวมข้อสงสัยทั้งหมดแยกตามหมวดหมู่การใช้งาน เพื่อความสะดวกรวดเร็ว</p>
                </div>

                <div class="space-y-6 max-w-4xl mx-auto">
                    <!-- Section 1: Ordering FAQ -->
                    <div class="bg-slate-900 border border-slate-800 rounded-2xl p-5">
                        <h3 class="text-purple-400 font-bold mb-3 flex items-center text-lg">
                            <i class="fa-solid fa-cart-shopping mr-2"></i> เกี่ยวกับการสั่งซื้อและการจัดส่ง
                        </h3>
                        <div class="space-y-3">
                            <details class="group bg-slate-950/60 rounded-xl p-4 border border-slate-800/80 cursor-pointer">
                                <summary class="font-medium text-slate-200 flex justify-between items-center">
                                    สั่งซื้อสินค้าแล้วจะได้รับสินค้าอย่างไร?
                                    <i class="fa-solid fa-chevron-down text-slate-500 text-xs transition-transform group-open:rotate-180"></i>
                                </summary>
                                <p class="text-slate-400 text-sm mt-3 pt-3 border-t border-slate-800/60">
                                    เมื่อชำระเงินสำเร็จ ระบบจะตัดสต็อกและส่งโค้ดหรือรหัสผ่านสินค้าให้ท่านในหน้าประวัติการสั่งซื้อทันทีอัตโนมัติ 24 ชั่วโมง
                                </p>
                            </details>
                            <details class="group bg-slate-950/60 rounded-xl p-4 border border-slate-800/80 cursor-pointer">
                                <summary class="font-medium text-slate-200 flex justify-between items-center">
                                    สินค้ารับประกันการใช้งานนานเท่าใด?
                                    <i class="fa-solid fa-chevron-down text-slate-500 text-xs transition-transform group-open:rotate-180"></i>
                                </summary>
                                <p class="text-slate-400 text-sm mt-3 pt-3 border-t border-slate-800/60">
                                    สินค้าดิจิทัลและโค้ดเติมเกมรับประกัน 100% ใช้งานได้ทันที หากพบปัญหาติดต่อทีมงานแอดมินผ่านดิสคอร์ดหรือแฟนเพจได้ทันที
                                </p>
                            </details>
                        </div>
                    </div>

                    <!-- Section 2: Agent Rank FAQ -->
                    <div class="bg-slate-900 border border-slate-800 rounded-2xl p-5">
                        <h3 class="text-amber-400 font-bold mb-3 flex items-center text-lg">
                            <i class="fa-solid fa-shield-cat mr-2"></i> เกี่ยวกับระบบ Agent Rank & ส่วนลด
                        </h3>
                        <div class="space-y-3">
                            <details class="group bg-slate-950/60 rounded-xl p-4 border border-slate-800/80 cursor-pointer">
                                <summary class="font-medium text-slate-200 flex justify-between items-center">
                                    ระดับ Agent Rank เลื่อนได้อย่างไร?
                                    <i class="fa-solid fa-chevron-down text-slate-500 text-xs transition-transform group-open:rotate-180"></i>
                                </summary>
                                <p class="text-slate-400 text-sm mt-3 pt-3 border-t border-slate-800/60">
                                    ยศ Agent คำนวณสะสมจากยอดเติมเงินทั้งหมด บรอนซ์ (Bronze) -> ซิลเวอร์ (Silver ฿1,000) -> โกลด์ (Gold ฿5,000) -> VIP Diamond (฿10,000) ยิ่งยศสูงยิ่งได้รับส่วนลดราคาสินค้าเพิ่มขึ้น
                                </p>
                            </details>
                        </div>
                    </div>
                </div>
            </div>

            <!-- VIEW 4: FULL ADMIN DASHBOARD -->
            <div id="view-admin" class="hidden space-y-6">
                
                <!-- Admin Header & Mode Bar -->
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/90 border border-purple-500/30 p-5 rounded-2xl shadow-xl">
                    <div>
                        <div class="flex items-center space-x-2">
                            <span class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">System Control</span>
                            <h2 class="text-2xl font-black text-white">แผงควบคุมระบบหลังบ้าน (Admin Dashboard)</h2>
                        </div>
                        <p class="text-xs text-slate-400 mt-1">จัดการคลังสินค้า, สต็อกอัตโนมัติ, สินค้า Pre-Order, ตัวจัดการเคอร์เซอร์ และวิเคราะห์สถิติร้านค้า</p>
                    </div>
                    <div class="flex items-center space-x-2">
                        <button onclick="navigateTo('store')" class="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold transition-colors">
                            <i class="fa-solid fa-eye mr-1"></i> ดูหน้าร้านค้า
                        </button>
                    </div>
                </div>

                <!-- Admin Vertical & Horizontal Stats Widgets -->
                <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div class="bg-slate-900 border border-slate-800 p-4 rounded-xl flex justify-between items-center">
                        <div>
                            <div class="text-xs text-slate-400">ยอดขายรวมทั้งหมด</div>
                            <div class="text-2xl font-bold text-emerald-400" id="stat-total-sales">฿12,450.00</div>
                        </div>
                        <div class="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-lg"><i class="fa-solid fa-money-bill-wave"></i></div>
                    </div>
                    <div class="bg-slate-900 border border-slate-800 p-4 rounded-xl flex justify-between items-center">
                        <div>
                            <div class="text-xs text-slate-400">รายการสั่งซื้อสำเร็จ</div>
                            <div class="text-2xl font-bold text-purple-400" id="stat-total-orders">89</div>
                        </div>
                        <div class="w-10 h-10 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center text-lg"><i class="fa-solid fa-box-archive"></i></div>
                    </div>
                    <div class="bg-slate-900 border border-slate-800 p-4 rounded-xl flex justify-between items-center">
                        <div>
                            <div class="text-xs text-slate-400">จำนวนสินค้าในคลัง</div>
                            <div class="text-2xl font-bold text-amber-400" id="stat-total-products">6</div>
                        </div>
                        <div class="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center text-lg"><i class="fa-solid fa-boxes-stacked"></i></div>
                    </div>
                    <div class="bg-slate-900 border border-slate-800 p-4 rounded-xl flex justify-between items-center">
                        <div>
                            <div class="text-xs text-slate-400">สมาชิกทั้งหมด</div>
                            <div class="text-2xl font-bold text-blue-400">142 คน</div>
                        </div>
                        <div class="w-10 h-10 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center text-lg"><i class="fa-solid fa-users"></i></div>
                    </div>
                </div>

                <!-- Admin Tabs -->
                <div class="flex border-b border-slate-800 space-x-2 overflow-x-auto pb-1">
                    <button onclick="switchAdminTab('stock')" id="adm-tab-stock" class="px-4 py-2 text-sm font-semibold rounded-t-xl bg-purple-600 text-white">
                        <i class="fa-solid fa-cubes mr-1.5"></i> ค้นหา & จัดการสต็อก (Auto-Delete)
                    </button>
                    <button onclick="switchAdminTab('products')" id="adm-tab-products" class="px-4 py-2 text-sm font-semibold rounded-t-xl text-slate-400 hover:text-slate-200">
                        <i class="fa-solid fa-plus-minus mr-1.5"></i> เพิ่ม/แก้ไขสินค้า
                    </button>
                    <button onclick="switchAdminTab('preorders')" id="adm-tab-preorders" class="px-4 py-2 text-sm font-semibold rounded-t-xl text-slate-400 hover:text-slate-200">
                        <i class="fa-solid fa-clock mr-1.5"></i> จัดการ Pre-Orders
                    </button>
                    <button onclick="switchAdminTab('settings')" id="adm-tab-settings" class="px-4 py-2 text-sm font-semibold rounded-t-xl text-slate-400 hover:text-slate-200">
                        <i class="fa-solid fa-sliders mr-1.5"></i> Custom Cursor & บอร์ด
                    </button>
                </div>

                <!-- ADMIN TAB 1: STOCK SEARCH & AUTO-DELETE -->
                <div id="adm-sec-stock" class="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
                    <div class="flex flex-col sm:flex-row justify-between items-center gap-4">
                        <div>
                            <h3 class="text-lg font-bold text-white">ระบบค้นหาและจัดการสต็อกคีย์อัตโนมัติ</h3>
                            <p class="text-xs text-slate-400">ค้นหาคีย์รหัสสินค้า และลบสต็อกที่ถูกใช้งานแล้วอัตโนมัติ</p>
                        </div>
                        <div class="w-full sm:w-72 relative">
                            <input type="text" id="admin-stock-search" onkeyup="renderAdminStockTable()" placeholder="ค้นหารหัสคีย์/รหัสสินค้า..." class="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-200">
                            <i class="fa-solid fa-search absolute left-3 top-2.5 text-slate-500 text-xs"></i>
                        </div>
                    </div>

                    <div class="overflow-x-auto">
                        <table class="w-full text-left text-xs text-slate-300">
                            <thead class="bg-slate-950 text-slate-400 uppercase font-semibold">
                                <tr>
                                    <th class="p-3">สินค้า</th>
                                    <th class="p-3">ข้อมูล Stock Key / License</th>
                                    <th class="p-3">สถานะ</th>
                                    <th class="p-3 text-right">การจัดการ</th>
                                </tr>
                            </thead>
                            <tbody id="admin-stock-table-body" class="divide-y divide-slate-800/60">
                                <!-- Dynamic Stock Rows -->
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- ADMIN TAB 2: MANAGE PRODUCTS -->
                <div id="adm-sec-products" class="hidden grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <!-- Form Create Product -->
                    <div class="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
                        <h3 class="font-bold text-white text-base">เพิ่มสินค้าใหม่</h3>
                        <div class="space-y-3 text-xs">
                            <div>
                                <label class="block text-slate-400 mb-1">ชื่อสินค้า</label>
                                <input type="text" id="new-prod-title" placeholder="เช่น Valorant 1,000 VP" class="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200">
                            </div>
                            <div>
                                <label class="block text-slate-400 mb-1">หมวดหมู่</label>
                                <select id="new-prod-category" class="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200">
                                    <option value="Game Cards">Game Cards</option>
                                    <option value="VIP Top-up">VIP Top-up</option>
                                    <option value="ID Premium">ID Premium</option>
                                </select>
                            </div>
                            <div class="grid grid-cols-2 gap-2">
                                <div>
                                    <label class="block text-slate-400 mb-1">ราคา (บาท)</label>
                                    <input type="number" id="new-prod-price" placeholder="300" class="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200">
                                </div>
                                <div>
                                    <label class="block text-slate-400 mb-1">Badge ติดบัตร</label>
                                    <select id="new-prod-badge" class="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200">
                                        <option value="ไม่มี">ไม่มี</option>
                                        <option value="ยอดฮิต">ยอดฮิต</option>
                                        <option value="สินค้าขายดี">สินค้าขายดี</option>
                                        <option value="ลดราคาพิเศษ">ลดราคาพิเศษ</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label class="block text-slate-400 mb-1">ลิงก์รูปภาพ สินค้า (แนะนำ 380x380)</label>
                                <input type="text" id="new-prod-image" placeholder="https://..." class="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200">
                            </div>
                            <div>
                                <label class="block text-slate-400 mb-1">ใส่คีย์สินค้าสต็อก (1 บรรทัด = 1 ชิ้น)</label>
                                <textarea id="new-prod-keys" rows="3" placeholder="KEY-AAAA-BBBB&#10;KEY-CCCC-DDDD" class="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 font-mono"></textarea>
                            </div>
                            <button onclick="createNewProduct()" class="w-full py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl transition-all">
                                + บันทึกเพิ่มสินค้า
                            </button>
                        </div>
                    </div>

                    <!-- Existing Products List -->
                    <div class="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
                        <h3 class="font-bold text-white text-base">รายการสินค้าในระบบทั้งหมด</h3>
                        <div id="admin-products-list" class="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                            <!-- Dynamic Product List -->
                        </div>
                    </div>
                </div>

                <!-- ADMIN TAB 3: MANAGE PRE-ORDERS -->
                <div id="adm-sec-preorders" class="hidden bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
                    <h3 class="text-lg font-bold text-white">จัดการสินค้าสั่งซื้อล่วงหน้า (Pre-Orders & Variants)</h3>
                    <div id="admin-preorders-list" class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <!-- Preorder management view -->
                    </div>
                </div>

                <!-- ADMIN TAB 4: SETTINGS & CUSTOM CURSOR -->
                <div id="adm-sec-settings" class="hidden bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 max-w-2xl">
                    <h3 class="text-lg font-bold text-white">ตั้งค่า Custom Cursor URL & เอฟเฟกต์</h3>
                    <p class="text-xs text-slate-400">กำหนด URL รูปภาพเคอร์เซอร์ปรับแต่งแต่งหน้าร้านค้าตามต้องการ</p>
                    
                    <div class="space-y-3 text-xs">
                        <div>
                            <label class="block text-slate-400 mb-1">Custom Cursor Image URL (.cur / .png)</label>
                            <input type="text" id="setting-cursor-url" placeholder="https://cur.cursors-4u.net/games/gam-13/gam1282.png" class="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200">
                        </div>
                        <div class="flex items-center space-x-2">
                            <input type="checkbox" id="setting-rainbow-toggle" checked class="rounded border-slate-800 text-purple-600 focus:ring-purple-500">
                            <label for="setting-rainbow-toggle" class="text-slate-300">เปิดใช้งานเอฟเฟกต์ Rainbow Card/Borders</label>
                        </div>
                        <button onclick="saveAdminSettings()" class="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-colors">
                            บันทึกการตั้งค่า
                        </button>
                    </div>
                </div>

            </div>

        </main>

        <!-- Dynamic Product Purchase Modal -->
        <div id="modal-product" class="fixed inset-0 z-50 hidden bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
            <div class="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-5 relative shadow-2xl rainbow-card-border animate-float">
                <button onclick="closeProductModal()" class="absolute top-4 right-4 text-slate-400 hover:text-white">
                    <i class="fa-solid fa-xmark text-xl"></i>
                </button>
                
                <!-- Breadcrumb Navigation -->
                <nav class="flex text-xs text-slate-400 space-x-2">
                    <span class="hover:underline cursor-pointer" onclick="closeProductModal()">หน้าแรก</span>
                    <span>/</span>
                    <span id="modal-breadcrumb-category" class="text-purple-400 font-medium">Game Cards</span>
                    <span>/</span>
                    <span id="modal-breadcrumb-title" class="text-slate-200 truncate max-w-[150px]">Product Title</span>
                </nav>

                <div class="flex gap-4 items-start">
                    <img id="modal-product-img" src="" class="w-24 h-24 sm:w-28 sm:h-28 rounded-xl object-cover border border-slate-800" alt="Product">
                    <div class="space-y-1">
                        <div id="modal-product-badge" class="inline-block text-[10px] px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">ยอดฮิต</div>
                        <h3 id="modal-product-title" class="text-xl font-extrabold text-white">ชื่อสินค้า</h3>
                        <div class="text-slate-400 text-xs">สต็อกคงเหลือ: <span id="modal-product-stock" class="text-emerald-400 font-bold">10 ชิ้น</span></div>
                        <div class="text-2xl font-black text-amber-400" id="modal-product-price">฿0.00</div>
                    </div>
                </div>

                <!-- Quantity Counter Input -->
                <div class="bg-slate-950 p-4 rounded-xl space-y-2 border border-slate-800/80">
                    <label class="text-xs text-slate-400 block font-medium">เลือกจำนวนที่ต้องการซื้อ</label>
                    <div class="flex items-center space-x-3">
                        <button onclick="updateModalQty(-1)" class="w-9 h-9 bg-slate-800 hover:bg-slate-700 text-white rounded-lg flex items-center justify-center text-lg font-bold transition-colors">-</button>
                        <input type="number" id="modal-qty-input" value="1" min="1" readonly class="w-16 text-center bg-slate-900 border border-slate-700 rounded-lg py-1.5 text-slate-100 font-bold text-sm">
                        <button onclick="updateModalQty(1)" class="w-9 h-9 bg-slate-800 hover:bg-slate-700 text-white rounded-lg flex items-center justify-center text-lg font-bold transition-colors">+</button>
                    </div>
                </div>

                <!-- Price Summary -->
                <div class="flex justify-between items-center text-sm pt-2 border-t border-slate-800">
                    <span class="text-slate-400">ราคารวมทั้งหมด:</span>
                    <span class="text-xl font-extrabold text-emerald-400" id="modal-total-price">฿0.00</span>
                </div>

                <!-- Action Button -->
                <button onclick="confirmOrderPurchase()" class="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-xl shadow-lg transition-all text-sm">
                    <i class="fa-solid fa-cart-check mr-2"></i> ยืนยันสั่งซื้อสินค้าทันที
                </button>
            </div>
        </div>

        <!-- Order Confirmation Modal -->
        <div id="modal-order-success" class="fixed inset-0 z-50 hidden bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
            <div class="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 text-center space-y-4 shadow-2xl">
                <div class="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center text-3xl mx-auto border border-emerald-500/30">
                    <i class="fa-solid fa-circle-check"></i>
                </div>
                <h3 class="text-2xl font-bold text-white">สั่งซื้อสำเร็จแล้ว!</h3>
                <p class="text-slate-400 text-xs">ขอบคุณสำหรับการสั่งซื้อ ข้อมูลรหัสหรือคีย์สินค้าของคุณจัดส่งเรียบร้อยแล้ว:</p>
                <div id="modal-delivered-keys" class="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-emerald-400 text-sm select-all break-all">
                    <!-- Key Output -->
                </div>
                <button onclick="closeOrderSuccessModal()" class="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-xl">
                    ปิดหน้าต่าง
                </button>
            </div>
        </div>

        <!-- Auth Modal (Google / Discord Login) -->
        <div id="modal-login" class="fixed inset-0 z-50 hidden bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
            <div class="bg-slate-900 border border-slate-800 rounded-2xl max-w-sm w-full p-6 space-y-4 relative shadow-2xl">
                <button onclick="closeLoginModal()" class="absolute top-4 right-4 text-slate-400 hover:text-white">
                    <i class="fa-solid fa-xmark"></i>
                </button>
                <div class="text-center space-y-1">
                    <h3 class="text-xl font-bold text-white">เข้าสู่ระบบเข้าใช้งาน</h3>
                    <p class="text-xs text-slate-400">เลือกช่องทางการเข้าสู่ระบบเพื่อสะสม Agent Rank</p>
                </div>
                <div class="space-y-2 pt-2">
                    <button onclick="simulatedLogin('Google')" class="w-full py-2.5 bg-white text-slate-900 hover:bg-slate-100 font-semibold rounded-xl text-xs flex items-center justify-center space-x-2 transition-colors">
                        <i class="fa-brands fa-google text-red-500 text-sm"></i>
                        <span>เข้าสู่ระบบด้วย Google</span>
                    </button>
                    <button onclick="simulatedLogin('Discord')" class="w-full py-2.5 bg-[#5865F2] hover:bg-[#4752C4] text-white font-semibold rounded-xl text-xs flex items-center justify-center space-x-2 transition-colors">
                        <i class="fa-brands fa-discord text-sm"></i>
                        <span>เข้าสู่ระบบด้วย Discord</span>
                    </button>
                </div>
            </div>
        </div>

        <!-- Top-up Balance Modal -->
        <div id="modal-topup" class="fixed inset-0 z-50 hidden bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
            <div class="bg-slate-900 border border-slate-800 rounded-2xl max-w-sm w-full p-6 space-y-4 relative">
                <button onclick="closeTopupModal()" class="absolute top-4 right-4 text-slate-400 hover:text-white">
                    <i class="fa-solid fa-xmark"></i>
                </button>
                <h3 class="text-lg font-bold text-white flex items-center">
                    <i class="fa-solid fa-wallet text-emerald-400 mr-2"></i> เติมเงินเข้าสู่ระบบ
                </h3>
                <div class="space-y-3 text-xs">
                    <div>
                        <label class="block text-slate-400 mb-1">ระบุจำนวนเงินที่ต้องการเติม (บาท)</label>
                        <input type="number" id="topup-amount-input" placeholder="100" class="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200">
                    </div>
                    <button onclick="processTopup()" class="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-colors">
                        ยืนยันการเติมเงิน
                    </button>
                </div>
            </div>
        </div>

        <!-- Footer -->
        <footer class="mt-auto border-t border-slate-800/80 bg-slate-900/60 py-6 text-center text-xs text-slate-500">
            <div class="max-w-7xl mx-auto px-4">
                <p>© 2026 SURE STORE. All rights reserved. System interactive preview deployment ready.</p>
            </div>
        </footer>

    </div>

    <!-- Application JavaScript Logic -->
    <script>
        // State Management
        let appState = {
            currentUser: null,
            userBalance: 1500.00,
            userTotalSpent: 1200.00,
            isAdminView: false,
            activeCategory: 'All',
            selectedProduct: null,
            selectedQty: 1,
            customCursorUrl: '',
            products: [
                {
                    id: 1,
                    title: 'ROBLOX 1,000 Robux Instant',
                    category: 'Game Cards',
                    price: 290,
                    badge: 'สินค้าขายดี',
                    image: 'https://placehold.co/380x380/0f172a/38bdf8?text=ROBUX+1000',
                    isRecommended: true,
                    keys: ['RBX-8829-X91A', 'RBX-1102-K92B', 'RBX-9931-L001', 'RBX-4412-M112', 'RBX-5531-P092']
                },
                {
                    id: 2,
                    title: 'Valorant 1,000 VP Code',
                    category: 'Game Cards',
                    price: 320,
                    badge: 'ยอดฮิต',
                    image: 'https://placehold.co/380x380/0f172a/f43f5e?text=VALORANT+VP',
                    isRecommended: true,
                    keys: ['VAL-9912-VP01', 'VAL-4412-VP02', 'VAL-1234-VP03']
                },
                {
                    id: 3,
                    title: 'Netflix VIP Premium 30 Days',
                    category: 'ID Premium',
                    price: 149,
                    badge: 'ลดราคาพิเศษ',
                    image: 'https://placehold.co/380x380/0f172a/ef4444?text=NETFLIX+VIP',
                    isRecommended: false,
                    keys: ['NF-USER1:PASS881', 'NF-USER2:PASS991']
                },
                {
                    id: 4,
                    title: 'Steam Wallet Card 500 THB',
                    category: 'Game Cards',
                    price: 500,
                    badge: 'ไม่มี',
                    image: 'https://placehold.co/380x380/0f172a/6366f1?text=STEAM+500B',
                    isRecommended: true,
                    keys: ['STM-500-112233', 'STM-500-445566']
                }
            ],
            preorders: [
                {
                    id: 101,
                    title: 'GTA VI Collector Premium Pass',
                    price: 2500,
                    image: 'https://placehold.co/380x380/311042/a855f7?text=GTA+VI+PREORDER',
                    variants: ['Standard Edition', 'Deluxe Digital', 'Collector Box']
                },
                {
                    id: 102,
                    title: 'Monster Hunter Wilds Pre-Key',
                    price: 1890,
                    image: 'https://placehold.co/380x380/064e3b/10b981?text=MH+WILDS',
                    variants: ['Steam Key', 'PS5 Digital']
                }
            ]
        };

        // Initialize App
        window.onload = function() {
            initParticles();
            renderCategoryPills();
            renderStoreProducts();
            renderRecommendedProducts();
            renderPreorders();
            updateUserBar();
            renderAdminStockTable();
            renderAdminProductsList();
            renderAdminPreorders();
        };

        // Particles.js Initialization
        function initParticles() {
            if (typeof particlesJS !== 'undefined') {
                particlesJS('particles-js', {
                    "particles": {
                        "number": { "value": 45, "density": { "enable": true, "value_area": 800 } },
                        "color": { "value": "#818cf8" },
                        "shape": { "type": "circle" },
                        "opacity": { "value": 0.3, "random": true },
                        "size": { "value": 3, "random": true },
                        "line_linked": { "enable": true, "distance": 150, "color": "#4f46e5", "opacity": 0.2, "width": 1 },
                        "move": { "enable": true, "speed": 1.5, "direction": "none", "random": true, "out_mode": "out" }
                    },
                    "interactivity": {
                        "events": { "onhover": { "enable": true, "mode": "grab" } }
                    }
                });
            }
        }

        // Navigation Switcher
        function navigateTo(view) {
            ['store', 'preorders', 'faq', 'admin'].forEach(v => {
                const el = document.getElementById(`view-${v}`);
                if (el) el.classList.add('hidden');
                const nav = document.getElementById(`nav-${v}`);
                if (nav) nav.classList.remove('text-purple-400');
            });

            const targetView = document.getElementById(`view-${view}`);
            if (targetView) targetView.classList.remove('hidden');

            const activeNav = document.getElementById(`nav-${view}`);
            if (activeNav) activeNav.classList.add('text-purple-400');
        }

        // Toggle Admin View Mode
        function toggleAdminView() {
            appState.isAdminView = !appState.isAdminView;
            const btnText = document.getElementById('admin-toggle-text');
            if (appState.isAdminView) {
                btnText.textContent = 'กลับสู่หน้าร้านค้า';
                navigateTo('admin');
            } else {
                btnText.textContent = 'เข้าสู่ระบบแอดมิน';
                navigateTo('store');
            }
        }

        // Calculate Agent Rank
        function getAgentRank(spent) {
            if (spent >= 10000) return { name: 'VIP Diamond Agent', color: 'bg-purple-500/20 text-purple-300 border-purple-500/30' };
            if (spent >= 5000) return { name: 'Gold Agent', color: 'bg-amber-500/20 text-amber-300 border-amber-500/30' };
            if (spent >= 1000) return { name: 'Silver Agent', color: 'bg-slate-400/20 text-slate-200 border-slate-400/30' };
            return { name: 'Bronze Agent', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' };
        }

        // Render Category Pills
        function renderCategoryPills() {
            const categories = ['All', 'Game Cards', 'VIP Top-up', 'ID Premium'];
            const container = document.getElementById('category-pills');
            container.innerHTML = categories.map(cat => `
                <button onclick="setCategory('${cat}')" class="px-4 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${appState.activeCategory === cat ? 'bg-purple-600 text-white shadow-md' : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'}">
                    ${cat === 'All' ? 'ทั้งหมด' : cat}
                </button>
            `).join('');
        }

        function setCategory(cat) {
            appState.activeCategory = cat;
            renderCategoryPills();
            renderStoreProducts();
        }

        // Render Store Product Cards (380x380 Design Aspect Ratio Box)
        function renderStoreProducts() {
            const grid = document.getElementById('products-grid');
            const search = (document.getElementById('store-search-input')?.value || '').toLowerCase();

            const filtered = appState.products.filter(p => {
                const matchCat = appState.activeCategory === 'All' || p.category === appState.activeCategory;
                const matchSearch = p.title.toLowerCase().includes(search);
                return matchCat && matchSearch;
            });

            if (filtered.length === 0) {
                grid.innerHTML = `<div class="col-span-full text-center py-12 text-slate-500 text-sm">ไม่พบสินค้าที่คุณต้องการค้นหา</div>`;
                return;
            }

            grid.innerHTML = filtered.map(p => {
                const stockCount = p.keys.length;
                return `
                <div class="bg-slate-900 border border-slate-800/90 rounded-2xl p-4 flex flex-col justify-between hover:border-purple-500/50 transition-all duration-300 shadow-lg rainbow-card-border group">
                    <div class="space-y-3">
                        <div class="relative w-full aspect-square rounded-xl overflow-hidden bg-slate-950">
                            <img src="${p.image}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" alt="${p.title}">
                            ${p.badge !== 'ไม่มี' ? `<span class="absolute top-2 left-2 bg-purple-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow">${p.badge}</span>` : ''}
                            <span class="absolute bottom-2 right-2 bg-slate-950/80 backdrop-blur-md text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-md border border-emerald-500/30">
                                เหลือ ${stockCount} ชิ้น
                            </span>
                        </div>
                        <div>
                            <span class="text-[10px] font-semibold text-purple-400 tracking-wider">${p.category}</span>
                            <h4 class="font-bold text-slate-100 text-sm line-clamp-1 group-hover:text-purple-300 transition-colors">${p.title}</h4>
                        </div>
                    </div>
                    <div class="pt-3 mt-3 border-t border-slate-800/80 flex items-center justify-between">
                        <div class="text-amber-400 font-extrabold text-lg">฿${p.price.toLocaleString()}</div>
                        <button onclick="openProductModal(${p.id})" class="px-3 py-1.5 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-xs font-semibold shadow transition-colors">
                            <i class="fa-solid fa-cart-shopping mr-1"></i> สั่งซื้อ
                        </button>
                    </div>
                </div>
                `;
            }).join('');
        }

        // Render Recommended Products
        function renderRecommendedProducts() {
            const grid = document.getElementById('recommended-products-grid');
            const recs = appState.products.filter(p => p.isRecommended);

            grid.innerHTML = recs.map(p => `
                <div class="bg-slate-900/60 border border-slate-800 p-3 rounded-xl flex items-center space-x-3 hover:border-slate-700 cursor-pointer transition-colors" onclick="openProductModal(${p.id})">
                    <img src="${p.image}" class="w-14 h-14 rounded-lg object-cover" alt="Recommended">
                    <div class="overflow-hidden">
                        <h5 class="font-bold text-slate-200 text-xs truncate">${p.title}</h5>
                        <div class="text-amber-400 font-bold text-xs mt-1">฿${p.price}</div>
                    </div>
                </div>
            `).join('');
        }

        // Render Preorders
        function renderPreorders() {
            const grid = document.getElementById('preorders-grid');
            grid.innerHTML = appState.preorders.map(po => `
                <div class="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-4 shadow-lg">
                    <img src="${po.image}" class="w-full h-44 object-cover rounded-xl" alt="Preorder">
                    <h4 class="font-bold text-slate-100 text-base">${po.title}</h4>
                    <div class="space-y-1">
                        <label class="text-xs text-slate-400">เลือกประเภทตัวเลือก (Variant):</label>
                        <select class="w-full bg-slate-950 border border-slate-800 rounded-lg text-xs p-2 text-slate-200">
                            ${po.variants.map(v => `<option>${v}</option>`).join('')}
                        </select>
                    </div>
                    <div class="flex items-center justify-between pt-2">
                        <span class="text-amber-400 font-bold text-lg">฿${po.price.toLocaleString()}</span>
                        <button onclick="alert('สั่ง จอง Pre-order เรียบร้อยแล้ว ทีมงานจะแจ้งวันรับสินค้าอีกครั้ง')" class="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-xs rounded-xl shadow">
                            สั่งจองล่วงหน้า
                        </button>
                    </div>
                </div>
            `).join('');
        }

        // Product Modal Logic
        function openProductModal(id) {
            const product = appState.products.find(p => p.id === id);
            if (!product) return;

            appState.selectedProduct = product;
            appState.selectedQty = 1;

            document.getElementById('modal-breadcrumb-category').textContent = product.category;
            document.getElementById('modal-breadcrumb-title').textContent = product.title;
            document.getElementById('modal-product-img').src = product.image;
            document.getElementById('modal-product-title').textContent = product.title;
            document.getElementById('modal-product-badge').textContent = product.badge;
            document.getElementById('modal-product-stock').textContent = `${product.keys.length} ชิ้น`;
            document.getElementById('modal-product-price').textContent = `฿${product.price}`;
            document.getElementById('modal-qty-input').value = 1;

            updateModalTotalPrice();
            document.getElementById('modal-product').classList.remove('hidden');
        }

        function closeProductModal() {
            document.getElementById('modal-product').classList.add('hidden');
        }

        function updateModalQty(change) {
            if (!appState.selectedProduct) return;
            const maxStock = appState.selectedProduct.keys.length;
            let newQty = appState.selectedQty + change;
            if (newQty < 1) newQty = 1;
            if (newQty > maxStock && maxStock > 0) newQty = maxStock;

            appState.selectedQty = newQty;
            document.getElementById('modal-qty-input').value = newQty;
            updateModalTotalPrice();
        }

        function updateModalTotalPrice() {
            if (!appState.selectedProduct) return;
            const total = appState.selectedProduct.price * appState.selectedQty;
            document.getElementById('modal-total-price').textContent = `฿${total.toLocaleString()}`;
        }

        // Confirm Order Purchase and Auto-delete Stock Key
        function confirmOrderPurchase() {
            const p = appState.selectedProduct;
            if (!p) return;

            if (p.keys.length < appState.selectedQty) {
                alert('สินค้าในสต็อกไม่เพียงพอ');
                return;
            }

            const totalPrice = p.price * appState.selectedQty;

            if (appState.userBalance < totalPrice) {
                alert('ยอดเงินคงเหลือไม่เพียงพอ กรุณาเติมเงิน');
                closeProductModal();
                openTopupModal();
                return;
            }

            // Deduct Balance and Auto Delete Keys
            appState.userBalance -= totalPrice;
            appState.userTotalSpent += totalPrice;

            const delivered = [];
            for (let i = 0; i < appState.selectedQty; i++) {
                delivered.push(p.keys.shift()); // Pop / delete from stock
            }

            updateUserBar();
            renderStoreProducts();
            renderAdminStockTable();

            closeProductModal();

            // Display Success Modal
            document.getElementById('modal-delivered-keys').innerHTML = delivered.join('<br>');
            document.getElementById('modal-order-success').classList.remove('hidden');
        }

        function closeOrderSuccessModal() {
            document.getElementById('modal-order-success').classList.add('hidden');
        }

        // Login & Wallet Logic
        function openLoginModal() { document.getElementById('modal-login').classList.remove('hidden'); }
        function closeLoginModal() { document.getElementById('modal-login').classList.add('hidden'); }
        
        function simulatedLogin(provider) {
            appState.currentUser = { name: `${provider} User`, email: 'user@example.com' };
            closeLoginModal();
            updateUserBar();
        }

        function updateUserBar() {
            const container = document.getElementById('user-info-bar');
            const authContainer = document.getElementById('auth-btn-container');

            if (appState.currentUser) {
                container.classList.remove('hidden');
                container.classList.add('flex');
                authContainer.innerHTML = `
                    <div class="w-9 h-9 rounded-xl bg-purple-600 text-white font-bold flex items-center justify-center text-xs shadow-md">
                        ${appState.currentUser.name[0]}
                    </div>
                `;
                document.getElementById('user-display-name').textContent = appState.currentUser.name;
            }

            const rank = getAgentRank(appState.userTotalSpent);
            const rankBadge = document.getElementById('user-rank-badge');
            rankBadge.textContent = rank.name;
            rankBadge.className = `ml-1 text-[10px] px-1.5 py-0.2 rounded border ${rank.color}`;

            document.getElementById('user-balance-display').textContent = `฿${appState.userBalance.toLocaleString()}`;
        }

        function openTopupModal() { document.getElementById('modal-topup').classList.remove('hidden'); }
        function closeTopupModal() { document.getElementById('modal-topup').classList.add('hidden'); }

        function processTopup() {
            const amount = parseFloat(document.getElementById('topup-amount-input').value);
            if (isNaN(amount) || amount <= 0) {
                alert('กรุณาระบุจำนวนเงินให้ถูกต้อง');
                return;
            }
            appState.userBalance += amount;
            updateUserBar();
            closeTopupModal();
            alert(`เติมเงินสำเร็จจำนวน ฿${amount} เรียบร้อยแล้ว`);
        }

        // ADMIN TAB SWITCHING & MANAGEMENT
        function switchAdminTab(tab) {
            ['stock', 'products', 'preorders', 'settings'].forEach(t => {
                document.getElementById(`adm-sec-${t}`)?.classList.add('hidden');
                const btn = document.getElementById(`adm-tab-${t}`);
                if (btn) {
                    btn.classList.remove('bg-purple-600', 'text-white');
                    btn.classList.add('text-slate-400');
                }
            });

            document.getElementById(`adm-sec-${tab}`)?.classList.remove('hidden');
            const activeBtn = document.getElementById(`adm-tab-${tab}`);
            if (activeBtn) {
                activeBtn.classList.add('bg-purple-600', 'text-white');
                activeBtn.classList.remove('text-slate-400');
            }
        }

        // Render Admin Stock Table
        function renderAdminStockTable() {
            const tbody = document.getElementById('admin-stock-table-body');
            const search = (document.getElementById('admin-stock-search')?.value || '').toLowerCase();

            let rows = [];
            appState.products.forEach(p => {
                p.keys.forEach((k, idx) => {
                    if (p.title.toLowerCase().includes(search) || k.toLowerCase().includes(search)) {
                        rows.push(`
                            <tr class="hover:bg-slate-950/40">
                                <td class="p-3 font-medium text-slate-200">${p.title}</td>
                                <td class="p-3 font-mono text-emerald-400">${k}</td>
                                <td class="p-3"><span class="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px]">พร้อมขาย</span></td>
                                <td class="p-3 text-right">
                                    <button onclick="adminDeleteStockKey(${p.id}, ${idx})" class="text-red-400 hover:text-red-300">
                                        <i class="fa-solid fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        `);
                    }
                });
            });

            tbody.innerHTML = rows.length > 0 ? rows.join('') : `<tr><td colspan="4" class="p-4 text-center text-slate-500">ไม่พบรายการสต็อก</td></tr>`;
        }

        function adminDeleteStockKey(productId, index) {
            const product = appState.products.find(p => p.id === productId);
            if (product && product.keys[index]) {
                product.keys.splice(index, 1);
                renderAdminStockTable();
                renderStoreProducts();
            }
        }

        // Create New Product
        function createNewProduct() {
            const title = document.getElementById('new-prod-title').value.trim();
            const category = document.getElementById('new-prod-category').value;
            const price = parseFloat(document.getElementById('new-prod-price').value);
            const badge = document.getElementById('new-prod-badge').value;
            const image = document.getElementById('new-prod-image').value.trim() || 'https://placehold.co/380x380/0f172a/a855f7?text=NEW+PRODUCT';
            const keysRaw = document.getElementById('new-prod-keys').value.trim();

            if (!title || isNaN(price)) {
                alert('กรุณากรอกข้อมูลให้ครบถ้วน');
                return;
            }

            const keys = keysRaw ? keysRaw.split('\n').map(k => k.trim()).filter(k => k) : [];

            appState.products.push({
                id: Date.now(),
                title,
                category,
                price,
                badge,
                image,
                isRecommended: false,
                keys
            });

            renderStoreProducts();
            renderAdminStockTable();
            renderAdminProductsList();
            alert('เพิ่มสินค้าใหม่เรียบร้อยแล้ว');
        }

        function renderAdminProductsList() {
            const container = document.getElementById('admin-products-list');
            container.innerHTML = appState.products.map(p => `
                <div class="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center justify-between">
                    <div class="flex items-center space-x-3">
                        <img src="${p.image}" class="w-10 h-10 rounded-lg object-cover">
                        <div>
                            <div class="font-bold text-slate-200 text-xs">${p.title}</div>
                            <div class="text-[10px] text-slate-400">คงเหลือ: ${p.keys.length} ชิ้น | ฿${p.price}</div>
                        </div>
                    </div>
                    <button onclick="deleteProduct(${p.id})" class="text-red-400 hover:text-red-300 text-xs px-2 py-1">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            `).join('');
        }

        function deleteProduct(id) {
            appState.products = appState.products.filter(p => p.id !== id);
            renderStoreProducts();
            renderAdminStockTable();
            renderAdminProductsList();
        }

        function renderAdminPreorders() {
            const container = document.getElementById('admin-preorders-list');
            container.innerHTML = appState.preorders.map(po => `
                <div class="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                    <h5 class="font-bold text-white text-xs">${po.title}</h5>
                    <div class="text-[10px] text-slate-400">Variants: ${po.variants.join(', ')}</div>
                    <div class="text-amber-400 font-bold text-xs">฿${po.price}</div>
                </div>
            `).join('');
        }

        // Custom Cursor Admin Settings
        function saveAdminSettings() {
            const url = document.getElementById('setting-cursor-url').value.trim();
            const holder = document.getElementById('dynamic-cursor-holder');
            if (url) {
                holder.innerHTML = `* { cursor: url('${url}'), auto !important; }`;
            } else {
                holder.innerHTML = '';
            }
            alert('บันทึกการตั้งค่าเรียบร้อยแล้ว');
        }
    </script>
</body>
</html>
