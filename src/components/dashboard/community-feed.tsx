
"use client";

import * as React from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Heart, MessageCircle, Share2, ImagePlus, Send, PlusSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const initialPosts = [
  {
    id: 1,
    author: {
      name: "John D.",
      avatar: "https://placehold.co/100x100.png",
      aiHint: "farmer portrait",
      fallback: "JD",
    },
    content: "Harvested a beautiful batch of winter wheat today! The quality is looking top-notch this season. #Harvest2024 #Wheat",
    image: "https://placehold.co/600x400.png",
    imageAiHint: "wheat field",
    likes: 42,
    comments: 8,
  },
  {
    id: 2,
    author: {
      name: "Fresh Produce Co.",
      avatar: "https://placehold.co/100x100.png",
      aiHint: "company logo",
      fallback: "FP",
    },
    content: "We're excited to announce our new partnership with local organic farms! Looking to source the best heirloom tomatoes. 🍅",
    image: "https://placehold.co/600x400.png",
    imageAiHint: "organic tomatoes",
    likes: 120,
    comments: 23,
  },
];


export function CommunityFeed() {
    const { toast } = useToast();
    const [posts, setPosts] = React.useState(initialPosts);
    const [newPostContent, setNewPostContent] = React.useState("");
    const [previewImage, setPreviewImage] = React.useState<string | null>(null);
    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const [isCreatePostOpen, setIsCreatePostOpen] = React.useState(false);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setPreviewImage(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };
    
    const handleCreatePost = (e: React.FormEvent) => {
        e.preventDefault();
        if(!newPostContent.trim() && !previewImage) {
             toast({
                variant: "destructive",
                title: "Empty Post",
                description: "Please add some content or an image to your post.",
            });
            return;
        }

        const newPost = {
            id: posts.length + 1,
            author: { name: 'You', avatar: 'https://placehold.co/100x100.png', aiHint: 'profile picture', fallback: 'U' },
            content: newPostContent,
            image: previewImage || "",
            imageAiHint: "community post",
            likes: 0,
            comments: 0,
        };

        setPosts([newPost, ...posts]);
        setNewPostContent("");
        setPreviewImage(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
        setIsCreatePostOpen(false);
        toast({
            title: "Post Created!",
            description: "Your post is now live in the community feed.",
        });
    };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="md:col-span-2 space-y-6">
        <Dialog open={isCreatePostOpen} onOpenChange={setIsCreatePostOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full py-6 text-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <PlusSquare className="mr-2 h-6 w-6" /> Create New Post
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create a new post</DialogTitle>
            </DialogHeader>
             <form onSubmit={handleCreatePost} className="space-y-4 pt-4">
                <Textarea 
                    placeholder="What's on your mind?" 
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    className="resize-none"
                />
                    {previewImage && (
                    <div className="relative w-full aspect-video rounded-md overflow-hidden">
                        <Image src={previewImage} alt="Preview" layout="fill" objectFit="cover" />
                    </div>
                )}
                <div className="flex justify-between items-center">
                    <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()}>
                        <ImagePlus className="mr-2 h-4 w-4" />
                        Add Image
                    </Button>
                    <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
                    <Button type="submit">
                        <Send className="mr-2 h-4 w-4" />
                        Post
                    </Button>
                </div>
            </form>
          </DialogContent>
        </Dialog>

        <div className="space-y-6">
            {posts.map((post) => (
            <Card key={post.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="flex flex-row items-center gap-4">
                <Avatar>
                    <AvatarImage src={post.author.avatar} alt={post.author.name} data-ai-hint={post.author.aiHint} />
                    <AvatarFallback>{post.author.fallback}</AvatarFallback>
                </Avatar>
                <p className="font-semibold">{post.author.name}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                <p>{post.content}</p>
                {post.image && (
                    <div className="rounded-md overflow-hidden border">
                        <Image
                            src={post.image}
                            alt={`Post by ${post.author.name}`}
                            width={600}
                            height={400}
                            className="w-full h-auto"
                            data-ai-hint={post.imageAiHint}
                        />
                    </div>
                )}
                <div className="flex justify-between items-center text-muted-foreground pt-2 border-t">
                    <div className="flex gap-4">
                        <Button variant="ghost" size="sm" className="flex items-center gap-2">
                            <Heart className="h-5 w-5" /> {post.likes}
                        </Button>
                        <Button variant="ghost" size="sm" className="flex items-center gap-2">
                            <MessageCircle className="h-5 w-5" /> {post.comments}
                        </Button>
                    </div>
                    <Button variant="ghost" size="sm" className="flex items-center gap-2">
                        <Share2 className="h-5 w-5" /> Share
                    </Button>
                </div>
                </CardContent>
            </Card>
            ))}
        </div>
      </div>
      <div className="hidden md:block space-y-6">
        <Card>
            <CardHeader>
                <h3 className="font-semibold">Trending Topics</h3>
            </CardHeader>
            <CardContent>
                <ul className="space-y-2 text-sm text-primary">
                    <li><a href="#" className="hover:underline">#Harvest2024</a></li>
                    <li><a href="#" className="hover:underline">#OrganicFarming</a></li>
                    <li><a href="#" className="hover:underline">#NewTech</a></li>
                    <li><a href="#" className="hover:underline">#MarketPrices</a></li>
                </ul>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
