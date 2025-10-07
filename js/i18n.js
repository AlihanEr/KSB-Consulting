// i18n (Internationalization) Module
const i18n = {
    currentLanguage: localStorage.getItem('language') || 'en',
    translations: {},

    // Initialize i18n
    async init() {
        await this.loadLanguage(this.currentLanguage);
        this.updateLanguageSwitcher();
    },

    // Load language file
    async loadLanguage(lang) {
        try {
            const response = await fetch(`./i18n/${lang}.json`);
            this.translations = await response.json();
            this.currentLanguage = lang;
            localStorage.setItem('language', lang);
            this.translate();
            this.updateLanguageSwitcher();
        } catch (error) {
            console.error('Error loading language file:', error);
        }
    },

    // Get nested translation value
    getValue(path) {
        return path.split('.').reduce((obj, key) => obj?.[key], this.translations);
    },

    // Translate all elements with data-i18n attribute
    translate() {
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.getValue(key);

            if (translation) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = translation;
                } else {
                    element.innerHTML = translation;
                }
            }
        });
    },

    // Update active language in switcher
    updateLanguageSwitcher() {
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-lang') === this.currentLanguage) {
                btn.classList.add('active');
            }
        });
    },

    // Switch language
    switchLanguage(lang) {
        this.loadLanguage(lang);
    }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    i18n.init();

    // Add event listeners to language switcher buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const lang = btn.getAttribute('data-lang');
            i18n.switchLanguage(lang);
        });
    });
});
