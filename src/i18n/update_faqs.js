// Script to add FAQ placeholder to remaining language files
const fs = require('fs');

const languages = ['es', 'hi', 'fr', 'ar', 'bn', 'pt', 'ru', 'id'];

const faqTemplate = `  },
  chatbot: {
    title: 'FAQ',
    categories: {
      overview: 'Service Overview',
      medical: 'Medical Tourism',
      hanyang: 'Traditional Medicine',
      travel: 'Travel & Care'
    },
    faq: [
      // TODO: Professional translation needed - Using English temporarily
      { q: 'What is this platform?', a: 'A free platform combining Korean learning and medical tourism.' },
      { q: 'Is it really free?', a: 'Yes, completely free.' },
      { q: 'Any hidden costs?', a: 'No hidden costs.' }
      // ... Add full 50 FAQ items with proper translation
    ]
  },
  common: {`;

console.log('FAQ template ready for manual insertion');
console.log('Files to update:', languages.map(l => l + '.ts').join(', '));
