// Voice Assistant Hook - Main interface for voice functionality
import { useState, useEffect, useCallback, useRef } from 'react';
import { SpeechRecognitionService } from '@/lib/voice-assistant/speech-recognition';
import { TextToSpeechService } from '@/lib/voice-assistant/text-to-speech';
import { IntentParser, ParsedIntent } from '@/lib/voice-assistant/intent-parser';
import { ActionHandler, ActionResult } from '@/lib/voice-assistant/action-handler';
import { AIService } from '@/lib/voice-assistant/ai-service';

export interface VoiceAssistantState {
  isListening: boolean;
  isSpeaking: boolean;
  transcript: string;
  response: string;
  error: string | null;
  isProcessing: boolean;
}

export function useVoiceAssistant(language: string = 'en') {
  const [state, setState] = useState<VoiceAssistantState>({
    isListening: false,
    isSpeaking: false,
    transcript: '',
    response: '',
    error: null,
    isProcessing: false
  });

  const speechRecognition = useRef<SpeechRecognitionService | null>(null);
  const textToSpeech = useRef<TextToSpeechService | null>(null);
  const intentParser = useRef<IntentParser | null>(null);
  const actionHandler = useRef<ActionHandler | null>(null);
  const aiService = useRef<AIService | null>(null);

  // Initialize services
  useEffect(() => {
    speechRecognition.current = new SpeechRecognitionService();
    textToSpeech.current = new TextToSpeechService();
    intentParser.current = new IntentParser();
    actionHandler.current = new ActionHandler();
    aiService.current = new AIService();
  }, []);

  // Update language when it changes
  useEffect(() => {
    if (speechRecognition.current) {
      speechRecognition.current.setLanguage(language);
    }
    if (textToSpeech.current) {
      textToSpeech.current.setLanguage(language);
    }
  }, [language]);

  const startListening = useCallback(() => {
    if (!speechRecognition.current) return;

    setState(prev => ({ ...prev, isListening: true, error: null, transcript: '', response: '' }));

    speechRecognition.current.startListening(
      async (transcript) => {
        setState(prev => ({ ...prev, transcript, isListening: false, isProcessing: true }));
        await processCommand(transcript);
      },
      (error) => {
        setState(prev => ({ ...prev, error, isListening: false }));
      }
    );
  }, []);

  const stopListening = useCallback(() => {
    if (speechRecognition.current) {
      speechRecognition.current.stopListening();
      setState(prev => ({ ...prev, isListening: false }));
    }
  }, []);

  const speak = useCallback((text: string) => {
    if (!textToSpeech.current) return;

    setState(prev => ({ ...prev, isSpeaking: true }));
    textToSpeech.current.speak(text, () => {
      setState(prev => ({ ...prev, isSpeaking: false }));
    });
  }, []);

  const stopSpeaking = useCallback(() => {
    if (textToSpeech.current) {
      textToSpeech.current.stop();
      setState(prev => ({ ...prev, isSpeaking: false }));
    }
  }, []);

  const processCommand = async (transcript: string) => {
    try {
      if (!intentParser.current || !actionHandler.current || !aiService.current) {
        throw new Error('Services not initialized');
      }

      // Parse intent
      const intent: ParsedIntent = intentParser.current.parse(transcript);

      let result: ActionResult;

      // For general queries or low confidence, use AI
      if (intent.type === 'general_query' || intent.confidence < 0.7) {
        const aiResponse = await aiService.current.getResponse(transcript);
        result = {
          success: true,
          message: aiResponse,
          data: { action: 'ai_response' }
        };
      } else {
        // Execute specific action
        result = await actionHandler.current.executeAction(intent);
      }

      setState(prev => ({ 
        ...prev, 
        response: result.message, 
        isProcessing: false 
      }));

      // Speak the response
      speak(result.message);

      // Handle any data actions (navigation, updates, etc.)
      if (result.data?.action) {
        handleDataAction(result.data);
      }

    } catch (error) {
      const errorMessage = 'Sorry, I encountered an error processing your request.';
      setState(prev => ({ 
        ...prev, 
        error: errorMessage, 
        isProcessing: false 
      }));
      speak(errorMessage);
    }
  };

  const handleDataAction = (data: any) => {
    // This would integrate with your app's navigation and state management
    switch (data.action) {
      case 'navigate':
        // Navigate to route
        if (typeof window !== 'undefined' && data.route) {
          window.location.href = data.route;
        }
        break;
      case 'switch_language':
        // Trigger language change
        if (data.language) {
          // This would call your language context
          window.dispatchEvent(new CustomEvent('change-language', { detail: data.language }));
        }
        break;
      // Add more action handlers as needed
    }
  };

  const [isSupported, setIsSupported] = useState(false);

  // Check support after services are initialized
  useEffect(() => {
    const checkSupport = () => {
      const recognitionSupported = speechRecognition.current?.isSupported() ?? false;
      const ttsSupported = textToSpeech.current?.isSupported() ?? false;
      setIsSupported(recognitionSupported && ttsSupported);
    };
    
    // Check immediately and after a short delay to ensure services are ready
    checkSupport();
    const timer = setTimeout(checkSupport, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return {
    ...state,
    startListening,
    stopListening,
    speak,
    stopSpeaking,
    isSupported
  };
}
