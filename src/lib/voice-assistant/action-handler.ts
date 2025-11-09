// Action Handler - Executes actions based on parsed intents
import { ParsedIntent } from './intent-parser';

export interface ActionResult {
  success: boolean;
  message: string;
  data?: any;
}

export class ActionHandler {
  async executeAction(intent: ParsedIntent): Promise<ActionResult> {
    switch (intent.type) {
      case 'add_crop':
        return this.handleAddCrop(intent.entities);
      
      case 'record_harvest':
        return this.handleRecordHarvest(intent.entities);
      
      case 'update_crop_status':
        return this.handleUpdateCropStatus(intent.entities);
      
      case 'show_prices':
        return this.handleShowPrices(intent.entities);
      
      case 'weather_query':
        return this.handleWeatherQuery(intent.entities);
      
      case 'calculate_profit':
        return this.handleCalculateProfit(intent.entities);
      
      case 'crop_advice':
        return this.handleCropAdvice(intent.entities);
      
      case 'pest_disease':
        return this.handlePestDisease(intent.entities);
      
      case 'set_reminder':
        return this.handleSetReminder(intent.entities);
      
      case 'price_alert':
        return this.handlePriceAlert(intent.entities);
      
      case 'government_scheme':
        return this.handleGovernmentScheme(intent.entities);
      
      case 'find_location':
        return this.handleFindLocation(intent.entities);
      
      case 'switch_language':
        return this.handleSwitchLanguage(intent.entities);
      
      case 'show_expenses':
        return this.handleShowExpenses(intent.entities);
      
      case 'irrigation_advice':
        return this.handleIrrigationAdvice(intent.entities);
      
      case 'fertilizer_advice':
        return this.handleFertilizerAdvice(intent.entities);
      
      case 'planting_time':
        return this.handlePlantingTime(intent.entities);
      
      case 'general_query':
        return this.handleGeneralQuery(intent.originalText);
      
      default:
        return {
          success: false,
          message: 'I did not understand that command. Please try again.'
        };
    }
  }

  private async handleAddCrop(entities: any): Promise<ActionResult> {
    // This would integrate with your farm management system
    return {
      success: true,
      message: `Added ${entities.area} ${entities.unit} of ${entities.cropName} to your farm.`,
      data: { action: 'navigate', route: '/farmer/dashboard' }
    };
  }

  private async handleRecordHarvest(entities: any): Promise<ActionResult> {
    return {
      success: true,
      message: `Recorded harvest of ${entities.quantity} ${entities.unit} ${entities.crop || 'crop'}.`,
      data: { action: 'update_harvest', ...entities }
    };
  }

  private async handleUpdateCropStatus(entities: any): Promise<ActionResult> {
    return {
      success: true,
      message: `Updated crop status successfully.`,
      data: { action: 'update_status', ...entities }
    };
  }

  private async handleShowPrices(entities: any): Promise<ActionResult> {
    // Mock price data - would fetch from API
    const prices = {
      tomato: '₹30/kg',
      wheat: '₹2500/quintal',
      rice: '₹3000/quintal',
      onion: '₹25/kg'
    };
    
    const crop = entities.crop?.toLowerCase();
    const price = crop ? prices[crop as keyof typeof prices] : null;
    
    return {
      success: true,
      message: price 
        ? `Current ${crop} price is ${price}` 
        : `Today's mandi prices: Tomato ₹30/kg, Wheat ₹2500/quintal, Rice ₹3000/quintal, Onion ₹25/kg`,
      data: { action: 'show_prices', prices }
    };
  }

  private async handleWeatherQuery(entities: any): Promise<ActionResult> {
    // Mock weather data - would fetch from weather API
    return {
      success: true,
      message: `Today's weather: Partly cloudy, 28°C. 30% chance of rain tomorrow. Good conditions for farming.`,
      data: { action: 'show_weather' }
    };
  }

  private async handleCalculateProfit(entities: any): Promise<ActionResult> {
    return {
      success: true,
      message: `Your total profit this month is ₹45,000. Revenue: ₹80,000, Expenses: ₹35,000.`,
      data: { action: 'show_financial_summary' }
    };
  }

  private async handleCropAdvice(entities: any): Promise<ActionResult> {
    return {
      success: true,
      message: `For rice crops at this stage, use NPK fertilizer (10:26:26) at 50kg per acre. Apply during vegetative stage for best results.`,
      data: { action: 'show_advice' }
    };
  }

  private async handlePestDisease(entities: any): Promise<ActionResult> {
    return {
      success: true,
      message: `Leaf curl disease is common in tomatoes. Use neem oil spray or recommended pesticides. Ensure proper spacing and avoid overwatering.`,
      data: { action: 'show_pest_info' }
    };
  }

  private async handleSetReminder(entities: any): Promise<ActionResult> {
    return {
      success: true,
      message: `Reminder set successfully. I will notify you at the specified time.`,
      data: { action: 'set_reminder', ...entities }
    };
  }

  private async handlePriceAlert(entities: any): Promise<ActionResult> {
    return {
      success: true,
      message: `Price alert created. You will be notified when prices reach your target.`,
      data: { action: 'create_alert', ...entities }
    };
  }

  private async handleGovernmentScheme(entities: any): Promise<ActionResult> {
    return {
      success: true,
      message: `PM-KISAN provides ₹6000 per year in 3 installments. Crop insurance and subsidy schemes are also available. Visit your nearest agriculture office for registration.`,
      data: { action: 'show_schemes' }
    };
  }

  private async handleFindLocation(entities: any): Promise<ActionResult> {
    return {
      success: true,
      message: `Found 3 seed shops within 5km. The nearest one is Agri Seeds Store, 2km away on Main Road.`,
      data: { action: 'show_map' }
    };
  }

  private async handleSwitchLanguage(entities: any): Promise<ActionResult> {
    return {
      success: true,
      message: `Language switched successfully.`,
      data: { action: 'switch_language', language: entities.language }
    };
  }

  private async handleShowExpenses(entities: any): Promise<ActionResult> {
    return {
      success: true,
      message: `This month's expenses: Seeds ₹8,000, Fertilizer ₹12,000, Labor ₹15,000. Total: ₹35,000.`,
      data: { action: 'show_expenses' }
    };
  }

  private async handleIrrigationAdvice(entities: any): Promise<ActionResult> {
    return {
      success: true,
      message: `Based on current weather and soil moisture, irrigate your crops tomorrow morning. Rice needs 5-7cm water depth. Avoid irrigation during afternoon heat.`,
      data: { action: 'irrigation_advice' }
    };
  }

  private async handleFertilizerAdvice(entities: any): Promise<ActionResult> {
    return {
      success: true,
      message: `For current crop stage, apply Urea 50kg per acre. Split application recommended: 25kg now and 25kg after 15 days.`,
      data: { action: 'fertilizer_advice' }
    };
  }

  private async handlePlantingTime(entities: any): Promise<ActionResult> {
    return {
      success: true,
      message: `Best time to plant tomatoes in your region is October-November for winter crop and January-February for summer crop.`,
      data: { action: 'planting_info' }
    };
  }

  private async handleGeneralQuery(query: string): Promise<ActionResult> {
    // This would integrate with AI service (Gemini/GPT)
    return {
      success: true,
      message: `I can help you with crop management, weather updates, market prices, and farming advice. What would you like to know?`,
      data: { action: 'general_response', query }
    };
  }
}
