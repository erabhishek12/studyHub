// ==================== STUDYHUB PWA - MAIN APPLICATION ====================
// Version 2.0.0 - Enhanced Edition

(function() {
    'use strict';

    // ==================== CONFIGURATION ====================
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
        
        // Cache Settings
        CACHE_DURATION: 30 * 60 * 1000, // 30 minutes
        
        // App Settings
        MAX_RECENT: 3,
        TOAST_DURATION: 3000,
        DEBOUNCE_DELAY: 300,
        
        // Verified Uploaders
        VERIFIED_UPLOADERS: ['Admin', 'Abhishek', 'admin', 'abhishek', 'ADMIN'],
        
        // URLs
        PORTFOLIO_URL: 'https://i-m-er-abhi.vercel.app',
        REQUEST_FORM_URL: 'https://docs.google.com/forms/d/e/1FAIpQLSeE2QjRDeyfPm3CXezjlMPuzfE-nPhquPiPU_mPp2lfK8Vuww/viewform',
        
        // UPI Details
        UPI_ID: 'abhishek@upi',
        
        // Courses
        COURSES: [
            { id: 'B.Tech', icon: '🎓', label: 'B.Tech' },
            { id: 'BCA', icon: '💻', label: 'BCA' },
            { id: 'MCA', icon: '🖥️', label: 'MCA' },
            { id: 'B.Sc', icon: '🔬', label: 'B.Sc' },
            { id: 'MBA', icon: '📊', label: 'MBA' },
            { id: 'Other', icon: '📚', label: 'Other' }
        ],
        
        // All Branches (Show all regardless of data)
        ALL_BRANCHES: [
            { id: 'CSE', icon: '💻', label: 'Computer Science' },
            { id: 'IT', icon: '🌐', label: 'Information Technology' },
            { id: 'ECE', icon: '📡', label: 'Electronics & Comm.' },
            { id: 'EEE', icon: '⚡', label: 'Electrical Engineering' },
            { id: 'ME', icon: '⚙️', label: 'Mechanical Engineering' },
            { id: 'CE', icon: '🏗️', label: 'Civil Engineering' },
            { id: 'AI', icon: '🤖', label: 'Artificial Intelligence' },
            { id: 'ML', icon: '🧠', label: 'Machine Learning' },
            { id: 'DS', icon: '📊', label: 'Data Science' },
            { id: 'IOT', icon: '📲', label: 'Internet of Things' },
            { id: 'Other', icon: '📁', label: 'Other' }
        ],
        
        // All Semesters (Show all 1-8)
        ALL_SEMESTERS: [
            { id: '1', label: '1st Semester' },
            { id: '2', label: '2nd Semester' },
            { id: '3', label: '3rd Semester' },
            { id: '4', label: '4th Semester' },
            { id: '5', label: '5th Semester' },
            { id: '6', label: '6th Semester' },
            { id: '7', label: '7th Semester' },
            { id: '8', label: '8th Semester' }
        ],
        
        // Programming Languages for Tutorials
        LANGUAGES: [
            { id: 'C', icon: 'C', name: 'C Programming', color: '#A8B9CC' },
            { id: 'C++', icon: 'C++', name: 'C++ Programming', color: '#00599C' },
            { id: 'Java', icon: '☕', name: 'Java', color: '#ED8B00' },
            { id: 'Python', icon: '🐍', name: 'Python', color: '#3776AB' },
            { id: 'JavaScript', icon: 'JS', name: 'JavaScript', color: '#F7DF1E' },
            { id: 'HTML', icon: '<>', name: 'HTML', color: '#E34F26' },
            { id: 'CSS', icon: '🎨', name: 'CSS', color: '#1572B6' },
            { id: 'SQL', icon: '🗃️', name: 'SQL', color: '#4479A1' }
        ]
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
        ANNOUNCEMENT_CLOSED: 'studyhub_announcement_closed'
    };

    // ==================== APPLICATION STATE ====================
    const state = {
        // Data from Google Sheets
        data: {
            notes: [],
            videos: [],
            pyq: [],
            tutorials: [],
            config: {}
        },
        
        // Current page
        currentPage: 'home',
        
        // Navigation state for resource pages
        navigation: {
            notes: { step: 'courses', course: null, branch: null, semester: null },
            videos: { step: 'courses', course: null, branch: null, semester: null },
            pyq: { step: 'courses', course: null, branch: null, semester: null },
            tutorials: { step: 'languages', language: null, topic: null }
        },
        
        // Current tool
        currentTool: null,
        
        // Pomodoro state
        pomodoro: {
            timer: null,
            timeLeft: 25 * 60,
            isRunning: false,
            isFocus: true,
            focusTime: 25,
            breakTime: 5,
            sessions: 0
        },
        
        // Loading state
        isLoading: true,
        loadingProgress: 0,
        
        // Toast timeout
        toastTimeout: null,
        
        // Search debounce
        searchTimeout: null,
        
        // Current tutorial for reader
        currentTutorial: null
    };

    // ==================== DOM ELEMENTS CACHE ====================
    const DOM = {};

    // ==================== INITIALIZATION ====================
    function init() {
        console.log('🚀 Initializing StudyHub...');
        cacheDOMElements();
        bindAllEvents();
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

        // Handle keyboard shortcuts
        document.addEventListener('keydown', handleKeyboardShortcuts);

        // Handle visibility change for streak
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden) updateStreak();
        });
    }

    function bindResourcePageEvents(type) {
        const backBtn = document.getElementById(`${type}-back`);
        const coursesGrid = document.getElementById(`${type}-courses`);
        const subjectFilter = document.getElementById(`${type}-subject-filter`);

        backBtn?.addEventListener('click', () => goBack(type));
        subjectFilter?.addEventListener('change', () => filterResources(type));
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
        // Ctrl/Cmd + K for search
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            openSearch();
        }
        // Escape to close modals
        if (e.key === 'Escape') {
            if (DOM.searchOverlay?.classList.contains('active')) closeSearch();
            if (DOM.modalOverlay?.classList.contains('active')) closeModal();
            if (DOM.sidebar?.classList.contains('active')) closeSidebar();
        }
    }

    // ==================== LOADING SEQUENCE ====================
    async function startLoadingSequence() {
        const steps = [
            { progress: 10, status: 'Initializing app...', step: 1 },
            { progress: 25, status: 'Fetching notes...', step: 1 },
            { progress: 45, status: 'Loading videos...', step: 2 },
            { progress: 65, status: 'Getting question papers...', step: 3 },
            { progress: 80, status: 'Loading tutorials...', step: 3 },
            { progress: 95, status: 'Almost ready...', step: 4 },
            { progress: 100, status: 'Welcome to StudyHub!', step: 4 }
        ];

        try {
            // Step 1: Initialize
            updateLoadingUI(steps[0]);
            await delay(300);

            // Step 2: Fetch Data
            updateLoadingUI(steps[1]);
            await fetchAllData();
            
            updateLoadingUI(steps[2]);
            await delay(200);
            
            updateLoadingUI(steps[3]);
            await delay(200);
            
            updateLoadingUI(steps[4]);
            await delay(200);

            // Step 3: Initialize App
            updateLoadingUI(steps[5]);
            initializeApp();
            await delay(300);

            // Step 4: Complete
            updateLoadingUI(steps[6]);
            await delay(500);

            // Hide loading screen
            hideLoadingScreen();

        } catch (error) {
            console.error('❌ Loading error:', error);
            
            // Try to use cached data
            const cached = loadCachedData();
            if (cached) {
                updateLoadingUI({ progress: 100, status: 'Using offline data...', step: 4 });
                await delay(500);
                initializeApp();
                hideLoadingScreen();
                showToast('Using cached data - Some content may be outdated', 'warning');
            } else {
                updateLoadingUI({ progress: 100, status: 'Failed to load. Please refresh.', step: 4 });
                showToast('Failed to load data. Please check your internet connection.', 'error');
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
            DOM.runnerEmoji.style.left = `${Math.min(progress, 95)}%`;
        }
        
        // Update step indicators
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
        // Check cache first
        const cached = getCachedData();
        if (cached && !isCacheExpired(cached.timestamp)) {
            console.log('📦 Using cached data');
            state.data = cached.data;
            return;
        }

        console.log('🌐 Fetching fresh data from Google Sheets...');

        // Fetch all sheets in parallel
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
            } else {
                console.warn(`⚠️ Failed to load sheet:`, result.reason);
            }
        });

        // Cache the data
        saveCachedData(state.data);
    }

    async function fetchSheetData(sheetName) {
        const url = `https://docs.google.com/spreadsheets/d/${CONFIG.SHEET_ID}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(sheetName)}`;
        
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const text = await response.text();
        
        // Parse Google Sheets JSON response
        // Response format: google.visualization.Query.setResponse({...})
        const jsonMatch = text.match(/google\.visualization\.Query\.setResponse\(([\s\S]*)\);?$/);
        if (!jsonMatch) {
            // Try alternate format
            const altMatch = text.match(/\{[\s\S]*\}/);
            if (!altMatch) {
                throw new Error('Invalid response format');
            }
            return parseSheetJson(altMatch[0]);
        }
        
        return parseSheetJson(jsonMatch[1]);
    }

    function parseSheetJson(jsonString) {
        try {
            const json = JSON.parse(jsonString);
            
            if (!json.table || !json.table.rows) {
                return [];
            }

            // Get headers from first row
            const headers = json.table.cols.map(col => {
                // Clean up header labels
                let label = col.label || col.id || '';
                return label.trim();
            });

            // Parse data rows
            const rows = json.table.rows.map((row, rowIndex) => {
                const obj = { _rowIndex: rowIndex };
                
                if (!row.c) return obj;
                
                row.c.forEach((cell, index) => {
                    const header = headers[index];
                    if (header) {
                        // Handle different cell value types
                        if (cell === null) {
                            obj[header] = '';
                        } else if (cell.v !== undefined && cell.v !== null) {
                            obj[header] = cell.v.toString().trim();
                        } else if (cell.f !== undefined) {
                            obj[header] = cell.f.toString().trim();
                        } else {
                            obj[header] = '';
                        }
                    }
                });
                
                return obj;
            });

            // Filter out empty rows
            return rows.filter(row => {
                const values = Object.values(row).filter(v => v !== '' && v !== row._rowIndex);
                return values.length > 0;
            });
            
        } catch (error) {
            console.error('Error parsing sheet JSON:', error);
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
            console.error('Cache read error:', error);
            return null;
        }
    }

    function saveCachedData(data) {
        try {
            const cacheData = {
                data: data,
                timestamp: Date.now()
            };
            localStorage.setItem(STORAGE_KEYS.CACHE, JSON.stringify(cacheData));
        } catch (error) {
            console.error('Cache write error:', error);
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
        console.log('🎉 Initializing app components...');
        
        // Apply theme
        applyTheme();
        
        // Update user display
        loadUserData();
        
        // Setup announcement
        setupAnnouncement();
        
        // Update greeting
        updateGreeting();
        
        // Update stats
        updateHomeStats();
        
        // Update countdown
        updateExamCountdown();
        
        // Render recent items
        renderRecentItems();
        
        // Update resource counts
        updateResourceCounts();
        
        // Render course grids
        renderCourseGrids();
        
        // Render language grid for tutorials
        renderLanguageGrid();
        
        // Set UPI ID
        if (DOM.upiId) {
            DOM.upiId.textContent = CONFIG.UPI_ID;
        }
    }

    // ==================== THEME MANAGEMENT ====================
    function applyTheme() {
        const user = getFromStorage(STORAGE_KEYS.USER) || {};
        const isDark = user.darkMode || false;
        
        document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
        
        if (DOM.themeIcon) {
            DOM.themeIcon.textContent = isDark ? '☀️' : '🌙';
        }
        if (DOM.settingDarkMode) {
            DOM.settingDarkMode.checked = isDark;
        }
    }

    function toggleTheme() {
        const user = getFromStorage(STORAGE_KEYS.USER) || {};
        user.darkMode = !user.darkMode;
        saveToStorage(STORAGE_KEYS.USER, user);
        applyTheme();
        showToast(user.darkMode ? 'Dark mode enabled' : 'Light mode enabled', 'info');
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
        if (!user) {
            user = getFromStorage(STORAGE_KEYS.USER) || {};
        }

        const name = user.name || 'Student';
        const college = user.college || 'Your College';
        const avatar = user.avatar;

        // Update home
        if (DOM.homeUsername) DOM.homeUsername.textContent = name;
        
        // Update sidebar
        if (DOM.sidebarUsername) DOM.sidebarUsername.textContent = name;
        if (DOM.sidebarCollege) DOM.sidebarCollege.textContent = college;

        // Update avatars
        const avatarHTML = avatar 
            ? `<img src="${avatar}" alt="Avatar">` 
            : '<span>👤</span>';

        if (DOM.headerAvatar) DOM.headerAvatar.innerHTML = avatarHTML;
        if (DOM.sidebarAvatar) DOM.sidebarAvatar.innerHTML = avatarHTML;
        if (DOM.welcomeAvatar) DOM.welcomeAvatar.innerHTML = avatarHTML;
        if (DOM.avatarPreview) DOM.avatarPreview.innerHTML = avatarHTML;
    }

    function loadSettingsData(user = null) {
        if (!user) {
            user = getFromStorage(STORAGE_KEYS.USER) || {};
        }

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
        // Hide all pages
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });

        // Show target page
        const targetPage = document.getElementById(`page-${pageName}`);
        if (targetPage) {
            targetPage.classList.add('active');
        }

        // Update footer dock
        DOM.dockItems?.forEach(item => {
            item.classList.toggle('active', item.dataset.page === pageName);
        });

        // Update sidebar
        DOM.sidebarItems?.forEach(item => {
            item.classList.toggle('active', item.dataset.page === pageName);
        });

        // Reset navigation state for resource pages
        if (['notes', 'videos', 'pyq'].includes(pageName)) {
            resetResourceNavigation(pageName);
        }

        // Reset tutorials
        if (pageName === 'tutorials') {
            resetTutorialsNavigation();
        }

        // Load page-specific content
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

        // Update state
        state.currentPage = pageName;

        // Scroll to top
        DOM.mainContent?.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Make navigateToPage globally accessible
    window.navigateToPage = navigateToPage;

    // ==================== SIDEBAR ====================
    function toggleSidebar() {
        DOM.sidebar?.classList.toggle('active');
        DOM.sidebarOverlay?.classList.toggle('active');
    }

    function closeSidebar() {
        DOM.sidebar?.classList.remove('active');
        DOM.sidebarOverlay?.classList.remove('active');
    }

    // ==================== SEARCH ====================
    function openSearch() {
        DOM.searchOverlay?.classList.add('active');
        DOM.searchInput?.focus();
        renderSearchPlaceholder();
    }

    function closeSearch() {
        DOM.searchOverlay?.classList.remove('active');
        if (DOM.searchInput) DOM.searchInput.value = '';
        DOM.searchClear?.classList.add('hidden');
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
        
        // Toggle clear button
        DOM.searchClear?.classList.toggle('hidden', query.length === 0);
        
        // Debounce search
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

        // Search in Notes
        state.data.notes?.forEach(item => {
            if (matchesSearch(item, lowerQuery)) {
                results.push({ ...item, _type: 'notes', _icon: '📝' });
            }
        });

        // Search in Videos
        state.data.videos?.forEach(item => {
            if (matchesSearch(item, lowerQuery)) {
                results.push({ ...item, _type: 'videos', _icon: '🎬' });
            }
        });

        // Search in PYQ
        state.data.pyq?.forEach(item => {
            if (matchesSearch(item, lowerQuery)) {
                results.push({ ...item, _type: 'pyq', _icon: '📋' });
            }
        });

        // Search in Tutorials
        state.data.tutorials?.forEach(item => {
            if (matchesTutorialSearch(item, lowerQuery)) {
                results.push({ 
                    ...item, 
                    _type: 'tutorials', 
                    _icon: '💡',
                    Title: item.Topic || item.title
                });
            }
        });

        renderSearchResults(results);
    }

    function matchesSearch(item, query) {
        const fields = [
            item.Title || item.title,
            item.Subject || item.subject,
            item.Course || item.course,
            item.Branch || item.branch,
            item.UploaderName || item.uploader,
            item.Type || item.type
        ];
        
        return fields.some(field => 
            field && field.toString().toLowerCase().includes(query)
        );
    }

    function matchesTutorialSearch(item, query) {
        const fields = [
            item.Topic || item.topic,
            item.Subject || item.subject,
            item.Content || item.content
        ];
        
        return fields.some(field => 
            field && field.toString().toLowerCase().includes(query)
        );
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

        const html = results.slice(0, 20).map(item => `
            <div class="search-result-item" 
                 data-type="${item._type}" 
                 data-id="${item.ID || item.id || ''}"
                 data-title="${escapeHtml(item.Title || item.Topic || '')}">
                <div class="search-result-icon ${item._type}">${item._icon}</div>
                <div class="search-result-info">
                    <div class="search-result-title">${escapeHtml(item.Title || item.Topic || 'Untitled')}</div>
                    <div class="search-result-meta">
                        ${item.Subject || item._type} 
                        ${item.Semester ? `• Sem ${item.Semester}` : ''}
                    </div>
                </div>
                <span class="search-result-type">${item._type}</span>
            </div>
        `).join('');

        DOM.searchResults.innerHTML = html;

        // Bind click events
        DOM.searchResults.querySelectorAll('.search-result-item').forEach(item => {
            item.addEventListener('click', () => handleSearchResultClick(item.dataset));
        });
    }

    function handleSearchResultClick(data) {
        closeSearch();
        
        const { type, id, title } = data;

        if (type === 'tutorials') {
            navigateToPage('tutorials');
            const tutorial = state.data.tutorials?.find(t => 
                (t.Topic || t.topic) === title || (t.ID || t.id) === id
            );
            if (tutorial) {
                selectLanguage(tutorial.Subject || tutorial.subject);
                setTimeout(() => openTutorialReader(tutorial), 300);
            }
        } else {
            navigateToPage(type);
            const resource = state.data[type]?.find(r => 
                (r.ID || r.id) === id || (r.Title || r.title) === title
            );
            if (resource && resource.FileURL) {
                window.open(resource.FileURL, '_blank');
                addToRecent(id, type, resource.Title || resource.title);
                incrementStat('totalViewed');
            }
        }
    }

    // ==================== STATS ====================
    function updateHomeStats() {
        const stats = getFromStorage(STORAGE_KEYS.STATS) || { totalViewed: 0, totalSaved: 0, tasksCompleted: 0 };
        const saved = getFromStorage(STORAGE_KEYS.SAVED) || [];
        const streak = getFromStorage(STORAGE_KEYS.STREAK) || { count: 0 };

        if (DOM.statViewed) DOM.statViewed.textContent = stats.totalViewed || 0;
        if (DOM.statSaved) DOM.statSaved.textContent = saved.length;
        if (DOM.statTasks) DOM.statTasks.textContent = stats.tasksCompleted || 0;
        if (DOM.statStreak) DOM.statStreak.textContent = streak.count || 0;
    }

    function incrementStat(key) {
        const stats = getFromStorage(STORAGE_KEYS.STATS) || { totalViewed: 0, totalSaved: 0, tasksCompleted: 0 };
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
            // First visit
            streak.count = 1;
            streak.lastVisit = today;
        } else if (lastVisit === today) {
            // Already visited today
        } else {
            const lastDate = new Date(lastVisit);
            const todayDate = new Date(today);
            const diffDays = Math.floor((todayDate - lastDate) / (1000 * 60 * 60 * 24));

            if (diffDays === 1) {
                // Consecutive day
                streak.count += 1;
            } else if (diffDays > 1) {
                // Streak broken
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
        const examName = user.examName || 'Your Exam';

        if (!examDate) {
            DOM.countdownCard?.classList.add('hidden');
            return;
        }

        const exam = new Date(examDate);
        const now = new Date();
        now.setHours(0, 0, 0, 0);
        exam.setHours(0, 0, 0, 0);
        
        const diffTime = exam - now;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays < 0) {
            DOM.countdownCard?.classList.add('hidden');
            return;
        }

        DOM.countdownCard?.classList.remove('hidden');
        
        if (DOM.countdownDays) {
            DOM.countdownDays.textContent = diffDays;
        }
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

    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
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
            console.error('Storage write error:', error);
        }
    }

    function getFromStorage(key) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error('Storage read error:', error);
            return null;
        }
    }

    function isVerifiedUploader(name) {
        if (!name) return false;
        return CONFIG.VERIFIED_UPLOADERS.some(verified => 
            name.toLowerCase().includes(verified.toLowerCase())
        );
    }

    // ==================== TOAST NOTIFICATIONS ====================
    function showToast(message, type = 'info') {
        // Clear existing toast
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

    // Make showToast globally accessible
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
    }

    function closeModal() {
        DOM.modalOverlay?.classList.remove('active');
    }

    // ==================== CONTINUE TO PART 2 ====================
    // Part 2 contains:
    // - Resource page navigation (Notes, Videos, PYQ)
    // - Resource card rendering with action buttons
    // - Tutorials system
    // - Saved items
    // - Recent items
    // - All Tools (Todo, SGPA, CGPA, Pomodoro, Calculator, etc.)
    // - Settings functions
    // - Avatar handling
    // - Export/Import data
    // - Service Worker
        // ==================== RESOURCE PAGES (Notes, Videos, PYQ) ====================
    
    function renderCourseGrids() {
        ['notes', 'videos', 'pyq'].forEach(type => {
            const coursesGrid = document.getElementById(`${type}-courses`);
            if (coursesGrid) {
                coursesGrid.innerHTML = CONFIG.COURSES.map(course => `
                    <button class="selection-card" data-course="${course.id}">
                        <span class="selection-icon">${course.icon}</span>
                        <span class="selection-label">${course.label}</span>
                    </button>
                `).join('');

                // Bind click events
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
            semester: null
        };

        const backBtn = document.getElementById(`${type}-back`);
        const coursesGrid = document.getElementById(`${type}-courses`);
        const branchesGrid = document.getElementById(`${type}-branches`);
        const semestersGrid = document.getElementById(`${type}-semesters`);
        const filterSection = document.getElementById(`${type}-filter`);
        const resourceList = document.getElementById(`${type}-list`);
        const loadingState = document.getElementById(`${type}-loading`);
        const emptyState = document.getElementById(`${type}-empty`);
        const breadcrumb = document.getElementById(`${type}-breadcrumb`);
        const title = document.getElementById(`${type}-title`);

        backBtn?.classList.add('hidden');
        coursesGrid?.classList.remove('hidden');
        branchesGrid?.classList.add('hidden');
        semestersGrid?.classList.add('hidden');
        filterSection?.classList.add('hidden');
        resourceList?.classList.add('hidden');
        loadingState?.classList.add('hidden');
        emptyState?.classList.add('hidden');
        
        if (breadcrumb) breadcrumb.innerHTML = '';

        const titles = {
            notes: 'Notes',
            videos: 'Video Lectures',
            pyq: 'Previous Year Papers'
        };
        if (title) title.textContent = titles[type] || type;
    }

    function selectCourse(type, course) {
        state.navigation[type].course = course;
        state.navigation[type].step = 'branches';

        document.getElementById(`${type}-courses`)?.classList.add('hidden');
        document.getElementById(`${type}-back`)?.classList.remove('hidden');

        renderBranches(type);
        updateBreadcrumb(type);
    }

    function renderBranches(type) {
        const branchesGrid = document.getElementById(`${type}-branches`);
        if (!branchesGrid) return;

        // Show ALL branches regardless of available data
        branchesGrid.innerHTML = CONFIG.ALL_BRANCHES.map(branch => `
            <button class="selection-card branch" data-branch="${branch.id}">
                <span class="selection-icon">${branch.icon}</span>
                <span class="selection-label">${branch.label}</span>
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

        // Show ALL semesters (1-8) regardless of available data
        semestersGrid.innerHTML = CONFIG.ALL_SEMESTERS.map(sem => `
            <button class="selection-card semester" data-semester="${sem.id}">
                <span class="selection-icon">📅</span>
                <span class="selection-label">${sem.label}</span>
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

        document.getElementById(`${type}-semesters`)?.classList.add('hidden');

        renderResources(type);
        updateBreadcrumb(type);
    }

    function renderResources(type) {
        const nav = state.navigation[type];
        const filterSection = document.getElementById(`${type}-filter`);
        const subjectFilter = document.getElementById(`${type}-subject-filter`);
        const resourceList = document.getElementById(`${type}-list`);
        const loadingState = document.getElementById(`${type}-loading`);
        const emptyState = document.getElementById(`${type}-empty`);

        // Show loading
        loadingState?.classList.remove('hidden');
        resourceList?.classList.add('hidden');
        emptyState?.classList.add('hidden');

        // Filter resources based on selection
        let resources = (state.data[type] || []).filter(item => {
            const matchCourse = (item.Course || item.course || '').toLowerCase() === nav.course.toLowerCase();
            const matchBranch = (item.Branch || item.branch || '').toLowerCase() === nav.branch.toLowerCase();
            const matchSemester = (item.Semester || item.semester || '').toString() === nav.semester.toString();
            const notHidden = (item.Status || item.status || '').toLowerCase() !== 'hidden';
            
            return matchCourse && matchBranch && matchSemester && notHidden;
        });

        // Get unique subjects
        const subjects = [...new Set(resources.map(r => r.Subject || r.subject).filter(Boolean))];

        // Populate subject filter
        if (subjectFilter) {
            subjectFilter.innerHTML = '<option value="">All Subjects</option>' +
                subjects.map(s => `<option value="${s}">${s}</option>`).join('');
        }

        filterSection?.classList.remove('hidden');

        // Hide loading
        setTimeout(() => {
            loadingState?.classList.add('hidden');
            
            if (resources.length === 0) {
                resourceList?.classList.add('hidden');
                emptyState?.classList.remove('hidden');
                return;
            }

            emptyState?.classList.add('hidden');
            resourceList?.classList.remove('hidden');

            // Render resource cards
            resourceList.innerHTML = resources.map(resource => 
                createResourceCard(resource, type)
            ).join('');

            // Bind events
            bindResourceCardEvents(resourceList, type);
        }, 300);
    }

    function filterResources(type) {
        const nav = state.navigation[type];
        const subjectFilter = document.getElementById(`${type}-subject-filter`);
        const resourceList = document.getElementById(`${type}-list`);
        const emptyState = document.getElementById(`${type}-empty`);
        const selectedSubject = subjectFilter?.value || '';

        let resources = (state.data[type] || []).filter(item => {
            const matchCourse = (item.Course || item.course || '').toLowerCase() === nav.course.toLowerCase();
            const matchBranch = (item.Branch || item.branch || '').toLowerCase() === nav.branch.toLowerCase();
            const matchSemester = (item.Semester || item.semester || '').toString() === nav.semester.toString();
            const matchSubject = !selectedSubject || (item.Subject || item.subject) === selectedSubject;
            const notHidden = (item.Status || item.status || '').toLowerCase() !== 'hidden';
            
            return matchCourse && matchBranch && matchSemester && matchSubject && notHidden;
        });

        if (resources.length === 0) {
            resourceList?.classList.add('hidden');
            emptyState?.classList.remove('hidden');
            return;
        }

        emptyState?.classList.add('hidden');
        resourceList?.classList.remove('hidden');

        resourceList.innerHTML = resources.map(resource => 
            createResourceCard(resource, type)
        ).join('');

        bindResourceCardEvents(resourceList, type);
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

        // Thumbnail HTML
        let thumbnailHtml;
        if (thumbnail) {
            thumbnailHtml = `
                <img src="${thumbnail}" alt="${escapeHtml(title)}" 
                     onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                <span class="resource-thumbnail-icon" style="display:none;">
                    ${type === 'videos' ? '🎬' : '📄'}
                </span>
            `;
        } else {
            thumbnailHtml = `
                <span class="resource-thumbnail-icon">
                    ${type === 'videos' ? '🎬' : type === 'pyq' ? '📋' : '📝'}
                </span>
            `;
        }

        // Video play overlay
        const playOverlay = type === 'videos' ? `
            <div class="video-play-overlay">
                <div class="play-icon-large">▶</div>
            </div>
        ` : '';

        // Action button - LARGE and prominent
        let actionBtn;
        if (type === 'videos') {
            actionBtn = `
                <button class="resource-action-btn video" data-url="${escapeHtml(fileUrl)}">
                    <span>▶</span> PLAY VIDEO
                </button>
            `;
        } else if (type === 'tutorials') {
            actionBtn = `
                <button class="resource-action-btn tutorial">
                    <span>📖</span> READ NOW
                </button>
            `;
        } else {
            actionBtn = `
                <button class="resource-action-btn pdf" data-url="${escapeHtml(fileUrl)}">
                    <span>📄</span> OPEN PDF
                </button>
            `;
        }

        return `
            <div class="resource-card" data-id="${id}" data-type="${type}">
                <div class="resource-thumbnail">
                    ${thumbnailHtml}
                    ${playOverlay}
                    <div class="resource-badges">
                        ${resourceType ? `<span class="resource-badge type">${escapeHtml(resourceType)}</span>` : ''}
                        ${isVerified ? '<span class="resource-badge verified">✓ Verified</span>' : ''}
                    </div>
                </div>
                <div class="resource-body">
                    <h3 class="resource-title">${escapeHtml(title)}</h3>
                    <div class="resource-meta">
                        <span class="resource-meta-item">📚 ${escapeHtml(subject)}</span>
                        <span class="resource-meta-item">📅 Sem ${semester}</span>
                        <span class="resource-meta-item">👤 ${escapeHtml(uploader)}</span>
                    </div>
                    ${actionBtn}
                    <div class="resource-footer">
                        <div class="resource-actions">
                            <button class="resource-icon-btn bookmark-btn ${isSaved ? 'saved' : ''}" 
                                    data-id="${id}" data-type="${type}" title="Save">
                                ${isSaved ? '❤️' : '🤍'}
                            </button>
                            <button class="resource-icon-btn share-btn" 
                                    data-id="${id}" data-type="${type}" 
                                    data-title="${escapeHtml(title)}" title="Share">
                                🔗
                            </button>
                            <a href="${CONFIG.REQUEST_FORM_URL}" target="_blank" 
                               class="resource-icon-btn" title="Report">
                                🚩
                            </a>
                        </div>
                        <span class="resource-downloads">📥 ${downloads}</span>
                    </div>
                </div>
            </div>
        `;
    }

    function bindResourceCardEvents(container, type) {
        if (!container) return;

        // Action buttons (Open/Play) - Opens in NEW TAB (external)
        container.querySelectorAll('.resource-action-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const url = btn.dataset.url;
                const card = btn.closest('.resource-card');
                const id = card?.dataset.id;
                const title = card?.querySelector('.resource-title')?.textContent || 'Resource';

                if (url && url.trim()) {
                    // OPEN IN NEW TAB - External link
                    window.open(url, '_blank', 'noopener,noreferrer');
                    
                    // Track stats
                    addToRecent(id, type, title);
                    incrementStat('totalViewed');
                    showToast('Opening in new tab...', 'success');
                } else {
                    showToast('Sorry, no URL available for this resource', 'error');
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

        // Click on card thumbnail for videos
        container.querySelectorAll('.resource-thumbnail').forEach(thumb => {
            thumb.addEventListener('click', () => {
                const card = thumb.closest('.resource-card');
                const actionBtn = card?.querySelector('.resource-action-btn');
                actionBtn?.click();
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
            document.getElementById(`${type}-empty`)?.classList.add('hidden');
            renderSemesters(type);
        } else if (nav.step === 'semesters') {
            nav.step = 'branches';
            nav.branch = null;
            document.getElementById(`${type}-semesters`)?.classList.add('hidden');
            renderBranches(type);
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
        if (nav.course) items.push(nav.course);
        if (nav.branch) items.push(nav.branch);
        if (nav.semester) items.push(`Semester ${nav.semester}`);

        breadcrumb.innerHTML = items.map(item => 
            `<span class="breadcrumb-item">${escapeHtml(item)}</span>`
        ).join('');
    }

    // ==================== TUTORIALS ====================

    function renderLanguageGrid() {
        const languagesGrid = document.getElementById('tutorials-languages');
        if (!languagesGrid) return;

        languagesGrid.innerHTML = CONFIG.LANGUAGES.map(lang => `
            <button class="language-card" data-language="${lang.id}">
                <div class="language-icon">${lang.icon}</div>
                <span class="language-name">${lang.name}</span>
            </button>
        `).join('');

        languagesGrid.querySelectorAll('.language-card').forEach(card => {
            card.addEventListener('click', () => {
                selectLanguage(card.dataset.language);
            });
        });
    }

    function resetTutorialsNavigation() {
        state.navigation.tutorials = {
            step: 'languages',
            language: null,
            topic: null
        };
        state.currentTutorial = null;

        const backBtn = document.getElementById('tutorials-back');
        const languagesGrid = document.getElementById('tutorials-languages');
        const topicsList = document.getElementById('tutorials-topics');
        const reader = document.getElementById('tutorial-reader');
        const emptyState = document.getElementById('tutorials-empty');
        const breadcrumb = document.getElementById('tutorials-breadcrumb');
        const title = document.getElementById('tutorials-title');

        backBtn?.classList.add('hidden');
        languagesGrid?.classList.remove('hidden');
        topicsList?.classList.add('hidden');
        reader?.classList.add('hidden');
        emptyState?.classList.add('hidden');
        
        if (breadcrumb) breadcrumb.innerHTML = '';
        if (title) title.textContent = 'Tutorials';
    }

    function selectLanguage(language) {
        state.navigation.tutorials.language = language;
        state.navigation.tutorials.step = 'topics';

        document.getElementById('tutorials-languages')?.classList.add('hidden');
        document.getElementById('tutorials-back')?.classList.remove('hidden');

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

        topicsList.innerHTML = tutorials.map((tutorial, index) => `
            <button class="topic-item" data-index="${index}">
                <span class="topic-number">${index + 1}</span>
                <span class="topic-title">${escapeHtml(tutorial.Topic || tutorial.topic || 'Untitled')}</span>
                <span class="topic-arrow">›</span>
            </button>
        `).join('');

        // Store tutorials for reference
        topicsList._tutorials = tutorials;

        topicsList.querySelectorAll('.topic-item').forEach(item => {
            item.addEventListener('click', () => {
                const index = parseInt(item.dataset.index);
                openTutorialReader(tutorials[index]);
            });
        });
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

        // Update bookmark button state
        const id = tutorial.ID || tutorial.id || tutorial.Topic || tutorial.topic;
        const isSaved = isResourceSaved(id, 'tutorials');
        if (bookmarkBtn) {
            bookmarkBtn.innerHTML = `<span>${isSaved ? '❤️' : '🤍'}</span>`;
            bookmarkBtn.classList.toggle('saved', isSaved);
        }

        updateTutorialsBreadcrumb();

        // Track stats
        addToRecent(id, 'tutorials', tutorial.Topic || tutorial.topic);
        incrementStat('totalViewed');
    }

    function formatTutorialContent(content) {
        if (!content) return '<p>No content available.</p>';

        // Convert markdown-like syntax to HTML
        let html = content
            // Code blocks
            .replace(/```(\w*)\n([\s\S]*?)```/g, (match, lang, code) => {
                return `<pre><code class="language-${lang || 'plaintext'}">${escapeHtml(code.trim())}</code></pre>`;
            })
            // Inline code
            .replace(/`([^`]+)`/g, '<code>$1</code>')
            // Bold
            .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
            // Italic
            .replace(/\*([^*]+)\*/g, '<em>$1</em>')
            // Headers
            .replace(/^### (.+)$/gm, '<h3>$1</h3>')
            .replace(/^## (.+)$/gm, '<h2>$1</h2>')
            .replace(/^# (.+)$/gm, '<h1>$1</h1>')
            // Lists
            .replace(/^\- (.+)$/gm, '<li>$1</li>')
            .replace(/^\d+\. (.+)$/gm, '<li>$1</li>')
            // Paragraphs (double newline)
            .replace(/\n\n/g, '</p><p>')
            // Single newlines
            .replace(/\n/g, '<br>');

        // Wrap in paragraph if not already structured
        if (!html.startsWith('<')) {
            html = `<p>${html}</p>`;
        }

        return html;
    }

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
        if (nav.language) items.push(nav.language);
        if (nav.topic) items.push(nav.topic.Topic || nav.topic.topic || 'Tutorial');

        breadcrumb.innerHTML = items.map(item => 
            `<span class="breadcrumb-item">${escapeHtml(item)}</span>`
        ).join('');
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
        return saved.some(item => item.id === id && item.type === type);
    }

    function toggleBookmark(id, type, btnElement) {
        let saved = getFromStorage(STORAGE_KEYS.SAVED) || [];
        const existingIndex = saved.findIndex(item => item.id === id && item.type === type);

        if (existingIndex !== -1) {
            // Remove
            saved.splice(existingIndex, 1);
            if (btnElement) {
                btnElement.classList.remove('saved');
                btnElement.innerHTML = btnElement.tagName === 'BUTTON' && btnElement.querySelector('span') 
                    ? '<span>🤍</span>' : '🤍';
            }
            showToast('Removed from saved items', 'info');
        } else {
            // Add
            saved.unshift({ id, type, timestamp: Date.now() });
            if (btnElement) {
                btnElement.classList.add('saved');
                btnElement.innerHTML = btnElement.tagName === 'BUTTON' && btnElement.querySelector('span')
                    ? '<span>❤️</span>' : '❤️';
            }
            incrementStat('totalSaved');
            showToast('Added to saved items', 'success');
        }

        saveToStorage(STORAGE_KEYS.SAVED, saved);
        updateHomeStats();
    }

    function renderSavedItems(filter = 'all') {
        const savedList = document.getElementById('saved-list');
        const emptyState = document.getElementById('saved-empty');
        const saved = getFromStorage(STORAGE_KEYS.SAVED) || [];

        // Map saved items to full resource data
        let items = saved.map(item => {
            let resource;

            if (item.type === 'tutorials') {
                resource = (state.data.tutorials || []).find(t => 
                    (t.ID || t.id || t.Topic || t.topic) === item.id
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
                    (r.ID || r.id) === item.id
                );
                if (resource) {
                    return { ...resource, _savedType: item.type };
                }
            }
            return null;
        }).filter(Boolean);

        // Filter by type
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

        // Remove if already exists
        recent = recent.filter(item => !(item.id === id && item.type === type));

        // Add to beginning
        recent.unshift({ id, type, title, timestamp: Date.now() });

        // Keep only max items
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

        recentItems.innerHTML = recent.map(item => `
            <button class="recent-card" data-id="${item.id}" data-type="${item.type}">
                <span class="recent-card-icon">${icons[item.type] || '📄'}</span>
                <div class="recent-card-title">${escapeHtml(item.title || 'Untitled')}</div>
                <div class="recent-card-type">${item.type}</div>
            </button>
        `).join('');

        recentItems.querySelectorAll('.recent-card').forEach(card => {
            card.addEventListener('click', () => {
                const { id, type } = card.dataset;
                handleRecentItemClick(id, type);
            });
        });
    }

    function handleRecentItemClick(id, type) {
        if (type === 'tutorials') {
            navigateToPage('tutorials');
            const tutorial = (state.data.tutorials || []).find(t => 
                (t.ID || t.id || t.Topic || t.topic) === id
            );
            if (tutorial) {
                selectLanguage(tutorial.Subject || tutorial.subject);
                setTimeout(() => openTutorialReader(tutorial), 300);
            }
        } else {
            navigateToPage(type);
            const resource = (state.data[type] || []).find(r => 
                (r.ID || r.id) === id
            );
            if (resource) {
                const url = resource.FileURL || resource.fileUrl || resource.url;
                if (url) {
                    window.open(url, '_blank', 'noopener,noreferrer');
                    incrementStat('totalViewed');
                }
            }
        }
    }

    function clearRecentItems() {
        showModal(
            'Clear Recent Items',
            'Are you sure you want to clear your recent history?',
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
                text: `Check out this ${type.slice(0, -1)} on StudyHub: ${title}`,
                url: url
            }).catch(() => {
                copyToClipboard(url);
            });
        } else {
            copyToClipboard(url);
        }
    }

    function copyToClipboard(text) {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text)
                .then(() => showToast('Link copied to clipboard!', 'success'))
                .catch(() => fallbackCopy(text));
        } else {
            fallbackCopy(text);
        }
    }

    function fallbackCopy(text) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        
        try {
            document.execCommand('copy');
            showToast('Link copied to clipboard!', 'success');
        } catch (err) {
            showToast('Failed to copy link', 'error');
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

        // Wait for data to load
        const attemptNavigation = () => {
            if (state.isLoading) {
                setTimeout(attemptNavigation, 500);
                return;
            }

            if (['notes', 'videos', 'pyq'].includes(type)) {
                const resource = (state.data[type] || []).find(r => 
                    (r.ID || r.id) === id
                );
                if (resource) {
                    navigateToPage(type);
                    const url = resource.FileURL || resource.fileUrl || resource.url;
                    if (url) {
                        setTimeout(() => {
                            window.open(url, '_blank', 'noopener,noreferrer');
                            addToRecent(id, type, resource.Title || resource.title);
                            incrementStat('totalViewed');
                        }, 500);
                    }
                }
            } else if (type === 'tutorials') {
                const tutorial = (state.data.tutorials || []).find(t => 
                    (t.ID || t.id || t.Topic || t.topic) === id
                );
                if (tutorial) {
                    navigateToPage('tutorials');
                    setTimeout(() => {
                        selectLanguage(tutorial.Subject || tutorial.subject);
                        setTimeout(() => openTutorialReader(tutorial), 300);
                    }, 300);
                }
            }

            // Clear hash
            history.replaceState(null, '', window.location.pathname);
        };

        attemptNavigation();
    }

    // ==================== TOOLS ====================

    function openTool(toolName) {
        state.currentTool = toolName;

        document.getElementById('tools-grid')?.classList.add('hidden');
        document.getElementById('tools-back')?.classList.remove('hidden');

        const titles = {
            todo: 'To-Do List',
            pomodoro: 'Pomodoro Timer',
            notes: 'Quick Notes',
            timetable: 'Timetable',
            sgpa: 'SGPA Calculator',
            cgpa: 'CGPA Calculator',
            percentage: 'GPA to Percentage',
            attendance: 'Attendance Calculator',
            calculator: 'Calculator',
            wordcount: 'Word Counter',
            age: 'Age Calculator',
            unit: 'Unit Converter'
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
        if (toolsTitle) toolsTitle.textContent = 'Study Tools';
    }

    function getToolHTML(toolName) {
        switch (toolName) {
            case 'todo':
                return `
                    <div class="tool-todo">
                        <div class="todo-progress-section">
                            <div class="todo-progress-bar">
                                <div class="todo-progress-fill" id="todo-progress-fill"></div>
                            </div>
                            <span class="todo-progress-text" id="todo-progress-text">0/0 completed</span>
                        </div>
                        <div class="todo-input-section">
                            <input type="text" id="todo-input" placeholder="Add a new task..." maxlength="100">
                            <button class="todo-add-btn" id="todo-add-btn">+</button>
                        </div>
                        <ul class="todo-list" id="todo-list"></ul>
                    </div>
                `;

            case 'pomodoro':
                return `
                    <div class="tool-pomodoro">
                        <div class="pomodoro-display">
                            <div class="pomodoro-circle">
                                <span class="pomodoro-status" id="pomodoro-status">Focus Time</span>
                                <span class="pomodoro-timer" id="pomodoro-timer">25:00</span>
                                <span class="pomodoro-sessions" id="pomodoro-sessions">Session 0</span>
                            </div>
                        </div>
                        <div class="pomodoro-controls">
                            <button class="pomodoro-btn primary" id="pomodoro-start">▶ Start</button>
                            <button class="pomodoro-btn secondary" id="pomodoro-reset">↺ Reset</button>
                        </div>
                        <div class="pomodoro-settings">
                            <div class="pomodoro-setting">
                                <label>Focus (min)</label>
                                <input type="number" id="pomodoro-focus-input" value="25" min="1" max="60">
                            </div>
                            <div class="pomodoro-setting">
                                <label>Break (min)</label>
                                <input type="number" id="pomodoro-break-input" value="5" min="1" max="30">
                            </div>
                        </div>
                    </div>
                `;

            case 'sgpa':
                return `
                    <div class="tool-sgpa">
                        <div class="sgpa-subjects" id="sgpa-subjects">
                            <div class="sgpa-subject">
                                <input type="text" placeholder="Subject" class="sgpa-name">
                                <input type="number" placeholder="Credits" class="sgpa-credit" min="1" max="10">
                                <select class="sgpa-grade">
                                    <option value="10">O (10)</option>
                                    <option value="9">A+ (9)</option>
                                    <option value="8">A (8)</option>
                                    <option value="7">B+ (7)</option>
                                    <option value="6">B (6)</option>
                                    <option value="5">C (5)</option>
                                    <option value="4">P (4)</option>
                                    <option value="0">F (0)</option>
                                </select>
                                <button class="sgpa-remove-btn">✕</button>
                            </div>
                        </div>
                        <button class="tool-secondary-btn" id="sgpa-add-subject">+ Add Subject</button>
                        <button class="tool-primary-btn" id="sgpa-calculate">Calculate SGPA</button>
                        <div class="sgpa-result hidden" id="sgpa-result">
                            <span class="result-label">Your SGPA</span>
                            <span class="result-value" id="sgpa-value">0.00</span>
                        </div>
                    </div>
                `;

            case 'cgpa':
                return `
                    <div class="tool-cgpa">
                        <div class="cgpa-semesters" id="cgpa-semesters">
                            <div class="cgpa-semester">
                                <span class="cgpa-sem-label">Semester 1</span>
                                <input type="number" placeholder="SGPA" class="cgpa-sgpa" min="0" max="10" step="0.01">
                                <input type="number" placeholder="Credits" class="cgpa-credits" min="1" max="30">
                                <button class="cgpa-remove-btn">✕</button>
                            </div>
                        </div>
                        <button class="tool-secondary-btn" id="cgpa-add-semester">+ Add Semester</button>
                        <button class="tool-primary-btn" id="cgpa-calculate">Calculate CGPA</button>
                        <div class="cgpa-result hidden" id="cgpa-result">
                            <span class="result-label">Your CGPA</span>
                            <span class="result-value" id="cgpa-value">0.00</span>
                        </div>
                    </div>
                `;

            case 'percentage':
                return `
                    <div class="tool-percentage">
                        <div class="percentage-input-group">
                            <label>Enter your CGPA/SGPA</label>
                            <input type="number" id="gpa-input" placeholder="e.g., 8.5" min="0" max="10" step="0.01">
                        </div>
                        <div class="percentage-scale-group">
                            <label>GPA Scale</label>
                            <select id="gpa-scale">
                                <option value="10">10 Point Scale</option>
                                <option value="4">4 Point Scale</option>
                            </select>
                        </div>
                        <button class="tool-primary-btn" id="percentage-calculate">Convert to Percentage</button>
                        <div class="percentage-result hidden" id="percentage-result">
                            <span class="result-label">Percentage</span>
                            <span class="result-value" id="percentage-value">0.00%</span>
                        </div>
                    </div>
                `;

            case 'attendance':
                return `
                    <div class="tool-attendance">
                        <div class="attendance-inputs">
                            <div class="attendance-input-group">
                                <label>Total Classes</label>
                                <input type="number" id="total-classes" placeholder="e.g., 100" min="0">
                            </div>
                            <div class="attendance-input-group">
                                <label>Classes Attended</label>
                                <input type="number" id="attended-classes" placeholder="e.g., 75" min="0">
                            </div>
                        </div>
                        <button class="tool-primary-btn" id="attendance-calculate">Calculate Attendance</button>
                        <div class="attendance-result hidden" id="attendance-result">
                            <div class="attendance-percentage">
                                <span class="result-label">Current Attendance</span>
                                <span class="result-value" id="attendance-value">0%</span>
                            </div>
                            <div class="attendance-info" id="attendance-info"></div>
                        </div>
                    </div>
                `;

            case 'calculator':
                return `
                    <div class="tool-calculator">
                        <div class="calc-display">
                            <div class="calc-history" id="calc-history"></div>
                            <div class="calc-current" id="calc-current">0</div>
                        </div>
                        <div class="calc-buttons">
                            <button class="calc-btn clear" data-action="clear">C</button>
                            <button class="calc-btn operator" data-action="backspace">⌫</button>
                            <button class="calc-btn operator" data-action="%">%</button>
                            <button class="calc-btn operator" data-action="/">÷</button>
                            <button class="calc-btn number" data-action="7">7</button>
                            <button class="calc-btn number" data-action="8">8</button>
                            <button class="calc-btn number" data-action="9">9</button>
                            <button class="calc-btn operator" data-action="*">×</button>
                            <button class="calc-btn number" data-action="4">4</button>
                            <button class="calc-btn number" data-action="5">5</button>
                            <button class="calc-btn number" data-action="6">6</button>
                            <button class="calc-btn operator" data-action="-">−</button>
                            <button class="calc-btn number" data-action="1">1</button>
                            <button class="calc-btn number" data-action="2">2</button>
                            <button class="calc-btn number" data-action="3">3</button>
                            <button class="calc-btn operator" data-action="+">+</button>
                            <button class="calc-btn number zero" data-action="0">0</button>
                            <button class="calc-btn number" data-action=".">.</button>
                            <button class="calc-btn equals" data-action="=">=</button>
                        </div>
                    </div>
                `;

            case 'wordcount':
                return `
                    <div class="tool-wordcount">
                        <textarea id="wordcount-input" placeholder="Paste or type your text here..."></textarea>
                        <div class="wordcount-stats">
                            <div class="wordcount-stat">
                                <span class="stat-value" id="word-count">0</span>
                                <span class="stat-label">Words</span>
                            </div>
                            <div class="wordcount-stat">
                                <span class="stat-value" id="char-count">0</span>
                                <span class="stat-label">Characters</span>
                            </div>
                            <div class="wordcount-stat">
                                <span class="stat-value" id="char-no-space">0</span>
                                <span class="stat-label">No Spaces</span>
                            </div>
                            <div class="wordcount-stat">
                                <span class="stat-value" id="sentence-count">0</span>
                                <span class="stat-label">Sentences</span>
                            </div>
                            <div class="wordcount-stat">
                                <span class="stat-value" id="para-count">0</span>
                                <span class="stat-label">Paragraphs</span>
                            </div>
                            <div class="wordcount-stat">
                                <span class="stat-value" id="read-time">0</span>
                                <span class="stat-label">Min Read</span>
                            </div>
                        </div>
                        <button class="tool-secondary-btn" id="wordcount-clear">Clear Text</button>
                    </div>
                `;

            case 'age':
                return `
                    <div class="tool-age">
                        <div class="age-input-group">
                            <label>Enter your birth date</label>
                            <input type="date" id="birth-date">
                        </div>
                        <button class="tool-primary-btn" id="age-calculate">Calculate Age</button>
                        <div class="age-result hidden" id="age-result">
                            <div class="age-main">
                                <span class="result-value" id="age-years">0</span>
                                <span class="result-label">Years Old</span>
                            </div>
                            <div class="age-details">
                                <div class="age-detail">
                                    <span id="age-months">0</span> months
                                </div>
                                <div class="age-detail">
                                    <span id="age-days">0</span> days
                                </div>
                                <div class="age-detail">
                                    <span id="age-total-days">0</span> total days
                                </div>
                            </div>
                            <div class="age-next-birthday" id="next-birthday"></div>
                        </div>
                    </div>
                `;

            case 'notes':
                return `
                    <div class="tool-quicknotes">
                        <textarea id="quicknote-input" placeholder="Write your quick notes here..."></textarea>
                        <div class="quicknote-actions">
                            <button class="tool-secondary-btn" id="quicknote-clear">Clear</button>
                            <button class="tool-primary-btn" id="quicknote-save">💾 Save Note</button>
                        </div>
                        <div class="quicknote-saved" id="quicknote-saved">
                            <h4>Saved Notes</h4>
                            <div id="quicknote-list"></div>
                        </div>
                    </div>
                `;

            case 'unit':
                return `
                    <div class="tool-unit">
                        <div class="unit-category">
                            <label>Category</label>
                            <select id="unit-category">
                                <option value="length">Length</option>
                                <option value="weight">Weight</option>
                                <option value="temperature">Temperature</option>
                                <option value="area">Area</option>
                                <option value="volume">Volume</option>
                                <option value="time">Time</option>
                                <option value="data">Data Storage</option>
                            </select>
                        </div>
                        <div class="unit-conversion">
                            <div class="unit-from">
                                <input type="number" id="unit-from-value" placeholder="Enter value">
                                <select id="unit-from-unit"></select>
                            </div>
                            <span class="unit-arrow">→</span>
                            <div class="unit-to">
                                <input type="text" id="unit-to-value" readonly placeholder="Result">
                                <select id="unit-to-unit"></select>
                            </div>
                        </div>
                        <button class="tool-primary-btn" id="unit-convert">Convert</button>
                    </div>
                `;

            case 'timetable':
                return `
                    <div class="tool-timetable">
                        <p class="tool-coming-soon">📅 Timetable feature coming soon!</p>
                        <p class="tool-description">You'll be able to create and manage your weekly class schedule here.</p>
                    </div>
                `;

            default:
                return `<p class="tool-coming-soon">This tool is coming soon!</p>`;
        }
    }

    function initializeTool(toolName) {
        switch (toolName) {
            case 'todo':
                initTodoTool();
                break;
            case 'pomodoro':
                initPomodoroTool();
                break;
            case 'sgpa':
                initSgpaTool();
                break;
            case 'cgpa':
                initCgpaTool();
                break;
            case 'percentage':
                initPercentageTool();
                break;
            case 'attendance':
                initAttendanceTool();
                break;
            case 'calculator':
                initCalculatorTool();
                break;
            case 'wordcount':
                initWordCountTool();
                break;
            case 'age':
                initAgeTool();
                break;
            case 'notes':
                initQuickNotesTool();
                break;
            case 'unit':
                initUnitConverterTool();
                break;
        }
    }

    // ==================== TODO TOOL ====================
    function initTodoTool() {
        const input = document.getElementById('todo-input');
        const addBtn = document.getElementById('todo-add-btn');
        const list = document.getElementById('todo-list');

        loadTodos();

        addBtn?.addEventListener('click', addTodo);
        input?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') addTodo();
        });
    }

    function loadTodos() {
        const todos = getFromStorage(STORAGE_KEYS.TODOS) || [];
        renderTodos(todos);
    }

    function renderTodos(todos) {
        const list = document.getElementById('todo-list');
        if (!list) return;

        list.innerHTML = todos.map(todo => `
            <li class="todo-item ${todo.completed ? 'completed' : ''}" data-id="${todo.id}">
                <button class="todo-checkbox ${todo.completed ? 'checked' : ''}">
                    ${todo.completed ? '✓' : ''}
                </button>
                <span class="todo-text">${escapeHtml(todo.text)}</span>
                <button class="todo-delete">🗑️</button>
            </li>
        `).join('');

        // Bind events
        list.querySelectorAll('.todo-item').forEach(item => {
            const id = item.dataset.id;
            item.querySelector('.todo-checkbox')?.addEventListener('click', () => toggleTodoItem(id));
            item.querySelector('.todo-delete')?.addEventListener('click', () => deleteTodoItem(id));
        });

        updateTodoProgress(todos);
    }

    function addTodo() {
        const input = document.getElementById('todo-input');
        const text = input?.value.trim();
        if (!text) return;

        const todos = getFromStorage(STORAGE_KEYS.TODOS) || [];
        const newTodo = {
            id: Date.now().toString(),
            text,
            completed: false,
            createdAt: Date.now()
        };

        todos.push(newTodo);
        saveToStorage(STORAGE_KEYS.TODOS, todos);
        renderTodos(todos);

        if (input) input.value = '';
        showToast('Task added!', 'success');
    }

    function toggleTodoItem(id) {
        const todos = getFromStorage(STORAGE_KEYS.TODOS) || [];
        const todo = todos.find(t => t.id === id);

        if (todo) {
            const wasCompleted = todo.completed;
            todo.completed = !todo.completed;
            saveToStorage(STORAGE_KEYS.TODOS, todos);
            renderTodos(todos);

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
        renderTodos(todos);
        showToast('Task deleted', 'info');
    }

    function updateTodoProgress(todos) {
        const completed = todos.filter(t => t.completed).length;
        const total = todos.length;
        const percentage = total > 0 ? (completed / total) * 100 : 0;

        const progressFill = document.getElementById('todo-progress-fill');
        const progressText = document.getElementById('todo-progress-text');

        if (progressFill) progressFill.style.width = `${percentage}%`;
        if (progressText) progressText.textContent = `${completed}/${total} completed`;
    }

    // ==================== POMODORO TOOL ====================
    function initPomodoroTool() {
        const startBtn = document.getElementById('pomodoro-start');
        const resetBtn = document.getElementById('pomodoro-reset');
        const focusInput = document.getElementById('pomodoro-focus-input');
        const breakInput = document.getElementById('pomodoro-break-input');

        // Reset state
        state.pomodoro.timeLeft = state.pomodoro.focusTime * 60;
        state.pomodoro.isRunning = false;
        state.pomodoro.isFocus = true;
        updatePomodoroDisplay();

        startBtn?.addEventListener('click', togglePomodoro);
        resetBtn?.addEventListener('click', resetPomodoro);
        focusInput?.addEventListener('change', updatePomodoroSettings);
        breakInput?.addEventListener('change', updatePomodoroSettings);
    }

    function togglePomodoro() {
        const startBtn = document.getElementById('pomodoro-start');
        
        if (state.pomodoro.isRunning) {
            // Pause
            clearInterval(state.pomodoro.timer);
            state.pomodoro.isRunning = false;
            if (startBtn) startBtn.textContent = '▶ Start';
        } else {
            // Start
            state.pomodoro.isRunning = true;
            if (startBtn) startBtn.textContent = '⏸ Pause';
            
            state.pomodoro.timer = setInterval(() => {
                state.pomodoro.timeLeft--;

                if (state.pomodoro.timeLeft <= 0) {
                    // Switch mode
                    state.pomodoro.isFocus = !state.pomodoro.isFocus;
                    
                    if (state.pomodoro.isFocus) {
                        state.pomodoro.sessions++;
                        state.pomodoro.timeLeft = state.pomodoro.focusTime * 60;
                        showToast('Break over! Time to focus. 💪', 'info');
                    } else {
                        state.pomodoro.timeLeft = state.pomodoro.breakTime * 60;
                        showToast('Great work! Take a break. ☕', 'success');
                    }

                    // Try notification
                    if ('Notification' in window && Notification.permission === 'granted') {
                        new Notification('StudyHub Pomodoro', {
                            body: state.pomodoro.isFocus ? 'Time to focus!' : 'Take a break!',
                            icon: '⏱️'
                        });
                    }
                }

                updatePomodoroDisplay();
            }, 1000);
        }
    }

    function resetPomodoro() {
        clearInterval(state.pomodoro.timer);
        state.pomodoro.timer = null;
        state.pomodoro.isRunning = false;
        state.pomodoro.isFocus = true;
        state.pomodoro.timeLeft = state.pomodoro.focusTime * 60;
        
        const startBtn = document.getElementById('pomodoro-start');
        if (startBtn) startBtn.textContent = '▶ Start';
        
        updatePomodoroDisplay();
    }

    function updatePomodoroSettings() {
        const focusInput = document.getElementById('pomodoro-focus-input');
        const breakInput = document.getElementById('pomodoro-break-input');

        state.pomodoro.focusTime = parseInt(focusInput?.value) || 25;
        state.pomodoro.breakTime = parseInt(breakInput?.value) || 5;

        if (!state.pomodoro.isRunning && state.pomodoro.isFocus) {
            state.pomodoro.timeLeft = state.pomodoro.focusTime * 60;
            updatePomodoroDisplay();
        }
    }

    function updatePomodoroDisplay() {
        const minutes = Math.floor(state.pomodoro.timeLeft / 60);
        const seconds = state.pomodoro.timeLeft % 60;

        const timerEl = document.getElementById('pomodoro-timer');
        const statusEl = document.getElementById('pomodoro-status');
        const sessionsEl = document.getElementById('pomodoro-sessions');

        if (timerEl) {
            timerEl.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        }
        if (statusEl) {
            statusEl.textContent = state.pomodoro.isFocus ? 'Focus Time' : 'Break Time';
        }
        if (sessionsEl) {
            sessionsEl.textContent = `Session ${state.pomodoro.sessions}`;
        }
    }

    // ==================== SGPA CALCULATOR ====================
    function initSgpaTool() {
        const addBtn = document.getElementById('sgpa-add-subject');
        const calcBtn = document.getElementById('sgpa-calculate');
        const subjectsContainer = document.getElementById('sgpa-subjects');

        addBtn?.addEventListener('click', () => addSgpaSubject(subjectsContainer));
        calcBtn?.addEventListener('click', calculateSgpa);

        // Bind remove buttons for existing subjects
        subjectsContainer?.querySelectorAll('.sgpa-remove-btn').forEach(btn => {
            btn.addEventListener('click', () => btn.closest('.sgpa-subject')?.remove());
        });
    }

    function addSgpaSubject(container) {
        if (!container) return;

        const subjectDiv = document.createElement('div');
        subjectDiv.className = 'sgpa-subject';
        subjectDiv.innerHTML = `
            <input type="text" placeholder="Subject" class="sgpa-name">
            <input type="number" placeholder="Credits" class="sgpa-credit" min="1" max="10">
            <select class="sgpa-grade">
                <option value="10">O (10)</option>
                <option value="9">A+ (9)</option>
                <option value="8">A (8)</option>
                <option value="7">B+ (7)</option>
                <option value="6">B (6)</option>
                <option value="5">C (5)</option>
                <option value="4">P (4)</option>
                <option value="0">F (0)</option>
            </select>
            <button class="sgpa-remove-btn">✕</button>
        `;

        subjectDiv.querySelector('.sgpa-remove-btn')?.addEventListener('click', () => {
            subjectDiv.remove();
        });

        container.appendChild(subjectDiv);
    }

    function calculateSgpa() {
        const subjects = document.querySelectorAll('.sgpa-subject');
        let totalCredits = 0;
        let weightedSum = 0;

        subjects.forEach(subject => {
            const credit = parseFloat(subject.querySelector('.sgpa-credit')?.value) || 0;
            const grade = parseFloat(subject.querySelector('.sgpa-grade')?.value) || 0;

            if (credit > 0) {
                totalCredits += credit;
                weightedSum += credit * grade;
            }
        });

        const sgpa = totalCredits > 0 ? (weightedSum / totalCredits).toFixed(2) : '0.00';

        const resultEl = document.getElementById('sgpa-result');
        const valueEl = document.getElementById('sgpa-value');

        if (valueEl) valueEl.textContent = sgpa;
        resultEl?.classList.remove('hidden');

        showToast(`Your SGPA is ${sgpa}`, 'success');
    }

    // ==================== CGPA CALCULATOR ====================
    function initCgpaTool() {
        const addBtn = document.getElementById('cgpa-add-semester');
        const calcBtn = document.getElementById('cgpa-calculate');
        const container = document.getElementById('cgpa-semesters');

        addBtn?.addEventListener('click', () => addCgpaSemester(container));
        calcBtn?.addEventListener('click', calculateCgpa);

        container?.querySelectorAll('.cgpa-remove-btn').forEach(btn => {
            btn.addEventListener('click', () => btn.closest('.cgpa-semester')?.remove());
        });
    }

    function addCgpaSemester(container) {
        if (!container) return;

        const count = container.querySelectorAll('.cgpa-semester').length + 1;
        const semDiv = document.createElement('div');
        semDiv.className = 'cgpa-semester';
        semDiv.innerHTML = `
            <span class="cgpa-sem-label">Semester ${count}</span>
            <input type="number" placeholder="SGPA" class="cgpa-sgpa" min="0" max="10" step="0.01">
            <input type="number" placeholder="Credits" class="cgpa-credits" min="1" max="30">
            <button class="cgpa-remove-btn">✕</button>
        `;

        semDiv.querySelector('.cgpa-remove-btn')?.addEventListener('click', () => {
            semDiv.remove();
        });

        container.appendChild(semDiv);
    }

    function calculateCgpa() {
        const semesters = document.querySelectorAll('.cgpa-semester');
        let totalCredits = 0;
        let weightedSum = 0;

        semesters.forEach(sem => {
            const sgpa = parseFloat(sem.querySelector('.cgpa-sgpa')?.value) || 0;
            const credits = parseFloat(sem.querySelector('.cgpa-credits')?.value) || 0;

            if (credits > 0 && sgpa > 0) {
                totalCredits += credits;
                weightedSum += credits * sgpa;
            }
        });

        const cgpa = totalCredits > 0 ? (weightedSum / totalCredits).toFixed(2) : '0.00';

        const resultEl = document.getElementById('cgpa-result');
        const valueEl = document.getElementById('cgpa-value');

        if (valueEl) valueEl.textContent = cgpa;
        resultEl?.classList.remove('hidden');

        showToast(`Your CGPA is ${cgpa}`, 'success');
    }

    // ==================== PERCENTAGE CONVERTER ====================
    function initPercentageTool() {
        const calcBtn = document.getElementById('percentage-calculate');
        calcBtn?.addEventListener('click', calculatePercentage);
    }

    function calculatePercentage() {
        const gpa = parseFloat(document.getElementById('gpa-input')?.value) || 0;
        const scale = parseInt(document.getElementById('gpa-scale')?.value) || 10;

        let percentage;
        if (scale === 10) {
            // Common formula: (CGPA - 0.75) * 10
            percentage = ((gpa - 0.75) * 10).toFixed(2);
        } else {
            // 4 point scale: (GPA / 4) * 100
            percentage = ((gpa / 4) * 100).toFixed(2);
        }

        const resultEl = document.getElementById('percentage-result');
        const valueEl = document.getElementById('percentage-value');

        if (valueEl) valueEl.textContent = `${percentage}%`;
        resultEl?.classList.remove('hidden');
    }

    // ==================== ATTENDANCE CALCULATOR ====================
    function initAttendanceTool() {
        const calcBtn = document.getElementById('attendance-calculate');
        calcBtn?.addEventListener('click', calculateAttendance);
    }

    function calculateAttendance() {
        const total = parseInt(document.getElementById('total-classes')?.value) || 0;
        const attended = parseInt(document.getElementById('attended-classes')?.value) || 0;

        if (total <= 0) {
            showToast('Please enter valid number of classes', 'error');
            return;
        }

        const percentage = ((attended / total) * 100).toFixed(1);
        const resultEl = document.getElementById('attendance-result');
        const valueEl = document.getElementById('attendance-value');
        const infoEl = document.getElementById('attendance-info');

        if (valueEl) valueEl.textContent = `${percentage}%`;

        // Calculate classes needed for 75%
        let infoText = '';
        if (percentage < 75) {
            const needed = Math.ceil((0.75 * total - attended) / 0.25);
            infoText = `⚠️ You need to attend ${needed} more classes (without missing any) to reach 75%`;
        } else {
            const canMiss = Math.floor((attended - 0.75 * total) / 0.75);
            infoText = `✅ You can miss up to ${canMiss} more classes and still have 75%`;
        }

        if (infoEl) infoEl.innerHTML = infoText;
        resultEl?.classList.remove('hidden');
    }

    // ==================== CALCULATOR ====================
    function initCalculatorTool() {
        let current = '0';
        let history = '';
        let shouldReset = false;

        const currentEl = document.getElementById('calc-current');
        const historyEl = document.getElementById('calc-history');

        document.querySelectorAll('.calc-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const action = btn.dataset.action;
                handleCalcAction(action);
            });
        });

        function handleCalcAction(action) {
            if (action === 'clear') {
                current = '0';
                history = '';
            } else if (action === 'backspace') {
                current = current.length > 1 ? current.slice(0, -1) : '0';
            } else if (action === '=') {
                try {
                    history = current;
                    current = eval(current.replace(/×/g, '*').replace(/÷/g, '/').replace(/−/g, '-')).toString();
                    shouldReset = true;
                } catch {
                    current = 'Error';
                    shouldReset = true;
                }
            } else if (['+', '-', '*', '/', '%'].includes(action)) {
                if (shouldReset) shouldReset = false;
                current += action;
            } else {
                if (shouldReset) {
                    current = action;
                    shouldReset = false;
                } else {
                    current = current === '0' ? action : current + action;
                }
            }

            if (currentEl) currentEl.textContent = current;
            if (historyEl) historyEl.textContent = history;
        }
    }

    // ==================== WORD COUNT ====================
    function initWordCountTool() {
        const input = document.getElementById('wordcount-input');
        const clearBtn = document.getElementById('wordcount-clear');

        input?.addEventListener('input', updateWordCount);
        clearBtn?.addEventListener('click', () => {
            if (input) input.value = '';
            updateWordCount();
        });
    }

    function updateWordCount() {
        const text = document.getElementById('wordcount-input')?.value || '';

        const words = text.trim() ? text.trim().split(/\s+/).length : 0;
        const chars = text.length;
        const charsNoSpace = text.replace(/\s/g, '').length;
        const sentences = text.split(/[.!?]+/).filter(s => s.trim()).length;
        const paragraphs = text.split(/\n\n+/).filter(p => p.trim()).length;
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
    }

    function calculateAge() {
        const birthDate = document.getElementById('birth-date')?.value;
        if (!birthDate) {
            showToast('Please enter your birth date', 'error');
            return;
        }

        const birth = new Date(birthDate);
        const today = new Date();

        let years = today.getFullYear() - birth.getFullYear();
        let months = today.getMonth() - birth.getMonth();
        let days = today.getDate() - birth.getDate();

        if (days < 0) {
            months--;
            days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
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
        document.getElementById('next-birthday').textContent = `🎂 ${daysUntilBirthday} days until your next birthday!`;

        document.getElementById('age-result')?.classList.remove('hidden');
    }

    // ==================== QUICK NOTES ====================
    function initQuickNotesTool() {
        const input = document.getElementById('quicknote-input');
        const saveBtn = document.getElementById('quicknote-save');
        const clearBtn = document.getElementById('quicknote-clear');

        loadQuickNotes();

        saveBtn?.addEventListener('click', saveQuickNote);
        clearBtn?.addEventListener('click', () => {
            if (input) input.value = '';
        });
    }

    function loadQuickNotes() {
        const notes = getFromStorage(STORAGE_KEYS.QUICK_NOTES) || [];
        renderQuickNotes(notes);
    }

    function renderQuickNotes(notes) {
        const list = document.getElementById('quicknote-list');
        if (!list) return;

        list.innerHTML = notes.map(note => `
            <div class="quicknote-item" data-id="${note.id}">
                <p>${escapeHtml(note.text).substring(0, 100)}${note.text.length > 100 ? '...' : ''}</p>
                <span class="quicknote-date">${new Date(note.createdAt).toLocaleDateString()}</span>
                <button class="quicknote-delete" data-id="${note.id}">🗑️</button>
            </div>
        `).join('');

        list.querySelectorAll('.quicknote-delete').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                deleteQuickNote(btn.dataset.id);
            });
        });
    }

    function saveQuickNote() {
        const input = document.getElementById('quicknote-input');
        const text = input?.value.trim();
        if (!text) {
            showToast('Please write something first', 'error');
            return;
        }

        const notes = getFromStorage(STORAGE_KEYS.QUICK_NOTES) || [];
        notes.unshift({
            id: Date.now().toString(),
            text,
            createdAt: Date.now()
        });

        saveToStorage(STORAGE_KEYS.QUICK_NOTES, notes.slice(0, 20)); // Keep max 20 notes
        renderQuickNotes(notes);

        if (input) input.value = '';
        showToast('Note saved!', 'success');
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
        const categorySelect = document.getElementById('unit-category');
        const convertBtn = document.getElementById('unit-convert');
        const fromValue = document.getElementById('unit-from-value');

        categorySelect?.addEventListener('change', updateUnitOptions);
        convertBtn?.addEventListener('click', convertUnits);
        fromValue?.addEventListener('input', convertUnits);

        updateUnitOptions();
    }

    function updateUnitOptions() {
        const category = document.getElementById('unit-category')?.value || 'length';
        const fromSelect = document.getElementById('unit-from-unit');
        const toSelect = document.getElementById('unit-to-unit');

        const units = {
            length: ['m', 'km', 'cm', 'mm', 'mi', 'yd', 'ft', 'in'],
            weight: ['kg', 'g', 'mg', 'lb', 'oz'],
            temperature: ['°C', '°F', 'K'],
            area: ['m²', 'km²', 'ha', 'acre', 'ft²'],
            volume: ['L', 'mL', 'm³', 'gal', 'qt', 'pt', 'cup'],
            time: ['s', 'min', 'hr', 'day', 'week', 'month', 'year'],
            data: ['B', 'KB', 'MB', 'GB', 'TB']
        };

        const options = units[category] || [];
        const optionsHtml = options.map(u => `<option value="${u}">${u}</option>`).join('');

        if (fromSelect) fromSelect.innerHTML = optionsHtml;
        if (toSelect) toSelect.innerHTML = optionsHtml;
    }

    function convertUnits() {
        const category = document.getElementById('unit-category')?.value;
        const fromValue = parseFloat(document.getElementById('unit-from-value')?.value) || 0;
        const fromUnit = document.getElementById('unit-from-unit')?.value;
        const toUnit = document.getElementById('unit-to-unit')?.value;
        const resultEl = document.getElementById('unit-to-value');

        if (!resultEl) return;

        // Simple conversion (you can expand this)
        const result = performConversion(fromValue, fromUnit, toUnit, category);
        resultEl.value = result;
    }

    function performConversion(value, from, to, category) {
        // Base unit conversions (simplified)
        const conversions = {
            length: { m: 1, km: 1000, cm: 0.01, mm: 0.001, mi: 1609.34, yd: 0.9144, ft: 0.3048, in: 0.0254 },
            weight: { kg: 1, g: 0.001, mg: 0.000001, lb: 0.453592, oz: 0.0283495 },
            data: { B: 1, KB: 1024, MB: 1048576, GB: 1073741824, TB: 1099511627776 }
        };

        if (category === 'temperature') {
            return convertTemperature(value, from, to);
        }

        const conv = conversions[category];
        if (conv && conv[from] && conv[to]) {
            const inBase = value * conv[from];
            return (inBase / conv[to]).toFixed(6);
        }

        return value.toString();
    }

    function convertTemperature(value, from, to) {
        let celsius;
        if (from === '°C') celsius = value;
        else if (from === '°F') celsius = (value - 32) * 5/9;
        else celsius = value - 273.15;

        if (to === '°C') return celsius.toFixed(2);
        if (to === '°F') return (celsius * 9/5 + 32).toFixed(2);
        return (celsius + 273.15).toFixed(2);
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
            showToast('Image too large. Max 500KB', 'error');
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
                showToast('Avatar updated!', 'success');
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

        showToast('Settings saved successfully!', 'success');
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
            exportedAt: new Date().toISOString()
        };

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `studyhub-backup-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);

        showToast('Data exported successfully!', 'success');
    }

    function handleClearCache() {
        showModal(
            'Clear Cache',
            'This will reload fresh data from the server. Your saved items and settings will NOT be deleted.',
            () => {
                localStorage.removeItem(STORAGE_KEYS.CACHE);
                location.reload();
            },
            '🔄',
            false
        );
    }

    function handleResetApp() {
        showModal(
            'Reset App',
            'This will delete ALL your data including saved items, notes, todos, and settings. This action cannot be undone!',
            () => {
                Object.values(STORAGE_KEYS).forEach(key => {
                    localStorage.removeItem(key);
                });
                sessionStorage.clear();
                showToast('App reset successfully!', 'success');
                setTimeout(() => location.reload(), 1000);
            },
            '🗑️',
            true
        );
    }

    function copyUpiId() {
        const upiId = CONFIG.UPI_ID;
        copyToClipboard(upiId);
    }

    // ==================== INITIALIZE APP ====================
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();