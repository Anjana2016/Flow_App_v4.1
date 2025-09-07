# DATA MODEL SPECIFICATION
*Flow App v4.3 - Enhanced with Flexible Period System*

---

## 1. DATA ARCHITECTURE OVERVIEW

### Storage Strategy
- **Primary Storage**: Browser localStorage with JSON serialization
- **🆕 v4.3 Data Key**: `flowAppData_v4_3` - separate namespace for flexible period system
- **Legacy Compatibility**: v4.2 data preserved in `flowBudgeting_v3` for safe migration
- **Persistence Model**: Local-first architecture with zero server dependency
- **Backup Strategy**: Automatic save every 30 seconds + on user actions
- **Data Ownership**: Complete user control with offline-first design

### 🆕 v4.3 Enhanced Design Principles
- **Privacy by Design**: No personal data transmission or external storage
- **Mathematical Integrity**: Precise financial calculations with period-aware state
- **Graceful Degradation**: Robust handling of corrupted or missing data
- **Cross-Tab Synchronization**: Real-time state updates across interface elements
- **🆕 Period-Aware Migration**: Automatic v4.2 to v4.3 data transition with namespace separation
- **🆕 Multi-Period Support**: Data structure supports weekly, bi-weekly, and monthly cycles

---

## 2. PRIMARY APPLICATION STATE

### 🆕 v4.3 Enhanced Root Data Structure
```json
{
  "version": "4.3",
  "dataNamespace": "flowAppData_v4_3",
  "monthlyIncome": 3200,
  "onboardingComplete": true,
  "userProfile": "serious",
  
  "🆕 periodConfig": {
    "type": "monthly",              "// weekly, biweekly, monthly"
    "length": 30,                   "// 7, 14, or 30 days"
    "startDate": "2025-09-15",      "// User selected start date (YYYY-MM-DD)"
    "incomeAmount": 3200,           "// Period-based income amount"
    "lastReset": null,              "// When period was last reset"
    "nextReset": "2025-10-15"       "// When next reset is scheduled"
  },
  
  "currentPeriod": "2025-09",
  "periodHistory": [],
  "categories": { "/* Flow Method allocation data */" },
  "transactions": [ "/* Transaction history array */" ],
  "achievements": { "/* Achievement system data */" },
  "budgetState": { "/* Budget calculation state */" },
  "dailyFlow": 42.67,
  "dailyFlowAmount": 42.67,
  "todayFlowed": 0,
  "daysInMonth": 31,
  "currentDay": 15,
  "allocations": { "/* Percentage allocations */" },
  "allocationState": { "/* Advanced allocation management */" }
}
```

### 🆕 v4.3 Period Configuration Details
The `periodConfig` object is the core innovation of v4.3, enabling flexible budget cycles:

#### Period Types
- **`type: "weekly"`** - 7-day cycles, perfect for gig work and part-time employment
- **`type: "biweekly"`** - 14-day cycles, most common for full-time employment  
- **`type: "monthly"`** - 30-day cycles, traditional salary with custom start dates

#### Key Properties
- **`length`**: Number of days in each period (7, 14, or 30)
- **`startDate`**: User-selected start date in YYYY-MM-DD format, enabling payday alignment
- **`incomeAmount`**: Total income for the period (replaces monthlyIncome for calculations)
- **`lastReset`**: Timestamp of last period transition for rollover logic
- **`nextReset`**: Calculated next period start date for user preview

---

## 3. FLOW METHOD CATEGORIES

### Category Data Schema
```typescript
interface FlowCategory {
  allocated: number;     // Monthly allocation in dollars
  used: number;         // Amount spent this month
  percentage: number;   // Allocation percentage (0-100)
  description?: string; // UI display text
}

interface Categories {
  foundation: FlowCategory;
  future: FlowCategory;
  freedom: FlowCategory;
}
```

### Foundation Category
```json
"foundation": {
  "allocated": 1760,
  "used": 1680,
  "percentage": 55,
  "description": "Building unshakeable confidence 💪"
}
```
- **Purpose**: Essential expenses and emergency cushion
- **Range**: 30-80% of monthly income
- **Tracking**: Does not affect dailyFlow calculations
- **Emoji**: 🛡️

### Future Category
```json
"future": {
  "allocated": 160,
  "used": 0,
  "percentage": 5,
  "description": "Your future-you is going to love this 🚀"
}
```
- **Purpose**: Wealth building and goal achievement
- **Range**: 0-30% of monthly income
- **Tracking**: Does not affect dailyFlow calculations
- **Emoji**: 🌱

### Freedom Category
```json
"freedom": {
  "allocated": 1280,
  "used": 384,
  "percentage": 40,
  "description": "Pure guilt-free spending power ✨"
}
```
- **Purpose**: Daily spending without stress or calculation
- **Range**: 15-70% of monthly income
- **Tracking**: Directly affects dailyFlow and todayFlowed calculations
- **Emoji**: 💚

---

## 4. TRANSACTION MANAGEMENT SYSTEM

