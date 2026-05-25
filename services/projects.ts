import { supabase } from "@/common/utils/supabase";
import { ProjectItem } from "@/common/types/projects";

const transform = (row: any): ProjectItem => ({
  id: row.id,
  title: row.title,
  slug: row.slug,
  description: { en: row.description_en || "", id: row.description_id || "" },
  image: row.image || "",
  link_demo: row.link_demo,
  link_github: row.link_github,
  stacks: row.stacks || [],
  is_show: row.is_show,
  is_featured: row.is_featured,
  category: row.category || "",
  type: row.type || "",
  details: row.details || null,
});

interface GetProjectsDataProps {
  category?: string;
  type?: string;
  search?: string;
}

export const getProjectsData = async ({ category, type, search }: GetProjectsDataProps = {}) => {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("is_show", true)
    .order("display_order", { ascending: true });

  let result: ProjectItem[] = data?.map(transform) ?? [];

  if (category && category !== "Semua") result = result.filter(i => i.category === category);
  if (type && type !== "Semua") result = result.filter(i => i.type === type);
  if (search) {
    const s = search.toLowerCase();
    result = result.filter(i =>
      i.title.toLowerCase().includes(s) ||
      i.description.en.toLowerCase().includes(s) ||
      i.description.id.toLowerCase().includes(s)
    );
  }
  return result;
};

export const getProjectsDataBySlug = async (slug: string) => {
  const { data, error } = await supabase.from("projects").select("*").eq("slug", slug).single();
  if (!error && data) return transform(data);
  return null;
};

export const getProjectCategories = async () => {
  const { data } = await supabase.from("projects").select("category").eq("is_show", true);
  if (!data) return [];
  return Array.from(new Set(data.map(r => r.category).filter(Boolean)));
};

export const getProjectTypeOptions = async () => {
  const { data } = await supabase.from("projects").select("type").eq("is_show", true);
  if (!data) return [];
  return Array.from(new Set(data.map(r => r.type).filter(Boolean)));
};
