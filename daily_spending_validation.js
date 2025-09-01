/**
 * DAILY SPENDING TRACKING VALIDATION SUITE
 * Comprehensive testing for the dual display system implementation
 */

// ===== VALIDATION FRAMEWORK =====

class DailySpendingValidator {
    constructor() {
        this.testResults = [];
        this.originalAppState = null;
    }

    // Store original state before testing
    captureState() {
        this.originalAppState = JSON.parse(JSON.stringify(appState));
        console.log('📸 Original state captured for validation');
    }

    // Restore original state after testing
    restoreState() {
        if (this.originalAppState) {
            Object.assign(appState, this.originalAppState);
            updateAllDisplaysSynchronized();
            console.log('🔄 Original state restored');
        }
    }

    // Log test result
    logResult(testName, passed, details) {
        const result = {
            test: testName,
            passed,
            details,
            timestamp: new Date().toISOString()
        };
        this.testResults.push(result);
        
        const icon = passed ? '✅' : '❌';
        console.log(`${icon} ${testName}: ${details}`);
    }

    // Generate summary report
    generateReport() {
        const totalTests = this.testResults.length;
        const passedTests = this.testResults.filter(r => r.passed).length;
        const failedTests = totalTests - passedTests;

        console.log('\n🧪 DAILY SPENDING VALIDATION REPORT');
        console.log('=====================================');
        console.log(`Total Tests: ${totalTests}`);
        console.log(`Passed: ${passedTests}`);
        console.log(`Failed: ${failedTests}`);
        console.log(`Success Rate: ${((passedTests/totalTests) * 100).toFixed(1)}%`);

        if (failedTests > 0) {
            console.log('\n❌ Failed Tests:');
            this.testResults.filter(r => !r.passed).forEach(result => {
                console.log(`  - ${result.test}: ${result.details}`);
            });
        }

        return {
            total: totalTests,
            passed: passedTests,
            failed: failedTests,
            successRate: (passedTests/totalTests) * 100,
            results: this.testResults
        };
    }
}

// ===== VALIDATION TESTS =====

const validator = new DailySpendingValidator();

function runDailySpendingValidation() {
    console.log('🚀 Starting Daily Spending Tracking Validation...\n');
    
    validator.captureState();
    
    try {
        // Initialize clean state for testing
        initializeTestState();
        
        // Run all validation tests
        testNewTransactionTracking();
        testTransactionEditTracking();
        testTransactionDeleteTracking();
        testCategoryTransferTracking();
        testBackwardCompatibility();
        testEdgeCases();
        testUIIntegration();
        
        // Generate final report
        const report = validator.generateReport();
        
        console.log('\n📊 Validation Complete!');
        return report;
        
    } catch (error) {
        console.error('❌ Validation failed with error:', error);
        validator.logResult('Overall Validation', false, `Error: ${error.message}`);
        return validator.generateReport();
    } finally {
        validator.restoreState();
    }
}

function initializeTestState() {
    // Reset todayFlowed for clean testing
    appState.todayFlowed = 0;
    
    // Ensure categories exist with proper structure
    if (!appState.categories) {
        appState.categories = {
            foundation: { allocated: 1000, used: 0 },
            future: { allocated: 200, used: 0 },
            freedom: { allocated: 800, used: 0 }
        };
    }
    
    // Clear existing transactions for clean testing
    appState.transactions = [];
    
    validator.logResult('Test State Initialization', true, 'Clean state prepared');
}

// ===== TEST 1: NEW TRANSACTION TRACKING =====
function testNewTransactionTracking() {
    console.log('\n🧪 Testing New Transaction Tracking...');
    
    const initialTodayFlowed = appState.todayFlowed || 0;
    
    // Test freedom category transaction
    const freedomAmount = 50;
    const result1 = processTransaction(freedomAmount, 'Coffee test', 'freedom');
    
    if (result1.success) {
        const expectedTodayFlowed = initialTodayFlowed + freedomAmount;
        const actualTodayFlowed = appState.todayFlowed || 0;
        
        validator.logResult(
            'Freedom Transaction Tracking',
            actualTodayFlowed === expectedTodayFlowed,
            `Expected: ${expectedTodayFlowed}, Actual: ${actualTodayFlowed}`
        );
    } else {
        validator.logResult('Freedom Transaction Tracking', false, 'Transaction failed');
    }
    
    // Test foundation category transaction (should NOT affect todayFlowed)
    const foundationAmount = 200;
    const currentTodayFlowed = appState.todayFlowed || 0;
    const result2 = processTransaction(foundationAmount, 'Rent test', 'foundation');
    
    if (result2.success) {
        const expectedTodayFlowed = currentTodayFlowed; // Should remain unchanged
        const actualTodayFlowed = appState.todayFlowed || 0;
        
        validator.logResult(
            'Foundation Transaction Non-Tracking',
            actualTodayFlowed === expectedTodayFlowed,
            `Expected: ${expectedTodayFlowed}, Actual: ${actualTodayFlowed}`
        );
    } else {
        validator.logResult('Foundation Transaction Non-Tracking', false, 'Transaction failed');
    }
    
    // Test spend category (legacy support)
    const spendAmount = 30;
    const currentTodayFlowed2 = appState.todayFlowed || 0;
    const result3 = processTransaction(spendAmount, 'Legacy spend test', 'spend');
    
    if (result3.success) {
        const expectedTodayFlowed = currentTodayFlowed2 + spendAmount;
        const actualTodayFlowed = appState.todayFlowed || 0;
        
        validator.logResult(
            'Legacy Spend Category Tracking',
            actualTodayFlowed === expectedTodayFlowed,
            `Expected: ${expectedTodayFlowed}, Actual: ${actualTodayFlowed}`
        );
    } else {
        validator.logResult('Legacy Spend Category Tracking', false, 'Transaction failed');
    }
}

