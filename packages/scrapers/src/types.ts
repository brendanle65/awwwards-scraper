import { DIRECTORIES } from './constants';

export interface IScraped {}

export interface IUser extends IScraped {
  name: string;
  location: string;
  description: string;
  submissions: string[];
}

export interface ISite extends IScraped {
  web_url: string;
  awwwards_url: string;
  name: string;
  date: Date;
  colors: string[];
  categories: string[];
  creators: { name: string; url: string }[];
  likes: number;
  sotd?: {
    total: number;
    design: number;
    usability: number;
    creativity: number;
    content: number;
  };
  dev?: {
    total: number;
    semantics: number;
    animations: number;
    accessibility: number;
    wpo: number;
    responsive_design: number;
    markup: number;
  };
}

export type DirectoryScraper = (type: keyof typeof DIRECTORIES, idx: number) => Promise<string[]>;
export type SingleScraper<T extends IScraped = IScraped> = (url: string) => Promise<T>;
