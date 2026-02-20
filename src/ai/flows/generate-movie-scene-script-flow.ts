'use server';

/**
 * @fileOverview A Genkit flow for generating professional movie scene scripts based on mood or theme.
 *
 * - generateMovieSceneScript - A function that handles the movie scene script generation process.
 * - GenerateMovieSceneScriptInput - The input type for the generateMovieSceneScript function.
 * - GenerateMovieSceneScriptOutput - The return type for the generateMovieSceneScript function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

// Input Schema
const GenerateMovieSceneScriptInputSchema = z.object({
  moodOrTheme: z.string().describe('The desired mood, genre, or theme for the movie scene (e.g., "Tense mystery", "Romantic drama", "Sci-fi thriller").'),
});
export type GenerateMovieSceneScriptInput = z.infer<typeof GenerateMovieSceneScriptInputSchema>;

// Output Schema
const GenerateMovieSceneScriptOutputSchema = z.object({
  sceneTitle: z.string().describe('The title of the movie scene (e.g., "INT. ABANDONED WAREHOUSE - NIGHT").'),
  estimatedRuntime: z.string().describe('The estimated runtime of the scene, e.g., "1-2 minutes".'),
  settingDescription: z.string().describe('A detailed description of the scene setting and atmosphere.'),
  characters: z.array(z.object({
    name: z.string().describe('The full name of the character, in ALL CAPS for screenwriting format.'),
    description: z.string().describe('A brief physical and personality description of the character.'),
  })).describe('A list of characters appearing in the scene, each with a name and a description.'),
  scriptElements: z.array(z.object({
    type: z.enum(['scene_heading', 'action', 'character', 'dialogue', 'parenthetical', 'shot']).describe('The type of screenplay element. Use "scene_heading" for location/time (e.g., INT. CAFE - DAY), "action" for narrative descriptions, "character" for character names (ALL CAPS), "dialogue" for spoken lines, "parenthetical" for character emotions/actions during dialogue (e.g., (whispering)), "shot" for specific camera directions (e.g., CLOSE UP - JOHN\'S FACE).'),
    content: z.string().describe('The content of the screenplay element.'),
  })).describe('A structured array of screenplay elements, following professional script formatting. Ensure a logical flow that includes an opening shot, character introduction, conflict, climax, and an ending shot. The types should strictly follow standard screenplay order: scene_heading, action, character, parenthetical (optional), dialogue, shot (optional).'),
});
export type GenerateMovieSceneScriptOutput = z.infer<typeof GenerateMovieSceneScriptOutputSchema>;

export async function generateMovieSceneScript(input: GenerateMovieSceneScriptInput): Promise<GenerateMovieSceneScriptOutput> {
  return generateMovieSceneScriptFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateMovieSceneScriptPrompt',
  input: { schema: GenerateMovieSceneScriptInputSchema },
  output: { schema: GenerateMovieSceneScriptOutputSchema },
  prompt: `You are an expert screenwriter and filmmaker. Your task is to generate a professional, structured movie scene script based on the provided mood or theme.

The script should adhere to industry-standard formatting and include all necessary elements.
The scene must follow a classic cinematic structure:
1.  **Opening Shot**: Establish the scene visually.
2.  **Character Introduction**: Introduce key characters within the context of the mood/theme.
3.  **Conflict/Inciting Incident**: Introduce a clear conflict or a pivotal moment.
4.  **Climax**: The peak of the tension or resolution of the conflict within this scene.
5.  **Ending Shot**: A concluding visual that leaves an impact or sets up the next scene.

Generate the following components:

**1. Scene Title**: A standard scene heading (e.g., INT. LOCATION - DAY/NIGHT).
**2. Estimated Runtime**: A realistic estimate for the scene's duration (e.g., "1-2 minutes").
**3. Setting Description**: A vivid and detailed description of the scene's environment, enhancing the mood.
**4. Characters**: A list of all characters in the scene, each with an ALL CAPS name and a brief description.
**5. Script Elements**: An ordered array of screenplay elements. Each element must have a 'type' and 'content'.
    - Use 'scene_heading' for the scene's location and time.
    - Use 'action' for narrative descriptions of what is happening, what characters are doing, and sensory details.
    - Use 'character' for the name of the character speaking (ALL CAPS).
    - Use 'dialogue' for the lines spoken by a character.
    - Use 'parenthetical' for a character's tone, expression, or small action while speaking, placed in parentheses.
    - Use 'shot' for specific camera directions (e.g., CLOSE UP - JOHN\'S FACE, WIDE SHOT, TRACKING SHOT).

Ensure the entire script flows logically, building tension or emotion according to the "{{{moodOrTheme}}}". The 'scriptElements' array should clearly tell the story of the scene from start to finish, incorporating the cinematic structure points.

Strictly adhere to the JSON schema for output.

Mood/Theme: {{{moodOrTheme}}}
`,
});

const generateMovieSceneScriptFlow = ai.defineFlow(
  {
    name: 'generateMovieSceneScriptFlow',
    inputSchema: GenerateMovieSceneScriptInputSchema,
    outputSchema: GenerateMovieSceneScriptOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
      throw new Error('Failed to generate movie scene script.');
    }
    return output;
  }
);