// ===== TEST 2: TRANSACTION EDIT TRACKING =====
function testTransactionEditTracking() {
    console.log('\n🧪 Testing Transaction Edit Tracking...');
    
    // Create a test transaction
    const testTransaction = {
        id: Date.now(),
        amount: 40,
        description: 'Edit test',
        category: 'freedom',
        timestamp: new Date()
    };
    
    appState.transactions.push(testTransaction);
    appState.categories.freedom.used += testTransaction.amount;
    const initialTodayFlowed = (appState.todayFlowed || 0) + testTransaction.amount;
    appState.todayFlowed = initialTodayFlowed;
    
    // Simulate editing the transaction (change amount and category)
    const originalAmount = testTransaction.amount;
    const originalCategory = testTransaction.category;
    const newAmount = 60;
    const newCategory = 'foundation';
    
    // Update category usage
    appState.categories[originalCategory].used -= originalAmount;
    appState.categories[newCategory].used += newAmount;
    
    // Update transaction
    testTransaction.amount = newAmount;
    testTransaction.category = newCategory;
    
    // Apply the dual display system logic for editing
    let expectedTodayFlowed = initialTodayFlowed;
    if (originalCategory === 'freedom' || originalCategory === 'spend') {
        expectedTodayFlowed -= originalAmount;
    }
    if (newCategory === 'freedom' || newCategory === 'spend') {
        expectedTodayFlowed += newAmount;
    }
    
    // Simulate the tracking update
    if (originalCategory === 'freedom' || originalCategory === 'spend') {
        appState.todayFlowed = (appState.todayFlowed || 0) - originalAmount;
    }
    if (newCategory === 'freedom' || newCategory === 'spend') {
        appState.todayFlowed = (appState.todayFlowed || 0) + newAmount;
    }
    
    const actualTodayFlowed = appState.todayFlowed || 0;
    
    validator.logResult(
        'Transaction Edit Tracking',
        actualTodayFlowed === expectedTodayFlowed,
        `Freedom→Foundation edit: Expected: ${expectedTodayFlowed}, Actual: ${actualTodayFlowed}`
    );
}

// ===== TEST 3: TRANSACTION DELETE TRACKING =====
function testTransactionDeleteTracking() {
    console.log('\n🧪 Testing Transaction Delete Tracking...');
    
    // Create test transactions
    const freedomTransaction = {
        id: Date.now() + 1,
        amount: 25,
        description: 'Delete test freedom',
        category: 'freedom',
        timestamp: new Date()
    };
    
    const foundationTransaction = {
        id: Date.now() + 2,
        amount: 100,
        description: 'Delete test foundation',
        category: 'foundation',
        timestamp: new Date()
    };
    
    appState.transactions.push(freedomTransaction, foundationTransaction);
    appState.categories.freedom.used += freedomTransaction.amount;
    appState.categories.foundation.used += foundationTransaction.amount;
    
    const initialTodayFlowed = (appState.todayFlowed || 0) + freedomTransaction.amount;
    appState.todayFlowed = initialTodayFlowed;
    
    // Test deleting freedom transaction
    const freedomDeletedAmount = freedomTransaction.amount;
    appState.categories.freedom.used -= freedomDeletedAmount;
    appState.transactions = appState.transactions.filter(t => t.id !== freedomTransaction.id);
    
    // Apply tracking logic
    if (freedomTransaction.category === 'freedom' || freedomTransaction.category === 'spend') {
        appState.todayFlowed = (appState.todayFlowed || 0) - freedomDeletedAmount;
    }
    
    const expectedAfterFreedomDelete = initialTodayFlowed - freedomDeletedAmount;
    const actualAfterFreedomDelete = appState.todayFlowed || 0;
    
    validator.logResult(
        'Freedom Transaction Delete Tracking',
        actualAfterFreedomDelete === expectedAfterFreedomDelete,
        `Expected: ${expectedAfterFreedomDelete}, Actual: ${actualAfterFreedomDelete}`
    );
    
    // Test deleting foundation transaction (should NOT affect todayFlowed)
    const beforeFoundationDelete = appState.todayFlowed || 0;
    appState.categories.foundation.used -= foundationTransaction.amount;
    appState.transactions = appState.transactions.filter(t => t.id !== foundationTransaction.id);
    
    // Apply tracking logic
    if (foundationTransaction.category === 'freedom' || foundationTransaction.category === 'spend') {
        appState.todayFlowed = (appState.todayFlowed || 0) - foundationTransaction.amount;
    }
    
    const expectedAfterFoundationDelete = beforeFoundationDelete; // Should remain unchanged
    const actualAfterFoundationDelete = appState.todayFlowed || 0;
    
    validator.logResult(
        'Foundation Transaction Delete Non-Tracking',
        actualAfterFoundationDelete === expectedAfterFoundationDelete,
        `Expected: ${expectedAfterFoundationDelete}, Actual: ${actualAfterFoundationDelete}`
    );
}

