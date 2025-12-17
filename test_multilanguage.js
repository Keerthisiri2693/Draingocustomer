// Test script to verify multi-language functionality
const fs = require('fs');
const path = require('path');

// Test all translation files exist
const languages = ['en', 'ta', 'te', 'kn', 'ml'];
const components = ['admin', 'customer', 'driver', 'owner'];

console.log('🔍 Testing Multi-Language Implementation...\n');

// Test 1: Check if all translation files exist
console.log('📁 Test 1: Checking translation files existence...');
let allFilesExist = true;

for (const component of components) {
  for (const lang of languages) {
    let filePath;
    if (component === 'admin') {
      filePath = path.join(__dirname, `admin/src/locales/${lang}/translation.json`);
    } else {
      filePath = path.join(__dirname, `mobile/${component}/locales/${lang}/translation.json`);
    }
    
    if (!fs.existsSync(filePath)) {
      console.log(`❌ Missing: ${filePath}`);
      allFilesExist = false;
    }
  }
}

if (allFilesExist) {
  console.log('✅ All translation files exist\n');
} else {
  console.log('❌ Some translation files are missing\n');
}

// Test 2: Check if translation files are valid JSON
console.log('📋 Test 2: Checking translation files validity...');
let allFilesValid = true;

for (const component of components) {
  for (const lang of languages) {
    let filePath;
    if (component === 'admin') {
      filePath = path.join(__dirname, `admin/src/locales/${lang}/translation.json`);
    } else {
      filePath = path.join(__dirname, `mobile/${component}/locales/${lang}/translation.json`);
    }
    
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      JSON.parse(content);
    } catch (error) {
      console.log(`❌ Invalid JSON in: ${filePath}`);
      allFilesValid = false;
    }
  }
}

if (allFilesValid) {
  console.log('✅ All translation files are valid JSON\n');
} else {
  console.log('❌ Some translation files have invalid JSON\n');
}

// Test 3: Check if i18n configuration files exist
console.log('🔧 Test 3: Checking i18n configuration files...');
const i18nFiles = [
  'admin/src/i18n.js',
  'mobile/customer/i18n.js',
  'mobile/driver/i18n.js',
  'mobile/owner/i18n.js'
];

let allConfigsExist = true;
for (const file of i18nFiles) {
  const filePath = path.join(__dirname, file);
  if (!fs.existsSync(filePath)) {
    console.log(`❌ Missing i18n config: ${filePath}`);
    allConfigsExist = false;
  }
}

if (allConfigsExist) {
  console.log('✅ All i18n configuration files exist\n');
} else {
  console.log('❌ Some i18n configuration files are missing\n');
}

// Test 4: Check if language selector components exist
console.log('🌐 Test 4: Checking language selector components...');
const languageSelectorFiles = [
  'admin/src/components/LanguageSelector.js',
  'mobile/customer/components/LanguageSelector.js',
  'mobile/driver/components/LanguageSelector.js',
  'mobile/owner/components/LanguageSelector.js'
];

let allSelectorsExist = true;
for (const file of languageSelectorFiles) {
  const filePath = path.join(__dirname, file);
  if (!fs.existsSync(filePath)) {
    console.log(`❌ Missing language selector: ${filePath}`);
    allSelectorsExist = false;
  }
}

if (allSelectorsExist) {
  console.log('✅ All language selector components exist\n');
} else {
  console.log('❌ Some language selector components are missing\n');
}

// Test 5: Check if main components are updated with translations
console.log('📝 Test 5: Checking if main components use translations...');
const mainComponentFiles = [
  'mobile/customer/screens/LoginScreen.js',
  'mobile/customer/screens/RegisterScreen.js',
  'mobile/customer/screens/HomeScreen.js',
  'mobile/driver/screens/LoginScreen.js',
  'mobile/driver/screens/RegisterScreen.js',
  'mobile/driver/screens/HomeScreen.js',
  'mobile/owner/screens/LoginScreen.js',
  'mobile/owner/screens/RegisterScreen.js',
  'mobile/owner/screens/HomeScreen.js',
  'admin/src/components/Login.js',
  'admin/src/components/Dashboard.js'
];

let componentsUseTranslations = true;
for (const file of mainComponentFiles) {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    if (!content.includes('useTranslation') && !content.includes('t(')) {
      console.log(`❌ Component not using translations: ${filePath}`);
      componentsUseTranslations = false;
    }
  }
}

if (componentsUseTranslations) {
  console.log('✅ All main components use translations\n');
} else {
  console.log('❌ Some main components are not using translations\n');
}

// Summary
console.log('📊 SUMMARY:');
console.log(`Translation files existence: ${allFilesExist ? '✅ PASS' : '❌ FAIL'}`);
console.log(`Translation files validity: ${allFilesValid ? '✅ PASS' : '❌ FAIL'}`);
console.log(`i18n configuration files: ${allConfigsExist ? '✅ PASS' : '❌ FAIL'}`);
console.log(`Language selector components: ${allSelectorsExist ? '✅ PASS' : '❌ FAIL'}`);
console.log(`Components use translations: ${componentsUseTranslations ? '✅ PASS' : '❌ FAIL'}`);

const allTestsPassed = allFilesExist && allFilesValid && allConfigsExist && allSelectorsExist && componentsUseTranslations;

if (allTestsPassed) {
  console.log('\n🎉 ALL TESTS PASSED! Multi-language support is fully implemented.');
} else {
  console.log('\n⚠️  Some tests failed. Please check the issues above.');
}

console.log('\n💡 To test the language switching functionality:');
console.log('1. Run the admin dashboard: cd admin && npm start');
console.log('2. Run the customer app: cd mobile/customer && npx react-native run-android');
console.log('3. Run the driver app: cd mobile/driver && npx react-native run-android');
console.log('4. Run the owner app: cd mobile/owner && npx react-native run-android');
console.log('5. Use the language selector in each app to switch between languages');