export type EducationProps = {
  school: string;
  major: { en: string; id: string };
  logo: string;
  location: string;
  degree: { en: string; id: string };
  GPA?: string;
  start_year: number;
  end_year: number | { en: string; id: string };
  link: string;
};
