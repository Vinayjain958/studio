export type ScriptCharacter = {
  name: string;
  description: string;
};

export type ScriptElement = {
  type:
    | 'scene_heading'
    | 'action'
    | 'character'
    | 'dialogue'
    | 'parenthetical'
    | 'shot'
    | 'camera';
  content: string;
};

export type Script = {
  sceneTitle: string;
  estimatedRuntime: string;
  settingDescription: string;
  characters: ScriptCharacter[];
  scriptElements: ScriptElement[];
};
