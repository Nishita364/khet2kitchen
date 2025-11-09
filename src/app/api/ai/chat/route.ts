import { NextRequest, NextResponse } from 'next/server';
import { ai } from '@/ai/genkit';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { query, context } = body;

    if (!query) {
      return NextResponse.json(
        { error: 'Query is required' },
        { status: 400 }
      );
    }

    // Build the prompt with context
    const systemPrompt = context?.systemPrompt || `You are an AI assistant for Khet2Kitchen, a farming application for Indian farmers.
    
Your role:
- Help farmers with agricultural queries in English, Hindi, Telugu, and Tamil
- Provide practical farming advice based on Indian agricultural practices
- Answer questions about crops, weather, prices, government schemes
- Be concise, helpful, and use simple language
- Provide specific, actionable advice
- Consider Indian farming context and regional practices`;

    const userContext = context?.crops ? `\nUser's crops: ${JSON.stringify(context.crops)}` : '';
    const locationContext = context?.location ? `\nUser's location: ${context.location}` : '';
    
    const fullPrompt = `${systemPrompt}${userContext}${locationContext}\n\nUser query: ${query}`;

    // Generate response using Genkit
    const generateFlow = ai.definePrompt(
      {
        name: 'voiceAssistantChat',
        model: 'googleai/gemini-2.0-flash-exp',
        config: {
          temperature: 0.7,
          maxOutputTokens: 500,
        }
      },
      fullPrompt
    );

    const response = await generateFlow();

    return NextResponse.json({
      response: response.text || 'I apologize, I could not process that request.',
      success: true
    });

  } catch (error) {
    console.error('AI Chat Error:', error);
    return NextResponse.json(
      { error: 'Failed to process request', success: false },
      { status: 500 }
    );
  }
}
