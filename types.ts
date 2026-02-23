
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
  language: Language;
  content: string;
  codeSnippet: string;
  category: string;
  level: string;
  createdAt: string;
  image?: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
