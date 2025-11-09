// Text-to-Speech Service using Web Speech API
export class TextToSpeechService {
  private synth: SpeechSynthesis | null = null;
  private currentLanguage: string = 'en-IN';

  constructor() {
    if (typeof window !== 'undefined') {
      this.synth = window.speechSynthesis;
    }
  }

  setLanguage(language: string) {
    const languageMap: Record<string, string> = {
      'en': 'en-IN',
      'hi': 'hi-IN',
      'te': 'te-IN',
      'ta': 'ta-IN'
    };
    this.currentLanguage = languageMap[language] || 'en-IN';
  }

  speak(text: string, onEnd?: () => void): void {
    if (!this.synth) {
      return;
    }

    // Cancel any ongoing speech
    this.synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = this.currentLanguage;
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;

    // Try to find a voice for the current language
    const voices = this.synth.getVoices();
    const voice = voices.find(v => v.lang.startsWith(this.currentLanguage.split('-')[0]));
    if (voice) {
      utterance.voice = voice;
    }

    utterance.onend = () => {
      onEnd?.();
    };

    this.synth.speak(utterance);
  }

  stop(): void {
    if (this.synth) {
      this.synth.cancel();
    }
  }

  isSupported(): boolean {
    return !!this.synth;
  }

  isSpeaking(): boolean {
    return this.synth?.speaking || false;
  }
}
