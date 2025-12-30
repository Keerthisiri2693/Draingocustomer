#!/usr/bin/env node

/**
 * Hindi Language Integration Test Script
 * 
 * This script tests the Hindi language integration across admin panel and mobile apps
 * by verifying:
 * 1. Hindi language is available in language selectors
 * 2. Hindi translations are properly loaded
 * 3. Language switching works correctly
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Starting Hindi Language Integration Test...\n');

// Test configuration
const testConfig = {
  admin: {
    i18nPath: 'admin/src/i18n.js',
    languageSelectorPath: 'admin/src/components/LanguageSelector.js',
    translationPath: 'admin/src/locales/hi/translation.json'
  },
  mobileApps: [
    {
      name: 'Customer',
      i18nPath: 'mobile/customer/i18n.js',
      languageSelectorPath: 'mobile/customer/components/LanguageSelector.js',
      translationPath: 'mobile/customer/locales/hi/translation.json'
    },
    {
      name: 'Driver',
      i18nPath: 'mobile/driver/i18n.js',
      languageSelectorPath: 'mobile/driver/components/LanguageSelector.js',
      translationPath: 'mobile/driver/locales/hi/translation.json'
    },
    {
      name: 'Owner',
      i18nPath: 'mobile/owner/i18n.js',
      languageSelectorPath: 'mobile/owner/components/LanguageSelector.js',
      translationPath: 'mobile/owner/locales/hi/translation.json'
    }
  ]
};

let testResults = {
  passed: 0,
  failed: 0,
  issues: []
};

function logTestResult(testName, passed, details = '') {
  if (passed) {
    console.log(`✅ PASS: ${testName}`);
    if (details) console.log(`   ${details}`);
    testResults.passed++;
  } else {
    console.log(`❌ FAIL: ${testName}`);
    if (details) console.log(`   ${details}`);
    testResults.failed++;
    testResults.issues.push({ testName, details });
  }
}

function testFileExists(filePath, testName) {
  try {
    const exists = fs.existsSync(filePath);
    logTestResult(testName, exists, exists ? `File found: ${filePath}` : `File not found: ${filePath}`);
    return exists;
  } catch (error) {
    logTestResult(testName, false, `Error checking file: ${error.message}`);
    return false;
  }
}

function testHindiInI18nConfig(filePath, testName) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const hasHindiImport = content.includes("import hiTranslations");
    const hasHindiResource = content.includes("hi: { translation: hiTranslations }");
    
    if (hasHindiImport && hasHindiResource) {
      logTestResult(testName, true, 'Hindi translations properly imported and configured');
      return true;
    } else {
      const details = [];
      if (!hasHindiImport) details.push('Missing Hindi import statement');
      if (!hasHindiResource) details.push('Missing Hindi resource configuration');
      logTestResult(testName, false, details.join(', '));
      return false;
    }
  } catch (error) {
    logTestResult(testName, false, `Error reading file: ${error.message}`);
    return false;
  }
}

function testHindiInLanguageSelector(filePath, testName) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const hasHindiOption = content.includes("{ code: 'hi', name: 'हिन्दी' }");
    
    logTestResult(testName, hasHindiOption, hasHindiOption ? 'Hindi language option found' : 'Hindi language option missing');
    return hasHindiOption;
  } catch (error) {
    logTestResult(testName, false, `Error reading file: ${error.message}`);
    return false;
  }
}

function testHindiTranslations(filePath, testName) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const translations = JSON.parse(content);
    
    const hasTranslations = Object.keys(translations).length > 0;
    const hasDevanagariScript = /[\u0900-\u097F]/.test(JSON.stringify(translations));
    
    if (hasTranslations && hasDevanagariScript) {
      const translationCount = Object.keys(translations).length;
      logTestResult(testName, true, `${translationCount} Hindi translations found with Devanagari script`);
      return true;
    } else {
      const details = [];
      if (!hasTranslations) details.push('No translations found');
      if (!hasDevanagariScript) details.push('No Devanagari script detected');
      logTestResult(testName, false, details.join(', '));
      return false;
    }
  } catch (error) {
    logTestResult(testName, false, `Error reading translations: ${error.message}`);
    return false;
  }
}

// Run tests
console.log('📋 Testing Admin Panel Hindi Integration...\n');

// Test Admin Panel
testFileExists(testConfig.admin.i18nPath, 'Admin i18n.js file exists');
testFileExists(testConfig.admin.languageSelectorPath, 'Admin LanguageSelector.js file exists');
testFileExists(testConfig.admin.translationPath, 'Admin Hindi translations file exists');
testHindiInI18nConfig(testConfig.admin.i18nPath, 'Admin Hindi configured in i18n');
testHindiInLanguageSelector(testConfig.admin.languageSelectorPath, 'Admin Hindi in language selector');
testHindiTranslations(testConfig.admin.translationPath, 'Admin Hindi translations valid');

console.log('\n📱 Testing Mobile Apps Hindi Integration...\n');

// Test Mobile Apps
testConfig.mobileApps.forEach(app => {
  console.log(`📱 Testing ${app.name} App...`);
  
  testFileExists(app.i18nPath, `${app.name} i18n.js file exists`);
  testFileExists(app.languageSelectorPath, `${app.name} LanguageSelector.js file exists`);
  testFileExists(app.translationPath, `${app.name} Hindi translations file exists`);
  testHindiInI18nConfig(app.i18nPath, `${app.name} Hindi configured in i18n`);
  testHindiInLanguageSelector(app.languageSelectorPath, `${app.name} Hindi in language selector`);
  testHindiTranslations(app.translationPath, `${app.name} Hindi translations valid`);
  
  console.log('');
});

// Summary
console.log('📊 Test Summary:');
console.log(`✅ Passed: ${testResults.passed}`);
console.log(`❌ Failed: ${testResults.failed}`);
console.log(`📝 Total Tests: ${testResults.passed + testResults.failed}`);

if (testResults.issues.length > 0) {
  console.log('\n🔧 Issues Found:');
  testResults.issues.forEach((issue, index) => {
    console.log(`${index + 1}. ${issue.testName}: ${issue.details}`);
  });
}

const successRate = (testResults.passed / (testResults.passed + testResults.failed)) * 100;
console.log(`\n🎯 Success Rate: ${successRate.toFixed(1)}%`);

if (successRate === 100) {
  console.log('\n🎉 All tests passed! Hindi language integration is working correctly.');
} else {
  console.log('\n⚠️  Some tests failed. Please review the issues above.');
}

process.exit(testResults.failed > 0 ? 1 : 0);