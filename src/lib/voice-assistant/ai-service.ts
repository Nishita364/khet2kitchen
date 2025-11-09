// AI Service - Integrates with Gemini AI for intelligent responses
export class AIService {
  private apiEndpoint: string = '/api/ai/chat';

  async getResponse(query: string, context?: any): Promise<string> {
    try {
      const response = await fetch(this.apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
          context: {
            ...context,
            systemPrompt: this.getSystemPrompt()
          }
        })
      });

      if (!response.ok) {
        throw new Error('AI service error');
      }

      const data = await response.json();
      return data.response || 'I apologize, I could not process that request.';
    } catch (error) {
      console.error('AI Service Error:', error);
      return 'I am having trouble connecting right now. Please try again.';
    }
  }

  private getSystemPrompt(): string {
    return `You are an AI assistant for Khet2Kitchen, a farming application for Indian farmers.
    
Your role:
- Help farmers with agricultural queries in English, Hindi, Telugu, and Tamil
- Provide practical farming advice based on Indian agricultural practices
- Answer questions about crops, weather, prices, government schemes
- Be concise, helpful, and use simple language
- Provide specific, actionable advice
- Consider Indian farming context and regional practices

Topics you can help with:
- Crop management and cultivation
- Pest and disease control
- Weather and irrigation
- Market prices and selling
- Government schemes and subsidies
- Fertilizer and seed recommendations
- Harvest timing and techniques
- Financial planning for farmers

Always be respectful, patient, and supportive of farmers' needs.`;
  }

  async getContextualResponse(
    query: string,
    userContext: {
      crops?: any[];
      location?: string;
      language?: string;
      farmSize?: number;
    }
  ): Promise<string> {
    return this.getResponse(query, userContext);
  }
}