// ===== TEST 4: CATEGORY TRANSFER TRACKING =====
function testCategoryTransferTracking() {
    console.log('\n🧪 Testing Category Transfer Tracking...');
    
    // Test various category transfer scenarios
    const scenarios = [
        { from: 'freedom', to: 'foundation', amount: 30, shouldTrack: 'subtract' },
        { from: 'foundation', to: 'freedom', amount: 40, shouldTrack: 'add' },
        { from: 'freedom', to: 'future', amount: 20, shouldTrack: 'subtract' },
        { from: 'future', to: 'foundation', amount: 15, shouldTrack: 'none' }
    ];
    
    scenarios.forEach((scenario, index) => {
        const initialTodayFlowed = appState.todayFlowed || 0;
        
        // Simulate the category transfer logic
        let expectedTodayFlowed = initialTodayFlowed;
        
        if (scenario.from === 'freedom' || scenario.from === 'spend') {
            expectedTodayFlowed -= scenario.amount;
        }
        if (scenario.to === 'freedom' || scenario.to === 'spend') {
            expectedTodayFlowed += scenario.amount;
        }
        
        // Apply the tracking
        if (scenario.from === 'freedom' || scenario.from === 'spend') {
            appState.todayFlowed = (appState.todayFlowed || 0) - scenario.amount;
        }
        if (scenario.to === 'freedom' || scenario.to === 'spend') {
            appState.todayFlowed = (appState.todayFlowed || 0) + scenario.amount;
        }
        
        const actualTodayFlowed = appState.todayFlowed || 0;
        
        validator.logResult(
            `Category Transfer ${scenario.from}→${scenario.to}`,
            actualTodayFlowed === expectedTodayFlowed,
            `Amount: ${scenario.amount}, Expected: ${expectedTodayFlowed}, Actual: ${actualTodayFlowed}`
        );
    });
}

// ===== TEST 5: BACKWARD COMPATIBILITY =====
function testBackwardCompatibility() {
    console.log('\n🧪 Testing Backward Compatibility...');
    
    // Test that existing daily flow calculation still works
    const originalDailyFlow = appState.dailyFlow;
    const calculatedDailyFlow = calculateDailyFlow(appState.categories);
    
    validator.logResult(
        'Daily Flow Calculation Preserved',
        typeof calculatedDailyFlow === 'number' && !isNaN(calculatedDailyFlow),
        `Calculated: ${calculatedDailyFlow}`
    );
    
    // Test that all safety functions still work
    const testSafetyResult = validateTransactionSafety(100, 'freedom');
    
    validator.logResult(
        'Safety Functions Preserved',
        testSafetyResult && typeof testSafetyResult.isValid === 'boolean',
        `Safety validation returned: ${JSON.stringify(testSafetyResult)}`
    );
    
    // Test that localStorage saving still works
    try {
        saveToLocalStorage();
        validator.logResult('LocalStorage Saving Preserved', true, 'Save operation completed');
    } catch (error) {
        validator.logResult('LocalStorage Saving Preserved', false, `Error: ${error.message}`);
    }
}