### Transaction Schema
```typescript
interface Transaction {
  id: string;           // Unique identifier (timestamp-based)
  amount: number;       // Transaction amount in dollars
  description: string;  // User-provided description
  category: string;     // Category: 'foundation', 'future', 'freedom', 'spend'
  timestamp: Date;      // Transaction creation time
  type?: string;        // Transaction type (default: 'expense')
}
```

### Transaction Array Structure
```json
"transactions": [
  {
    "id": "tx_1703876543210",
    "amount": 15,
    "description": "Coffee",
    "category": "freedom",
    "timestamp": "2024-12-29T10:30:00.000Z",
    "type": "expense"
  },
  {
    "id": "tx_1703876543211", 
    "amount": 800,
    "description": "Rent",
    "category": "foundation",
    "timestamp": "2024-12-01T09:00:00.000Z",
    "type": "expense"
  }
]
```

### Daily Spending Tracking Rules
- **Freedom Transactions**: Update `todayFlowed` counter
- **Spend Transactions**: Legacy support - also update `todayFlowed`
- **Foundation/Future Transactions**: No impact on dailyFlow calculations
- **Category Transfers**: Properly handle todayFlowed adjustments

---

## 5. USER PROFILE CONFIGURATION

### User Profile Schema
```json
"userProfile": {
  "userName": "Flow User",
  "monthlyIncome": 3200,
  "savingsProfile": "serious",
  "primaryGoal": "stress-reduction",
  "selectedHabits": ["mindful-spending", "weekly-check-ins"],
  "onboardingCompleted": true,
  "setupCompleted": true,
  "lastUpdated": 1703876543210
}
```

### Savings Profile Types
- **starting**: 5% savings rate, optimized for habit building
- **serious**: 10% savings rate, balanced growth approach  
- **wealth**: 20% savings rate, aggressive wealth building
- **balanced**: 15% savings rate, sustainable growth focus

---

## 6. ACHIEVEMENT SYSTEM DATA

### Achievement Categories Structure
```json
"achievements": {
  "onboardingComplete": true,
  "welcomeShown": false,
  "currentXP": 0,
  "currentLevel": 1,
  "levelName": "Financial Glow-Up Beginner",
  "avatar": "🌱",
  "badges": [],
  "streaks": {
    "dailyFlow": {
      "current": 0,
      "longest": 0,
      "graceUsed": 0,
      "graceRemaining": 2,
      "lastActivity": null
    },
    "mindfulSpending": {
      "current": 0,
      "longest": 0,
      "pauseAndThinkCount": 0
    },
    "savingsContribution": {
      "current": 0,
      "longest": 0,
      "monthlyContributions": 0
    }
  },
  "engagementXP": {
    "total": 0,
    "budgetAdherence": 0,
    "smartChoices": 0,
    "realMoneyBuilt": 0,
    "lastUpdated": 1703876543210
  }
}
```

### XP Categories
- **Smart Choices**: Mindful spending habits and decision-making
- **Flow Mastery**: Mastery of Flow Method allocation optimization
- **Real Money Built**: Actual dollars toward financial freedom

---

## 7. BUDGET STATE MANAGEMENT

### Budget State Schema
```json
"budgetState": {
  "dailyFlow": 42.67,
  "dailyFlowAmount": 42.67,
  "dailyFlowFixed": null,
  "todayFlowed": 0,
  "lastDayStart": null,
  "isActiveSession": false,
  "daysInMonth": 31,
  "currentDay": 15,
  "categories": {
    "foundation": { "allocated": 1760, "used": 0, "percentage": 55 },
    "future": { "allocated": 160, "used": 0, "percentage": 5 },
    "freedom": { "allocated": 1280, "used": 0, "percentage": 40 }
  }
}
```

### Daily Flow Calculation - Dual Display System
```javascript
// Traditional Flow Method calculation (base)
baseDailyFlow = (monthlyIncome * freedomPercentage / 100) / daysInMonth

// NEW: Dual Display Properties for Real-time Countdown
dailyFlowState = {
  // Today's flow tracking
  todayFlowed: 25,                    // Amount spent during current calendar day
  dailyFlowFixed: baseDailyFlow,     // Today's assigned flow (set once per day)  
  lastDayStart: timestamp,           // When current day's flow was assigned
  
  // User display calculation (countdown behavior)
  remainingToday: Math.max(0, dailyFlowFixed - todayFlowed),
  displayAmount: remainingToday,     // Decreases with spending, resets daily
  
  // Tomorrow's projection (includes today's impact)
  tomorrowFlow: (monthlyIncome * freedomPercentage / 100 - totalMonthSpent - todayFlowed) / (daysRemaining - 1)
}

// Key Behavior: Display decreases throughout day, recalculates at daily reset
```

### Session Management
- **Active Session**: Tracks user engagement periods
- **Session Extension**: 15-minute activity-based extension
- **Session Cleanup**: Automatic session end on inactivity

---

## 8. ALLOCATION STATE SYSTEM

### Allocation Configuration
```json
"allocationState": {
  "foundation": 55,
  "future": 5, 
  "freedom": 40,
  "originalAllocations": {
    "foundation": 55,
    "future": 5,
    "freedom": 40
  }
}
```

