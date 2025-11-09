'use client';

import { Mic, MicOff, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useVoiceAssistant } from '@/hooks/use-voice-assistant';
import { useLanguage } from '@/context/language-provider';
import { cn } from '@/lib/utils';

export function VoiceButton() {
  const { language } = useLanguage();
  const {
    isListening,
    isSpeaking,
    transcript,
    response,
    error,
    isProcessing,
    startListening,
    stopListening,
    stopSpeaking,
    isSupported
  } = useVoiceAssistant(language);

  // Additional browser check
  const browserSupported = typeof window !== 'undefined' && (
    !!(window as any).SpeechRecognition || 
    !!(window as any).webkitSpeechRecognition
  ) && !!window.speechSynthesis;

  // Show button even if not supported, with a message
  if (!isSupported && !browserSupported) {
    return (
      <div className="fixed bottom-24 right-6 z-50 flex flex-col items-end gap-2">
        <div className="max-w-sm bg-yellow-100 dark:bg-yellow-900 rounded-lg shadow-lg p-4 mb-2">
          <p className="text-xs text-yellow-800 dark:text-yellow-200">
            Voice assistant requires Chrome, Edge, or Safari browser
          </p>
        </div>
        <Button
          size="lg"
          disabled
          className="h-16 w-16 rounded-full shadow-lg opacity-50"
        >
          <Mic className="h-6 w-6" />
        </Button>
        <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
          Not supported
        </p>
      </div>
    );
  }

  const handleClick = () => {
    if (isListening) {
      stopListening();
    } else if (isSpeaking) {
      stopSpeaking();
    } else {
      startListening();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-2">
      {/* Voice Button */}
      <Button
        size="lg"
        onClick={handleClick}
        disabled={isProcessing}
        title={isProcessing ? 'Processing...' : isListening ? 'Listening...' : isSpeaking ? 'Speaking...' : 'Tap to speak'}
        className={cn(
          "h-16 w-16 rounded-full shadow-lg transition-all",
          isListening && "bg-red-500 hover:bg-red-600 animate-pulse",
          isSpeaking && "bg-blue-500 hover:bg-blue-600",
          isProcessing && "opacity-50 cursor-not-allowed"
        )}
      >
        {isProcessing ? (
          <div className="animate-spin h-6 w-6 border-2 border-white border-t-transparent rounded-full" />
        ) : isListening ? (
          <MicOff className="h-6 w-6" />
        ) : isSpeaking ? (
          <VolumeX className="h-6 w-6" />
        ) : (
          <Mic className="h-6 w-6" />
        )}
      </Button>
    </div>
  );
}
