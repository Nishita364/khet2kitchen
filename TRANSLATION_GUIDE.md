# 🌍 Khet2Kitchen Translation System

## Overview
Complete multi-language support with separate translation files for each language covering the ENTIRE project.

## Supported Languages

1. **English (en)** - Default
2. **Hindi (hi)** - हिंदी
3. **Telugu (te)** - తెలుగు
4. **Tamil (ta)** - தமிழ்

## File Structure

```
src/
├── lib/
│   └── translations/
│       ├── en.tsx      # English translations (COMPLETE)
│       ├── hi.tsx      # Hindi translations (COMPLETE)
│       ├── te.tsx      # Telugu translations (COMPLETE)
│       ├── ta.tsx      # Tamil translations (COMPLETE)
│       └── index.tsx   # Export all translations
└── context/
    └── language-provider.tsx  # Language context provider
```

## How It Works

### 1. Language Provider
Wraps the entire app in `src/app/layout.tsx`:
```tsx
<LanguageProvider>
  {children}
</LanguageProvider>
```

### 2. Using Translations in Components
```tsx
import { useLanguage } from '@/context/language-provider';

function MyComponent() {
  const { t, language, setLanguage } = useLanguage();
  
  return (
    <div>
      <h1>{t.landing.title}</h1>
      <p>{t.landing.subtitle}</p>
    </div>
  );
}
```

### 3. Changing Language
```tsx
const { setLanguage } = useLanguage();

// Change to Hindi
setLanguage('hi');

// Change to Telugu
setLanguage('te');

// Change to Tamil
setLanguage('ta');
```

## Translation Keys Structure

```typescript
{
  landing: { title, subtitle, getStarted, copyright },
  language: { welcome, selectLanguage, chooseLanguage, selectPreferred },
  welcome: {
    title, selectRole,
    farmer: { title, description, button },
    company: { title, description, button },
    consumer: { title, description, button },
  },
  login: {
    farmerPortal, companyPortal, consumerPortal,
    credentials, email, password, phone, otp,
    loginEmail, loginPhone, loggingIn, or,
    google, facebook, loginSuccess, welcomeRedirect,
  },
  common: {
    save, cancel, edit, delete, add, submit,
    loading, search, filter, logout, settings,
    support, myAccount, saveChanges, allRightsReserved,
  },
  farmer: {
    // Dashboard
    dashboard, myCrops, cropsOverview, addCrop, editCrop,
    
    // Crop Management
    cropName, plantedDate, expectedYield, status,
    planting, growing, harvested, cropAdded, cropUpdated,
    
    // Farm Details
    farmDetails, irrigationType, soilType, currentCrop,
    acreage, sowingDate, harvestDate, lastSownCrop,
    farmDetailsSaved, saveDetails,
    
    // Financial Summary
    financialSummary, selectCrop, seedsCost, fertilizer,
    pesticides, laborCost, otherCosts, loanInterest,
    totalYield, pricePerKg, totalIncome, totalCost,
    netIncome, financialsSaved, saveFinancials,
    
    // Navigation
    aiPricing, incomingOrders, myGradedProduce,
    marketInsights, marketDemand, community,
    nutrientRecommendation, pestDiseaseControl,
    weatherForecast, feedback, farmerAccount,
  },
  company: {
    dashboard, availableProduce, produceGrading,
    commodityPricing, marketInsights, sourcingBreakdown,
    revenueBreakdown, orders, farmerData, community,
    feedback, complaintRedressal, companyAccount,
  },
  consumer: {
    marketplace, myOrders, favorites, feedback,
    cart, checkout, addToCart, viewCart,
    emptyCart, continueShopping,
  },
  table: {
    cropName, plantedDate, expectedYield, status, actions,
  },
}
```

## Adding New Translations

### Step 1: Add to English file (en.tsx)
```tsx
export const en = {
  // ... existing translations
  newSection: {
    newKey: "New English Text",
  }
};
```

### Step 2: Add to all other language files
```tsx
// hi.tsx
newSection: {
  newKey: "नया हिंदी पाठ",
}

// te.tsx
newSection: {
  newKey: "కొత్త తెలుగు వచనం",
}

// ta.tsx
newSection: {
  newKey: "புதிய தமிழ் உரை",
}
```

### Step 3: Use in component
```tsx
const { t } = useLanguage();
<p>{t.newSection.newKey}</p>
```

## Features

✅ **Persistent Language Selection** - Saved in localStorage
✅ **Type-Safe** - Full TypeScript support
✅ **Easy to Use** - Simple hook-based API
✅ **Separate Files** - Each language in its own file
✅ **Real-time Switching** - No page reload needed

## Pages with Translation Support

### ✅ Public Pages
- ✅ Landing Page (`/`)
- ✅ Language Selection (`/language`)
- ✅ Welcome/Role Selection (`/welcome`)
- ✅ Login Pages (Farmer, Company, Consumer)

### ✅ Farmer Dashboard
- ✅ Dashboard Page (`/farmer/dashboard`)
- ✅ Crop List Component (Add, Edit, View crops)
- ✅ Farm Details Component (All form fields)
- ✅ Financial Summary Component (All calculations)
- ✅ Navigation Menu (All menu items)
- ✅ User Account Dropdown

### ✅ Components with Translations
- ✅ Crop Management (Add/Edit dialogs, table headers)
- ✅ Farm Details Form (All input labels and placeholders)
- ✅ Financial Summary (All cost fields, income calculations)
- ✅ Toast Notifications (Success/error messages)
- ✅ Common UI Elements (Buttons, labels, actions)

## Testing Translations

1. Go to http://localhost:3000
2. Click "Get Started Now"
3. Select a language (English, Hindi, Telugu, or Tamil)
4. Navigate through the app - all text will be in selected language
5. Language persists across page refreshes

## Language Codes

| Language | Code | Native Name |
|----------|------|-------------|
| English  | `en` | English     |
| Hindi    | `hi` | हिंदी       |
| Telugu   | `te` | తెలుగు      |
| Tamil    | `ta` | தமிழ்       |

## Future Enhancements

- Add more languages (Kannada, Malayalam, etc.)
- Add dashboard translations
- Add form validation messages in all languages
- Add date/time formatting per locale
