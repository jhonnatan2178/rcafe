
export enum Language {
  PYTHON = 'Python',
  R = 'R'
}

export interface MapData {
  center: [number, number];
  zoom: number;
  geoJson: any;
  overlayLabel: string;
}

export interface TutorialSection {
  id: string;
  title: string;
  description: string;
  content: string;
  codeSnippet: string;
  language: Language;
  mapData?: MapData;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
