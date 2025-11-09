'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mic, CheckCircle, XCircle } from 'lucide-react';

export default function VoiceTestPage() {
  const checkBrowserSupport = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const speechSynthesis = window.speechSynthesis;
    
    return {
      recognition: !!SpeechRecognition,
      synthesis: !!speechSynthesis,
      overall: !!SpeechRecognition && !!speechSynthesis
    };
  };

  const support = typeof window !== 'undefined' ? checkBrowserSupport() : { recognition: false, synthesis: false, overall: false };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Voice Assistant Test Page</h1>
        <p className="text-muted-foreground mt-2">
          Check if the voice button is visible and test browser support
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mic className="h-5 w-5" />
            Voice Button Location
          </CardTitle>
          <CardDescription>
            The voice button should appear in the bottom-right corner of the screen
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm font-medium mb-2">Expected Location:</p>
              <p className="text-sm text-muted-foreground">
                ✓ Fixed position: bottom-right corner<br />
                ✓ Z-index: 50 (above other content)<br />
                ✓ Distance from edges: 24px (1.5rem)<br />
                ✓ Size: 64px × 64px (h-16 w-16)<br />
                ✓ Shape: Circular (rounded-full)
              </p>
            </div>

            <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-2">
                👉 Look at the bottom-right corner now!
              </p>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                You should see a circular microphone button there.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Browser Support Check</CardTitle>
          <CardDescription>
            Verify if your browser supports voice features
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              {support.recognition ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <XCircle className="h-5 w-5 text-red-500" />
              )}
              <div>
                <p className="font-medium">Speech Recognition</p>
                <p className="text-sm text-muted-foreground">
                  {support.recognition ? 'Supported ✓' : 'Not supported ✗'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {support.synthesis ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <XCircle className="h-5 w-5 text-red-500" />
              )}
              <div>
                <p className="font-medium">Text-to-Speech</p>
                <p className="text-sm text-muted-foreground">
                  {support.synthesis ? 'Supported ✓' : 'Not supported ✗'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {support.overall ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <XCircle className="h-5 w-5 text-red-500" />
              )}
              <div>
                <p className="font-medium">Overall Voice Assistant</p>
                <p className="text-sm text-muted-foreground">
                  {support.overall ? 'Ready to use ✓' : 'Not available ✗'}
                </p>
              </div>
            </div>
          </div>

          {!support.overall && (
            <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-950 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <p className="text-sm font-medium text-yellow-900 dark:text-yellow-100 mb-2">
                ⚠️ Voice Assistant Not Supported
              </p>
              <p className="text-sm text-yellow-700 dark:text-yellow-300">
                Please use Chrome, Edge, or Safari browser for full voice assistant support.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Browser Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <p><strong>User Agent:</strong> {typeof window !== 'undefined' ? navigator.userAgent : 'N/A'}</p>
            <p><strong>Platform:</strong> {typeof window !== 'undefined' ? navigator.platform : 'N/A'}</p>
            <p><strong>Language:</strong> {typeof window !== 'undefined' ? navigator.language : 'N/A'}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Troubleshooting</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <div>
              <p className="font-medium">If you don't see the button:</p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground">
                <li>Scroll to the bottom-right corner of the page</li>
                <li>Check if any other elements are covering it</li>
                <li>Try refreshing the page (Ctrl+R or Cmd+R)</li>
                <li>Check browser console for errors (F12)</li>
              </ul>
            </div>

            <div>
              <p className="font-medium">If the button is disabled:</p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground">
                <li>Your browser may not support Web Speech API</li>
                <li>Try using Chrome, Edge, or Safari</li>
                <li>Update your browser to the latest version</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