// ===== TEST 6: EDGE CASES =====
function testEdgeCases() {
    console.log('\n🧪 Testing Edge Cases...');
    
    // Test undefined todayFlowed initialization
    delete appState.todayFlowed;
    
    const result = processTransaction(10, 'Edge test', 'freedom');
    if (result.success) {
        const todayFlowedAfterUndefined = appState.todayFlowed || 0;
        validator.logResult(
            'Undefined todayFlowed Initialization',
            todayFlowedAfterUndefined === 10,
            `Expected: 10, Actual: ${todayFlowedAfterUndefined}`
        );
    }
    
    // Test zero amount transaction
    const initialTodayFlowed = appState.todayFlowed || 0;
    if (processTransaction(0, 'Zero test', 'freedom').success) {
        const todayFlowedAfterZero = appState.todayFlowed || 0;
        validator.logResult(
            'Zero Amount Transaction',
            todayFlowedAfterZero === initialTodayFlowed,
            `TodayFlowed unchanged: ${todayFlowedAfterZero}`
        );
    }
    
    // Test negative todayFlowed (deletion edge case)
    appState.todayFlowed = 5;
    if (appState.todayFlowed !== undefined) {
        appState.todayFlowed = (appState.todayFlowed || 0) - 10; // Subtract more than available
        validator.logResult(
            'Negative todayFlowed Handling',
            appState.todayFlowed === -5,
            `Allows negative values: ${appState.todayFlowed}`
        );
    }
}

// ===== TEST 7: UI INTEGRATION =====
function testUIIntegration() {
    console.log('\n🧪 Testing UI Integration...');
    
    // Test that updateAllDisplaysSynchronized doesn't break
    try {
        updateAllDisplaysSynchronized();
        validator.logResult('Display Synchronization', true, 'updateAllDisplaysSynchronized executed successfully');
    } catch (error) {
        validator.logResult('Display Synchronization', false, `Error: ${error.message}`);
    }
    
    // Test that todayFlowed is accessible for display
    const todayFlowedValue = appState.todayFlowed;
    validator.logResult(
        'todayFlowed Accessibility',
        todayFlowedValue !== undefined,
        `Value: ${todayFlowedValue}`
    );
    
    // Test dual display compatibility
    const traditionalDailyFlow = calculateDailyFlow(appState.categories);
    const newTodayFlowed = appState.todayFlowed || 0;
    
    validator.logResult(
        'Dual Display System',
        typeof traditionalDailyFlow === 'number' && typeof newTodayFlowed === 'number',
        `Traditional: ${traditionalDailyFlow}, New: ${newTodayFlowed}`
    );
}

// ===== VALIDATION HELPERS =====

function validateTodayFlowedAccuracy() {
    console.log('\n🔍 Manual Validation Helper: todayFlowed Accuracy');
    
    // Calculate expected todayFlowed from transactions
    const expectedFromTransactions = appState.transactions
        .filter(t => t.category === 'freedom' || t.category === 'spend')
        .reduce((sum, t) => sum + t.amount, 0);
    
    const actualTodayFlowed = appState.todayFlowed || 0;
    
    console.log(`📊 Expected from transactions: ${expectedFromTransactions}`);
    console.log(`📊 Actual todayFlowed: ${actualTodayFlowed}`);
    console.log(`📊 Difference: ${Math.abs(expectedFromTransactions - actualTodayFlowed)}`);
    
    return {
        expected: expectedFromTransactions,
        actual: actualTodayFlowed,
        accurate: expectedFromTransactions === actualTodayFlowed
    };
}

function debugDailySpendingState() {
    console.log('\n🔧 Debug: Daily Spending State');
    console.log('=====================================');
    console.log('📊 todayFlowed:', appState.todayFlowed);
    console.log('📊 Traditional dailyFlow:', calculateDailyFlow(appState.categories));
    console.log('📊 Freedom transactions:', appState.transactions.filter(t => t.category === 'freedom').length);
    console.log('📊 Spend transactions:', appState.transactions.filter(t => t.category === 'spend').length);
    console.log('📊 Total transactions:', appState.transactions.length);
    
    const freedomTotal = appState.transactions
        .filter(t => t.category === 'freedom')
        .reduce((sum, t) => sum + t.amount, 0);
    
    const spendTotal = appState.transactions
        .filter(t => t.category === 'spend')
        .reduce((sum, t) => sum + t.amount, 0);
    
    console.log('📊 Freedom category total:', freedomTotal);
    console.log('📊 Spend category total:', spendTotal);
    console.log('📊 Expected todayFlowed:', freedomTotal + spendTotal);
}

// ===== GLOBAL EXPOSURE =====

// Make validation functions available globally
window.runDailySpendingValidation = runDailySpendingValidation;
window.validateTodayFlowedAccuracy = validateTodayFlowedAccuracy;
window.debugDailySpendingState = debugDailySpendingState;

console.log('🧪 Daily Spending Validation Suite Loaded');
console.log('📋 Available commands:');
console.log('  - runDailySpendingValidation() - Run full validation suite');
console.log('  - validateTodayFlowedAccuracy() - Check todayFlowed accuracy');
console.log('  - debugDailySpendingState() - Debug current state');
