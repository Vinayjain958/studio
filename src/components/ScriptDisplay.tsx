'use client';

import { type Script } from '@/lib/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Copy, RefreshCw, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Separator } from './ui/separator';

interface ScriptDisplayProps {
  script: Script;
  onRegenerate: () => void;
}

function formatScriptForCopy(script: Script): string {
    let text = `${script.sceneTitle}\n\n`;
    text += `Estimated Runtime: ${script.estimatedRuntime}\n\n`;
    text += `Setting: ${script.settingDescription}\n\n`;
    text += 'CHARACTERS:\n';
    script.characters.forEach(c => {
        text += `- ${c.name}: ${c.description}\n`;
    });
    text += '\n---\n\n';

    let lastElementType: string | null = null;
    script.scriptElements.forEach((element, index) => {
        switch (element.type) {
            case 'scene_heading':
                text += `${element.content.toUpperCase()}\n\n`;
                break;
            case 'action':
            case 'camera':
            case 'shot':
                text += `${element.content}\n\n`;
                break;
            case 'character':
                // Add space before a new character speaks, but not at the start
                if(lastElementType === 'dialogue' || lastElementType === 'parenthetical') {
                  text += '\n';
                }
                text += `    ${element.content.toUpperCase()}\n`;
                break;
            case 'dialogue':
                text += `        ${element.content}\n`;
                break;
            case 'parenthetical':
                text += `        ${element.content}\n`;
                break;
        }
        lastElementType = element.type;
    });

    return text.replace(/\n\n\n/g, '\n\n'); // Clean up extra newlines
}

export function ScriptDisplay({ script, onRegenerate }: ScriptDisplayProps) {
  const { toast } = useToast();

  const handleCopy = () => {
    const scriptText = formatScriptForCopy(script);
    navigator.clipboard.writeText(scriptText);
    toast({
      title: 'Script Copied!',
      description: 'The formatted script has been copied to your clipboard.',
    });
  };

  const renderScriptElement = (
    element: Script['scriptElements'][0],
    index: number
  ) => {
    switch (element.type) {
      case 'scene_heading':
        return <h3 key={index} className="font-bold text-lg uppercase my-4">{element.content}</h3>;
      case 'action':
      case 'camera':
      case 'shot':
        return <p key={index} className="my-3 text-muted-foreground">{element.content}</p>;
      case 'character':
        return <p key={index} className="font-medium text-center uppercase mt-4 mb-1">{element.content}</p>;
      case 'dialogue':
        return <p key={index} className="text-center max-w-md mx-auto">{element.content}</p>;
      case 'parenthetical':
        return <p key={index} className="text-center text-sm text-muted-foreground italic">{element.content}</p>;
      default:
        return null;
    }
  };

  return (
    <Card className="shadow-lg animate-in fade-in-50 duration-500">
      <CardHeader>
        <CardTitle className="text-2xl font-bold tracking-tight">{script.sceneTitle}</CardTitle>
        <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2">
            <Clock className="h-4 w-4" />
            <span>Estimated runtime: {script.estimatedRuntime}</span>
        </div>
        <CardDescription>{script.settingDescription}</CardDescription>
      </CardHeader>
      <Separator className="my-0"/>
      <CardContent className="p-6">
        <div>
          <h4 className="font-semibold text-lg mb-2">Characters</h4>
          <div className="flex flex-wrap gap-2 mb-6">
            {script.characters.map((char) => (
              <Badge key={char.name} variant="secondary" className="text-sm">
                {char.name.toUpperCase()}
              </Badge>
            ))}
          </div>
        </div>
        <div className="font-mono bg-card p-4 sm:p-6 rounded-md border">
            {script.scriptElements.map(renderScriptElement)}
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline" onClick={onRegenerate}>
          <RefreshCw />
          Regenerate
        </Button>
        <Button onClick={handleCopy}>
          <Copy />
          Copy Script
        Button>
      </CardFooter>
    </Card>
  );
}
