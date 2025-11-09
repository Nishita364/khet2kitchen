# 🔍 Remaining Translations Needed

## Components with Hardcoded Text

### High Priority (User-Facing Text)
1. ✅ **price-suggestion.tsx** - Form labels, placeholders, messages
2. ✅ **grading-details.tsx** - Form labels, camera controls, messages  
3. ✅ **weather-forecast.tsx** - Days, conditions
4. ✅ **incoming-orders.tsx** - Table headers, status labels
5. **nutrient-recommendation.tsx** - Form labels, crop names
6. **pest-control.tsx** - Form labels, camera controls
7. **feedback-form.tsx** - Form labels, messages
8. **order-history.tsx** - Table headers, status labels
9. **graded-produce.tsx** - Table headers, status labels
10. **available-produce.tsx** - Search messages, filters
11. **consumer-marketplace.tsx** - Product cards, filters
12. **market-insights.tsx** - Table headers, trends
13. **demand-display.tsx** - Table headers, status labels
14. **sourcing-breakdown.tsx** - Table headers
15. **revenue-breakdown.tsx** - Table headers
16. **community-feed.tsx** - Post content
17. **complaint-redressal.tsx** - Form labels
18. **support-page.tsx** - Form labels, messages

### Data Arrays (Crop Names, Status Labels)
1. **crop-list.tsx** - Initial crops data (Winter Wheat, Corn, Soybeans, Barley, Canola)
2. **financial-summary.tsx** - Crops dropdown (Winter Wheat, Corn, Soybeans, Barley, Canola)
3. **incoming-orders.tsx** - Orders data (company names, items, statuses)
4. **order-history.tsx** - Orders data
5. **weather-forecast.tsx** - Days (Today, Tomorrow, Wed, Thu) and conditions (Sunny, Cloudy, Rainy, Windy)
6. **market-insights.tsx** - Crop names (Wheat, Corn, Soybeans)
7. **demand-display.tsx** - Crop names and locations
8. **sourcing-breakdown.tsx** - Produce names
9. **revenue-breakdown.tsx** - Produce names
10. **sourced-produce.tsx** - Product descriptions

### Context/Provider Data
1. **farm-details-provider.tsx** - Initial data (Winter Wheat, Soybeans)
2. **financial-summary-provider.tsx** - Initial data (Winter Wheat)

## Translation Strategy

### Phase 1: Add Translation Keys ✅
- Add all component-specific keys to translation files
- Add data translation keys (crop names, statuses, etc.)

### Phase 2: Update Components (In Progress)
- Replace hardcoded strings with `t.key` references
- Update data arrays to use translations
- Add `useLanguage()` hook to components

### Phase 3: Update Context Providers
- Make initial data use translations
- Ensure data persists correctly

## Estimated Keys Needed
- Component labels: ~100 keys
- Data translations: ~50 keys
- Status/condition labels: ~30 keys
- **Total: ~180 additional keys**

## Current Status
- ✅ Core pages translated (15+)
- ✅ Navigation menus translated
- ✅ Common UI elements translated
- ⏳ Component-specific content (50% done)
- ⏳ Data arrays (20% done)
- ❌ Context provider data (0% done)

## Priority Order
1. User-facing form labels and buttons
2. Table headers and status labels
3. Data arrays (crop names, etc.)
4. Error/success messages
5. Placeholder text
6. Context provider initial data
