
"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { handleGradeProduce } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Award, Camera, Loader2, Video, VideoOff } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  produceType: z.string().min(1, 'Produce type is required.'),
  size: z.string().min(1, 'Size is required.'),
  color: z.string().min(1, 'Color is required.'),
  defects: z.string().min(1, 'Please describe any defects, or type "None".'),
  photoDataUri: z.string().optional(),
});

const initialState = {
  message: '',
  data: null,
  error: null,
};

export function GradingDetails() {
  const [state, formAction, isPending] = useActionState(handleGradeProduce, initialState);
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
      produceType: "",
      size: "",
      color: "",
      defects: "",
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
        title: "Success!",
        description: "Grading report generated.",
      });
      form.reset();
      setPhotoDataUri("");
      if(fileInputRef.current) {
        fileInputRef.current.value = "";
      }
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
        description: "Please upload or capture a photo of the produce.",
      });
      return;
    }
    const formData = new FormData();
    formData.append("produceType", data.produceType);
    formData.append("size", data.size);
    formData.append("color", data.color);
    formData.append("defects", data.defects);
    formData.append("photoDataUri", photoDataUri);
    formAction(formData);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Produce Grading</CardTitle>
        <CardDescription>
          Get an AI-powered quality grade for your vegetables and pulses.
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
              name="produceType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Produce Type</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Tomato, Lentil" {...field} disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <div className="grid grid-cols-2 gap-4">
                <FormField
                control={form.control}
                name="size"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Size</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isPending}>
                        <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder="Select size" />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                        <SelectItem value="small">Small</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="large">Large</SelectItem>
                        </SelectContent>
                    </Select>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="color"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Color</FormLabel>
                    <FormControl>
                        <Input placeholder="e.g., Vibrant Red" {...field} disabled={isPending}/>
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </div>
            <FormField
              control={form.control}
              name="defects"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Defects</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Describe any blemishes, spots, or irregularities. Type 'None' if not applicable." {...field} disabled={isPending}/>
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
                        {isCameraOn ? "Turn Off" : "Use Camera"}
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
                  <AlertTitle>Camera Access Denied</AlertTitle>
                  <AlertDescription>
                    Please enable camera permissions in your browser settings.
                  </AlertDescription>
              </Alert>
            )}

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Get Grade
            </Button>
          </form>
        </Form>
        <div className="flex flex-col">
            <div className="flex-grow flex items-center justify-center p-6 bg-muted/50 rounded-lg">
                {isPending ? (
                    <div className="flex flex-col items-center gap-2 text-muted-foreground animate-pulse">
                    <Loader2 className="h-8 w-8 animate-spin" />
                    <p>AI is grading your produce...</p>
                    </div>
                ) : state.data ? (
                    <Alert className="animate-in fade-in-50 bg-background">
                    <Award className="h-4 w-4" />
                    <AlertTitle className="flex items-center gap-4">
                        Final Grade: 
                        <span className="text-2xl font-bold text-primary flex items-center">
                        {state.data.grade}
                        </span>
                    </AlertTitle>
                    <AlertDescription className="mt-4 text-foreground/80">
                        <strong>Inspector's Report:</strong> {state.data.report}
                    </AlertDescription>
                    </Alert>
                ) : (
                    <div className="text-center text-muted-foreground">
                        <p>Your grading result will appear here.</p>
                    </div>
                )}
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
