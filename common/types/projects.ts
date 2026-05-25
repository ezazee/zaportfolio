export interface ProjectItem {
  id: number;
  title: string;
  slug: string;
  description: { en: string; id: string };
  image: string;
  link_demo?: string | null;
  link_github?: string | null;
  stacks: string[];
  content?: { en: string; id: string } | null;
  is_show: boolean;
  is_featured: boolean;
  category: string;
  type: string;
  reactions?: { icon: string; count: number }[];
  views?: number;
  details?: {
    about: { en: string; id: string };
    client: string;
    role: string;
    duration: string;
    features: { en: string; id: string }[];
    gallery?: string[];
    detailed_stacks?: { 
      name: string; 
      description: { en: string; id: string } | string;
      icon: string;
    }[];
    challenges?: {
      problem: { en: string; id: string };
      solution: { en: string; id: string };
    }[];
    lessons_learned?: { en: string; id: string }[];
    getting_started?: {
      title: { en: string; id: string };
      steps: { 
        name: { en: string; id: string }; 
        code: string;
        description?: { en: string; id: string };
      }[];
    };
  };
}

export type ProjectItemProps = {
  projects: ProjectItem[];
};
