'use server';
/**
 * @fileOverview A Genkit flow for regenerating an alternate movie scene script.
 *
 * - regenerateMovieSceneScript - A function that handles the regeneration process.
 * - RegenerateMovieSceneScriptInput - The input type for the regenerateMovieSceneScript function.
 * - RegenerateMovieSceneScriptOutput - The return type for the regenerateMovieSceneScript function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ScriptDialogueBlockSchema = z.object({
  type: z.literal('dialogue').describe('Indicates this is a dialogue block.'),
  character: z.string().describe('The name of the character speaking.'),
  content: z.string().describe('The dialogue spoken by the character.'),
});

const ScriptActionBlockSchema = z.object({
  type: z.literal('action').describe('Indicates this is an action or scene direction block.'),
  content: z.string().describe('A description of an action or general scene direction.'),
});

const ScriptCameraBlockSchema = z.object({
  type: z.literal('camera').describe('Indicates this is a camera direction block.'),
  content: z.string().describe('A camera direction (e.g., CLOSE UP, WIDE SHOT, TRACKING SHOT).'),
});

const ScriptBlockSchema = z.union([
  ScriptDialogueBlockSchema,
  ScriptActionBlockSchema,
  ScriptCameraBlockSchema,
]).describe('A block within the movie script, can be dialogue, action, or camera instruction.');

const RegenerateMovieSceneScriptInputSchema = z.object({
  moodOrTheme: z.string().describe('The mood or theme for the movie scene (e.g., "Tense mystery", "Romantic drama", "Sci-fi thriller").'),
});
export type RegenerateMovieSceneScriptInput = z.infer<typeof RegenerateMovieSceneScriptInputSchema>;

const RegenerateMovieSceneScriptOutputSchema = z.object({
  sceneTitle: z.string().describe('The title of the generated movie scene.'),
  estimatedRuntime: z.string().describe('The estimated runtime of the scene, e.g., "1-2 minutes".'),
  settingDescription: z.string().describe('A detailed description of the scene\'s setting, including time and location.'),
  characterList: z.array(z.string()).describe('A list of characters present in the scene.'),
  scriptBlocks: z.array(ScriptBlockSchema).describe('An array of structured script blocks, including dialogue, actions, and camera directions.'),
});
export type RegenerateMovieSceneScriptOutput = z.infer<typeof RegenerateMovieSceneScriptOutputSchema>;

export async function regenerateMovieSceneScript(input: RegenerateMovieSceneScriptInput): Promise<RegenerateMovieSceneScriptOutput> {
  return regenerateMovieSceneScriptFlow(input);
}

const regenerateMovieSceneScriptPrompt = ai.definePrompt({
  name: 'regenerateMovieSceneScriptPrompt',
  input: { schema: RegenerateMovieSceneScriptInputSchema },
  output: { schema: RegenerateMovieSceneScriptOutputSchema },
  prompt: `You are a professional screenwriter. Your task is to generate a completely new and distinct movie scene script based on the provided mood or theme. The script should be cinematic, well-structured, and include all necessary elements for a professional screenplay.

Ensure the scene follows a basic cinematic structure, including an opening shot, character introduction, conflict, climax, and an ending shot. Focus on creating an alternate interpretation of a scene for the given mood, providing fresh dialogue, actions, and camera directions.

Mood/Theme: {{{moodOrTheme}}}

Generate the scene in the following JSON format, strictly adhering to the schema. Make sure to provide a variety of script block types (dialogue, action, camera) and ensure the estimated runtime is a realistic range (e.g., "1-2 minutes").`,
});

const regenerateMovieSceneScriptFlow = ai.defineFlow(
  {
    name: 'regenerateMovieSceneScriptFlow',
    inputSchema: RegenerateMovieSceneScriptInputSchema,
    outputSchema: RegenerateMovieSceneScriptOutputSchema,
  },
  async (input) => {
    const { output } = await regenerateMovieSceneScriptPrompt(input);
    if (!output) {
      throw new Error('Failed to generate script output.');
    }
    return output;
  }
);
