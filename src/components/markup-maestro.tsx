
'use client';

import { useState, useTransition } from 'react';
import { Bot, Download, Loader2, Sparkles, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { generateHtmlAction } from '@/app/actions';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const initialHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Awesome Page</title>
    <style>
        body {
            font-family: sans-serif;
            background-color: #f0f0f0;
            color: #333;
            padding: 2rem;
        }
        h1 {
            color: #9F5BBA;
        }
    </style>
</head>
<body>
    <h1>Welcome to Markup Maestro!</h1>
    <p>Edit the HTML on the left to see the changes here.</p>
</body>
</html>`;

export function MarkupMaestro() {
  const [htmlCode, setHtmlCode] = useState<string>(initialHtml);
  const [prompt, setPrompt] = useState<string>('');
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleGenerateHtml = () => {
    if (!prompt) {
      toast({
        title: 'Error',
        description: 'Please enter a prompt to generate HTML.',
        variant: 'destructive',
      });
      return;
    }

    startTransition(async () => {
      const result = await generateHtmlAction(prompt);
      if (result.error) {
        toast({
          title: 'Generation Failed',
          description: result.error,
          variant: 'destructive',
        });
      } else if (result.html) {
        setHtmlCode(result.html);
        toast({
          title: 'Success!',
          description: 'HTML has been generated based on your prompt.',
        });
        setIsDialogOpen(false);
      }
    });
  };

  const handleDownload = () => {
    const blob = new Blob([htmlCode], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'index.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast({ title: 'Success', description: 'HTML file download started.' });
  };
  
  const handleFormatCode = () => {
    // Basic formatting logic. This is a simplified implementation.
    try {
        let formattedCode = '';
        let indentLevel = 0;
        const indentSize = 4;
        const html = htmlCode.replace(/>\s*</g, '>\n<');
        const lines = html.split('\n');

        lines.forEach(line => {
            const trimmedLine = line.trim();
            if (trimmedLine.startsWith('</')) {
                indentLevel = Math.max(0, indentLevel - 1);
            }
            
            formattedCode += ' '.repeat(indentLevel * indentSize) + trimmedLine + '\n';
            
            if (trimmedLine.startsWith('<') && !trimmedLine.startsWith('</') && !trimmedLine.endsWith('/>')) {
                indentLevel++;
            }
        });

        setHtmlCode(formattedCode.trim());
        toast({ title: 'Success', description: 'Code has been formatted.' });
    } catch (e) {
        toast({ title: 'Error', description: 'Could not format the code.', variant: 'destructive'});
    }
  };

  return (
    <TooltipProvider>
      <div className="flex flex-col h-screen bg-background text-foreground">
        <header className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <Code className="w-8 h-8 text-primary" />
            <h1 className="text-2xl font-bold font-headline">Markup Maestro</h1>
          </div>
          <div className="flex items-center gap-2">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="gap-2">
                      <Bot className="w-4 h-4" />
                      <span className="hidden sm:inline">Generate with AI</span>
                    </Button>
                  </DialogTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Generate HTML using AI</p>
                </TooltipContent>
              </Tooltip>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Generate HTML with AI</DialogTitle>
                  <DialogDescription>
                    Describe the webpage you want to create. Our AI will generate the starting HTML for you.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid items-center grid-cols-4 gap-4">
                    <Label htmlFor="prompt" className="text-right">
                      Prompt
                    </Label>
                    <Input id="prompt" value={prompt} onChange={(e) => setPrompt(e.target.value)} className="col-span-3" placeholder="e.g., a simple portfolio page" />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleGenerateHtml} disabled={isPending}>
                    {isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                    Generate
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" onClick={handleFormatCode} className="gap-2">
                  <Sparkles className="w-4 h-4" />
                  <span className="hidden sm:inline">Format</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Format HTML Code</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button onClick={handleDownload} className="gap-2 bg-accent text-accent-foreground hover:bg-accent/90">
                  <Download className="w-4 h-4" />
                  <span className="hidden sm:inline">Download</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Download as .html file</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </header>
        <main className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4 p-4 overflow-hidden">
          <Card className="flex flex-col h-full overflow-hidden">
            <CardHeader>
              <CardTitle>HTML Editor</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <Textarea
                value={htmlCode}
                onChange={(e) => setHtmlCode(e.target.value)}
                placeholder="Type your HTML code here..."
                className="w-full h-full p-4 font-code text-sm !bg-background border-2 border-input focus-visible:ring-primary resize-none"
                aria-label="HTML Code Editor"
              />
            </CardContent>
          </Card>
          <Card className="flex flex-col h-full overflow-hidden">
            <CardHeader>
              <CardTitle>Real-time Preview</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <iframe
                srcDoc={htmlCode}
                title="HTML Preview"
                sandbox="allow-scripts"
                className="w-full h-full bg-white border-2 border-input rounded-md"
                aria-label="HTML Preview"
              />
            </CardContent>
          </Card>
        </main>
      </div>
    </TooltipProvider>
  );
}
