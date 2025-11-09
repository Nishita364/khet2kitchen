"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { handleDiagnosePest } from "@/app/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Bug, Camera, Loader2, Video, VideoOff, WandSparkles } from "lucide-react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";

const formSchema = z.object({
  description: z
    .string()
    .min(1, "Please describe the symptoms you are observing."),
  photoDataUri: z.string().optional(),
});

const initialState = {
  message: "",
  data: null,
  error: null,
};

export function PestControl() {
  const [state, formAction, isPending] = useActionState(
    handleDiagnosePest,
    initialState
  );
  const { toast } = useToast();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [photoDataUri, setPhotoDataUri] = useState<string>("");
  const [stream, setStream] = useState<MediaStream | null>(null);


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
    },
  });

  useEffect(() => {
    if (state.error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: state.error,
      });
    }
    if (state.data) {
      toast({
        title: "Diagnosis Complete!",
        description: "The AI has analyzed the provided information.",
      });
      form.reset();
      setPhotoDataUri("");
      if(fileInputRef.current) fileInputRef.current.value = "";
      stopCamera();
    }
  }, [state, toast, form]);

  const startCamera = async () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            setStream(stream);
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
            setHasCameraPermission(true);
            setIsCameraOn(true);
        } catch (error) {
            console.error("Error accessing camera:", error);
            setHasCameraPermission(false);
            toast({
                variant: "destructive",
                title: "Camera Access Denied",
                description: "Please enable camera permissions in your browser settings.",
            });
        }
    }
  };

  const stopCamera = () => {
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
    }
    setIsCameraOn(false);
    setStream(null);
  }

  const handleToggleCamera = () => {
    if (isCameraOn) {
      stopCamera();
    } else {
      startCamera();
    }
  };

  const handleCapturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext("2d");
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUri = canvas.toDataURL("image/jpeg");
        setPhotoDataUri(dataUri);
        stopCamera();
      }
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhotoDataUri(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    if (!photoDataUri) {
      toast({
        variant: "destructive",
        title: "Missing Photo",
        description: "Please upload or capture a photo of the plant.",
      });
      return;
    }
    const formData = new FormData();
    formData.append("description", data.description);
    formData.append("photoDataUri", photoDataUri);
    formAction(formData);
  };
  
  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">
          Pest & Disease Control
        </CardTitle>
        <CardDescription>
          Use AI to diagnose and get control recommendations for your crops.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6 md:grid-cols-2">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Describe the issue</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., Yellow spots on lower leaves, some curling..."
                      {...field}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-2">
                <FormLabel>Provide a Photo</FormLabel>
                <div className="flex gap-2">
                    <Button type="button" variant="outline" onClick={handleToggleCamera} disabled={isPending}>
                        {isCameraOn ? <VideoOff className="mr-2" /> : <Video className="mr-2" />}
                        {isCameraOn ? 'Turn Off Camera' : 'Use Camera'}
                    </Button>
                    <Input id="photo" type="file" accept="image/*" className="flex-1" onChange={handleFileChange} ref={fileInputRef} disabled={isPending || isCameraOn}/>
                </div>
            </div>

            {(isCameraOn || photoDataUri) && (
              <div className="relative aspect-video w-full rounded-md border bg-muted">
                {isCameraOn && <video ref={videoRef} className="h-full w-full rounded-md object-cover" autoPlay muted playsInline></video>}
                {photoDataUri && !isCameraOn && <img src={photoDataUri} alt="Preview" className="h-full w-full rounded-md object-cover"/>}
                <canvas ref={canvasRef} className="hidden"></canvas>
                {isCameraOn && (
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
                        <Button type="button" onClick={handleCapturePhoto} size="icon" className="rounded-full w-16 h-16 border-4 border-white/50 bg-primary/80 hover:bg-primary">
                            <Camera className="h-8 w-8" />
                        </Button>
                    </div>
                )}
              </div>
            )}
             {hasCameraPermission === false && (
                <Alert variant="destructive">
                  <AlertTitle>Camera Access Required</AlertTitle>
                  <AlertDescription>
                    Please allow camera access in your browser to use this feature.
                  </AlertDescription>
              </Alert>
            )}
            
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <WandSparkles className="mr-2 h-4 w-4" />
              )}
              Diagnose Problem
            </Button>
          </form>
        </Form>
        <div className="flex items-center justify-center p-6 bg-muted/50 rounded-lg">
          {isPending ? (
            <div className="flex flex-col items-center gap-2 text-muted-foreground animate-pulse">
              <Loader2 className="h-8 w-8 animate-spin" />
              <p>AI is analyzing the symptoms...</p>
            </div>
          ) : state.data ? (
            <Alert className="animate-in fade-in-50 bg-background">
              <Bug className="h-4 w-4" />
              <AlertTitle>AI Diagnosis & Recommendation</AlertTitle>
              <AlertDescription className="mt-4 space-y-2 text-foreground/80">
                <p><strong>Diagnosis:</strong> {state.data.diagnosis}</p>
                <p><strong>Recommendation:</strong> {state.data.recommendation}</p>
              </AlertDescription>
            </Alert>
          ) : (
            <div className="text-center text-muted-foreground">
              <p>Your diagnosis result will appear here.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