### Allocation Rules & Constraints
- **Foundation Range**: 30% - 80% of income
- **Future Range**: 0% - 30% of income  
- **Freedom Calculation**: Auto-calculated as remainder (100% - Foundation% - Future%)
- **Validation**: Real-time constraint enforcement during slider interaction
- **Preview System**: Two-phase UX with preview before confirmation

---

## 9. EDUCATIONAL SYSTEM DATA

### Educational Progress Tracking
```json
"educational": {
  "completedModules": [],
  "appliedLearnings": [],
  "compoundInterestGoals": {
    "tenYearPlan": null,
    "calculatorUsage": 0,
    "goalsSet": 0
  },
  "psychologyOfMoneyProgress": {
    "conceptsLearned": [],
    "conceptsApplied": [],
    "triggerIdentification": []
  },
  "currentModule": null,
  "learningStreak": 0,
  "helpIconUsage": {},
  "coachingPreferences": {
    "enabled": true,
    "frequency": "smart"
  },
  "completedModals": []
}
```

### Smart Layered Education System (SLES)
- **Progressive Disclosure**: Content revealed based on user interaction patterns
- **Context-Aware Help**: Educational content triggered by user behavior
- **Learning Streak Tracking**: Engagement measurement and milestone recognition
- **Applied Learning Validation**: Real behavior change verification

---

## 10. PERIOD MANAGEMENT & HISTORY

### Period Tracking Structure
```json
"currentPeriod": "2024-12",
"periodHistory": [
  {
    "period": "2024-11",
    "totalIncome": 3200,
    "totalSpent": 2890,
    "categoryBreakdown": {
      "foundation": { "allocated": 1760, "used": 1680 },
      "future": { "allocated": 160, "used": 160 },
      "freedom": { "allocated": 1280, "used": 1050 }
    },
    "achievementsEarned": ["first_month_complete"],
    "milestones": ["Built real wealth: $160"]
  }
]
```

### Monthly Rollover Logic
- **Period Transition**: Automatic monthly boundaries (YYYY-MM format)
- **Carryover Calculations**: Unused allocations handling
- **Achievement Preservation**: Historical achievement data maintenance
- **Data Archival**: Previous month data moved to periodHistory

---

## 11. DATA VALIDATION & INTEGRITY

### Input Validation Rules
```typescript
interface ValidationRules {
  monthlyIncome: {
    min: 100,           // Minimum viable income
    max: 1000000,       // Reasonable maximum
    type: 'number'
  },
  transactionAmount: {
    min: 0.01,          // Minimum transaction
    max: 10000,         // Reasonable transaction limit
    precision: 2        // Decimal places
  },
  percentageAllocations: {
    foundation: { min: 30, max: 80 },
    future: { min: 0, max: 30 },
    freedom: { min: 15, max: 70 }
  }
}
```

### Mathematical Integrity Checks
- **Allocation Sum Validation**: Foundation% + Future% + Freedom% = 100%
- **Category Balance Verification**: allocated ≥ used for all categories
- **Transaction Amount Precision**: Consistent decimal handling (2 places)
- **Daily Flow Accuracy**: todayFlowed ≤ dailyFlow * daysElapsed

---

## 12. MIGRATION & VERSIONING

### Version Management Strategy
```json
{
  "dataVersion": "v4.2",
  "migrationHistory": [],
  "compatibilityFlags": {
    "legacySpendCategory": true,
    "dualDisplaySystem": true,
    "enhancedAchievements": true
  }
}
```

### Migration Support
- **Legacy Spend Category**: Backward compatibility for 'spend' transactions
- **Data Structure Evolution**: Graceful handling of schema changes  
- **Feature Flag System**: Progressive feature rollout capability
- **Corruption Recovery**: Fallback to default state with user notification

---

## 13. PERFORMANCE CONSIDERATIONS

### Data Optimization Techniques
- **JSON Serialization**: Efficient localStorage read/write operations
- **Lazy Loading**: On-demand data structure initialization
- **Memory Management**: Proper cleanup of unused data references
- **Update Batching**: Grouped state updates to minimize localStorage writes

### Storage Efficiency
```javascript
// Optimized data structure size
const estimatedDataSize = {
  baseStructure: "~5KB",
  transactionsPer100: "~8KB", 
  achievementData: "~3KB",
  educationalProgress: "~4KB",
  totalEstimate: "~20KB per user"
};
```

---

## 14. SECURITY & PRIVACY MODEL

### Data Protection Features
- **Local-Only Storage**: Zero external data transmission
- **No Personal Identifiers**: Anonymous usage patterns
- **User Data Ownership**: Complete user control over data
- **Encryption**: Browser-level security for localStorage
- **No Tracking**: Zero analytics or behavioral monitoring

### Privacy by Design Implementation
- **Minimal Data Collection**: Only essential financial calculation data
- **Data Minimization**: No unnecessary personal information storage
- **User Consent**: Transparent data usage policies
- **Right to Deletion**: Easy data clearing and reset functionality

---

*This data model serves as the comprehensive blueprint for Flow App's data architecture, ensuring consistent implementation across all features while maintaining mathematical accuracy and user privacy.*
