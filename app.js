// ==================== STUDYHUB PWA - ENHANCED VERSION 2.1 ====================

(function() {
    'use strict';

    // ==================== ENHANCED CONFIGURATION ====================
    const CONFIG = {
        // Google Sheets Configuration
        SHEET_ID: '1JCEXmehKrdlj7yvjuZ0qYXL3G8ZgN1VLQJQLknVBwMc',
        SHEETS: {
            NOTES: 'Notes',
            VIDEOS: 'Videos',
            PYQ: 'PYQ',
            TUTORIALS: 'Tutorials',
            CONFIG: 'Config'
        },
        
        // Pagination
        ITEMS_PER_PAGE: 10,
        
        // Cache Settings
        CACHE_DURATION: 30 * 60 * 1000,
        
        // App Settings
        MAX_RECENT: 5,
        TOAST_DURATION: 3000,
        DEBOUNCE_DELAY: 300,
        
        // Verified Uploaders
        VERIFIED_UPLOADERS: ['Admin', 'Abhishek', 'admin', 'abhishek', 'ADMIN'],
        
        // URLs
        PORTFOLIO_URL: 'https://i-m-er-abhi.vercel.app',
        REQUEST_FORM_URL: 'https://docs.google.com/forms/d/e/1FAIpQLSeE2QjRDeyfPm3CXezjlMPuzfE-nPhquPiPU_mPp2lfK8Vuww/viewform',
        
        // UPI Details
        UPI_ID: 'abhishek@upi',
        
        // ==================== COURSE-SPECIFIC CONFIGURATION ====================
        COURSES: [
            { id: 'B.Tech', icon: '🎓', label: 'B.Tech', semesters: 8 },
            { id: 'BCA', icon: '💻', label: 'BCA', semesters: 6 },
            { id: 'MCA', icon: '🖥️', label: 'MCA', semesters: 4 },
            { id: 'B.Sc', icon: '🔬', label: 'B.Sc', semesters: 6 },
            { id: 'MBA', icon: '📊', label: 'MBA', semesters: 4 },
            { id: 'Diploma', icon: '📜', label: 'Diploma', semesters: 6 },
            { id: 'Other', icon: '📚', label: 'Other', semesters: 8 }
        ],
        
        // Course-Specific Branches
        BRANCHES: {
            'B.Tech': [
                { id: 'CSE', icon: '💻', label: 'Computer Science (CSE)' },
                { id: 'IT', icon: '🌐', label: 'Information Technology (IT)' },
                { id: 'ME', icon: '⚙️', label: 'Mechanical Engineering (ME)' },
                { id: 'CE', icon: '🏗️', label: 'Civil Engineering (CE)' },
                { id: 'EE', icon: '⚡', label: 'Electrical Engineering (EE)' },
                { id: 'ECE', icon: '📡', label: 'Electronics & Communication (ECE)' },
                { id: 'EEE', icon: '🔌', label: 'Electrical & Electronics (EEE)' },
                { id: 'AI-ML', icon: '🤖', label: 'Artificial Intelligence & ML' },
                { id: 'DS', icon: '📊', label: 'Data Science' },
                { id: 'BT', icon: '🧬', label: 'Biotechnology' },
                { id: 'CHE', icon: '🧪', label: 'Chemical Engineering' },
                { id: 'AUTO', icon: '🚗', label: 'Automobile Engineering' }
            ],
            'BCA': [
                { id: 'CA', icon: '💻', label: 'Computer Applications' },
                { id: 'DS', icon: '📊', label: 'Data Science' },
                { id: 'AI-ML', icon: '🤖', label: 'Artificial Intelligence & ML' },
                { id: 'CS', icon: '🔒', label: 'Cyber Security' },
                { id: 'SD', icon: '👨‍💻', label: 'Software Development' }
            ],
            'MCA': [
                { id: 'CA', icon: '💻', label: 'Computer Applications' },
                { id: 'DS', icon: '📊', label: 'Data Science' },
                { id: 'AI-ML', icon: '🤖', label: 'Artificial Intelligence & ML' },
                { id: 'CS', icon: '🔒', label: 'Cyber Security' },
                { id: 'SD', icon: '👨‍💻', label: 'Software Development' }
            ],
            'B.Sc': [
                { id: 'PHY', icon: '⚛️', label: 'Physics' },
                { id: 'CHEM', icon: '🧪', label: 'Chemistry' },
                { id: 'MATH', icon: '📐', label: 'Mathematics' },
                { id: 'CS', icon: '💻', label: 'Computer Science' },
                { id: 'IT', icon: '🌐', label: 'Information Technology' },
                { id: 'BT', icon: '🧬', label: 'Biotechnology' },
                { id: 'BIO', icon: '🔬', label: 'Biology' }
            ],
            'MBA': [
                { id: 'FIN', icon: '💰', label: 'Finance' },
                { id: 'MKT', icon: '📈', label: 'Marketing' },
                { id: 'HR', icon: '👥', label: 'Human Resource (HR)' },
                { id: 'OPS', icon: '🏭', label: 'Operations' },
                { id: 'IT', icon: '💻', label: 'Information Technology (IT)' },
                { id: 'IB', icon: '🌍', label: 'International Business' },
                { id: 'ENT', icon: '🚀', label: 'Entrepreneurship' }
            ],
            'Diploma': [
                { id: 'COMP', icon: '💻', label: 'Computer Engineering' },
                { id: 'MECH', icon: '⚙️', label: 'Mechanical' },
                { id: 'CIVIL', icon: '🏗️', label: 'Civil' },
                { id: 'ELEC', icon: '⚡', label: 'Electrical' },
                { id: 'ECE', icon: '📡', label: 'Electronics' },
                { id: 'AUTO', icon: '🚗', label: 'Automobile' }
            ],
            'Other': [
                { id: 'GEN', icon: '📚', label: 'General' },
                { id: 'VOC', icon: '🎓', label: 'Vocational' },
                { id: 'SKILL', icon: '🛠️', label: 'Skill-Based' }
            ]
        },
        
        // Programming Languages for Tutorials
        LANGUAGES: [
            { id: 'C', icon: 'C', name: 'C Programming', color: '#A8B9CC' },
            { id: 'C++', icon: 'C++', name: 'C++ Programming', color: '#00599C' },
            { id: 'Java', icon: '☕', name: 'Java', color: '#ED8B00' },
            { id: 'Python', icon: '🐍', name: 'Python', color: '#3776AB' },
            { id: 'JavaScript', icon: 'JS', name: 'JavaScript', color: '#F7DF1E' },
            { id: 'HTML', icon: '<>', name: 'HTML', color: '#E34F26' },
            { id: 'CSS', icon: '🎨', name: 'CSS', color: '#1572B6' },
            { id: 'SQL', icon: '🗃️', name: 'SQL', color: '#4479A1' },
            { id: 'React', icon: '⚛️', name: 'React', color: '#61DAFB' },
            { id: 'Node', icon: '🟢', name: 'Node.js', color: '#339933' }
        ],
        
        // Link Types for Smart Redirect
        LINK_PATTERNS: {
            youtube: [
                /youtube\.com\/watch/i,
                /youtu\.be\//i,
                /youtube\.com\/embed/i,
                /youtube\.com\/playlist/i
            ],
            drive: [
                /drive\.google\.com/i,
                /docs\.google\.com/i
            ],
            github: [
                /github\.com/i,
                /raw\.githubusercontent\.com/i
            ],
            pdf: [
                /\.pdf$/i,
                /\.pdf\?/i
            ]
        }
    };

    // ==================== STORAGE KEYS ====================
    const STORAGE_KEYS = {
        CACHE: 'studyhub_cache',
        USER: 'studyhub_user',
        SAVED: 'studyhub_saved',
        RECENT: 'studyhub_recent',
        TODOS: 'studyhub_todos',
        QUICK_NOTES: 'studyhub_quick_notes',
        TIMETABLE: 'studyhub_timetable',
        STATS: 'studyhub_stats',
        STREAK: 'studyhub_streak',
        ANNOUNCEMENT_CLOSED: 'studyhub_announcement_closed',
        POMODORO_SETTINGS: 'studyhub_pomodoro'
    };

    // ==================== APPLICATION STATE ====================
    const state = {
        data: {
            notes: [],
            videos: [],
            pyq: [],
            tutorials: [],
            config: {}
        },
        
        currentPage: 'home',
        
        navigation: {
            notes: { step: 'courses', course: null, branch: null, semester: null, currentPageNum: 1 },
            videos: { step: 'courses', course: null, branch: null, semester: null, currentPageNum: 1 },
            pyq: { step: 'courses', course: null, branch: null, semester: null, currentPageNum: 1 },
            tutorials: { step: 'languages', language: null, topic: null, currentPageNum: 1 }
        },
        
        // Filtered resources for pagination
        filteredResources: {
            notes: [],
            videos: [],
            pyq: [],
            tutorials: []
        },
        
        currentTool: null,
        
        pomodoro: {
            timer: null,
            timeLeft: 25 * 60,
            isRunning: false,
            isFocus: true,
            focusTime: 25,
            breakTime: 5,
            longBreakTime: 15,
            sessions: 0,
            totalFocusTime: 0
        },
        
        calculator: {
            current: '0',
            previous: '',
            operator: null,
            shouldReset: false
        },
        
        isLoading: true,
        loadingProgress: 0,
        toastTimeout: null,
        searchTimeout: null,
        currentTutorial: null
    };

    // ==================== DOM ELEMENTS CACHE ====================
    const DOM = {};

    // ==================== INITIALIZATION ====================
    function init() {
        console.log('🚀 Initializing StudyHub v2.1...');
        cacheDOMElements();
        bindAllEvents();
        loadPomodoroSettings();
        updateStreak();
        handleDeepLink();
        startLoadingSequence();
    }

    // ==================== CACHE DOM ELEMENTS ====================
    function cacheDOMElements() {
        // Loading Screen
        DOM.loadingScreen = document.getElementById('loading-screen');
        DOM.loadingProgress = document.getElementById('loading-progress');
        DOM.loadingStatus = document.getElementById('loading-status');
        DOM.loadingPercent = document.getElementById('loading-percent');
        DOM.loadingSteps = document.querySelectorAll('.loading-step');
        DOM.runnerEmoji = document.getElementById('runner-emoji');

        // App Container
        DOM.appContainer = document.getElementById('app-container');

        // Header
        DOM.header = document.getElementById('header');
        DOM.menuBtn = document.getElementById('menu-btn');
        DOM.themeToggle = document.getElementById('theme-toggle');
        DOM.themeIcon = document.getElementById('theme-icon');
        DOM.searchBtn = document.getElementById('search-btn');
        DOM.profileBtn = document.getElementById('profile-btn');
        DOM.headerAvatar = document.getElementById('header-avatar');

        // Announcement
        DOM.announcementBanner = document.getElementById('announcement-banner');
        DOM.announcementText = document.getElementById('announcement-text');
        DOM.announcementClose = document.getElementById('announcement-close');

        // Sidebar
        DOM.sidebar = document.getElementById('sidebar');
        DOM.sidebarOverlay = document.getElementById('sidebar-overlay');
        DOM.sidebarClose = document.getElementById('sidebar-close');
        DOM.sidebarAvatar = document.getElementById('sidebar-avatar');
        DOM.sidebarUsername = document.getElementById('sidebar-username');
        DOM.sidebarCollege = document.getElementById('sidebar-college');
        DOM.sidebarItems = document.querySelectorAll('.sidebar-item');

        // Search
        DOM.searchOverlay = document.getElementById('search-overlay');
        DOM.searchInput = document.getElementById('search-input');
        DOM.searchClear = document.getElementById('search-clear');
        DOM.searchClose = document.getElementById('search-close');
        DOM.searchResults = document.getElementById('search-results');

        // Main Content
        DOM.mainContent = document.getElementById('main-content');

        // Footer Dock
        DOM.footerDock = document.getElementById('footer-dock');
        DOM.dockItems = document.querySelectorAll('.dock-item');

        // Toast & Modal
        DOM.toastContainer = document.getElementById('toast-container');
        DOM.modalOverlay = document.getElementById('modal-overlay');
        DOM.modalIcon = document.getElementById('modal-icon');
        DOM.modalTitle = document.getElementById('modal-title');
        DOM.modalMessage = document.getElementById('modal-message');
        DOM.modalCancel = document.getElementById('modal-cancel');
        DOM.modalConfirm = document.getElementById('modal-confirm');

        // Home Page
        DOM.welcomeGreeting = document.getElementById('welcome-greeting');
        DOM.homeUsername = document.getElementById('home-username');
        DOM.welcomeAvatar = document.getElementById('welcome-avatar');
        DOM.countdownCard = document.getElementById('countdown-card');
        DOM.countdownText = document.getElementById('countdown-text');
        DOM.countdownDays = document.getElementById('countdown-days');
        DOM.recentSection = document.getElementById('recent-section');
        DOM.recentItems = document.getElementById('recent-items');
        DOM.clearRecent = document.getElementById('clear-recent');
        DOM.statViewed = document.getElementById('stat-viewed');
        DOM.statSaved = document.getElementById('stat-saved');
        DOM.statTasks = document.getElementById('stat-tasks');
        DOM.statStreak = document.getElementById('stat-streak');
        DOM.notesCount = document.getElementById('notes-count');
        DOM.videosCount = document.getElementById('videos-count');
        DOM.pyqCount = document.getElementById('pyq-count');
        DOM.tutorialsCount = document.getElementById('tutorials-count');

        // Settings Page
        DOM.avatarPreview = document.getElementById('avatar-preview');
        DOM.avatarInput = document.getElementById('avatar-input');
        DOM.avatarRemove = document.getElementById('avatar-remove');
        DOM.settingName = document.getElementById('setting-name');
        DOM.settingCollege = document.getElementById('setting-college');
        DOM.settingCourse = document.getElementById('setting-course');
        DOM.settingSemester = document.getElementById('setting-semester');
        DOM.settingBio = document.getElementById('setting-bio');
        DOM.settingExamName = document.getElementById('setting-exam-name');
        DOM.settingExamDate = document.getElementById('setting-exam-date');
        DOM.settingDarkMode = document.getElementById('setting-dark-mode');
        DOM.exportDataBtn = document.getElementById('export-data-btn');
        DOM.clearCacheBtn = document.getElementById('clear-cache-btn');
        DOM.resetAppBtn = document.getElementById('reset-app-btn');
        DOM.saveSettingsBtn = document.getElementById('save-settings-btn');

        // Support Page
        DOM.upiId = document.getElementById('upi-id');
        DOM.copyUpiBtn = document.getElementById('copy-upi-btn');

        // About Page
        DOM.developerCard = document.getElementById('developer-card');

        // Tools
        DOM.toolsGrid = document.getElementById('tools-grid');
        DOM.toolsBack = document.getElementById('tools-back');
        DOM.toolsTitle = document.getElementById('tools-title');
        DOM.toolContainer = document.getElementById('tool-container');
    }

    // ==================== EVENT BINDINGS ====================
    function bindAllEvents() {
        // Menu Toggle
        DOM.menuBtn?.addEventListener('click', toggleSidebar);
        DOM.sidebarOverlay?.addEventListener('click', closeSidebar);
        DOM.sidebarClose?.addEventListener('click', closeSidebar);

        // Sidebar Navigation
        DOM.sidebarItems?.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const page = item.dataset.page;
                if (page) {
                    navigateToPage(page);
                    closeSidebar();
                }
            });
        });

        // Theme Toggle
        DOM.themeToggle?.addEventListener('click', toggleTheme);

        // Search
        DOM.searchBtn?.addEventListener('click', openSearch);
        DOM.searchClose?.addEventListener('click', closeSearch);
        DOM.searchClear?.addEventListener('click', clearSearch);
        DOM.searchInput?.addEventListener('input', handleSearchInput);
        DOM.searchInput?.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeSearch();
        });

        // Profile Button
        DOM.profileBtn?.addEventListener('click', () => navigateToPage('settings'));

        // Announcement Close
        DOM.announcementClose?.addEventListener('click', closeAnnouncement);

        // Footer Dock
        DOM.dockItems?.forEach(item => {
            item.addEventListener('click', () => {
                const page = item.dataset.page;
                if (page) navigateToPage(page);
            });
        });

        // Quick Actions on Home
        document.querySelectorAll('.quick-action-card')?.forEach(btn => {
            btn.addEventListener('click', () => {
                const action = btn.dataset.action;
                if (action) navigateToPage(action);
            });
        });

        // Quick Tools on Home
        document.querySelectorAll('.tool-quick-btn')?.forEach(btn => {
            btn.addEventListener('click', () => {
                const tool = btn.dataset.tool;
                if (tool) {
                    navigateToPage('tools');
                    setTimeout(() => openTool(tool), 300);
                }
            });
        });

        // Clear Recent
        DOM.clearRecent?.addEventListener('click', clearRecentItems);

        // Settings Events
        DOM.avatarInput?.addEventListener('change', handleAvatarUpload);
        DOM.avatarRemove?.addEventListener('click', removeAvatar);
        DOM.settingDarkMode?.addEventListener('change', handleDarkModeToggle);
        DOM.exportDataBtn?.addEventListener('click', exportData);
        DOM.clearCacheBtn?.addEventListener('click', handleClearCache);
        DOM.resetAppBtn?.addEventListener('click', handleResetApp);
        DOM.saveSettingsBtn?.addEventListener('click', saveSettings);

        // Support Page
        DOM.copyUpiBtn?.addEventListener('click', copyUpiId);

        // About Page - Developer Card
        DOM.developerCard?.addEventListener('click', () => {
            DOM.developerCard.classList.toggle('flipped');
        });

        // Modal
        DOM.modalCancel?.addEventListener('click', closeModal);
        DOM.modalOverlay?.addEventListener('click', (e) => {
            if (e.target === DOM.modalOverlay) closeModal();
        });

        // Tool Cards
        document.querySelectorAll('.tool-card')?.forEach(card => {
            card.addEventListener('click', () => {
                const tool = card.dataset.tool;
                if (tool) openTool(tool);
            });
        });
        DOM.toolsBack?.addEventListener('click', closeTool);

        // Resource Pages
        bindResourcePageEvents('notes');
        bindResourcePageEvents('videos');
        bindResourcePageEvents('pyq');
        bindTutorialsPageEvents();

        // Saved Page Tabs
        document.querySelectorAll('.saved-tab')?.forEach(tab => {
            tab.addEventListener('click', () => {
                document.querySelectorAll('.saved-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                renderSavedItems(tab.dataset.type);
            });
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', handleKeyboardShortcuts);

        // Visibility change for streak
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden) updateStreak();
        });
    }

    function bindResourcePageEvents(type) {
        const backBtn = document.getElementById(`${type}-back`);
        const subjectFilter = document.getElementById(`${type}-subject-filter`);

        backBtn?.addEventListener('click', () => goBack(type));
        subjectFilter?.addEventListener('change', () => {
            state.navigation[type].currentPageNum = 1;
            filterAndRenderResources(type);
        });
    }

    function bindTutorialsPageEvents() {
        const backBtn = document.getElementById('tutorials-back');
        const readerBookmark = document.getElementById('reader-bookmark');
        const readerShare = document.getElementById('reader-share');

        backBtn?.addEventListener('click', goBackTutorials);
        readerBookmark?.addEventListener('click', bookmarkCurrentTutorial);
        readerShare?.addEventListener('click', shareCurrentTutorial);
    }

    function handleKeyboardShortcuts(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            openSearch();
        }
        if (e.key === 'Escape') {
            if (DOM.searchOverlay?.classList.contains('active')) closeSearch();
            if (DOM.modalOverlay?.classList.contains('active')) closeModal();
            if (DOM.sidebar?.classList.contains('active')) closeSidebar();
        }
    }

    // ==================== LOADING SEQUENCE ====================
    async function startLoadingSequence() {
        const steps = [
            { progress: 10, status: 'Starting up...', step: 1 },
            { progress: 25, status: 'Loading notes...', step: 1 },
            { progress: 45, status: 'Loading videos...', step: 2 },
            { progress: 65, status: 'Loading papers...', step: 3 },
            { progress: 80, status: 'Loading tutorials...', step: 3 },
            { progress: 95, status: 'Preparing app...', step: 4 },
            { progress: 100, status: 'Ready!', step: 4 }
        ];

        try {
            updateLoadingUI(steps[0]);
            await delay(300);

            updateLoadingUI(steps[1]);
            await fetchAllData();
            
            updateLoadingUI(steps[2]);
            await delay(200);
            
            updateLoadingUI(steps[3]);
            await delay(200);
            
            updateLoadingUI(steps[4]);
            await delay(200);

            updateLoadingUI(steps[5]);
            initializeApp();
            await delay(300);

            updateLoadingUI(steps[6]);
            await delay(400);

            hideLoadingScreen();

        } catch (error) {
            console.error('❌ Loading error:', error);
            
            const cached = loadCachedData();
            if (cached) {
                updateLoadingUI({ progress: 100, status: 'Using offline data...', step: 4 });
                await delay(500);
                initializeApp();
                hideLoadingScreen();
                showToast('Using cached data - Some content may be outdated', 'warning');
            } else {
                updateLoadingUI({ progress: 100, status: 'Failed to load. Please refresh.', step: 4 });
                showToast('Failed to load data. Please check your connection.', 'error');
            }
        }
    }

    function updateLoadingUI({ progress, status, step }) {
        state.loadingProgress = progress;
        
        if (DOM.loadingProgress) {
            DOM.loadingProgress.style.width = `${progress}%`;
        }
        if (DOM.loadingPercent) {
            DOM.loadingPercent.textContent = `${Math.round(progress)}%`;
        }
        if (DOM.loadingStatus) {
            DOM.loadingStatus.textContent = status;
        }
        if (DOM.runnerEmoji) {
            DOM.runnerEmoji.style.left = `calc(${Math.min(progress, 90)}% - 14px)`;
        }
        
        DOM.loadingSteps?.forEach((stepEl, index) => {
            if (index + 1 <= step) {
                stepEl.classList.add('active');
            }
        });
    }

    function hideLoadingScreen() {
        DOM.loadingScreen?.classList.add('fade-out');
        DOM.appContainer?.classList.remove('hidden');
        
        setTimeout(() => {
            DOM.appContainer?.classList.add('visible');
            if (DOM.loadingScreen) {
                DOM.loadingScreen.style.display = 'none';
            }
            state.isLoading = false;
        }, 600);
    }

    // ==================== DATA FETCHING ====================
    async function fetchAllData() {
        const cached = getCachedData();
        if (cached && !isCacheExpired(cached.timestamp)) {
            console.log('📦 Using cached data');
            state.data = cached.data;
            return;
        }

        console.log('🌐 Fetching fresh data...');

        const fetchPromises = Object.entries(CONFIG.SHEETS).map(([key, sheetName]) => 
            fetchSheetData(sheetName).then(data => ({ key: key.toLowerCase(), data }))
        );

        const results = await Promise.allSettled(fetchPromises);

        results.forEach(result => {
            if (result.status === 'fulfilled' && result.value) {
                const { key, data } = result.value;
                if (key === 'config') {
                    state.data.config = parseConfigData(data);
                } else {
                    state.data[key] = data;
                }
                console.log(`✅ Loaded ${key}: ${data.length} items`);
            }
        });

        saveCachedData(state.data);
    }

    async function fetchSheetData(sheetName) {
        const url = `https://docs.google.com/spreadsheets/d/${CONFIG.SHEET_ID}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(sheetName)}`;
        
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        
        const text = await response.text();
        
        const jsonMatch = text.match(/google\.visualization\.Query\.setResponse\(([\s\S]*)\);?$/);
        if (!jsonMatch) {
            const altMatch = text.match(/\{[\s\S]*\}/);
            if (!altMatch) throw new Error('Invalid format');
            return parseSheetJson(altMatch[0]);
        }
        
        return parseSheetJson(jsonMatch[1]);
    }

    function parseSheetJson(jsonString) {
        try {
            const json = JSON.parse(jsonString);
            if (!json.table || !json.table.rows) return [];

            const headers = json.table.cols.map(col => (col.label || col.id || '').trim());

            const rows = json.table.rows.map((row, rowIndex) => {
                const obj = { _rowIndex: rowIndex };
                if (!row.c) return obj;
                
                row.c.forEach((cell, index) => {
                    const header = headers[index];
                    if (header) {
                        if (cell === null) {
                            obj[header] = '';
                        } else if (cell.v !== undefined && cell.v !== null) {
                            obj[header] = String(cell.v).trim();
                        } else if (cell.f !== undefined) {
                            obj[header] = String(cell.f).trim();
                        } else {
                            obj[header] = '';
                        }
                    }
                });
                return obj;
            });

            return rows.filter(row => {
                const values = Object.entries(row)
                    .filter(([k]) => k !== '_rowIndex')
                    .map(([, v]) => v);
                return values.some(v => v !== '');
            });
            
        } catch (error) {
            console.error('Parse error:', error);
            return [];
        }
    }

    function parseConfigData(rows) {
        const config = {};
        rows.forEach(row => {
            if (row.Key && row.Value) {
                config[row.Key] = row.Value;
            }
        });
        return config;
    }

    // ==================== CACHE MANAGEMENT ====================
    function getCachedData() {
        try {
            const cached = localStorage.getItem(STORAGE_KEYS.CACHE);
            return cached ? JSON.parse(cached) : null;
        } catch (error) {
            return null;
        }
    }

    function saveCachedData(data) {
        try {
            localStorage.setItem(STORAGE_KEYS.CACHE, JSON.stringify({
                data,
                timestamp: Date.now()
            }));
        } catch (error) {
            console.error('Cache save error:', error);
        }
    }

    function isCacheExpired(timestamp) {
        return Date.now() - timestamp > CONFIG.CACHE_DURATION;
    }

    function loadCachedData() {
        const cached = getCachedData();
        if (cached) {
            state.data = cached.data;
            return true;
        }
        return false;
    }

    // ==================== APP INITIALIZATION ====================
    function initializeApp() {
        console.log('🎉 Initializing app...');
        
        applyTheme();
        loadUserData();
        setupAnnouncement();
        updateGreeting();
        updateHomeStats();
        updateExamCountdown();
        renderRecentItems();
        updateResourceCounts();
        renderCourseGrids();
        renderLanguageGrid();
        
        if (DOM.upiId) {
            DOM.upiId.textContent = CONFIG.UPI_ID;
        }
    }

    // ==================== THEME MANAGEMENT ====================
    function applyTheme() {
        const user = getFromStorage(STORAGE_KEYS.USER) || {};
        const isDark = user.darkMode || false;
        
        document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
        document.body.classList.toggle('dark-mode', isDark);
        
        if (DOM.themeIcon) {
            DOM.themeIcon.textContent = isDark ? '☀️' : '🌙';
        }
        if (DOM.settingDarkMode) {
            DOM.settingDarkMode.checked = isDark;
        }
        
        // Update meta theme color
        const metaTheme = document.querySelector('meta[name="theme-color"]');
        if (metaTheme) {
            metaTheme.content = isDark ? '#1A1A2E' : '#667eea';
        }
    }

    function toggleTheme() {
        const user = getFromStorage(STORAGE_KEYS.USER) || {};
        user.darkMode = !user.darkMode;
        saveToStorage(STORAGE_KEYS.USER, user);
        applyTheme();
        showToast(user.darkMode ? '🌙 Dark mode enabled' : '☀️ Light mode enabled', 'info');
    }

    function handleDarkModeToggle(e) {
        const user = getFromStorage(STORAGE_KEYS.USER) || {};
        user.darkMode = e.target.checked;
        saveToStorage(STORAGE_KEYS.USER, user);
        applyTheme();
    }

    // ==================== USER DATA ====================
    function loadUserData() {
        const user = getFromStorage(STORAGE_KEYS.USER) || {};
        updateUserDisplay(user);
        loadSettingsData(user);
    }

    function updateUserDisplay(user = null) {
        if (!user) user = getFromStorage(STORAGE_KEYS.USER) || {};

        const name = user.name || 'Student';
        const college = user.college || 'Your College';
        const avatar = user.avatar;

        if (DOM.homeUsername) DOM.homeUsername.textContent = name;
        if (DOM.sidebarUsername) DOM.sidebarUsername.textContent = name;
        if (DOM.sidebarCollege) DOM.sidebarCollege.textContent = college;

        const avatarHTML = avatar 
            ? `<img src="${avatar}" alt="Avatar" loading="lazy">` 
            : '<span>👤</span>';

        if (DOM.headerAvatar) DOM.headerAvatar.innerHTML = avatarHTML;
        if (DOM.sidebarAvatar) DOM.sidebarAvatar.innerHTML = avatarHTML;
        if (DOM.welcomeAvatar) DOM.welcomeAvatar.innerHTML = avatarHTML;
        if (DOM.avatarPreview) DOM.avatarPreview.innerHTML = avatarHTML;
    }

    function loadSettingsData(user = null) {
        if (!user) user = getFromStorage(STORAGE_KEYS.USER) || {};

        if (DOM.settingName) DOM.settingName.value = user.name || '';
        if (DOM.settingCollege) DOM.settingCollege.value = user.college || '';
        if (DOM.settingCourse) DOM.settingCourse.value = user.course || '';
        if (DOM.settingSemester) DOM.settingSemester.value = user.semester || '';
        if (DOM.settingBio) DOM.settingBio.value = user.bio || '';
        if (DOM.settingExamName) DOM.settingExamName.value = user.examName || '';
        if (DOM.settingExamDate) DOM.settingExamDate.value = user.examDate || '';
        if (DOM.settingDarkMode) DOM.settingDarkMode.checked = user.darkMode || false;
    }

    // ==================== GREETING ====================
    function updateGreeting() {
        const hour = new Date().getHours();
        let greeting = 'Good Morning! ☀️';
        
        if (hour >= 12 && hour < 17) {
            greeting = 'Good Afternoon! 🌤️';
        } else if (hour >= 17 && hour < 21) {
            greeting = 'Good Evening! 🌅';
        } else if (hour >= 21 || hour < 5) {
            greeting = 'Good Night! 🌙';
        }

        if (DOM.welcomeGreeting) {
            DOM.welcomeGreeting.textContent = greeting;
        }
    }

    // ==================== ANNOUNCEMENT ====================
    function setupAnnouncement() {
        const isClosed = sessionStorage.getItem(STORAGE_KEYS.ANNOUNCEMENT_CLOSED);
        
        if (isClosed) {
            DOM.announcementBanner?.classList.add('hidden');
            DOM.mainContent?.classList.remove('with-announcement');
            return;
        }

        const announcement = state.data.config?.Announcement || state.data.config?.announcement;
        
        if (announcement && announcement.trim()) {
            if (DOM.announcementText) {
                DOM.announcementText.textContent = announcement;
            }
            DOM.announcementBanner?.classList.remove('hidden');
            DOM.mainContent?.classList.add('with-announcement');
        } else {
            DOM.announcementBanner?.classList.add('hidden');
            DOM.mainContent?.classList.remove('with-announcement');
        }
    }

    function closeAnnouncement() {
        DOM.announcementBanner?.classList.add('hidden');
        DOM.mainContent?.classList.remove('with-announcement');
        sessionStorage.setItem(STORAGE_KEYS.ANNOUNCEMENT_CLOSED, 'true');
    }

    // ==================== NAVIGATION ====================
    function navigateToPage(pageName) {
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });

        const targetPage = document.getElementById(`page-${pageName}`);
        if (targetPage) {
            targetPage.classList.add('active');
        }

        DOM.dockItems?.forEach(item => {
            item.classList.toggle('active', item.dataset.page === pageName);
        });

        DOM.sidebarItems?.forEach(item => {
            item.classList.toggle('active', item.dataset.page === pageName);
        });

        if (['notes', 'videos', 'pyq'].includes(pageName)) {
            resetResourceNavigation(pageName);
        }

        if (pageName === 'tutorials') {
            resetTutorialsNavigation();
        }

        if (pageName === 'saved') {
            renderSavedItems('all');
        }

        if (pageName === 'tools') {
            closeTool();
        }

        if (pageName === 'settings') {
            loadSettingsData();
        }

        if (pageName === 'home') {
            updateHomeStats();
            renderRecentItems();
            updateExamCountdown();
            updateGreeting();
        }

        state.currentPage = pageName;
        DOM.mainContent?.scrollTo({ top: 0, behavior: 'smooth' });
    }

    window.navigateToPage = navigateToPage;

    // ==================== SIDEBAR ====================
    function toggleSidebar() {
        DOM.sidebar?.classList.toggle('active');
        DOM.sidebarOverlay?.classList.toggle('active');
        document.body.style.overflow = DOM.sidebar?.classList.contains('active') ? 'hidden' : '';
    }

    function closeSidebar() {
        DOM.sidebar?.classList.remove('active');
        DOM.sidebarOverlay?.classList.remove('active');
        document.body.style.overflow = '';
    }

    // ==================== SEARCH ====================
    function openSearch() {
        DOM.searchOverlay?.classList.add('active');
        DOM.searchInput?.focus();
        document.body.style.overflow = 'hidden';
        renderSearchPlaceholder();
    }

    function closeSearch() {
        DOM.searchOverlay?.classList.remove('active');
        if (DOM.searchInput) DOM.searchInput.value = '';
        DOM.searchClear?.classList.add('hidden');
        document.body.style.overflow = '';
        renderSearchPlaceholder();
    }

    function clearSearch() {
        if (DOM.searchInput) DOM.searchInput.value = '';
        DOM.searchClear?.classList.add('hidden');
        DOM.searchInput?.focus();
        renderSearchPlaceholder();
    }

    function handleSearchInput(e) {
        const query = e.target.value.trim();
        DOM.searchClear?.classList.toggle('hidden', query.length === 0);
        
        clearTimeout(state.searchTimeout);
        state.searchTimeout = setTimeout(() => {
            performSearch(query);
        }, CONFIG.DEBOUNCE_DELAY);
    }

    function performSearch(query) {
        if (query.length < 2) {
            renderSearchPlaceholder();
            return;
        }

        const lowerQuery = query.toLowerCase();
        const results = [];

        // Search all resources
        ['notes', 'videos', 'pyq'].forEach(type => {
            const icons = { notes: '📝', videos: '🎬', pyq: '📋' };
            (state.data[type] || []).forEach(item => {
                if (matchesSearch(item, lowerQuery)) {
                    results.push({ ...item, _type: type, _icon: icons[type] });
                }
            });
        });

        // Search tutorials
        (state.data.tutorials || []).forEach(item => {
            if (matchesTutorialSearch(item, lowerQuery)) {
                results.push({ 
                    ...item, 
                    _type: 'tutorials', 
                    _icon: '💡',
                    Title: item.Topic || item.topic
                });
            }
        });

        renderSearchResults(results);
    }

    function matchesSearch(item, query) {
        const fields = [
            item.Title, item.title,
            item.Subject, item.subject,
            item.Course, item.course,
            item.Branch, item.branch,
            item.UploaderName, item.uploader,
            item.Type, item.type
        ];
        return fields.some(field => field && String(field).toLowerCase().includes(query));
    }

    function matchesTutorialSearch(item, query) {
        const fields = [item.Topic, item.topic, item.Subject, item.subject, item.Content, item.content];
        return fields.some(field => field && String(field).toLowerCase().includes(query));
    }

    function renderSearchPlaceholder() {
        if (DOM.searchResults) {
            DOM.searchResults.innerHTML = `
                <div class="search-placeholder">
                    <span class="search-placeholder-icon">🔍</span>
                    <p>Start typing to search...</p>
                    <span class="search-hint">Search in notes, videos, PYQs & tutorials</span>
                </div>
            `;
        }
    }

    function renderSearchResults(results) {
        if (!DOM.searchResults) return;

        if (results.length === 0) {
            DOM.searchResults.innerHTML = `
                <div class="search-placeholder">
                    <span class="search-placeholder-icon">😕</span>
                    <p>No results found</p>
                    <span class="search-hint">Try different keywords</span>
                </div>
            `;
            return;
        }

        const html = results.slice(0, 25).map(item => `
            <div class="search-result-item" 
                 data-type="${item._type}" 
                 data-id="${item.ID || item.id || ''}"
                 data-title="${escapeHtml(item.Title || item.Topic || '')}"
                 data-url="${escapeHtml(item.FileURL || item.fileUrl || item.url || '')}">
                <div class="search-result-icon ${item._type}">${item._icon}</div>
                <div class="search-result-info">
                    <div class="search-result-title">${escapeHtml(item.Title || item.Topic || 'Untitled')}</div>
                    <div class="search-result-meta">
                        ${item.Subject || item.subject || item._type} 
                        ${item.Semester ? `• Sem ${item.Semester}` : ''}
                    </div>
                </div>
                <span class="search-result-type">${item._type}</span>
            </div>
        `).join('');

        DOM.searchResults.innerHTML = html;

        DOM.searchResults.querySelectorAll('.search-result-item').forEach(item => {
            item.addEventListener('click', () => handleSearchResultClick(item.dataset));
        });
    }

    function handleSearchResultClick(data) {
        closeSearch();
        const { type, id, title, url } = data;

        if (type === 'tutorials') {
            navigateToPage('tutorials');
            const tutorial = (state.data.tutorials || []).find(t => 
                (t.Topic || t.topic) === title || (t.ID || t.id) === id
            );
            if (tutorial) {
                selectLanguage(tutorial.Subject || tutorial.subject);
                setTimeout(() => openTutorialReader(tutorial), 300);
            }
        } else if (url) {
            openExternalLink(url, type, title, id);
        } else {
            navigateToPage(type);
        }
    }

    // ==================== STATS ====================
    function updateHomeStats() {
        const stats = getFromStorage(STORAGE_KEYS.STATS) || {};
        const saved = getFromStorage(STORAGE_KEYS.SAVED) || [];
        const streak = getFromStorage(STORAGE_KEYS.STREAK) || { count: 0 };

        if (DOM.statViewed) DOM.statViewed.textContent = stats.totalViewed || 0;
        if (DOM.statSaved) DOM.statSaved.textContent = saved.length;
        if (DOM.statTasks) DOM.statTasks.textContent = stats.tasksCompleted || 0;
        if (DOM.statStreak) DOM.statStreak.textContent = streak.count || 0;
    }

    function incrementStat(key) {
        const stats = getFromStorage(STORAGE_KEYS.STATS) || {};
        stats[key] = (stats[key] || 0) + 1;
        saveToStorage(STORAGE_KEYS.STATS, stats);
    }

    function updateResourceCounts() {
        if (DOM.notesCount) DOM.notesCount.textContent = state.data.notes?.length || 0;
        if (DOM.videosCount) DOM.videosCount.textContent = state.data.videos?.length || 0;
        if (DOM.pyqCount) DOM.pyqCount.textContent = state.data.pyq?.length || 0;
        if (DOM.tutorialsCount) DOM.tutorialsCount.textContent = state.data.tutorials?.length || 0;
    }

    // ==================== STREAK ====================
    function updateStreak() {
        const streak = getFromStorage(STORAGE_KEYS.STREAK) || { count: 0, lastVisit: null };
        const today = new Date().toDateString();
        const lastVisit = streak.lastVisit;

        if (!lastVisit) {
            streak.count = 1;
            streak.lastVisit = today;
        } else if (lastVisit !== today) {
            const lastDate = new Date(lastVisit);
            const todayDate = new Date(today);
            const diffDays = Math.floor((todayDate - lastDate) / (1000 * 60 * 60 * 24));

            if (diffDays === 1) {
                streak.count += 1;
            } else if (diffDays > 1) {
                streak.count = 1;
            }
            streak.lastVisit = today;
        }

        saveToStorage(STORAGE_KEYS.STREAK, streak);
        if (DOM.statStreak) DOM.statStreak.textContent = streak.count;
    }

    // ==================== EXAM COUNTDOWN ====================
    function updateExamCountdown() {
        const user = getFromStorage(STORAGE_KEYS.USER) || {};
        const examDate = user.examDate;
        const examName = user.examName || 'Exam';

        if (!examDate) {
            DOM.countdownCard?.classList.add('hidden');
            return;
        }

        const exam = new Date(examDate);
        const now = new Date();
        now.setHours(0, 0, 0, 0);
        exam.setHours(0, 0, 0, 0);
        
        const diffDays = Math.ceil((exam - now) / (1000 * 60 * 60 * 24));

        if (diffDays < 0) {
            DOM.countdownCard?.classList.add('hidden');
            return;
        }

        DOM.countdownCard?.classList.remove('hidden');
        
        if (DOM.countdownDays) DOM.countdownDays.textContent = diffDays;
        if (DOM.countdownText) {
            if (diffDays === 0) {
                DOM.countdownText.textContent = `${examName} is TODAY! 🎯`;
            } else if (diffDays === 1) {
                DOM.countdownText.textContent = `${examName} is TOMORROW!`;
            } else {
                DOM.countdownText.textContent = `${diffDays} days until ${examName}`;
            }
        }
    }

    // ==================== UTILITY FUNCTIONS ====================
    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    function escapeHtml(text) {
        if (!text) return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    function saveToStorage(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
        } catch (error) {
            console.error('Storage error:', error);
        }
    }

    function getFromStorage(key) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            return null;
        }
    }

    function isVerifiedUploader(name) {
        if (!name) return false;
        return CONFIG.VERIFIED_UPLOADERS.some(v => 
            name.toLowerCase().includes(v.toLowerCase())
        );
    }

    // ==================== SMART LINK HANDLER ====================
    function detectLinkType(url) {
        if (!url) return 'unknown';
        
        for (const [type, patterns] of Object.entries(CONFIG.LINK_PATTERNS)) {
            if (patterns.some(pattern => pattern.test(url))) {
                return type;
            }
        }
        return 'external';
    }

    function openExternalLink(url, type, title, id) {
        if (!url || !url.trim()) {
            showToast('❌ No URL available for this resource', 'error');
            return;
        }

        const linkType = detectLinkType(url);
        let finalUrl = url;

        // Process URL based on type
        if (linkType === 'youtube') {
            // Ensure it opens in YouTube app/site
            showToast('🎬 Opening in YouTube...', 'info');
        } else if (linkType === 'drive') {
            // For Google Drive, try to get direct view link
            if (url.includes('/file/d/')) {
                const fileId = url.match(/\/file\/d\/([^\/]+)/)?.[1];
                if (fileId) {
                    finalUrl = `https://drive.google.com/file/d/${fileId}/view`;
                }
            }
            showToast('📁 Opening in Google Drive...', 'info');
        } else if (linkType === 'pdf') {
            showToast('📄 Opening PDF...', 'info');
        } else if (linkType === 'github') {
            showToast('🐙 Opening in GitHub...', 'info');
        } else {
            showToast('🔗 Opening link...', 'info');
        }

        // Open in new tab
        window.open(finalUrl, '_blank', 'noopener,noreferrer');

        // Track stats
        if (id) addToRecent(id, type, title);
        incrementStat('totalViewed');
    }

    // ==================== TOAST NOTIFICATIONS ====================
    function showToast(message, type = 'info') {
        if (state.toastTimeout) {
            clearTimeout(state.toastTimeout);
        }
        
        if (DOM.toastContainer) {
            DOM.toastContainer.innerHTML = '';
        }

        const icons = {
            success: '✅',
            error: '❌',
            warning: '⚠️',
            info: 'ℹ️'
        };

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <span class="toast-icon">${icons[type] || icons.info}</span>
            <span class="toast-message">${escapeHtml(message)}</span>
        `;

        DOM.toastContainer?.appendChild(toast);

        state.toastTimeout = setTimeout(() => {
            toast.classList.add('toast-exit');
            setTimeout(() => toast.remove(), 300);
        }, CONFIG.TOAST_DURATION);
    }

    window.showToast = showToast;

    // ==================== MODAL ====================
    function showModal(title, message, onConfirm, icon = '⚠️', isDanger = false) {
        if (DOM.modalIcon) DOM.modalIcon.textContent = icon;
        if (DOM.modalTitle) DOM.modalTitle.textContent = title;
        if (DOM.modalMessage) DOM.modalMessage.textContent = message;
        
        if (DOM.modalConfirm) {
            DOM.modalConfirm.className = isDanger ? 'modal-btn danger' : 'modal-btn primary';
            DOM.modalConfirm.onclick = () => {
                closeModal();
                if (onConfirm) onConfirm();
            };
        }

        DOM.modalOverlay?.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        DOM.modalOverlay?.classList.remove('active');
        document.body.style.overflow = '';
    }

    // ==================== CONTINUE IN PART 2 ====================

     // ==================== RESOURCE PAGES WITH PAGINATION ====================

    function renderCourseGrids() {
        ['notes', 'videos', 'pyq'].forEach(type => {
            const coursesGrid = document.getElementById(`${type}-courses`);
            if (coursesGrid) {
                coursesGrid.innerHTML = CONFIG.COURSES.map(course => `
                    <button class="selection-card course-card" data-course="${course.id}">
                        <div class="selection-icon-wrap">
                            <span class="selection-icon">${course.icon}</span>
                        </div>
                        <div class="selection-info">
                            <span class="selection-label">${course.label}</span>
                            <span class="selection-meta">${course.semesters} Semesters</span>
                        </div>
                        <span class="selection-arrow">→</span>
                    </button>
                `).join('');

                coursesGrid.querySelectorAll('.selection-card').forEach(card => {
                    card.addEventListener('click', () => {
                        selectCourse(type, card.dataset.course);
                    });
                });
            }
        });
    }

    function resetResourceNavigation(type) {
        state.navigation[type] = {
            step: 'courses',
            course: null,
            branch: null,
            semester: null,
            currentPageNum: 1
        };
        state.filteredResources[type] = [];

        const elements = {
            back: document.getElementById(`${type}-back`),
            courses: document.getElementById(`${type}-courses`),
            branches: document.getElementById(`${type}-branches`),
            semesters: document.getElementById(`${type}-semesters`),
            filter: document.getElementById(`${type}-filter`),
            list: document.getElementById(`${type}-list`),
            pagination: document.getElementById(`${type}-pagination`),
            loading: document.getElementById(`${type}-loading`),
            empty: document.getElementById(`${type}-empty`),
            breadcrumb: document.getElementById(`${type}-breadcrumb`),
            title: document.getElementById(`${type}-title`)
        };

        elements.back?.classList.add('hidden');
        elements.courses?.classList.remove('hidden');
        elements.branches?.classList.add('hidden');
        elements.semesters?.classList.add('hidden');
        elements.filter?.classList.add('hidden');
        elements.list?.classList.add('hidden');
        elements.pagination?.classList.add('hidden');
        elements.loading?.classList.add('hidden');
        elements.empty?.classList.add('hidden');
        
        if (elements.breadcrumb) elements.breadcrumb.innerHTML = '';

        const titles = {
            notes: 'Notes',
            videos: 'Video Lectures',
            pyq: 'Previous Year Papers'
        };
        if (elements.title) elements.title.textContent = titles[type] || type;
    }

    function selectCourse(type, course) {
        state.navigation[type].course = course;
        state.navigation[type].step = 'branches';

        document.getElementById(`${type}-courses`)?.classList.add('hidden');
        document.getElementById(`${type}-back`)?.classList.remove('hidden');

        renderBranches(type, course);
        updateBreadcrumb(type);
    }

    function renderBranches(type, course) {
        const branchesGrid = document.getElementById(`${type}-branches`);
        if (!branchesGrid) return;

        // Get course-specific branches
        const branches = CONFIG.BRANCHES[course] || CONFIG.BRANCHES['Other'];

        branchesGrid.innerHTML = branches.map(branch => `
            <button class="selection-card branch-card" data-branch="${branch.id}">
                <div class="selection-icon-wrap small">
                    <span class="selection-icon">${branch.icon}</span>
                </div>
                <div class="selection-info">
                    <span class="selection-label">${branch.label}</span>
                </div>
                <span class="selection-arrow">→</span>
            </button>
        `).join('');

        branchesGrid.classList.remove('hidden');

        branchesGrid.querySelectorAll('.selection-card').forEach(card => {
            card.addEventListener('click', () => {
                selectBranch(type, card.dataset.branch);
            });
        });
    }

    function selectBranch(type, branch) {
        state.navigation[type].branch = branch;
        state.navigation[type].step = 'semesters';

        document.getElementById(`${type}-branches`)?.classList.add('hidden');

        renderSemesters(type);
        updateBreadcrumb(type);
    }

    function renderSemesters(type) {
        const semestersGrid = document.getElementById(`${type}-semesters`);
        if (!semestersGrid) return;

        // Get course-specific semester count
        const course = state.navigation[type].course;
        const courseConfig = CONFIG.COURSES.find(c => c.id === course);
        const semesterCount = courseConfig?.semesters || 8;

        const semesters = [];
        for (let i = 1; i <= semesterCount; i++) {
            const suffix = i === 1 ? 'st' : i === 2 ? 'nd' : i === 3 ? 'rd' : 'th';
            semesters.push({ id: String(i), label: `${i}${suffix} Semester` });
        }

        semestersGrid.innerHTML = semesters.map(sem => `
            <button class="selection-card semester-card" data-semester="${sem.id}">
                <div class="selection-icon-wrap small semester">
                    <span class="selection-icon">${sem.id}</span>
                </div>
                <div class="selection-info">
                    <span class="selection-label">${sem.label}</span>
                </div>
                <span class="selection-arrow">→</span>
            </button>
        `).join('');

        semestersGrid.classList.remove('hidden');

        semestersGrid.querySelectorAll('.selection-card').forEach(card => {
            card.addEventListener('click', () => {
                selectSemester(type, card.dataset.semester);
            });
        });
    }

    function selectSemester(type, semester) {
        state.navigation[type].semester = semester;
        state.navigation[type].step = 'resources';
        state.navigation[type].currentPageNum = 1;

        document.getElementById(`${type}-semesters`)?.classList.add('hidden');

        loadAndRenderResources(type);
        updateBreadcrumb(type);
    }

    function loadAndRenderResources(type) {
        const nav = state.navigation[type];
        const loadingState = document.getElementById(`${type}-loading`);
        const filterSection = document.getElementById(`${type}-filter`);
        const subjectFilter = document.getElementById(`${type}-subject-filter`);

        // Show loading
        loadingState?.classList.remove('hidden');

        // Simulate small delay for UX
        setTimeout(() => {
            // Filter resources
            let resources = (state.data[type] || []).filter(item => {
                const itemCourse = (item.Course || item.course || '').toLowerCase();
                const itemBranch = (item.Branch || item.branch || '').toLowerCase();
                const itemSemester = String(item.Semester || item.semester || '');
                const itemStatus = (item.Status || item.status || '').toLowerCase();
                
                const matchCourse = itemCourse === nav.course.toLowerCase() || 
                                   itemCourse.includes(nav.course.toLowerCase());
                const matchBranch = itemBranch === nav.branch.toLowerCase() || 
                                   itemBranch.includes(nav.branch.toLowerCase());
                const matchSemester = itemSemester === nav.semester;
                const notHidden = itemStatus !== 'hidden';
                
                return matchCourse && matchBranch && matchSemester && notHidden;
            });

            // Store filtered resources
            state.filteredResources[type] = resources;

            // Get unique subjects
            const subjects = [...new Set(resources.map(r => r.Subject || r.subject).filter(Boolean))];

            // Populate subject filter
            if (subjectFilter) {
                subjectFilter.innerHTML = '<option value="">📚 All Subjects</option>' +
                    subjects.map(s => `<option value="${s}">${s}</option>`).join('');
            }

            filterSection?.classList.remove('hidden');
            loadingState?.classList.add('hidden');

            renderResourcePage(type);
        }, 300);
    }

    function filterAndRenderResources(type) {
        const nav = state.navigation[type];
        const subjectFilter = document.getElementById(`${type}-subject-filter`);
        const selectedSubject = subjectFilter?.value || '';

        let resources = (state.data[type] || []).filter(item => {
            const itemCourse = (item.Course || item.course || '').toLowerCase();
            const itemBranch = (item.Branch || item.branch || '').toLowerCase();
            const itemSemester = String(item.Semester || item.semester || '');
            const itemSubject = item.Subject || item.subject || '';
            const itemStatus = (item.Status || item.status || '').toLowerCase();
            
            const matchCourse = itemCourse === nav.course.toLowerCase() || 
                               itemCourse.includes(nav.course.toLowerCase());
            const matchBranch = itemBranch === nav.branch.toLowerCase() || 
                               itemBranch.includes(nav.branch.toLowerCase());
            const matchSemester = itemSemester === nav.semester;
            const matchSubject = !selectedSubject || itemSubject === selectedSubject;
            const notHidden = itemStatus !== 'hidden';
            
            return matchCourse && matchBranch && matchSemester && matchSubject && notHidden;
        });

        state.filteredResources[type] = resources;
        state.navigation[type].currentPageNum = 1;
        renderResourcePage(type);
    }

    function renderResourcePage(type) {
        const resources = state.filteredResources[type] || [];
        const currentPage = state.navigation[type].currentPageNum;
        const itemsPerPage = CONFIG.ITEMS_PER_PAGE;
        
        const resourceList = document.getElementById(`${type}-list`);
        const emptyState = document.getElementById(`${type}-empty`);
        let paginationEl = document.getElementById(`${type}-pagination`);

        if (resources.length === 0) {
            resourceList?.classList.add('hidden');
            paginationEl?.classList.add('hidden');
            emptyState?.classList.remove('hidden');
            return;
        }

        emptyState?.classList.add('hidden');
        resourceList?.classList.remove('hidden');

        // Calculate pagination
        const totalPages = Math.ceil(resources.length / itemsPerPage);
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const pageResources = resources.slice(startIndex, endIndex);

        // Render resource cards
        resourceList.innerHTML = pageResources.map(resource => 
            createResourceCard(resource, type)
        ).join('');

        // Bind events
        bindResourceCardEvents(resourceList, type);

        // Render pagination
        renderPagination(type, currentPage, totalPages, resources.length);
    }

    function renderPagination(type, currentPage, totalPages, totalItems) {
        let paginationEl = document.getElementById(`${type}-pagination`);
        
        // Create pagination element if not exists
        if (!paginationEl) {
            const resourceList = document.getElementById(`${type}-list`);
            paginationEl = document.createElement('div');
            paginationEl.id = `${type}-pagination`;
            paginationEl.className = 'pagination-container';
            resourceList?.parentNode?.insertBefore(paginationEl, resourceList.nextSibling);
        }

        if (totalPages <= 1) {
            paginationEl.classList.add('hidden');
            return;
        }

        paginationEl.classList.remove('hidden');

        const startItem = (currentPage - 1) * CONFIG.ITEMS_PER_PAGE + 1;
        const endItem = Math.min(currentPage * CONFIG.ITEMS_PER_PAGE, totalItems);

        let paginationHTML = `
            <div class="pagination-info">
                Showing ${startItem}-${endItem} of ${totalItems} items
            </div>
            <div class="pagination-controls">
        `;

        // Previous button
        paginationHTML += `
            <button class="pagination-btn ${currentPage === 1 ? 'disabled' : ''}" 
                    data-page="${currentPage - 1}" ${currentPage === 1 ? 'disabled' : ''}>
                <span>←</span> Prev
            </button>
        `;

        // Page numbers
        paginationHTML += '<div class="pagination-pages">';
        
        const maxVisiblePages = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
        
        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        if (startPage > 1) {
            paginationHTML += `<button class="pagination-page" data-page="1">1</button>`;
            if (startPage > 2) {
                paginationHTML += `<span class="pagination-ellipsis">...</span>`;
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            paginationHTML += `
                <button class="pagination-page ${i === currentPage ? 'active' : ''}" 
                        data-page="${i}">${i}</button>
            `;
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                paginationHTML += `<span class="pagination-ellipsis">...</span>`;
            }
            paginationHTML += `<button class="pagination-page" data-page="${totalPages}">${totalPages}</button>`;
        }

        paginationHTML += '</div>';

        // Next button
        paginationHTML += `
            <button class="pagination-btn ${currentPage === totalPages ? 'disabled' : ''}" 
                    data-page="${currentPage + 1}" ${currentPage === totalPages ? 'disabled' : ''}>
                Next <span>→</span>
            </button>
        `;

        paginationHTML += '</div>';

        paginationEl.innerHTML = paginationHTML;

        // Bind pagination events
        paginationEl.querySelectorAll('[data-page]').forEach(btn => {
            btn.addEventListener('click', () => {
                if (btn.disabled || btn.classList.contains('disabled')) return;
                
                const page = parseInt(btn.dataset.page);
                state.navigation[type].currentPageNum = page;
                renderResourcePage(type);
                
                // Scroll to top of list
                document.getElementById(`${type}-list`)?.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            });
        });
    }

    function createResourceCard(resource, type) {
        const id = resource.ID || resource.id || Date.now();
        const title = resource.Title || resource.title || 'Untitled';
        const subject = resource.Subject || resource.subject || 'N/A';
        const semester = resource.Semester || resource.semester || 'N/A';
        const uploader = resource.UploaderName || resource.uploader || 'Unknown';
        const downloads = resource.Downloads || resource.downloads || '0';
        const resourceType = resource.Type || resource.type || '';
        const thumbnail = resource.ThumbnailURL || resource.thumbnail || '';
        const fileUrl = resource.FileURL || resource.fileUrl || resource.url || '';
        
        const isVerified = isVerifiedUploader(uploader);
        const isSaved = isResourceSaved(id, type);
        const linkType = detectLinkType(fileUrl);

        // Get link type icon
        const linkIcons = {
            youtube: '🎬 YouTube',
            drive: '📁 Drive',
            github: '🐙 GitHub',
            pdf: '📄 PDF',
            external: '🔗 Link'
        };

        // Thumbnail HTML with play overlay for videos
        let thumbnailHtml;
        if (thumbnail) {
            thumbnailHtml = `
                <img src="${thumbnail}" alt="${escapeHtml(title)}" loading="lazy"
                     onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                <div class="resource-thumbnail-fallback" style="display:none;">
                    <span>${type === 'videos' ? '🎬' : type === 'pyq' ? '📋' : '📝'}</span>
                </div>
            `;
        } else {
            thumbnailHtml = `
                <div class="resource-thumbnail-fallback">
                    <span>${type === 'videos' ? '🎬' : type === 'pyq' ? '📋' : '📝'}</span>
                </div>
            `;
        }

        // Play overlay for videos
        const playOverlay = type === 'videos' ? `
            <div class="video-play-overlay">
                <div class="play-icon-large">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z"/>
                    </svg>
                </div>
            </div>
        ` : '';

        // Action button with link type
        let actionBtn;
        if (type === 'videos') {
            actionBtn = `
                <button class="resource-action-btn video" data-url="${escapeHtml(fileUrl)}">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                        <path d="M8 5v14l11-7z"/>
                    </svg>
                    <span>PLAY VIDEO</span>
                    <span class="link-badge">${linkIcons[linkType] || '🔗'}</span>
                </button>
            `;
        } else {
            actionBtn = `
                <button class="resource-action-btn pdf" data-url="${escapeHtml(fileUrl)}">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/>
                        <polyline points="14 2 14 8 20 8" fill="none" stroke="currentColor" stroke-width="2"/>
                    </svg>
                    <span>OPEN ${type === 'pyq' ? 'PAPER' : 'PDF'}</span>
                    <span class="link-badge">${linkIcons[linkType] || '🔗'}</span>
                </button>
            `;
        }

        return `
            <article class="resource-card" data-id="${id}" data-type="${type}">
                <div class="resource-thumbnail" data-url="${escapeHtml(fileUrl)}">
                    ${thumbnailHtml}
                    ${playOverlay}
                    <div class="resource-badges">
                        ${resourceType ? `<span class="resource-badge type">${escapeHtml(resourceType)}</span>` : ''}
                        ${isVerified ? '<span class="resource-badge verified"><svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg> Verified</span>' : ''}
                    </div>
                </div>
                <div class="resource-body">
                    <h3 class="resource-title">${escapeHtml(title)}</h3>
                    <div class="resource-meta">
                        <span class="resource-meta-item"><span>📚</span> ${escapeHtml(subject)}</span>
                        <span class="resource-meta-item"><span>📅</span> Sem ${semester}</span>
                        <span class="resource-meta-item"><span>👤</span> ${escapeHtml(uploader)}</span>
                    </div>
                    ${actionBtn}
                    <div class="resource-footer">
                        <div class="resource-actions">
                            <button class="resource-icon-btn bookmark-btn ${isSaved ? 'saved' : ''}" 
                                    data-id="${id}" data-type="${type}" 
                                    title="${isSaved ? 'Remove from Saved' : 'Save'}">
                                <span>${isSaved ? '❤️' : '🤍'}</span>
                            </button>
                            <button class="resource-icon-btn share-btn" 
                                    data-id="${id}" data-type="${type}" 
                                    data-title="${escapeHtml(title)}" title="Share">
                                <span>🔗</span>
                            </button>
                            <a href="${CONFIG.REQUEST_FORM_URL}" target="_blank" 
                               class="resource-icon-btn" title="Report Issue">
                                <span>🚩</span>
                            </a>
                        </div>
                        <span class="resource-downloads">
                            <span>📥</span> ${downloads}
                        </span>
                    </div>
                </div>
            </article>
        `;
    }

    function bindResourceCardEvents(container, type) {
        if (!container) return;

        // Action buttons - Opens in NEW TAB
        container.querySelectorAll('.resource-action-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const url = btn.dataset.url;
                const card = btn.closest('.resource-card');
                const id = card?.dataset.id;
                const title = card?.querySelector('.resource-title')?.textContent || 'Resource';

                openExternalLink(url, type, title, id);
            });
        });

        // Thumbnail click for quick open
        container.querySelectorAll('.resource-thumbnail').forEach(thumb => {
            thumb.addEventListener('click', () => {
                const url = thumb.dataset.url;
                const card = thumb.closest('.resource-card');
                const id = card?.dataset.id;
                const title = card?.querySelector('.resource-title')?.textContent || 'Resource';

                if (url) {
                    openExternalLink(url, type, title, id);
                }
            });
        });

        // Bookmark buttons
        container.querySelectorAll('.bookmark-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleBookmark(btn.dataset.id, btn.dataset.type, btn);
            });
        });

        // Share buttons
        container.querySelectorAll('.share-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                shareResource(btn.dataset.id, btn.dataset.type, btn.dataset.title);
            });
        });
    }

    function goBack(type) {
        const nav = state.navigation[type];

        if (nav.step === 'resources') {
            nav.step = 'semesters';
            nav.semester = null;
            document.getElementById(`${type}-filter`)?.classList.add('hidden');
            document.getElementById(`${type}-list`)?.classList.add('hidden');
            document.getElementById(`${type}-pagination`)?.classList.add('hidden');
            document.getElementById(`${type}-empty`)?.classList.add('hidden');
            renderSemesters(type);
        } else if (nav.step === 'semesters') {
            nav.step = 'branches';
            nav.branch = null;
            document.getElementById(`${type}-semesters`)?.classList.add('hidden');
            renderBranches(type, nav.course);
        } else if (nav.step === 'branches') {
            resetResourceNavigation(type);
        }

        updateBreadcrumb(type);
    }

    function updateBreadcrumb(type) {
        const nav = state.navigation[type];
        const breadcrumb = document.getElementById(`${type}-breadcrumb`);
        if (!breadcrumb) return;

        const items = [];
        if (nav.course) items.push({ label: nav.course, icon: '🎓' });
        if (nav.branch) items.push({ label: nav.branch, icon: '📂' });
        if (nav.semester) items.push({ label: `Semester ${nav.semester}`, icon: '📅' });

        breadcrumb.innerHTML = items.map((item, index) => `
            <span class="breadcrumb-item ${index === items.length - 1 ? 'active' : ''}">
                <span>${item.icon}</span> ${escapeHtml(item.label)}
            </span>
        `).join('<span class="breadcrumb-separator">›</span>');
    }

    // ==================== TUTORIALS WITH AUTO-FORMATTING ====================

    function renderLanguageGrid() {
        const languagesGrid = document.getElementById('tutorials-languages');
        if (!languagesGrid) return;

        languagesGrid.innerHTML = CONFIG.LANGUAGES.map(lang => `
            <button class="language-card" data-language="${lang.id}" style="--lang-color: ${lang.color}">
                <div class="language-icon-wrap">
                    <span class="language-icon">${lang.icon}</span>
                </div>
                <span class="language-name">${lang.name}</span>
                <span class="language-count">${getTutorialCount(lang.id)} tutorials</span>
            </button>
        `).join('');

        languagesGrid.querySelectorAll('.language-card').forEach(card => {
            card.addEventListener('click', () => {
                selectLanguage(card.dataset.language);
            });
        });
    }

    function getTutorialCount(language) {
        return (state.data.tutorials || []).filter(t => 
            (t.Subject || t.subject || '').toLowerCase() === language.toLowerCase()
        ).length;
    }

    function resetTutorialsNavigation() {
        state.navigation.tutorials = {
            step: 'languages',
            language: null,
            topic: null,
            currentPageNum: 1
        };
        state.currentTutorial = null;

        const elements = {
            back: document.getElementById('tutorials-back'),
            languages: document.getElementById('tutorials-languages'),
            topics: document.getElementById('tutorials-topics'),
            reader: document.getElementById('tutorial-reader'),
            empty: document.getElementById('tutorials-empty'),
            breadcrumb: document.getElementById('tutorials-breadcrumb'),
            title: document.getElementById('tutorials-title')
        };

        elements.back?.classList.add('hidden');
        elements.languages?.classList.remove('hidden');
        elements.topics?.classList.add('hidden');
        elements.reader?.classList.add('hidden');
        elements.empty?.classList.add('hidden');
        
        if (elements.breadcrumb) elements.breadcrumb.innerHTML = '';
        if (elements.title) elements.title.textContent = 'Tutorials';

        // Re-render to update counts
        renderLanguageGrid();
    }

    function selectLanguage(language) {
        state.navigation.tutorials.language = language;
        state.navigation.tutorials.step = 'topics';

        document.getElementById('tutorials-languages')?.classList.add('hidden');
        document.getElementById('tutorials-back')?.classList.remove('hidden');

        const title = document.getElementById('tutorials-title');
        if (title) title.textContent = `${language} Tutorials`;

        renderTopics(language);
        updateTutorialsBreadcrumb();
    }

    function renderTopics(language) {
        const topicsList = document.getElementById('tutorials-topics');
        const emptyState = document.getElementById('tutorials-empty');

        const tutorials = (state.data.tutorials || []).filter(t => {
            const subject = (t.Subject || t.subject || '').toLowerCase();
            return subject === language.toLowerCase();
        });

        if (tutorials.length === 0) {
            topicsList?.classList.add('hidden');
            emptyState?.classList.remove('hidden');
            return;
        }

        emptyState?.classList.add('hidden');
        topicsList?.classList.remove('hidden');

        topicsList.innerHTML = `
            <div class="topics-header">
                <span class="topics-count">${tutorials.length} Topics</span>
            </div>
            <div class="topics-grid">
                ${tutorials.map((tutorial, index) => `
                    <button class="topic-item" data-index="${index}">
                        <div class="topic-number">${index + 1}</div>
                        <div class="topic-content">
                            <span class="topic-title">${escapeHtml(tutorial.Topic || tutorial.topic || 'Untitled')}</span>
                            <span class="topic-preview">${getTopicPreview(tutorial.Content || tutorial.content)}</span>
                        </div>
                        <span class="topic-arrow">→</span>
                    </button>
                `).join('')}
            </div>
        `;

        topicsList._tutorials = tutorials;

        topicsList.querySelectorAll('.topic-item').forEach(item => {
            item.addEventListener('click', () => {
                const index = parseInt(item.dataset.index);
                openTutorialReader(tutorials[index]);
            });
        });
    }

    function getTopicPreview(content) {
        if (!content) return 'Tap to read...';
        const plainText = content.replace(/[#*`\[\]]/g, '').trim();
        return plainText.length > 60 ? plainText.substring(0, 60) + '...' : plainText;
    }

    function openTutorialReader(tutorial) {
        state.navigation.tutorials.step = 'reader';
        state.navigation.tutorials.topic = tutorial;
        state.currentTutorial = tutorial;

        document.getElementById('tutorials-topics')?.classList.add('hidden');

        const reader = document.getElementById('tutorial-reader');
        reader?.classList.remove('hidden');

        const readerTitle = document.getElementById('reader-title');
        const readerContent = document.getElementById('reader-content');
        const cheatsheetBtn = document.getElementById('cheatsheet-btn');
        const bookmarkBtn = document.getElementById('reader-bookmark');

        if (readerTitle) {
            readerTitle.textContent = tutorial.Topic || tutorial.topic || 'Tutorial';
        }

        if (readerContent) {
            const content = tutorial.Content || tutorial.content || 'No content available.';
            readerContent.innerHTML = formatTutorialContent(content);

            // Apply syntax highlighting
            readerContent.querySelectorAll('pre code').forEach(block => {
                if (typeof hljs !== 'undefined') {
                    hljs.highlightElement(block);
                }
            });
        }

        // Cheatsheet button
        const cheatsheetUrl = tutorial.CheatsheetURL || tutorial.cheatsheet;
        if (cheatsheetUrl && cheatsheetBtn) {
            cheatsheetBtn.href = cheatsheetUrl;
            cheatsheetBtn.classList.remove('hidden');
        } else {
            cheatsheetBtn?.classList.add('hidden');
        }

        // Update bookmark state
        const id = tutorial.ID || tutorial.id || tutorial.Topic || tutorial.topic;
        const isSaved = isResourceSaved(id, 'tutorials');
        if (bookmarkBtn) {
            bookmarkBtn.innerHTML = `<span>${isSaved ? '❤️' : '🤍'}</span>`;
            bookmarkBtn.classList.toggle('saved', isSaved);
        }

        updateTutorialsBreadcrumb();

        // Track
        addToRecent(id, 'tutorials', tutorial.Topic || tutorial.topic);
        incrementStat('totalViewed');
    }

    // ==================== AUTO-FORMAT TUTORIAL CONTENT ====================
    function formatTutorialContent(content) {
        if (!content) return '<div class="tutorial-empty"><p>No content available.</p></div>';

        let html = content;

        // Detect if content is already HTML
        if (html.includes('<h') || html.includes('<p>') || html.includes('<div>')) {
            return `<div class="tutorial-formatted">${html}</div>`;
        }

        // Step 1: Escape HTML entities first (except for our formatting)
        html = html.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

        // Step 2: Code blocks (```language ... ```)
        html = html.replace(/```(\w*)\n?([\s\S]*?)```/g, (match, lang, code) => {
            const language = lang || 'plaintext';
            const cleanCode = code.trim();
            return `
                <div class="code-block-container">
                    <div class="code-block-header">
                        <span class="code-language">${language.toUpperCase()}</span>
                        <button class="code-copy-btn" onclick="copyCodeBlock(this)">
                            <span>📋</span> Copy
                        </button>
                    </div>
                    <pre><code class="language-${language}">${cleanCode}</code></pre>
                </div>
            `;
        });

        // Step 3: Inline code (`code`)
        html = html.replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>');

        // Step 4: Headers with styling
        html = html.replace(/^#### (.+)$/gm, '<h4 class="tutorial-h4"><span class="header-icon">📌</span> $1</h4>');
        html = html.replace(/^### (.+)$/gm, '<h3 class="tutorial-h3"><span class="header-icon">📍</span> $1</h3>');
        html = html.replace(/^## (.+)$/gm, '<h2 class="tutorial-h2"><span class="header-icon">📖</span> $1</h2>');
        html = html.replace(/^# (.+)$/gm, '<h1 class="tutorial-h1"><span class="header-icon">📚</span> $1</h1>');

        // Step 5: Bold and Italic
        html = html.replace(/\*\*\*([^*]+)\*\*\*/g, '<strong><em>$1</em></strong>');
        html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
        html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');
        html = html.replace(/__([^_]+)__/g, '<strong>$1</strong>');
        html = html.replace(/_([^_]+)_/g, '<em>$1</em>');

        // Step 6: Blockquotes
        html = html.replace(/^&gt; (.+)$/gm, '<blockquote class="tutorial-quote"><span class="quote-icon">💡</span> $1</blockquote>');

        // Step 7: Horizontal rules
        html = html.replace(/^---+$/gm, '<hr class="tutorial-divider">');
        html = html.replace(/^\*\*\*+$/gm, '<hr class="tutorial-divider">');

        // Step 8: Unordered lists
        html = html.replace(/(?:^|\n)((?:- .+\n?)+)/g, (match, list) => {
            const items = list.trim().split('\n').map(item => {
                return `<li>${item.replace(/^- /, '')}</li>`;
            }).join('');
            return `<ul class="tutorial-list">${items}</ul>`;
        });

        // Step 9: Ordered lists
        html = html.replace(/(?:^|\n)((?:\d+\. .+\n?)+)/g, (match, list) => {
            const items = list.trim().split('\n').map(item => {
                return `<li>${item.replace(/^\d+\. /, '')}</li>`;
            }).join('');
            return `<ol class="tutorial-list ordered">${items}</ol>`;
        });

        // Step 10: Links
        html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" class="tutorial-link">$1 <span>↗</span></a>');

        // Step 11: Images (if any)
        html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<figure class="tutorial-figure"><img src="$2" alt="$1" loading="lazy"><figcaption>$1</figcaption></figure>');

        // Step 12: Note/Warning/Info boxes
        html = html.replace(/\[NOTE\]([\s\S]*?)\[\/NOTE\]/gi, '<div class="tutorial-note note"><span class="note-icon">📝</span><div class="note-content">$1</div></div>');
        html = html.replace(/\[WARNING\]([\s\S]*?)\[\/WARNING\]/gi, '<div class="tutorial-note warning"><span class="note-icon">⚠️</span><div class="note-content">$1</div></div>');
        html = html.replace(/\[TIP\]([\s\S]*?)\[\/TIP\]/gi, '<div class="tutorial-note tip"><span class="note-icon">💡</span><div class="note-content">$1</div></div>');
        html = html.replace(/\[INFO\]([\s\S]*?)\[\/INFO\]/gi, '<div class="tutorial-note info"><span class="note-icon">ℹ️</span><div class="note-content">$1</div></div>');

        // Step 13: Paragraphs - wrap remaining text
        const lines = html.split('\n\n');
        html = lines.map(line => {
            const trimmed = line.trim();
            if (!trimmed) return '';
            if (trimmed.startsWith('<')) return trimmed;
            return `<p class="tutorial-paragraph">${trimmed.replace(/\n/g, '<br>')}</p>`;
        }).join('\n');

        // Step 14: Table of Contents generation (if has multiple headers)
        const headers = html.match(/<h[1-3][^>]*>.*?<\/h[1-3]>/g);
        let toc = '';
        if (headers && headers.length > 2) {
            const tocItems = headers.map((header, index) => {
                const level = header.match(/<h(\d)/)[1];
                const text = header.replace(/<[^>]+>/g, '').trim();
                const id = `section-${index}`;
                html = html.replace(header, header.replace(/<h(\d)/, `<h$1 id="${id}"`));
                return `<a href="#${id}" class="toc-item level-${level}">${text}</a>`;
            }).join('');
            toc = `
                <div class="tutorial-toc">
                    <div class="toc-header"><span>📑</span> Table of Contents</div>
                    <div class="toc-items">${tocItems}</div>
                </div>
            `;
        }

        return `
            <div class="tutorial-formatted">
                ${toc}
                <div class="tutorial-content-body">
                    ${html}
                </div>
            </div>
        `;
    }

    // Global function for code copy
    window.copyCodeBlock = function(btn) {
        const codeBlock = btn.closest('.code-block-container').querySelector('code');
        const text = codeBlock.textContent;
        
        navigator.clipboard.writeText(text).then(() => {
            btn.innerHTML = '<span>✅</span> Copied!';
            setTimeout(() => {
                btn.innerHTML = '<span>📋</span> Copy';
            }, 2000);
        }).catch(() => {
            showToast('Failed to copy code', 'error');
        });
    };

    function goBackTutorials() {
        const nav = state.navigation.tutorials;

        if (nav.step === 'reader') {
            nav.step = 'topics';
            nav.topic = null;
            state.currentTutorial = null;
            document.getElementById('tutorial-reader')?.classList.add('hidden');
            document.getElementById('tutorials-topics')?.classList.remove('hidden');
        } else if (nav.step === 'topics') {
            resetTutorialsNavigation();
        }

        updateTutorialsBreadcrumb();
    }

    function updateTutorialsBreadcrumb() {
        const nav = state.navigation.tutorials;
        const breadcrumb = document.getElementById('tutorials-breadcrumb');
        if (!breadcrumb) return;

        const items = [];
        if (nav.language) items.push({ label: nav.language, icon: '💻' });
        if (nav.topic) items.push({ label: nav.topic.Topic || nav.topic.topic || 'Tutorial', icon: '📖' });

        breadcrumb.innerHTML = items.map((item, index) => `
            <span class="breadcrumb-item ${index === items.length - 1 ? 'active' : ''}">
                <span>${item.icon}</span> ${escapeHtml(item.label)}
            </span>
        `).join('<span class="breadcrumb-separator">›</span>');
    }

    function bookmarkCurrentTutorial() {
        if (!state.currentTutorial) return;

        const id = state.currentTutorial.ID || state.currentTutorial.id || 
                   state.currentTutorial.Topic || state.currentTutorial.topic;
        const btn = document.getElementById('reader-bookmark');
        
        toggleBookmark(id, 'tutorials', btn);
    }

    function shareCurrentTutorial() {
        if (!state.currentTutorial) return;

        const id = state.currentTutorial.ID || state.currentTutorial.id || 
                   state.currentTutorial.Topic || state.currentTutorial.topic;
        const title = state.currentTutorial.Topic || state.currentTutorial.topic || 'Tutorial';
        
        shareResource(id, 'tutorials', title);
    }

    // ==================== BOOKMARKS / SAVED ====================

    function isResourceSaved(id, type) {
        const saved = getFromStorage(STORAGE_KEYS.SAVED) || [];
        return saved.some(item => String(item.id) === String(id) && item.type === type);
    }

    function toggleBookmark(id, type, btnElement) {
        let saved = getFromStorage(STORAGE_KEYS.SAVED) || [];
        const existingIndex = saved.findIndex(item => String(item.id) === String(id) && item.type === type);

        if (existingIndex !== -1) {
            saved.splice(existingIndex, 1);
            if (btnElement) {
                btnElement.classList.remove('saved');
                btnElement.innerHTML = '<span>🤍</span>';
            }
            showToast('Removed from saved', 'info');
        } else {
            saved.unshift({ id: String(id), type, timestamp: Date.now() });
            if (btnElement) {
                btnElement.classList.add('saved');
                btnElement.innerHTML = '<span>❤️</span>';
            }
            incrementStat('totalSaved');
            showToast('Added to saved! ❤️', 'success');
        }

        saveToStorage(STORAGE_KEYS.SAVED, saved);
        updateHomeStats();
    }

    function renderSavedItems(filter = 'all') {
        const savedList = document.getElementById('saved-list');
        const emptyState = document.getElementById('saved-empty');
        const saved = getFromStorage(STORAGE_KEYS.SAVED) || [];

        let items = saved.map(item => {
            let resource;

            if (item.type === 'tutorials') {
                resource = (state.data.tutorials || []).find(t => 
                    String(t.ID || t.id || t.Topic || t.topic) === String(item.id)
                );
                if (resource) {
                    return { 
                        ...resource, 
                        _savedType: 'tutorials',
                        Title: resource.Topic || resource.topic 
                    };
                }
            } else {
                resource = (state.data[item.type] || []).find(r => 
                    String(r.ID || r.id) === String(item.id)
                );
                if (resource) {
                    return { ...resource, _savedType: item.type };
                }
            }
            return null;
        }).filter(Boolean);

        if (filter !== 'all') {
            items = items.filter(item => item._savedType === filter);
        }

        if (items.length === 0) {
            savedList?.classList.add('hidden');
            emptyState?.classList.remove('hidden');
            return;
        }

        emptyState?.classList.add('hidden');
        savedList?.classList.remove('hidden');

        savedList.innerHTML = items.map(item => 
            createResourceCard(item, item._savedType)
        ).join('');

        bindResourceCardEvents(savedList, 'saved');
    }

    // ==================== RECENT ITEMS ====================

    function addToRecent(id, type, title) {
        if (!id || !type) return;

        let recent = getFromStorage(STORAGE_KEYS.RECENT) || [];
        recent = recent.filter(item => !(String(item.id) === String(id) && item.type === type));
        recent.unshift({ id: String(id), type, title, timestamp: Date.now() });
        recent = recent.slice(0, CONFIG.MAX_RECENT);

        saveToStorage(STORAGE_KEYS.RECENT, recent);
    }

    function renderRecentItems() {
        const recentSection = document.getElementById('recent-section');
        const recentItems = document.getElementById('recent-items');
        const recent = getFromStorage(STORAGE_KEYS.RECENT) || [];

        if (recent.length === 0) {
            recentSection?.classList.add('hidden');
            if (recentItems) recentItems.innerHTML = '';
            return;
        }

        recentSection?.classList.remove('hidden');

        const icons = {
            notes: '📝',
            videos: '🎬',
            pyq: '📋',
            tutorials: '💡'
        };

        const colors = {
            notes: '#3B82F6',
            videos: '#EF4444',
            pyq: '#F59E0B',
            tutorials: '#8B5CF6'
        };

        recentItems.innerHTML = recent.map(item => `
            <button class="recent-card" data-id="${item.id}" data-type="${item.type}" 
                    style="--card-color: ${colors[item.type] || '#6366F1'}">
                <div class="recent-card-icon">${icons[item.type] || '📄'}</div>
                <div class="recent-card-content">
                    <div class="recent-card-title">${escapeHtml(item.title || 'Untitled')}</div>
                    <div class="recent-card-type">${item.type}</div>
                </div>
                <span class="recent-card-arrow">→</span>
            </button>
        `).join('');

        recentItems.querySelectorAll('.recent-card').forEach(card => {
            card.addEventListener('click', () => {
                handleRecentItemClick(card.dataset.id, card.dataset.type);
            });
        });
    }

    function handleRecentItemClick(id, type) {
        if (type === 'tutorials') {
            navigateToPage('tutorials');
            const tutorial = (state.data.tutorials || []).find(t => 
                String(t.ID || t.id || t.Topic || t.topic) === String(id)
            );
            if (tutorial) {
                selectLanguage(tutorial.Subject || tutorial.subject);
                setTimeout(() => openTutorialReader(tutorial), 300);
            }
        } else {
            const resource = (state.data[type] || []).find(r => 
                String(r.ID || r.id) === String(id)
            );
            if (resource) {
                const url = resource.FileURL || resource.fileUrl || resource.url;
                const title = resource.Title || resource.title;
                if (url) {
                    openExternalLink(url, type, title, id);
                }
            }
        }
    }

    function clearRecentItems() {
        showModal(
            'Clear Recent Items',
            'Clear your recent history?',
            () => {
                saveToStorage(STORAGE_KEYS.RECENT, []);
                renderRecentItems();
                showToast('Recent items cleared', 'success');
            },
            '🗑️',
            false
        );
    }

    // ==================== SHARE ====================

    function shareResource(id, type, title) {
        const url = `${window.location.origin}${window.location.pathname}#${type}=${encodeURIComponent(id)}`;

        if (navigator.share) {
            navigator.share({
                title: `StudyHub - ${title}`,
                text: `Check out "${title}" on StudyHub!`,
                url: url
            }).catch(() => copyToClipboard(url));
        } else {
            copyToClipboard(url);
        }
    }

    function copyToClipboard(text) {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text)
                .then(() => showToast('Link copied! 📋', 'success'))
                .catch(() => fallbackCopy(text));
        } else {
            fallbackCopy(text);
        }
    }

    function fallbackCopy(text) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.cssText = 'position:fixed;opacity:0';
        document.body.appendChild(textarea);
        textarea.select();
        
        try {
            document.execCommand('copy');
            showToast('Link copied! 📋', 'success');
        } catch {
            showToast('Failed to copy', 'error');
        }
        
        document.body.removeChild(textarea);
    }

    // ==================== DEEP LINKING ====================

    function handleDeepLink() {
        const hash = window.location.hash;
        if (!hash) return;

        const match = hash.match(/#(\w+)=(.+)/);
        if (!match) return;

        const [, type, encodedId] = match;
        const id = decodeURIComponent(encodedId);

        const attemptNavigation = () => {
            if (state.isLoading) {
                setTimeout(attemptNavigation, 500);
                return;
            }

            if (['notes', 'videos', 'pyq'].includes(type)) {
                const resource = (state.data[type] || []).find(r => 
                    String(r.ID || r.id) === String(id)
                );
                if (resource) {
                    const url = resource.FileURL || resource.fileUrl || resource.url;
                    const title = resource.Title || resource.title;
                    if (url) {
                        setTimeout(() => {
                            openExternalLink(url, type, title, id);
                        }, 500);
                    }
                }
            } else if (type === 'tutorials') {
                const tutorial = (state.data.tutorials || []).find(t => 
                    String(t.ID || t.id || t.Topic || t.topic) === String(id)
                );
                if (tutorial) {
                    navigateToPage('tutorials');
                    setTimeout(() => {
                        selectLanguage(tutorial.Subject || tutorial.subject);
                        setTimeout(() => openTutorialReader(tutorial), 300);
                    }, 300);
                }
            }

            history.replaceState(null, '', window.location.pathname);
        };

        attemptNavigation();
    }

    // ==================== AUTO-REFRESH DATA ====================
    
    async function refreshDataInBackground() {
        console.log('🔄 Background data refresh...');
        
        try {
            const fetchPromises = Object.entries(CONFIG.SHEETS).map(([key, sheetName]) => 
                fetchSheetData(sheetName).then(data => ({ key: key.toLowerCase(), data }))
            );

            const results = await Promise.allSettled(fetchPromises);
            let hasNewData = false;

            results.forEach(result => {
                if (result.status === 'fulfilled' && result.value) {
                    const { key, data } = result.value;
                    const oldLength = state.data[key]?.length || 0;
                    
                    if (key === 'config') {
                        state.data.config = parseConfigData(data);
                    } else {
                        state.data[key] = data;
                        if (data.length !== oldLength) {
                            hasNewData = true;
                        }
                    }
                }
            });

            saveCachedData(state.data);
            updateResourceCounts();

            if (hasNewData) {
                console.log('✨ New data available');
            }
        } catch (error) {
            console.warn('Background refresh failed:', error);
        }
    }

    // Refresh data every 5 minutes while app is open
    setInterval(refreshDataInBackground, 5 * 60 * 1000);

    // ==================== CONTINUE WITH TOOLS ====================

     // ==================== TOOLS SYSTEM ====================

    function openTool(toolName) {
        state.currentTool = toolName;

        document.getElementById('tools-grid')?.classList.add('hidden');
        document.getElementById('tools-back')?.classList.remove('hidden');

        const titles = {
            todo: '✅ To-Do List',
            pomodoro: '⏱️ Pomodoro Timer',
            notes: '📒 Quick Notes',
            timetable: '📅 Timetable',
            sgpa: '📊 SGPA Calculator',
            cgpa: '📈 CGPA Calculator',
            percentage: '💯 GPA to Percentage',
            attendance: '📋 Attendance Tracker',
            calculator: '🔢 Calculator',
            wordcount: '📝 Word Counter',
            age: '🎂 Age Calculator',
            unit: '📐 Unit Converter'
        };

        const toolsTitle = document.getElementById('tools-title');
        if (toolsTitle) toolsTitle.textContent = titles[toolName] || 'Tool';

        const toolContainer = document.getElementById('tool-container');
        if (toolContainer) {
            toolContainer.classList.remove('hidden');
            toolContainer.innerHTML = getToolHTML(toolName);
            initializeTool(toolName);
        }
    }

    function closeTool() {
        state.currentTool = null;

        // Stop pomodoro if running
        if (state.pomodoro.timer) {
            clearInterval(state.pomodoro.timer);
            state.pomodoro.timer = null;
            state.pomodoro.isRunning = false;
        }

        document.getElementById('tools-grid')?.classList.remove('hidden');
        document.getElementById('tools-back')?.classList.add('hidden');
        document.getElementById('tool-container')?.classList.add('hidden');

        const toolsTitle = document.getElementById('tools-title');
        if (toolsTitle) toolsTitle.textContent = '🛠️ Study Tools';
    }

    function getToolHTML(toolName) {
        switch (toolName) {
            case 'todo':
                return `
                    <div class="tool-wrapper tool-todo">
                        <div class="tool-card-modern">
                            <div class="todo-stats-bar">
                                <div class="todo-stat-item">
                                    <span class="todo-stat-value" id="todo-total">0</span>
                                    <span class="todo-stat-label">Total</span>
                                </div>
                                <div class="todo-stat-item completed">
                                    <span class="todo-stat-value" id="todo-completed">0</span>
                                    <span class="todo-stat-label">Done</span>
                                </div>
                                <div class="todo-stat-item pending">
                                    <span class="todo-stat-value" id="todo-pending">0</span>
                                    <span class="todo-stat-label">Pending</span>
                                </div>
                            </div>
                            
                            <div class="todo-progress-container">
                                <div class="todo-progress-bar">
                                    <div class="todo-progress-fill" id="todo-progress-fill">
                                        <span class="todo-progress-text" id="todo-progress-text">0%</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="todo-input-container">
                                <div class="todo-input-wrapper">
                                    <span class="todo-input-icon">✏️</span>
                                    <input type="text" id="todo-input" placeholder="Add a new task..." maxlength="100">
                                    <button class="todo-add-btn" id="todo-add-btn">
                                        <span>+</span>
                                    </button>
                                </div>
                            </div>
                            
                            <div class="todo-filter-tabs">
                                <button class="todo-filter active" data-filter="all">All</button>
                                <button class="todo-filter" data-filter="pending">Pending</button>
                                <button class="todo-filter" data-filter="completed">Completed</button>
                            </div>
                            
                            <ul class="todo-list" id="todo-list"></ul>
                            
                            <div class="todo-empty hidden" id="todo-empty">
                                <span class="todo-empty-icon">📝</span>
                                <p>No tasks yet. Add one above!</p>
                            </div>
                            
                            <div class="todo-actions">
                                <button class="todo-action-btn" id="todo-clear-completed">
                                    <span>🗑️</span> Clear Completed
                                </button>
                            </div>
                        </div>
                    </div>
                `;

            case 'pomodoro':
                return `
                    <div class="tool-wrapper tool-pomodoro">
                        <div class="pomodoro-container">
                            <div class="pomodoro-timer-card">
                                <div class="pomodoro-mode-tabs">
                                    <button class="pomodoro-mode active" data-mode="focus">Focus</button>
                                    <button class="pomodoro-mode" data-mode="short">Short Break</button>
                                    <button class="pomodoro-mode" data-mode="long">Long Break</button>
                                </div>
                                
                                <div class="pomodoro-circle-container">
                                    <svg class="pomodoro-circle" viewBox="0 0 200 200">
                                        <circle class="pomodoro-circle-bg" cx="100" cy="100" r="90"/>
                                        <circle class="pomodoro-circle-progress" id="pomodoro-circle-progress" cx="100" cy="100" r="90"/>
                                    </svg>
                                    <div class="pomodoro-timer-display">
                                        <span class="pomodoro-status" id="pomodoro-status">🎯 Focus Time</span>
                                        <span class="pomodoro-time" id="pomodoro-timer">25:00</span>
                                        <span class="pomodoro-session" id="pomodoro-sessions">Session 1</span>
                                    </div>
                                </div>
                                
                                <div class="pomodoro-controls">
                                    <button class="pomodoro-control-btn secondary" id="pomodoro-reset">
                                        <span>↺</span>
                                    </button>
                                    <button class="pomodoro-control-btn primary" id="pomodoro-start">
                                        <span id="pomodoro-start-icon">▶</span>
                                    </button>
                                    <button class="pomodoro-control-btn secondary" id="pomodoro-skip">
                                        <span>⏭</span>
                                    </button>
                                </div>
                            </div>
                            
                            <div class="pomodoro-settings-card">
                                <h4><span>⚙️</span> Timer Settings</h4>
                                <div class="pomodoro-settings-grid">
                                    <div class="pomodoro-setting-item">
                                        <label>Focus (min)</label>
                                        <div class="number-input-group">
                                            <button class="number-btn minus" data-target="pomodoro-focus-input">−</button>
                                            <input type="number" id="pomodoro-focus-input" value="25" min="1" max="60">
                                            <button class="number-btn plus" data-target="pomodoro-focus-input">+</button>
                                        </div>
                                    </div>
                                    <div class="pomodoro-setting-item">
                                        <label>Short Break</label>
                                        <div class="number-input-group">
                                            <button class="number-btn minus" data-target="pomodoro-short-input">−</button>
                                            <input type="number" id="pomodoro-short-input" value="5" min="1" max="30">
                                            <button class="number-btn plus" data-target="pomodoro-short-input">+</button>
                                        </div>
                                    </div>
                                    <div class="pomodoro-setting-item">
                                        <label>Long Break</label>
                                        <div class="number-input-group">
                                            <button class="number-btn minus" data-target="pomodoro-long-input">−</button>
                                            <input type="number" id="pomodoro-long-input" value="15" min="5" max="60">
                                            <button class="number-btn plus" data-target="pomodoro-long-input">+</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="pomodoro-stats-card">
                                <h4><span>📊</span> Today's Stats</h4>
                                <div class="pomodoro-stats-grid">
                                    <div class="pomodoro-stat">
                                        <span class="stat-number" id="pomodoro-total-sessions">0</span>
                                        <span class="stat-label">Sessions</span>
                                    </div>
                                    <div class="pomodoro-stat">
                                        <span class="stat-number" id="pomodoro-total-time">0m</span>
                                        <span class="stat-label">Focus Time</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;

            case 'sgpa':
                return `
                    <div class="tool-wrapper tool-sgpa">
                        <div class="tool-card-modern">
                            <div class="sgpa-header">
                                <h4>📚 Add Your Subjects</h4>
                                <p>Enter subject details to calculate SGPA</p>
                            </div>
                            
                            <div class="sgpa-subjects-container" id="sgpa-subjects">
                                <div class="sgpa-subject-row">
                                    <div class="sgpa-field">
                                        <label>Subject Name</label>
                                        <input type="text" placeholder="e.g., Mathematics" class="sgpa-name">
                                    </div>
                                    <div class="sgpa-field small">
                                        <label>Credits</label>
                                        <input type="number" placeholder="4" class="sgpa-credit" min="1" max="10">
                                    </div>
                                    <div class="sgpa-field small">
                                        <label>Grade</label>
                                        <select class="sgpa-grade">
                                            <option value="10">O (10)</option>
                                            <option value="9">A+ (9)</option>
                                            <option value="8" selected>A (8)</option>
                                            <option value="7">B+ (7)</option>
                                            <option value="6">B (6)</option>
                                            <option value="5">C (5)</option>
                                            <option value="4">P (4)</option>
                                            <option value="0">F (0)</option>
                                        </select>
                                    </div>
                                    <button class="sgpa-remove-btn" title="Remove">
                                        <span>✕</span>
                                    </button>
                                </div>
                            </div>
                            
                            <button class="tool-add-btn" id="sgpa-add-subject">
                                <span>+</span> Add Subject
                            </button>
                            
                            <button class="tool-primary-btn" id="sgpa-calculate">
                                <span>🧮</span> Calculate SGPA
                            </button>
                            
                            <div class="sgpa-result hidden" id="sgpa-result">
                                <div class="result-card">
                                    <div class="result-circle">
                                        <span class="result-value" id="sgpa-value">0.00</span>
                                        <span class="result-label">SGPA</span>
                                    </div>
                                    <div class="result-details">
                                        <div class="result-detail">
                                            <span>Total Credits:</span>
                                            <span id="sgpa-total-credits">0</span>
                                        </div>
                                        <div class="result-detail">
                                            <span>Grade Points:</span>
                                            <span id="sgpa-grade-points">0</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;

            case 'cgpa':
                return `
                    <div class="tool-wrapper tool-cgpa">
                        <div class="tool-card-modern">
                            <div class="cgpa-header">
                                <h4>📈 Semester-wise SGPA</h4>
                                <p>Enter your SGPA for each semester</p>
                            </div>
                            
                            <div class="cgpa-semesters-container" id="cgpa-semesters">
                                <div class="cgpa-semester-row">
                                    <div class="cgpa-sem-number">1</div>
                                    <div class="cgpa-field">
                                        <input type="number" placeholder="SGPA" class="cgpa-sgpa" min="0" max="10" step="0.01">
                                    </div>
                                    <div class="cgpa-field">
                                        <input type="number" placeholder="Credits" class="cgpa-credits" min="1" max="40">
                                    </div>
                                    <button class="cgpa-remove-btn"><span>✕</span></button>
                                </div>
                            </div>
                            
                            <button class="tool-add-btn" id="cgpa-add-semester">
                                <span>+</span> Add Semester
                            </button>
                            
                            <button class="tool-primary-btn" id="cgpa-calculate">
                                <span>🧮</span> Calculate CGPA
                            </button>
                            
                            <div class="cgpa-result hidden" id="cgpa-result">
                                <div class="result-card">
                                    <div class="result-circle large">
                                        <span class="result-value" id="cgpa-value">0.00</span>
                                        <span class="result-label">CGPA</span>
                                    </div>
                                    <div class="result-grade" id="cgpa-grade">Grade: A</div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;

            case 'percentage':
                return `
                    <div class="tool-wrapper tool-percentage">
                        <div class="tool-card-modern">
                            <div class="percentage-header">
                                <h4>💯 GPA to Percentage</h4>
                                <p>Convert your GPA to percentage</p>
                            </div>
                            
                            <div class="percentage-input-section">
                                <div class="percentage-field">
                                    <label>Enter GPA/CGPA</label>
                                    <input type="number" id="gpa-input" placeholder="e.g., 8.5" min="0" max="10" step="0.01">
                                </div>
                                
                                <div class="percentage-field">
                                    <label>GPA Scale</label>
                                    <div class="scale-options">
                                        <label class="scale-option">
                                            <input type="radio" name="gpa-scale" value="10" checked>
                                            <span>10 Point</span>
                                        </label>
                                        <label class="scale-option">
                                            <input type="radio" name="gpa-scale" value="4">
                                            <span>4 Point</span>
                                        </label>
                                    </div>
                                </div>
                                
                                <div class="percentage-field">
                                    <label>Conversion Formula</label>
                                    <select id="percentage-formula">
                                        <option value="standard">Standard: (GPA - 0.75) × 10</option>
                                        <option value="simple">Simple: GPA × 9.5</option>
                                        <option value="vtu">VTU: (GPA - 0.75) × 10</option>
                                    </select>
                                </div>
                            </div>
                            
                            <button class="tool-primary-btn" id="percentage-calculate">
                                <span>🔄</span> Convert
                            </button>
                            
                            <div class="percentage-result hidden" id="percentage-result">
                                <div class="result-card horizontal">
                                    <div class="result-item">
                                        <span class="result-big" id="percentage-value">0.00%</span>
                                        <span class="result-small">Percentage</span>
                                    </div>
                                    <div class="result-divider"></div>
                                    <div class="result-item">
                                        <span class="result-big" id="percentage-grade">A</span>
                                        <span class="result-small">Grade</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;

            case 'attendance':
                return `
                    <div class="tool-wrapper tool-attendance">
                        <div class="tool-card-modern">
                            <div class="attendance-header">
                                <h4>📋 Attendance Calculator</h4>
                                <p>Track and calculate your attendance</p>
                            </div>
                            
                            <div class="attendance-visual" id="attendance-visual">
                                <div class="attendance-ring">
                                    <svg viewBox="0 0 100 100">
                                        <circle class="ring-bg" cx="50" cy="50" r="45"/>
                                        <circle class="ring-progress" id="attendance-ring-progress" cx="50" cy="50" r="45"/>
                                    </svg>
                                    <div class="ring-value">
                                        <span id="attendance-percent">--%</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="attendance-inputs">
                                <div class="attendance-input-card">
                                    <span class="input-icon">📚</span>
                                    <div class="input-content">
                                        <label>Total Classes</label>
                                        <input type="number" id="total-classes" placeholder="0" min="0">
                                    </div>
                                </div>
                                <div class="attendance-input-card">
                                    <span class="input-icon">✅</span>
                                    <div class="input-content">
                                        <label>Classes Attended</label>
                                        <input type="number" id="attended-classes" placeholder="0" min="0">
                                    </div>
                                </div>
                            </div>
                            
                            <button class="tool-primary-btn" id="attendance-calculate">
                                <span>📊</span> Calculate
                            </button>
                            
                            <div class="attendance-result hidden" id="attendance-result">
                                <div class="attendance-info-cards">
                                    <div class="info-card success" id="attendance-success-card">
                                        <span class="info-icon">✅</span>
                                        <p id="attendance-success-text"></p>
                                    </div>
                                    <div class="info-card warning hidden" id="attendance-warning-card">
                                        <span class="info-icon">⚠️</span>
                                        <p id="attendance-warning-text"></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;

            case 'calculator':
                return `
                    <div class="tool-wrapper tool-calculator">
                        <div class="calculator-modern">
                            <div class="calc-display-area">
                                <div class="calc-history" id="calc-history"></div>
                                <div class="calc-current" id="calc-current">0</div>
                            </div>
                            
                            <div class="calc-keypad">
                                <button class="calc-key function" data-action="clear">AC</button>
                                <button class="calc-key function" data-action="plusminus">±</button>
                                <button class="calc-key function" data-action="%">%</button>
                                <button class="calc-key operator" data-action="/">÷</button>
                                
                                <button class="calc-key number" data-action="7">7</button>
                                <button class="calc-key number" data-action="8">8</button>
                                <button class="calc-key number" data-action="9">9</button>
                                <button class="calc-key operator" data-action="*">×</button>
                                
                                <button class="calc-key number" data-action="4">4</button>
                                <button class="calc-key number" data-action="5">5</button>
                                <button class="calc-key number" data-action="6">6</button>
                                <button class="calc-key operator" data-action="-">−</button>
                                
                                <button class="calc-key number" data-action="1">1</button>
                                <button class="calc-key number" data-action="2">2</button>
                                <button class="calc-key number" data-action="3">3</button>
                                <button class="calc-key operator" data-action="+">+</button>
                                
                                <button class="calc-key number zero" data-action="0">0</button>
                                <button class="calc-key number" data-action=".">.</button>
                                <button class="calc-key backspace" data-action="backspace">⌫</button>
                                <button class="calc-key equals" data-action="=">=</button>
                            </div>
                        </div>
                    </div>
                `;

            case 'wordcount':
                return `
                    <div class="tool-wrapper tool-wordcount">
                        <div class="tool-card-modern">
                            <div class="wordcount-textarea-container">
                                <textarea id="wordcount-input" placeholder="Start typing or paste your text here..."></textarea>
                                <div class="textarea-actions">
                                    <button class="textarea-btn" id="wordcount-paste">📋 Paste</button>
                                    <button class="textarea-btn" id="wordcount-clear">🗑️ Clear</button>
                                    <button class="textarea-btn" id="wordcount-copy">📄 Copy</button>
                                </div>
                            </div>
                            
                            <div class="wordcount-stats-grid">
                                <div class="wordcount-stat-card primary">
                                    <span class="stat-icon">📝</span>
                                    <span class="stat-value" id="word-count">0</span>
                                    <span class="stat-label">Words</span>
                                </div>
                                <div class="wordcount-stat-card">
                                    <span class="stat-icon">🔤</span>
                                    <span class="stat-value" id="char-count">0</span>
                                    <span class="stat-label">Characters</span>
                                </div>
                                <div class="wordcount-stat-card">
                                    <span class="stat-icon">📑</span>
                                    <span class="stat-value" id="char-no-space">0</span>
                                    <span class="stat-label">No Spaces</span>
                                </div>
                                <div class="wordcount-stat-card">
                                    <span class="stat-icon">💬</span>
                                    <span class="stat-value" id="sentence-count">0</span>
                                    <span class="stat-label">Sentences</span>
                                </div>
                                <div class="wordcount-stat-card">
                                    <span class="stat-icon">📄</span>
                                    <span class="stat-value" id="para-count">0</span>
                                    <span class="stat-label">Paragraphs</span>
                                </div>
                                <div class="wordcount-stat-card">
                                    <span class="stat-icon">⏱️</span>
                                    <span class="stat-value" id="read-time">0</span>
                                    <span class="stat-label">Min Read</span>
                                </div>
                            </div>
                        </div>
                    </div>
                `;

            case 'age':
                return `
                    <div class="tool-wrapper tool-age">
                        <div class="tool-card-modern">
                            <div class="age-header">
                                <span class="age-emoji">🎂</span>
                                <h4>Age Calculator</h4>
                                <p>Find your exact age in years, months & days</p>
                            </div>
                            
                            <div class="age-input-section">
                                <label>Select Your Birth Date</label>
                                <input type="date" id="birth-date" class="age-date-input">
                            </div>
                            
                            <button class="tool-primary-btn" id="age-calculate">
                                <span>🎉</span> Calculate Age
                            </button>
                            
                            <div class="age-result hidden" id="age-result">
                                <div class="age-main-display">
                                    <div class="age-big-number" id="age-years">0</div>
                                    <div class="age-label">Years Old</div>
                                </div>
                                
                                <div class="age-details-grid">
                                    <div class="age-detail-card">
                                        <span class="detail-value" id="age-months">0</span>
                                        <span class="detail-label">Months</span>
                                    </div>
                                    <div class="age-detail-card">
                                        <span class="detail-value" id="age-days">0</span>
                                        <span class="detail-label">Days</span>
                                    </div>
                                    <div class="age-detail-card full">
                                        <span class="detail-value" id="age-total-days">0</span>
                                        <span class="detail-label">Total Days Lived</span>
                                    </div>
                                </div>
                                
                                <div class="age-birthday-card" id="birthday-card">
                                    <span class="birthday-icon">🎈</span>
                                    <p id="next-birthday"></p>
                                </div>
                            </div>
                        </div>
                    </div>
                `;

            case 'notes':
                return `
                    <div class="tool-wrapper tool-quicknotes">
                        <div class="tool-card-modern">
                            <div class="quicknote-editor">
                                <textarea id="quicknote-input" placeholder="Write your quick note here... 📝"></textarea>
                                <div class="quicknote-toolbar">
                                    <button class="toolbar-btn" id="quicknote-clear" title="Clear">🗑️</button>
                                    <span class="note-char-count"><span id="note-char-count">0</span>/500</span>
                                    <button class="toolbar-btn primary" id="quicknote-save" title="Save">💾 Save</button>
                                </div>
                            </div>
                            
                            <div class="quicknotes-list-section">
                                <div class="quicknotes-header">
                                    <h4>📒 Saved Notes</h4>
                                    <span class="notes-count" id="notes-count-badge">0</span>
                                </div>
                                <div class="quicknotes-list" id="quicknote-list"></div>
                                <div class="quicknotes-empty hidden" id="quicknotes-empty">
                                    <span>📭</span>
                                    <p>No saved notes yet</p>
                                </div>
                            </div>
                        </div>
                    </div>
                `;

            case 'unit':
                return `
                    <div class="tool-wrapper tool-unit">
                        <div class="tool-card-modern">
                            <div class="unit-header">
                                <h4>📐 Unit Converter</h4>
                            </div>
                            
                            <div class="unit-category-selector">
                                <label>Category</label>
                                <div class="unit-category-grid" id="unit-categories">
                                    <button class="unit-category-btn active" data-category="length">📏 Length</button>
                                    <button class="unit-category-btn" data-category="weight">⚖️ Weight</button>
                                    <button class="unit-category-btn" data-category="temperature">🌡️ Temp</button>
                                    <button class="unit-category-btn" data-category="area">📐 Area</button>
                                    <button class="unit-category-btn" data-category="volume">🧪 Volume</button>
                                    <button class="unit-category-btn" data-category="data">💾 Data</button>
                                    <button class="unit-category-btn" data-category="time">⏰ Time</button>
                                    <button class="unit-category-btn" data-category="speed">🚀 Speed</button>
                                </div>
                            </div>
                            
                            <div class="unit-converter-area">
                                <div class="unit-input-group">
                                    <label>From</label>
                                    <div class="unit-input-row">
                                        <input type="number" id="unit-from-value" placeholder="Enter value">
                                        <select id="unit-from-unit"></select>
                                    </div>
                                </div>
                                
                                <button class="unit-swap-btn" id="unit-swap">
                                    <span>⇅</span>
                                </button>
                                
                                <div class="unit-input-group">
                                    <label>To</label>
                                    <div class="unit-input-row">
                                        <input type="text" id="unit-to-value" readonly placeholder="Result">
                                        <select id="unit-to-unit"></select>
                                    </div>
                                </div>
                            </div>
                            
                            <button class="tool-primary-btn" id="unit-convert">
                                <span>🔄</span> Convert
                            </button>
                        </div>
                    </div>
                `;

            case 'timetable':
                return `
                    <div class="tool-wrapper tool-timetable">
                        <div class="tool-card-modern coming-soon">
                            <div class="coming-soon-content">
                                <span class="coming-soon-icon">📅</span>
                                <h3>Timetable</h3>
                                <p>This feature is coming soon!</p>
                                <div class="coming-soon-features">
                                    <div class="feature-item">✨ Weekly class schedule</div>
                                    <div class="feature-item">✨ Subject color coding</div>
                                    <div class="feature-item">✨ Reminder notifications</div>
                                    <div class="feature-item">✨ Export & share</div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;

            default:
                return `
                    <div class="tool-wrapper">
                        <div class="tool-card-modern coming-soon">
                            <p>This tool is coming soon!</p>
                        </div>
                    </div>
                `;
        }
    }

    function initializeTool(toolName) {
        switch (toolName) {
            case 'todo': initTodoTool(); break;
            case 'pomodoro': initPomodoroTool(); break;
            case 'sgpa': initSgpaTool(); break;
            case 'cgpa': initCgpaTool(); break;
            case 'percentage': initPercentageTool(); break;
            case 'attendance': initAttendanceTool(); break;
            case 'calculator': initCalculatorTool(); break;
            case 'wordcount': initWordCountTool(); break;
            case 'age': initAgeTool(); break;
            case 'notes': initQuickNotesTool(); break;
            case 'unit': initUnitConverterTool(); break;
        }
    }

    // ==================== TODO TOOL ====================
    function initTodoTool() {
        const input = document.getElementById('todo-input');
        const addBtn = document.getElementById('todo-add-btn');
        const clearBtn = document.getElementById('todo-clear-completed');
        const filterBtns = document.querySelectorAll('.todo-filter');

        loadTodos();

        addBtn?.addEventListener('click', addTodo);
        input?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') addTodo();
        });

        clearBtn?.addEventListener('click', clearCompletedTodos);

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                renderTodos(getFromStorage(STORAGE_KEYS.TODOS) || [], btn.dataset.filter);
            });
        });
    }

    function loadTodos() {
        const todos = getFromStorage(STORAGE_KEYS.TODOS) || [];
        renderTodos(todos, 'all');
        updateTodoStats(todos);
    }

    function renderTodos(todos, filter = 'all') {
        const list = document.getElementById('todo-list');
        const empty = document.getElementById('todo-empty');
        if (!list) return;

        let filteredTodos = todos;
        if (filter === 'completed') {
            filteredTodos = todos.filter(t => t.completed);
        } else if (filter === 'pending') {
            filteredTodos = todos.filter(t => !t.completed);
        }

        if (filteredTodos.length === 0) {
            list.innerHTML = '';
            empty?.classList.remove('hidden');
        } else {
            empty?.classList.add('hidden');
            list.innerHTML = filteredTodos.map(todo => `
                <li class="todo-item ${todo.completed ? 'completed' : ''}" data-id="${todo.id}">
                    <button class="todo-checkbox ${todo.completed ? 'checked' : ''}">
                        ${todo.completed ? '<span>✓</span>' : ''}
                    </button>
                    <span class="todo-text">${escapeHtml(todo.text)}</span>
                    <button class="todo-delete" title="Delete">
                        <span>🗑️</span>
                    </button>
                </li>
            `).join('');

            list.querySelectorAll('.todo-item').forEach(item => {
                const id = item.dataset.id;
                item.querySelector('.todo-checkbox')?.addEventListener('click', () => toggleTodoItem(id));
                item.querySelector('.todo-delete')?.addEventListener('click', () => deleteTodoItem(id));
            });
        }

        updateTodoStats(todos);
    }

    function updateTodoStats(todos) {
        const total = todos.length;
        const completed = todos.filter(t => t.completed).length;
        const pending = total - completed;
        const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

        document.getElementById('todo-total').textContent = total;
        document.getElementById('todo-completed').textContent = completed;
        document.getElementById('todo-pending').textContent = pending;
        
        const progressFill = document.getElementById('todo-progress-fill');
        const progressText = document.getElementById('todo-progress-text');
        
        if (progressFill) {
            progressFill.style.width = `${percentage}%`;
        }
        if (progressText) {
            progressText.textContent = `${percentage}%`;
        }
    }

    function addTodo() {
        const input = document.getElementById('todo-input');
        const text = input?.value.trim();
        if (!text) return;

        const todos = getFromStorage(STORAGE_KEYS.TODOS) || [];
        todos.unshift({
            id: Date.now().toString(),
            text,
            completed: false,
            createdAt: Date.now()
        });

        saveToStorage(STORAGE_KEYS.TODOS, todos);
        
        const activeFilter = document.querySelector('.todo-filter.active')?.dataset.filter || 'all';
        renderTodos(todos, activeFilter);

        if (input) input.value = '';
        showToast('Task added! ✅', 'success');
    }

    function toggleTodoItem(id) {
        const todos = getFromStorage(STORAGE_KEYS.TODOS) || [];
        const todo = todos.find(t => t.id === id);

        if (todo) {
            const wasCompleted = todo.completed;
            todo.completed = !todo.completed;
            saveToStorage(STORAGE_KEYS.TODOS, todos);
            
            const activeFilter = document.querySelector('.todo-filter.active')?.dataset.filter || 'all';
            renderTodos(todos, activeFilter);

            if (!wasCompleted && todo.completed) {
                incrementStat('tasksCompleted');
                showToast('Task completed! 🎉', 'success');
            }
        }
    }

    function deleteTodoItem(id) {
        let todos = getFromStorage(STORAGE_KEYS.TODOS) || [];
        todos = todos.filter(t => t.id !== id);
        saveToStorage(STORAGE_KEYS.TODOS, todos);
        
        const activeFilter = document.querySelector('.todo-filter.active')?.dataset.filter || 'all';
        renderTodos(todos, activeFilter);
        showToast('Task deleted', 'info');
    }

    function clearCompletedTodos() {
        let todos = getFromStorage(STORAGE_KEYS.TODOS) || [];
        const completedCount = todos.filter(t => t.completed).length;
        
        if (completedCount === 0) {
            showToast('No completed tasks to clear', 'info');
            return;
        }

        todos = todos.filter(t => !t.completed);
        saveToStorage(STORAGE_KEYS.TODOS, todos);
        
        const activeFilter = document.querySelector('.todo-filter.active')?.dataset.filter || 'all';
        renderTodos(todos, activeFilter);
        showToast(`Cleared ${completedCount} completed tasks`, 'success');
    }

    // ==================== POMODORO TOOL ====================
    function loadPomodoroSettings() {
        const saved = getFromStorage(STORAGE_KEYS.POMODORO_SETTINGS);
        if (saved) {
            state.pomodoro.focusTime = saved.focusTime || 25;
            state.pomodoro.breakTime = saved.breakTime || 5;
            state.pomodoro.longBreakTime = saved.longBreakTime || 15;
            state.pomodoro.sessions = saved.sessions || 0;
            state.pomodoro.totalFocusTime = saved.totalFocusTime || 0;
        }
    }

    function savePomodoroSettings() {
        saveToStorage(STORAGE_KEYS.POMODORO_SETTINGS, {
            focusTime: state.pomodoro.focusTime,
            breakTime: state.pomodoro.breakTime,
            longBreakTime: state.pomodoro.longBreakTime,
            sessions: state.pomodoro.sessions,
            totalFocusTime: state.pomodoro.totalFocusTime
        });
    }

    function initPomodoroTool() {
        loadPomodoroSettings();
        
        state.pomodoro.timeLeft = state.pomodoro.focusTime * 60;
        state.pomodoro.isRunning = false;
        state.pomodoro.isFocus = true;

        const startBtn = document.getElementById('pomodoro-start');
        const resetBtn = document.getElementById('pomodoro-reset');
        const skipBtn = document.getElementById('pomodoro-skip');
        const modeBtns = document.querySelectorAll('.pomodoro-mode');
        
        // Set input values
        document.getElementById('pomodoro-focus-input').value = state.pomodoro.focusTime;
        document.getElementById('pomodoro-short-input').value = state.pomodoro.breakTime;
        document.getElementById('pomodoro-long-input').value = state.pomodoro.longBreakTime;

        updatePomodoroDisplay();
        updatePomodoroStats();

        startBtn?.addEventListener('click', togglePomodoro);
        resetBtn?.addEventListener('click', resetPomodoro);
        skipBtn?.addEventListener('click', skipPomodoro);

        modeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                if (state.pomodoro.isRunning) return;
                modeBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                switchPomodoroMode(btn.dataset.mode);
            });
        });

        // Number input buttons
        document.querySelectorAll('.number-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const targetId = btn.dataset.target;
                const input = document.getElementById(targetId);
                if (!input) return;
                
                let value = parseInt(input.value) || 0;
                if (btn.classList.contains('plus')) {
                    value = Math.min(value + 1, parseInt(input.max) || 60);
                } else {
                    value = Math.max(value - 1, parseInt(input.min) || 1);
                }
                input.value = value;
                updatePomodoroSettingsFromInputs();
            });
        });

        // Input change events
        ['pomodoro-focus-input', 'pomodoro-short-input', 'pomodoro-long-input'].forEach(id => {
            document.getElementById(id)?.addEventListener('change', updatePomodoroSettingsFromInputs);
        });

        // Request notification permission
        if ('Notification' in window && Notification.permission === 'default') {
            Notification.requestPermission();
        }
    }

    function updatePomodoroSettingsFromInputs() {
        state.pomodoro.focusTime = parseInt(document.getElementById('pomodoro-focus-input')?.value) || 25;
        state.pomodoro.breakTime = parseInt(document.getElementById('pomodoro-short-input')?.value) || 5;
        state.pomodoro.longBreakTime = parseInt(document.getElementById('pomodoro-long-input')?.value) || 15;
        
        if (!state.pomodoro.isRunning) {
            const activeMode = document.querySelector('.pomodoro-mode.active')?.dataset.mode || 'focus';
            switchPomodoroMode(activeMode);
        }
        
        savePomodoroSettings();
    }

    function switchPomodoroMode(mode) {
        if (mode === 'focus') {
            state.pomodoro.isFocus = true;
            state.pomodoro.timeLeft = state.pomodoro.focusTime * 60;
            document.getElementById('pomodoro-status').textContent = '🎯 Focus Time';
        } else if (mode === 'short') {
            state.pomodoro.isFocus = false;
            state.pomodoro.timeLeft = state.pomodoro.breakTime * 60;
            document.getElementById('pomodoro-status').textContent = '☕ Short Break';
        } else if (mode === 'long') {
            state.pomodoro.isFocus = false;
            state.pomodoro.timeLeft = state.pomodoro.longBreakTime * 60;
            document.getElementById('pomodoro-status').textContent = '🌴 Long Break';
        }
        updatePomodoroDisplay();
    }

    function togglePomodoro() {
        const startBtn = document.getElementById('pomodoro-start');
        const startIcon = document.getElementById('pomodoro-start-icon');
        
        if (state.pomodoro.isRunning) {
            // Pause
            clearInterval(state.pomodoro.timer);
            state.pomodoro.isRunning = false;
            if (startIcon) startIcon.textContent = '▶';
        } else {
            // Start
            state.pomodoro.isRunning = true;
            if (startIcon) startIcon.textContent = '⏸';
            
            state.pomodoro.timer = setInterval(() => {
                state.pomodoro.timeLeft--;

                if (state.pomodoro.isFocus) {
                    state.pomodoro.totalFocusTime++;
                }

                if (state.pomodoro.timeLeft <= 0) {
                    handlePomodoroComplete();
                }

                updatePomodoroDisplay();
            }, 1000);
        }
    }

    function handlePomodoroComplete() {
        clearInterval(state.pomodoro.timer);
        state.pomodoro.isRunning = false;
        
        const startIcon = document.getElementById('pomodoro-start-icon');
        if (startIcon) startIcon.textContent = '▶';

        // Play sound (browser beep)
        try {
            const audio = new AudioContext();
            const oscillator = audio.createOscillator();
            const gain = audio.createGain();
            oscillator.connect(gain);
            gain.connect(audio.destination);
            oscillator.frequency.value = 800;
            gain.gain.value = 0.1;
            oscillator.start();
            setTimeout(() => oscillator.stop(), 200);
        } catch (e) {}

        if (state.pomodoro.isFocus) {
            state.pomodoro.sessions++;
            showToast('🎉 Focus session complete! Take a break.', 'success');
            
            // Switch to break
            state.pomodoro.isFocus = false;
            const shouldLongBreak = state.pomodoro.sessions % 4 === 0;
            state.pomodoro.timeLeft = shouldLongBreak ? state.pomodoro.longBreakTime * 60 : state.pomodoro.breakTime * 60;
            document.getElementById('pomodoro-status').textContent = shouldLongBreak ? '🌴 Long Break' : '☕ Short Break';
            
            document.querySelectorAll('.pomodoro-mode').forEach(btn => {
                btn.classList.toggle('active', btn.dataset.mode === (shouldLongBreak ? 'long' : 'short'));
            });
        } else {
            showToast('💪 Break over! Ready to focus?', 'info');
            
            // Switch to focus
            state.pomodoro.isFocus = true;
            state.pomodoro.timeLeft = state.pomodoro.focusTime * 60;
            document.getElementById('pomodoro-status').textContent = '🎯 Focus Time';
            
            document.querySelectorAll('.pomodoro-mode').forEach(btn => {
                btn.classList.toggle('active', btn.dataset.mode === 'focus');
            });
        }

        // Notification
        if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('StudyHub Pomodoro', {
                body: state.pomodoro.isFocus ? 'Time to focus!' : 'Take a break!',
                icon: '⏱️'
            });
        }

        savePomodoroSettings();
        updatePomodoroDisplay();
        updatePomodoroStats();
    }

    function resetPomodoro() {
        clearInterval(state.pomodoro.timer);
        state.pomodoro.timer = null;
        state.pomodoro.isRunning = false;
        state.pomodoro.isFocus = true;
        state.pomodoro.timeLeft = state.pomodoro.focusTime * 60;
        
        document.getElementById('pomodoro-start-icon').textContent = '▶';
        document.getElementById('pomodoro-status').textContent = '🎯 Focus Time';
        
        document.querySelectorAll('.pomodoro-mode').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.mode === 'focus');
        });
        
        updatePomodoroDisplay();
    }

    function skipPomodoro() {
        handlePomodoroComplete();
    }

    function updatePomodoroDisplay() {
        const minutes = Math.floor(state.pomodoro.timeLeft / 60);
        const seconds = state.pomodoro.timeLeft % 60;

        const timerEl = document.getElementById('pomodoro-timer');
        const sessionsEl = document.getElementById('pomodoro-sessions');
        const progressEl = document.getElementById('pomodoro-circle-progress');

        if (timerEl) {
            timerEl.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        }
        if (sessionsEl) {
            sessionsEl.textContent = `Session ${state.pomodoro.sessions + 1}`;
        }
        
        // Update circular progress
        if (progressEl) {
            const totalTime = state.pomodoro.isFocus ? state.pomodoro.focusTime * 60 : 
                             (state.pomodoro.sessions % 4 === 0 ? state.pomodoro.longBreakTime : state.pomodoro.breakTime) * 60;
            const progress = (totalTime - state.pomodoro.timeLeft) / totalTime;
            const circumference = 2 * Math.PI * 90;
            progressEl.style.strokeDasharray = circumference;
            progressEl.style.strokeDashoffset = circumference * (1 - progress);
        }
    }

    function updatePomodoroStats() {
        const sessionsEl = document.getElementById('pomodoro-total-sessions');
        const timeEl = document.getElementById('pomodoro-total-time');

        if (sessionsEl) sessionsEl.textContent = state.pomodoro.sessions;
        if (timeEl) {
            const minutes = Math.floor(state.pomodoro.totalFocusTime / 60);
            timeEl.textContent = `${minutes}m`;
        }
    }

    // ==================== SGPA CALCULATOR ====================
    function initSgpaTool() {
        const addBtn = document.getElementById('sgpa-add-subject');
        const calcBtn = document.getElementById('sgpa-calculate');
        const container = document.getElementById('sgpa-subjects');

        addBtn?.addEventListener('click', () => addSgpaSubject(container));
        calcBtn?.addEventListener('click', calculateSgpa);

        // Bind existing remove button
        container?.querySelectorAll('.sgpa-remove-btn').forEach(btn => {
            btn.addEventListener('click', () => removeSgpaRow(btn));
        });
    }

    function addSgpaSubject(container) {
        if (!container) return;

        const row = document.createElement('div');
        row.className = 'sgpa-subject-row';
        row.innerHTML = `
            <div class="sgpa-field">
                <label>Subject Name</label>
                <input type="text" placeholder="e.g., Physics" class="sgpa-name">
            </div>
            <div class="sgpa-field small">
                <label>Credits</label>
                <input type="number" placeholder="4" class="sgpa-credit" min="1" max="10">
            </div>
            <div class="sgpa-field small">
                <label>Grade</label>
                <select class="sgpa-grade">
                    <option value="10">O (10)</option>
                    <option value="9">A+ (9)</option>
                    <option value="8" selected>A (8)</option>
                    <option value="7">B+ (7)</option>
                    <option value="6">B (6)</option>
                    <option value="5">C (5)</option>
                    <option value="4">P (4)</option>
                    <option value="0">F (0)</option>
                </select>
            </div>
            <button class="sgpa-remove-btn" title="Remove"><span>✕</span></button>
        `;

        row.querySelector('.sgpa-remove-btn')?.addEventListener('click', function() {
            removeSgpaRow(this);
        });

        container.appendChild(row);
    }

    function removeSgpaRow(btn) {
        const container = document.getElementById('sgpa-subjects');
        if (container && container.children.length > 1) {
            btn.closest('.sgpa-subject-row')?.remove();
        } else {
            showToast('At least one subject is required', 'warning');
        }
    }

    function calculateSgpa() {
        const rows = document.querySelectorAll('.sgpa-subject-row');
        let totalCredits = 0;
        let totalGradePoints = 0;

        rows.forEach(row => {
            const credit = parseFloat(row.querySelector('.sgpa-credit')?.value) || 0;
            const grade = parseFloat(row.querySelector('.sgpa-grade')?.value) || 0;

            if (credit > 0) {
                totalCredits += credit;
                totalGradePoints += credit * grade;
            }
        });

        if (totalCredits === 0) {
            showToast('Please enter at least one subject with credits', 'error');
            return;
        }

        const sgpa = (totalGradePoints / totalCredits).toFixed(2);

        document.getElementById('sgpa-value').textContent = sgpa;
        document.getElementById('sgpa-total-credits').textContent = totalCredits;
        document.getElementById('sgpa-grade-points').textContent = totalGradePoints;
        document.getElementById('sgpa-result')?.classList.remove('hidden');

        showToast(`Your SGPA is ${sgpa} 🎓`, 'success');
    }

    // ==================== CGPA CALCULATOR ====================
    function initCgpaTool() {
        const addBtn = document.getElementById('cgpa-add-semester');
        const calcBtn = document.getElementById('cgpa-calculate');
        const container = document.getElementById('cgpa-semesters');

        addBtn?.addEventListener('click', () => addCgpaSemester(container));
        calcBtn?.addEventListener('click', calculateCgpa);

        container?.querySelectorAll('.cgpa-remove-btn').forEach(btn => {
            btn.addEventListener('click', () => removeCgpaRow(btn));
        });
    }

    function addCgpaSemester(container) {
        if (!container) return;

        const count = container.children.length + 1;
        const row = document.createElement('div');
        row.className = 'cgpa-semester-row';
        row.innerHTML = `
            <div class="cgpa-sem-number">${count}</div>
            <div class="cgpa-field">
                <input type="number" placeholder="SGPA" class="cgpa-sgpa" min="0" max="10" step="0.01">
            </div>
            <div class="cgpa-field">
                <input type="number" placeholder="Credits" class="cgpa-credits" min="1" max="40">
            </div>
            <button class="cgpa-remove-btn"><span>✕</span></button>
        `;

        row.querySelector('.cgpa-remove-btn')?.addEventListener('click', function() {
            removeCgpaRow(this);
        });

        container.appendChild(row);
    }

    function removeCgpaRow(btn) {
        const container = document.getElementById('cgpa-semesters');
        if (container && container.children.length > 1) {
            btn.closest('.cgpa-semester-row')?.remove();
            // Renumber
            container.querySelectorAll('.cgpa-sem-number').forEach((el, i) => {
                el.textContent = i + 1;
            });
        } else {
            showToast('At least one semester is required', 'warning');
        }
    }

    function calculateCgpa() {
        const rows = document.querySelectorAll('.cgpa-semester-row');
        let totalCredits = 0;
        let weightedSum = 0;

        rows.forEach(row => {
            const sgpa = parseFloat(row.querySelector('.cgpa-sgpa')?.value) || 0;
            const credits = parseFloat(row.querySelector('.cgpa-credits')?.value) || 0;

            if (credits > 0 && sgpa > 0) {
                totalCredits += credits;
                weightedSum += credits * sgpa;
            }
        });

        if (totalCredits === 0) {
            showToast('Please enter SGPA and credits for at least one semester', 'error');
            return;
        }

        const cgpa = (weightedSum / totalCredits).toFixed(2);
        const grade = cgpa >= 9 ? 'O' : cgpa >= 8 ? 'A+' : cgpa >= 7 ? 'A' : cgpa >= 6 ? 'B+' : cgpa >= 5 ? 'B' : 'C';

        document.getElementById('cgpa-value').textContent = cgpa;
        document.getElementById('cgpa-grade').textContent = `Grade: ${grade}`;
        document.getElementById('cgpa-result')?.classList.remove('hidden');

        showToast(`Your CGPA is ${cgpa} 🎓`, 'success');
    }

    // ==================== PERCENTAGE CONVERTER ====================
    function initPercentageTool() {
        const calcBtn = document.getElementById('percentage-calculate');
        calcBtn?.addEventListener('click', calculatePercentage);
    }

    function calculatePercentage() {
        const gpa = parseFloat(document.getElementById('gpa-input')?.value) || 0;
        const scale = document.querySelector('input[name="gpa-scale"]:checked')?.value || '10';
        const formula = document.getElementById('percentage-formula')?.value || 'standard';

        if (gpa <= 0) {
            showToast('Please enter a valid GPA', 'error');
            return;
        }

        let percentage;
        if (scale === '10') {
            if (formula === 'simple') {
                percentage = (gpa * 9.5).toFixed(2);
            } else {
                percentage = ((gpa - 0.75) * 10).toFixed(2);
            }
        } else {
            percentage = ((gpa / 4) * 100).toFixed(2);
        }

        const grade = percentage >= 90 ? 'O' : percentage >= 80 ? 'A+' : percentage >= 70 ? 'A' : 
                     percentage >= 60 ? 'B+' : percentage >= 50 ? 'B' : percentage >= 40 ? 'C' : 'F';

        document.getElementById('percentage-value').textContent = `${percentage}%`;
        document.getElementById('percentage-grade').textContent = grade;
        document.getElementById('percentage-result')?.classList.remove('hidden');

        showToast(`Percentage: ${percentage}%`, 'success');
    }

    // ==================== ATTENDANCE CALCULATOR ====================
    function initAttendanceTool() {
        const calcBtn = document.getElementById('attendance-calculate');
        const totalInput = document.getElementById('total-classes');
        const attendedInput = document.getElementById('attended-classes');

        calcBtn?.addEventListener('click', calculateAttendance);

        // Live update
        [totalInput, attendedInput].forEach(input => {
            input?.addEventListener('input', () => {
                const total = parseInt(totalInput?.value) || 0;
                const attended = parseInt(attendedInput?.value) || 0;
                
                if (total > 0 && attended >= 0) {
                    updateAttendanceRing(attended, total);
                }
            });
        });
    }

    function updateAttendanceRing(attended, total) {
        const percentage = total > 0 ? ((attended / total) * 100) : 0;
        const percentEl = document.getElementById('attendance-percent');
        const ringEl = document.getElementById('attendance-ring-progress');

        if (percentEl) percentEl.textContent = `${percentage.toFixed(1)}%`;

        if (ringEl) {
            const circumference = 2 * Math.PI * 45;
            ringEl.style.strokeDasharray = circumference;
            ringEl.style.strokeDashoffset = circumference * (1 - percentage / 100);
            
            // Color based on percentage
            if (percentage >= 75) {
                ringEl.style.stroke = '#10B981';
            } else if (percentage >= 60) {
                ringEl.style.stroke = '#F59E0B';
            } else {
                ringEl.style.stroke = '#EF4444';
            }
        }
    }

    function calculateAttendance() {
        const total = parseInt(document.getElementById('total-classes')?.value) || 0;
        const attended = parseInt(document.getElementById('attended-classes')?.value) || 0;

        if (total <= 0) {
            showToast('Please enter valid number of classes', 'error');
            return;
        }

        if (attended > total) {
            showToast('Attended classes cannot exceed total classes', 'error');
            return;
        }

        const percentage = ((attended / total) * 100).toFixed(1);
        const resultEl = document.getElementById('attendance-result');
        const successCard = document.getElementById('attendance-success-card');
        const warningCard = document.getElementById('attendance-warning-card');
        const successText = document.getElementById('attendance-success-text');
        const warningText = document.getElementById('attendance-warning-text');

        updateAttendanceRing(attended, total);

        if (percentage >= 75) {
            const canMiss = Math.floor((attended - 0.75 * total) / 0.75);
            successText.textContent = `Great! You can miss up to ${canMiss} more classes and still maintain 75%.`;
            successCard?.classList.remove('hidden');
            warningCard?.classList.add('hidden');
        } else {
            const needed = Math.ceil((0.75 * total - attended) / 0.25);
            warningText.textContent = `Warning! You need to attend ${needed} consecutive classes to reach 75%.`;
            warningCard?.classList.remove('hidden');
            successCard?.classList.remove('hidden');
            successText.textContent = `Current attendance: ${percentage}%`;
        }

        resultEl?.classList.remove('hidden');
    }

    // ==================== CALCULATOR ====================
    function initCalculatorTool() {
        state.calculator = {
            current: '0',
            previous: '',
            operator: null,
            shouldReset: false
        };

        const currentEl = document.getElementById('calc-current');
        const historyEl = document.getElementById('calc-history');

        document.querySelectorAll('.calc-key').forEach(btn => {
            btn.addEventListener('click', () => {
                handleCalcInput(btn.dataset.action);
                updateCalcDisplay(currentEl, historyEl);
            });
        });

        // Keyboard support
        document.addEventListener('keydown', (e) => {
            if (state.currentTool !== 'calculator') return;
            
            const key = e.key;
            if (/[0-9.]/.test(key)) handleCalcInput(key);
            else if (key === '+' || key === '-' || key === '*' || key === '/') handleCalcInput(key);
            else if (key === 'Enter' || key === '=') handleCalcInput('=');
            else if (key === 'Escape') handleCalcInput('clear');
            else if (key === 'Backspace') handleCalcInput('backspace');
            else if (key === '%') handleCalcInput('%');
            
            updateCalcDisplay(currentEl, historyEl);
        });

        updateCalcDisplay(currentEl, historyEl);
    }

    function handleCalcInput(action) {
        const calc = state.calculator;

        if (action === 'clear') {
            calc.current = '0';
            calc.previous = '';
            calc.operator = null;
            calc.shouldReset = false;
        } else if (action === 'backspace') {
            if (calc.current.length > 1) {
                calc.current = calc.current.slice(0, -1);
            } else {
                calc.current = '0';
            }
        } else if (action === 'plusminus') {
            if (calc.current !== '0') {
                calc.current = calc.current.startsWith('-') ? calc.current.slice(1) : '-' + calc.current;
            }
        } else if (action === '%') {
            calc.current = (parseFloat(calc.current) / 100).toString();
        } else if (['+', '-', '*', '/'].includes(action)) {
            if (calc.operator && !calc.shouldReset) {
                calc.current = calculate(calc.previous, calc.current, calc.operator);
            }
            calc.operator = action;
            calc.previous = calc.current;
            calc.shouldReset = true;
        } else if (action === '=') {
            if (calc.operator) {
                calc.current = calculate(calc.previous, calc.current, calc.operator);
                calc.operator = null;
                calc.previous = '';
                calc.shouldReset = true;
            }
        } else if (action === '.') {
            if (calc.shouldReset) {
                calc.current = '0.';
                calc.shouldReset = false;
            } else if (!calc.current.includes('.')) {
                calc.current += '.';
            }
        } else {
            // Number
            if (calc.shouldReset) {
                calc.current = action;
                calc.shouldReset = false;
            } else {
                calc.current = calc.current === '0' ? action : calc.current + action;
            }
        }
    }

    function calculate(a, b, op) {
        const numA = parseFloat(a);
        const numB = parseFloat(b);
        
        let result;
        switch (op) {
            case '+': result = numA + numB; break;
            case '-': result = numA - numB; break;
            case '*': result = numA * numB; break;
            case '/': result = numB !== 0 ? numA / numB : 'Error'; break;
            default: return b;
        }
        
        return typeof result === 'number' ? parseFloat(result.toFixed(10)).toString() : result;
    }

    function updateCalcDisplay(currentEl, historyEl) {
        const calc = state.calculator;
        const opSymbols = { '+': '+', '-': '−', '*': '×', '/': '÷' };
        
        if (currentEl) {
            currentEl.textContent = calc.current;
        }
        if (historyEl) {
            historyEl.textContent = calc.operator ? `${calc.previous} ${opSymbols[calc.operator] || calc.operator}` : '';
        }
    }

    // ==================== WORD COUNT ====================
    function initWordCountTool() {
        const input = document.getElementById('wordcount-input');
        const clearBtn = document.getElementById('wordcount-clear');
        const copyBtn = document.getElementById('wordcount-copy');
        const pasteBtn = document.getElementById('wordcount-paste');

        input?.addEventListener('input', updateWordCount);
        clearBtn?.addEventListener('click', () => {
            if (input) input.value = '';
            updateWordCount();
        });
        copyBtn?.addEventListener('click', () => {
            if (input?.value) {
                navigator.clipboard.writeText(input.value);
                showToast('Text copied!', 'success');
            }
        });
        pasteBtn?.addEventListener('click', async () => {
            try {
                const text = await navigator.clipboard.readText();
                if (input) input.value = text;
                updateWordCount();
            } catch {
                showToast('Unable to paste', 'error');
            }
        });

        updateWordCount();
    }

    function updateWordCount() {
        const text = document.getElementById('wordcount-input')?.value || '';

        const words = text.trim() ? text.trim().split(/\s+/).length : 0;
        const chars = text.length;
        const charsNoSpace = text.replace(/\s/g, '').length;
        const sentences = text.split(/[.!?]+/).filter(s => s.trim()).length;
        const paragraphs = text.split(/\n\n+/).filter(p => p.trim()).length || (text.trim() ? 1 : 0);
        const readTime = Math.ceil(words / 200);

        document.getElementById('word-count').textContent = words;
        document.getElementById('char-count').textContent = chars;
        document.getElementById('char-no-space').textContent = charsNoSpace;
        document.getElementById('sentence-count').textContent = sentences;
        document.getElementById('para-count').textContent = paragraphs;
        document.getElementById('read-time').textContent = readTime;
    }

    // ==================== AGE CALCULATOR ====================
    function initAgeTool() {
        const calcBtn = document.getElementById('age-calculate');
        calcBtn?.addEventListener('click', calculateAge);

        // Set max date to today
        const dateInput = document.getElementById('birth-date');
        if (dateInput) {
            dateInput.max = new Date().toISOString().split('T')[0];
        }
    }

    function calculateAge() {
        const birthDateStr = document.getElementById('birth-date')?.value;
        if (!birthDateStr) {
            showToast('Please select your birth date', 'error');
            return;
        }

        const birth = new Date(birthDateStr);
        const today = new Date();

        if (birth > today) {
            showToast('Birth date cannot be in the future', 'error');
            return;
        }

        let years = today.getFullYear() - birth.getFullYear();
        let months = today.getMonth() - birth.getMonth();
        let days = today.getDate() - birth.getDate();

        if (days < 0) {
            months--;
            const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
            days += prevMonth.getDate();
        }
        if (months < 0) {
            years--;
            months += 12;
        }

        const totalDays = Math.floor((today - birth) / (1000 * 60 * 60 * 24));

        // Next birthday
        let nextBirthday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
        if (nextBirthday <= today) {
            nextBirthday = new Date(today.getFullYear() + 1, birth.getMonth(), birth.getDate());
        }
        const daysUntilBirthday = Math.ceil((nextBirthday - today) / (1000 * 60 * 60 * 24));

        document.getElementById('age-years').textContent = years;
        document.getElementById('age-months').textContent = months;
        document.getElementById('age-days').textContent = days;
        document.getElementById('age-total-days').textContent = totalDays.toLocaleString();
        document.getElementById('next-birthday').textContent = 
            daysUntilBirthday === 0 ? '🎂 Happy Birthday!' : 
            daysUntilBirthday === 1 ? '🎂 Your birthday is tomorrow!' :
            `🎂 ${daysUntilBirthday} days until your next birthday!`;

        document.getElementById('age-result')?.classList.remove('hidden');
    }

    // ==================== QUICK NOTES ====================
    function initQuickNotesTool() {
        const input = document.getElementById('quicknote-input');
        const saveBtn = document.getElementById('quicknote-save');
        const clearBtn = document.getElementById('quicknote-clear');
        const charCount = document.getElementById('note-char-count');

        loadQuickNotes();

        input?.addEventListener('input', () => {
            if (charCount) charCount.textContent = input.value.length;
        });

        saveBtn?.addEventListener('click', saveQuickNote);
        clearBtn?.addEventListener('click', () => {
            if (input) input.value = '';
            if (charCount) charCount.textContent = '0';
        });
    }

    function loadQuickNotes() {
        const notes = getFromStorage(STORAGE_KEYS.QUICK_NOTES) || [];
        renderQuickNotes(notes);
    }

    function renderQuickNotes(notes) {
        const list = document.getElementById('quicknote-list');
        const empty = document.getElementById('quicknotes-empty');
        const badge = document.getElementById('notes-count-badge');

        if (badge) badge.textContent = notes.length;

        if (!list) return;

        if (notes.length === 0) {
            list.innerHTML = '';
            empty?.classList.remove('hidden');
        } else {
            empty?.classList.add('hidden');
            list.innerHTML = notes.map(note => `
                <div class="quicknote-card" data-id="${note.id}">
                    <p class="quicknote-text">${escapeHtml(note.text)}</p>
                    <div class="quicknote-footer">
                        <span class="quicknote-date">${new Date(note.createdAt).toLocaleDateString()}</span>
                        <div class="quicknote-actions">
                            <button class="quicknote-copy" title="Copy">📋</button>
                            <button class="quicknote-delete" title="Delete">🗑️</button>
                        </div>
                    </div>
                </div>
            `).join('');

            list.querySelectorAll('.quicknote-card').forEach(card => {
                const id = card.dataset.id;
                card.querySelector('.quicknote-delete')?.addEventListener('click', () => deleteQuickNote(id));
                card.querySelector('.quicknote-copy')?.addEventListener('click', () => {
                    const text = card.querySelector('.quicknote-text')?.textContent;
                    if (text) {
                        navigator.clipboard.writeText(text);
                        showToast('Note copied!', 'success');
                    }
                });
            });
        }
    }

    function saveQuickNote() {
        const input = document.getElementById('quicknote-input');
        const text = input?.value.trim();
        
        if (!text) {
            showToast('Please write something first', 'error');
            return;
        }

        if (text.length > 500) {
            showToast('Note is too long (max 500 characters)', 'error');
            return;
        }

        const notes = getFromStorage(STORAGE_KEYS.QUICK_NOTES) || [];
        notes.unshift({
            id: Date.now().toString(),
            text,
            createdAt: Date.now()
        });

        saveToStorage(STORAGE_KEYS.QUICK_NOTES, notes.slice(0, 50));
        renderQuickNotes(notes);

        if (input) input.value = '';
        document.getElementById('note-char-count').textContent = '0';
        showToast('Note saved! 📝', 'success');
    }

    function deleteQuickNote(id) {
        let notes = getFromStorage(STORAGE_KEYS.QUICK_NOTES) || [];
        notes = notes.filter(n => n.id !== id);
        saveToStorage(STORAGE_KEYS.QUICK_NOTES, notes);
        renderQuickNotes(notes);
        showToast('Note deleted', 'info');
    }

    // ==================== UNIT CONVERTER ====================
    function initUnitConverterTool() {
        const categoryBtns = document.querySelectorAll('.unit-category-btn');
        const convertBtn = document.getElementById('unit-convert');
        const swapBtn = document.getElementById('unit-swap');
        const fromValue = document.getElementById('unit-from-value');

        updateUnitOptions('length');

        categoryBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                categoryBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                updateUnitOptions(btn.dataset.category);
            });
        });

        convertBtn?.addEventListener('click', convertUnits);
        swapBtn?.addEventListener('click', swapUnits);
        fromValue?.addEventListener('input', convertUnits);
        
        document.getElementById('unit-from-unit')?.addEventListener('change', convertUnits);
        document.getElementById('unit-to-unit')?.addEventListener('change', convertUnits);
    }

    function updateUnitOptions(category) {
        const units = {
            length: ['Meter (m)', 'Kilometer (km)', 'Centimeter (cm)', 'Millimeter (mm)', 'Mile (mi)', 'Yard (yd)', 'Foot (ft)', 'Inch (in)'],
            weight: ['Kilogram (kg)', 'Gram (g)', 'Milligram (mg)', 'Pound (lb)', 'Ounce (oz)', 'Ton (t)'],
            temperature: ['Celsius (°C)', 'Fahrenheit (°F)', 'Kelvin (K)'],
            area: ['Sq Meter (m²)', 'Sq Kilometer (km²)', 'Hectare (ha)', 'Acre', 'Sq Foot (ft²)', 'Sq Inch (in²)'],
            volume: ['Liter (L)', 'Milliliter (mL)', 'Cubic Meter (m³)', 'Gallon (gal)', 'Quart (qt)', 'Pint (pt)', 'Cup'],
            data: ['Byte (B)', 'Kilobyte (KB)', 'Megabyte (MB)', 'Gigabyte (GB)', 'Terabyte (TB)'],
            time: ['Second (s)', 'Minute (min)', 'Hour (hr)', 'Day', 'Week', 'Month', 'Year'],
            speed: ['m/s', 'km/h', 'mph', 'knot']
        };

        const options = units[category] || [];
        const fromSelect = document.getElementById('unit-from-unit');
        const toSelect = document.getElementById('unit-to-unit');

        const optionsHtml = options.map(u => `<option value="${u}">${u}</option>`).join('');

        if (fromSelect) fromSelect.innerHTML = optionsHtml;
        if (toSelect) {
            toSelect.innerHTML = optionsHtml;
            if (options.length > 1) toSelect.selectedIndex = 1;
        }

        document.getElementById('unit-to-value').value = '';
    }

    function swapUnits() {
        const fromSelect = document.getElementById('unit-from-unit');
        const toSelect = document.getElementById('unit-to-unit');
        
        if (fromSelect && toSelect) {
            const temp = fromSelect.value;
            fromSelect.value = toSelect.value;
            toSelect.value = temp;
            convertUnits();
        }
    }

    function convertUnits() {
        const fromValue = parseFloat(document.getElementById('unit-from-value')?.value);
        const fromUnit = document.getElementById('unit-from-unit')?.value || '';
        const toUnit = document.getElementById('unit-to-unit')?.value || '';
        const resultEl = document.getElementById('unit-to-value');

        if (isNaN(fromValue) || !fromUnit || !toUnit) {
            if (resultEl) resultEl.value = '';
            return;
        }

        const result = performConversion(fromValue, fromUnit, toUnit);
        if (resultEl) resultEl.value = result;
    }

    function performConversion(value, from, to) {
        // Extract unit type
        const getUnit = (str) => str.match(/\(([^)]+)\)/)?.[1] || str;
        const fromUnit = getUnit(from);
        const toUnit = getUnit(to);

        if (fromUnit === toUnit) return value.toString();

        // Conversion tables (to base unit)
        const conversions = {
            // Length (to meters)
            'm': 1, 'km': 1000, 'cm': 0.01, 'mm': 0.001, 'mi': 1609.344, 'yd': 0.9144, 'ft': 0.3048, 'in': 0.0254,
            // Weight (to kg)
            'kg': 1, 'g': 0.001, 'mg': 0.000001, 'lb': 0.453592, 'oz': 0.0283495, 't': 1000,
            // Area (to m²)
            'm²': 1, 'km²': 1000000, 'ha': 10000, 'Acre': 4046.86, 'ft²': 0.092903, 'in²': 0.00064516,
            // Volume (to liters)
            'L': 1, 'mL': 0.001, 'm³': 1000, 'gal': 3.78541, 'qt': 0.946353, 'pt': 0.473176, 'Cup': 0.236588,
            // Data (to bytes)
            'B': 1, 'KB': 1024, 'MB': 1048576, 'GB': 1073741824, 'TB': 1099511627776,
            // Time (to seconds)
            's': 1, 'min': 60, 'hr': 3600, 'Day': 86400, 'Week': 604800, 'Month': 2592000, 'Year': 31536000,
            // Speed (to m/s)
            'm/s': 1, 'km/h': 0.277778, 'mph': 0.44704, 'knot': 0.514444
        };

        // Temperature special case
        if (['°C', '°F', 'K'].includes(fromUnit)) {
            return convertTemperature(value, fromUnit, toUnit);
        }

        if (conversions[fromUnit] && conversions[toUnit]) {
            const inBase = value * conversions[fromUnit];
            const result = inBase / conversions[toUnit];
            return result < 0.001 ? result.toExponential(4) : parseFloat(result.toPrecision(8)).toString();
        }

        return value.toString();
    }

    function convertTemperature(value, from, to) {
        let celsius;
        if (from === '°C') celsius = value;
        else if (from === '°F') celsius = (value - 32) * 5/9;
        else celsius = value - 273.15;

        let result;
        if (to === '°C') result = celsius;
        else if (to === '°F') result = celsius * 9/5 + 32;
        else result = celsius + 273.15;

        return parseFloat(result.toFixed(2)).toString();
    }

    // ==================== SETTINGS ====================
    function handleAvatarUpload(e) {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            showToast('Please select an image file', 'error');
            return;
        }

        if (file.size > 500000) {
            showToast('Image too large (max 500KB)', 'error');
            return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
            const base64 = event.target?.result;
            if (base64) {
                const user = getFromStorage(STORAGE_KEYS.USER) || {};
                user.avatar = base64;
                saveToStorage(STORAGE_KEYS.USER, user);
                updateUserDisplay(user);
                showToast('Avatar updated! 📸', 'success');
            }
        };
        reader.readAsDataURL(file);
    }

    function removeAvatar() {
        const user = getFromStorage(STORAGE_KEYS.USER) || {};
        delete user.avatar;
        saveToStorage(STORAGE_KEYS.USER, user);
        updateUserDisplay(user);
        showToast('Avatar removed', 'info');
    }

    function saveSettings() {
        const user = getFromStorage(STORAGE_KEYS.USER) || {};

        user.name = document.getElementById('setting-name')?.value.trim() || '';
        user.college = document.getElementById('setting-college')?.value.trim() || '';
        user.course = document.getElementById('setting-course')?.value || '';
        user.semester = document.getElementById('setting-semester')?.value || '';
        user.bio = document.getElementById('setting-bio')?.value.trim() || '';
        user.examName = document.getElementById('setting-exam-name')?.value.trim() || '';
        user.examDate = document.getElementById('setting-exam-date')?.value || '';
        user.darkMode = document.getElementById('setting-dark-mode')?.checked || false;

        saveToStorage(STORAGE_KEYS.USER, user);
        
        updateUserDisplay(user);
        updateExamCountdown();
        applyTheme();

        showToast('Settings saved! ✅', 'success');
    }

    function exportData() {
        const data = {
            user: getFromStorage(STORAGE_KEYS.USER),
            saved: getFromStorage(STORAGE_KEYS.SAVED),
            recent: getFromStorage(STORAGE_KEYS.RECENT),
            todos: getFromStorage(STORAGE_KEYS.TODOS),
            quickNotes: getFromStorage(STORAGE_KEYS.QUICK_NOTES),
            stats: getFromStorage(STORAGE_KEYS.STATS),
            streak: getFromStorage(STORAGE_KEYS.STREAK),
            pomodoro: getFromStorage(STORAGE_KEYS.POMODORO_SETTINGS),
            exportedAt: new Date().toISOString(),
            version: '2.1'
        };

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `studyhub-backup-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);

        showToast('Data exported! 📤', 'success');
    }

    function handleClearCache() {
        showModal(
            'Clear Cache',
            'Reload fresh data from server? Your saved items will NOT be deleted.',
            () => {
                localStorage.removeItem(STORAGE_KEYS.CACHE);
                location.reload();
            },
            '🔄'
        );
    }

    function handleResetApp() {
        showModal(
            'Reset App',
            'Delete ALL data including saved items, notes, and settings? This cannot be undone!',
            () => {
                Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key));
                sessionStorage.clear();
                showToast('App reset!', 'success');
                setTimeout(() => location.reload(), 1000);
            },
            '🗑️',
            true
        );
    }

    function copyUpiId() {
        navigator.clipboard.writeText(CONFIG.UPI_ID)
            .then(() => showToast('UPI ID copied! 📋', 'success'))
            .catch(() => showToast('Failed to copy', 'error'));
    }

    // ==================== INITIALIZE ====================
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
