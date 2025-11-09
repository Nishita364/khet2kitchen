'use client';

import { useState } from 'react';
import { X, Mic, Volume2, HelpCircle, MicOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useVoiceAssistant } from '@/hooks/use-voice-assistant';
import { useLanguage } from '@/context/language-provider';

interface Message {
  type: 'user' | 'assistant';
  text: string;
  timestamp: Date;
}

export function VoiceAssistantPanel() {
  const { language, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [showHelp, setShowHelp] = useState(false);

  const {
    isListening,
    isSpeaking,
    transcript,
    response,
    startListening,
    stopListening,
    isSupported
  } = useVoiceAssistant(language);

  // Add messages when transcript or response changes
  useState(() => {
    if (transcript) {
      setMessages(prev => [...prev, {
        type: 'user',
        text: transcript,
        timestamp: new Date()
      }]);
    }
  });

  useState(() => {
    if (response) {
      setMessages(prev => [...prev, {
        type: 'assistant',
        text: response,
        timestamp: new Date()
      }]);
    }
  });

  if (!isSupported) {
    return null;
  }

  const exampleCommands = [
    { en: "What's the weather today?", hi: "आज का मौसम कैसा है?", te: "ఈరోజు వాతావరణం ఎలా ఉంది?", ta: "இன்று வானிலை எப்படி இருக்கிறது?" },
    { en: "Show tomato prices", hi: "टमाटर की कीमत दिखाओ", te: "టమాటా ధరలు చూపించు", ta: "தக்காளி விலைகளைக் காட்டு" },
    { en: "Add 2 acres of wheat", hi: "2 एकड़ गेहूं जोड़ें", te: "2 ఎకరాల గోధుమలు జోడించు", ta: "2 ஏக்கர் கோதுமை சேர்" },
    { en: "Calculate my profit", hi: "मेरा लाभ गणना करें", te: "నా లాభాన్ని లెక్కించు", ta: "எனது இலாபத்தைக் கணக்கிடு" },
    { en: "What fertilizer for rice?", hi: "चावल के लिए कौन सा खाद?", te: "వరికి ఏ ఎరువు?", ta: "அரிசிக்கு என்ன உரம்?" },
  ];

  return (
    <>
      {/* Floating Action Button */}
      {!isOpen && (
        <Button
          size="lg"
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 h-16 w-16 rounded-full shadow-lg"
        >
          <Mic className="h-6 w-6" />
        </Button>
      )}

      {/* Full Panel */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 z-50 w-96 h-[600px] shadow-2xl flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-2">
              <Volume2 className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Voice Assistant</h3>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowHelp(!showHelp)}
              >
                <HelpCircle className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Help Section */}
          {showHelp && (
            <div className="p-4 bg-muted/50 border-b">
              <h4 className="font-medium mb-2 text-sm">Example Commands:</h4>
              <ScrollArea className="h-32">
                <ul className="space-y-1 text-xs">
                  {exampleCommands.map((cmd, idx) => (
                    <li key={idx} className="text-muted-foreground">
                      • {cmd[language as keyof typeof cmd] || cmd.en}
                    </li>
                  ))}
                </ul>
              </ScrollArea>
            </div>
          )}

          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
                <Mic className="h-12 w-12 mb-4 opacity-50" />
                <p className="text-sm">Tap the microphone to start</p>
                <p className="text-xs mt-2">Ask me anything about farming!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        msg.type === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}
                    >
                      <p className="text-sm">{msg.text}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {msg.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>

          {/* Controls */}
          <div className="p-4 border-t">
            <Button
              size="lg"
              onClick={isListening ? stopListening : startListening}
              className="w-full"
              variant={isListening ? "destructive" : "default"}
            >
              {isListening ? (
                <>
                  <MicOff className="h-5 w-5 mr-2" />
                  Stop Listening
                </>
              ) : (
                <>
                  <Mic className="h-5 w-5 mr-2" />
                  Start Speaking
                </>
              )}
            </Button>
            {isListening && (
              <div className="mt-2 flex items-center justify-center gap-1">
                <div className="h-2 w-2 bg-red-500 rounded-full animate-pulse" />
                <p className="text-xs text-muted-foreground">Listening...</p>
              </div>
            )}
          </div>
        </Card>
      )}
    </>
  );
}
