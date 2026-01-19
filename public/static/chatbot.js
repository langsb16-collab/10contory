// 챗봇 FAQ 시스템
class ChatbotFAQ {
  constructor() {
    this.currentLanguage = 'ko';
    this.currentCategory = 'overview';
    this.currentPage = 1;
    this.itemsPerPage = 10;
    this.openItems = new Set();
    this.init();
  }

  init() {
    this.createChatbot();
    this.loadLanguage();
    this.attachEventListeners();
  }

  createChatbot() {
    const container = document.createElement('div');
    container.className = 'chatbot-container';
    container.innerHTML = `
      <button class="chatbot-button" id="chatbot-toggle" aria-label="Open FAQ Chatbot">
      </button>
      <div class="chatbot-window" id="chatbot-window">
        <div class="chatbot-header">
          <h3 id="chatbot-title">FAQ</h3>
          <button class="chatbot-close" id="chatbot-close" aria-label="Close">✕</button>
        </div>
        <div class="chatbot-categories" id="chatbot-categories">
          <!-- Categories will be inserted here -->
        </div>
        <div class="chatbot-content" id="chatbot-content">
          <div class="faq-list" id="faq-list">
            <!-- FAQ items will be inserted here -->
          </div>
        </div>
        <div class="chatbot-pagination" id="chatbot-pagination">
          <!-- Pagination will be inserted here -->
        </div>
      </div>
    `;
    document.body.appendChild(container);
  }

  attachEventListeners() {
    const toggleBtn = document.getElementById('chatbot-toggle');
    const closeBtn = document.getElementById('chatbot-close');
    const chatbotWindow = document.getElementById('chatbot-window');

    toggleBtn.addEventListener('click', () => {
      const isOpen = chatbotWindow.classList.toggle('open');
      toggleBtn.classList.toggle('active', isOpen);
    });

    closeBtn.addEventListener('click', () => {
      chatbotWindow.classList.remove('open');
      toggleBtn.classList.remove('active');
    });

    // Listen for language changes
    window.addEventListener('languageChanged', (e) => {
      this.currentLanguage = e.detail.language;
      this.loadLanguage();
      this.renderCategories();
      this.renderFAQ();
    });
  }

  loadLanguage() {
    // Language is managed by the main app
    if (window.translations && window.translations[this.currentLanguage]) {
      this.translations = window.translations[this.currentLanguage].chatbot;
      this.updateTitle();
      this.renderCategories();
      this.renderFAQ();
    } else {
      // Wait for translations to load
      setTimeout(() => this.loadLanguage(), 500);
    }
  }

  updateTitle() {
    const titleEl = document.getElementById('chatbot-title');
    if (titleEl && this.translations) {
      titleEl.textContent = this.translations.title;
    }
  }

  renderCategories() {
    if (!this.translations) return;

    const categoriesEl = document.getElementById('chatbot-categories');
    const categories = this.translations.categories;

    categoriesEl.innerHTML = Object.keys(categories).map(key => `
      <button 
        class="category-tab ${key === this.currentCategory ? 'active' : ''}"
        data-category="${key}"
      >
        ${categories[key]}
      </button>
    `).join('');

    // Attach category click handlers
    categoriesEl.querySelectorAll('.category-tab').forEach(tab => {
      tab.addEventListener('click', (e) => {
        this.currentCategory = e.target.dataset.category;
        this.currentPage = 1;
        this.openItems.clear();
        this.renderCategories();
        this.renderFAQ();
      });
    });
  }

  renderFAQ() {
    if (!this.translations) return;

    const faqList = this.translations.faq;
    const filteredFAQ = this.filterFAQByCategory(faqList);
    const paginatedFAQ = this.paginateFAQ(filteredFAQ);

    const faqListEl = document.getElementById('faq-list');
    faqListEl.innerHTML = paginatedFAQ.map((item, index) => {
      const globalIndex = (this.currentPage - 1) * this.itemsPerPage + index;
      const isOpen = this.openItems.has(globalIndex);

      return `
        <div class="faq-item ${isOpen ? 'open' : ''}" data-index="${globalIndex}">
          <button class="faq-question">
            ${item.q}
          </button>
          <div class="faq-answer">
            <div class="faq-answer-content">
              ${item.a}
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Attach FAQ item click handlers
    faqListEl.querySelectorAll('.faq-item').forEach(item => {
      const questionBtn = item.querySelector('.faq-question');
      questionBtn.addEventListener('click', () => {
        const index = parseInt(item.dataset.index);
        if (this.openItems.has(index)) {
          this.openItems.delete(index);
          item.classList.remove('open');
        } else {
          this.openItems.add(index);
          item.classList.add('open');
        }
      });
    });

    this.renderPagination(filteredFAQ.length);
  }

  filterFAQByCategory(faqList) {
    // For now, return all FAQs
    // In future, can filter by category based on question content
    return faqList;
  }

  paginateFAQ(faqList) {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return faqList.slice(start, end);
  }

  renderPagination(totalItems) {
    const totalPages = Math.ceil(totalItems / this.itemsPerPage);
    const paginationEl = document.getElementById('chatbot-pagination');

    if (totalPages <= 1) {
      paginationEl.innerHTML = '';
      return;
    }

    const prevDisabled = this.currentPage === 1;
    const nextDisabled = this.currentPage === totalPages;

    paginationEl.innerHTML = `
      <button 
        class="page-button" 
        data-action="prev"
        ${prevDisabled ? 'disabled' : ''}
      >
        ◀
      </button>
      <span class="page-info">${this.currentPage} / ${totalPages}</span>
      <button 
        class="page-button" 
        data-action="next"
        ${nextDisabled ? 'disabled' : ''}
      >
        ▶
      </button>
    `;

    // Attach pagination handlers
    paginationEl.querySelectorAll('.page-button').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const action = e.target.dataset.action;
        if (action === 'prev' && this.currentPage > 1) {
          this.currentPage--;
        } else if (action === 'next' && this.currentPage < totalPages) {
          this.currentPage++;
        }
        this.openItems.clear();
        this.renderFAQ();
      });
    });
  }
}

// Initialize chatbot when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.chatbot = new ChatbotFAQ();
  });
} else {
  window.chatbot = new ChatbotFAQ();
}
