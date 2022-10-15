export interface IScraped {}

export interface IProfile extends IScraped {
  url: string;
  name: string;
  location: string;
  description: string;
  projects: string[];
  awards: number;
}

export interface IBlog extends IScraped {
  url: string;
  title: string;
  author: string;
  date: Date;
  category: string;
  likes: number;
  body: string;
}

export interface ISite extends IScraped {
  url: string;
  name: string;
  description: string;
  creator: string;
  country: string;
  colors: string[];
  categories: string[];
  likes: number;
}

export interface IWebReport extends IScraped {
  url: string;
  overall: number;
  design: number;
  usability: number;
  creativity: number;
  content: number;
  developer: number;
}

export interface IMobileReport extends IScraped {
  url: string;
  name: string;
  scores: {
    overall: number;
    friendliness: {
      overall: number;
      breakdown: Record<string, ICriteria>;
    };
    performance: {
      overall: number;
      breakdown: Record<string, ICriteria>;
    };
    usability: {
      overall: number;
      breakdown: Record<string, ICriteria>;
    };
    pwa: {
      overall: number;
      breakdown: Record<string, ICriteria>;
    };
  };
}

export interface ICriteria {
  text: string;
  pass: boolean;
  value?: string;
}

export type DirectoryScraper = (idx: number) => Promise<string[]>;
export type DocumentScraper<T extends IScraped = IScraped> = (url: string) => Promise<T>;
