'use client';

import { useState } from 'react';
import {
  generateMovieSceneScript,
  type GenerateMovieSceneScriptOutput,
} from '@/ai/flows/generate-movie-scene-script-flow';
import {
  regenerateMovieSceneScript,
  type RegenerateMovieSceneScriptOutput,
} from '@/ai/flows/regenerate-movie-scene-script';
import { type Script, type ScriptElement } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { WandSparkles, AlertCircle } from 'lucide-react';
import { Header } from '@/components/Header';
import { ScriptDisplay } from '@/components/ScriptDisplay';
import { ScriptSkeleton } from '@/components/ScriptSkeleton';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// Normalization functions to handle different AI output structures
function normalizeGeneratedScript(data: GenerateMovieSceneScriptOutput): Script {
  return {
    ...data,
    characters: data.characters.map((c) => ({
      name: c.name,
      description: c.description,
    })),
    scriptElements: data.scriptElements.map((e) => ({
      type: e.type,
      content: e.content,
    })),
  };
}

function normalizeRegeneratedScript(
  data: RegenerateMovieSceneScriptOutput,
  originalCharacters: Script['characters']
): Script {
  const scriptElements: ScriptElement[] = data.scriptBlocks
    .map((block) => {
      if (block.type === 'dialogue') {
        return [
          { type: 'character' as const, content: block.character.toUpperCase() },
          { type: 'dialogue' as const, content: block.content },
        ];
      }
      // Add scene_heading for consistency
      if (block.type === 'action' && scriptElements.length === 0) {
        return { type: 'action' as const, content: block.content };
      }
      return { type: block.type, content: block.content };
    })
    .flat();
  
  // Add scene heading if not present
  if (!scriptElements.some(el => el.type === 'scene_heading')) {
    scriptElements.unshift({ type: 'scene_heading', content: data.sceneTitle })
  }

  const characters = data.characterList.map((name) => {
    const existing = originalCharacters.find(
      (c) => c.name.toLowerCase() === name.toLowerCase()
    );
    return (
      existing || { name: name.toUpperCase(), description: 'A character in the scene.' }
    );
  });

  return { ...data, characters, scriptElements };
}

export default function MovieScripterPage() {
  const [mood, setMood] = useState('');
  const [script, setScript] = useState<Script | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!mood.trim()) {
      setError('Please enter a mood or theme to generate a script.');
      return;
    }
    setError(null);
    setLoading(true);
    setScript(null);
    try {
      const result = await generateMovieSceneScript({ moodOrTheme: mood });
      setScript(normalizeGeneratedScript(result));
    } catch (e) {
      console.error(e);
      setError('Failed to generate script. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegenerate = async () => {
    if (!mood.trim()) return;
    setError(null);
    setLoading(true);
    setScript(null);
    try {
      const result = await regenerateMovieSceneScript({ moodOrTheme: mood });
      // Pass original characters for description mapping
      setScript(normalizeRegeneratedScript(result, script?.characters || []));
    } catch (e) {
      console.error(e);
      setError('Failed to regenerate script. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent/5 dark:from-accent/10 to-background">
      <Header />
      <main className="flex-1 container mx-auto p-4 md:p-8">
        <div className="max-w-4xl mx-auto flex flex-col gap-8">
          <section id="generator">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold tracking-tight">Generate Your Scene</CardTitle>
                <CardDescription>Enter a mood or genre, and let AI craft a cinematic script for you.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <Textarea
                    placeholder="e.g., Tense mystery, Romantic drama, Sci-fi thriller..."
                    value={mood}
                    onChange={(e) => setMood(e.target.value)}
                    className="min-h-[100px] text-base resize-none"
                    disabled={loading}
                  />
                  <Button onClick={handleGenerate} disabled={loading || !mood.trim()} size="lg">
                    <WandSparkles />
                    {loading ? 'Generating...' : 'Generate Script'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <section id="script-display">
            {loading && <ScriptSkeleton />}
            {!loading && script && (
              <ScriptDisplay script={script} onRegenerate={handleRegenerate} />
            )}
             {!loading && !script && !error && (
              <div className="text-center text-muted-foreground py-16 px-8 border-2 border-dashed rounded-lg">
                <h3 className="text-lg font-medium">Your script will appear here</h3>
                <p>Start by entering a mood and clicking "Generate Script".</p>
              </div>
            )}
          </section>
        </div>
      </main>
      <footer className="py-4 text-center text-xs text-muted-foreground">
        Built for the modern storyteller.
      </footer>
    </div>
  );
}
