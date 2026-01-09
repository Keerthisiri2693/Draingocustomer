// Test script to verify driver app i18n functionality
import i18n from './mobile/driver/i18n.js';

console.log('Testing Driver App i18n functionality...\n');

// Test initial language
console.log('Initial language:', i18n.language);
console.log('Home translation:', i18n.t('home'));
console.log('Language translation:', i18n.t('language'));

// Test language change
console.log('\nChanging language to Hindi...');
i18n.changeLanguage('hi');
console.log('Current language:', i18n.language);
console.log('Home translation:', i18n.t('home'));
console.log('Language translation:', i18n.t('language'));

// Test some driver-specific translations
console.log('\nTesting driver-specific translations:');
console.log('Active:', i18n.t('active'));
console.log('Pending Orders:', i18n.t('pendingOrders'));
console.log('Accept:', i18n.t('accept'));
console.log('Order Details:', i18n.t('orderDetails'));

// Test language change to Tamil
console.log('\nChanging language to Tamil...');
i18n.changeLanguage('ta');
console.log('Current language:', i18n.language);
console.log('Home translation:', i18n.t('home'));
console.log('Active:', i18n.t('active'));
console.log('Pending Orders:', i18n.t('pendingOrders'));

console.log('\n✅ Driver app i18n functionality test completed!');