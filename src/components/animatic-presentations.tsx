
'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Bot, Sparkles, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { generatePresentationAction } from '@/app/actions';
import type { PresentationWithImages, SlideWithImage } from '@/ai/flows/generate-presentation-flow';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

export function AnimaticPresentations() {
  const [topic, setTopic] = useState<string>('');
  const [presentation, setPresentation] = useState<PresentationWithImages | null>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleGenerate = () => {
    if (!topic) {
      toast({
        title: 'Error',
        description: 'Please enter a topic to generate a presentation.',
        variant: 'destructive',
      });
      return;
    }
    
    startTransition(async () => {
      setPresentation(null);
      const result = await generatePresentationAction(topic);
      if (result.error) {
        toast({
          title: 'Generation Failed',
          description: result.error,
          variant: 'destructive',
        });
      } else if (result.presentation) {
        setPresentation(result.presentation);
        toast({
          title: 'Success!',
          description: 'Your presentation has been generated.',
        });
      }
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="p-6 border-b sticky top-0 bg-background/95 backdrop-blur-sm z-10">
        <div className="container mx-auto flex items-center justify-between">
          <div className="text-left">
            <h1 className="text-xl md:text-3xl font-bold">Animatic Presentations</h1>
            <p className="text-xs md:text-sm text-muted-foreground">Generate presentations from a topic.</p>
          </div>
          <Button asChild variant="outline">
            <Link href="/">
              <ArrowLeft className="w-4 h-4 md:mr-2" />
              <span className="hidden md:inline">Back to Dashboard</span>
            </Link>
          </Button>
        </div>
      </header>
      <main className="flex-grow p-4 md:p-8">
        <div className="container mx-auto">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot />
                AI Presentation Generator
              </CardTitle>
              <CardDescription>
                Enter a topic, and our AI will create a short animatic presentation with a script and images.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex w-full items-center space-x-2">
                <Input
                  id="topic"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g., The history of space exploration"
                  disabled={isPending}
                />
                <Button onClick={handleGenerate} disabled={isPending}>
                  {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                  <span className="hidden sm:inline ml-2">Generate</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {isPending && (
            <div className="text-center mt-8">
              <Loader2 className="mx-auto w-12 h-12 animate-spin text-primary" />
              <p className="mt-4 text-muted-foreground">Generating your presentation... this may take a minute.</p>
            </div>
          )}

          {presentation && (
            <div className="mt-8">
              <h2 className="text-3xl font-bold text-center mb-6">{presentation.title}</h2>
              <Carousel className="w-full max-w-4xl mx-auto">
                <CarouselContent>
                  {presentation.slides.map((slide: SlideWithImage, index: number) => (
                    <CarouselItem key={index}>
                      <div className="p-1">
                        <Card className="overflow-hidden">
                          <CardContent className="flex flex-col md:flex-row items-center justify-center p-0">
                            <div className="relative w-full md:w-1/2 aspect-video">
                                <Image
                                    src={slide.imageUrl}
                                    alt={`Slide ${index + 1} for "${presentation.title}"`}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </div>
                            <div className="w-full md:w-1/2 p-6">
                                <h3 className="font-bold text-lg mb-2">{slide.speaker}</h3>
                                <p className="text-muted-foreground">{slide.text}</p>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="hidden sm:flex" />
                <CarouselNext className="hidden sm:flex" />
              </Carousel>
            </div>
          )}
        </div>
      </main>
      <footer className="p-6 text-sm text-center border-t text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Server Dashboard. All rights reserved.</p>
      </footer>
    </div>
  );
}
