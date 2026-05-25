import { supabase } from "@/common/utils/supabase";
import { AchievementItem } from "@/common/types/achievements";

const transform = (row: any): AchievementItem => ({
  id: row.id,
  credential_id: row.credential_id,
  name: { en: row.name_en, id: row.name_id },
  issuing_organization: { en: row.issuing_organization_en, id: row.issuing_organization_id },
  type: { en: row.type_en, id: row.type_id },
  category: { en: row.category_en, id: row.category_id },
  url_credential: row.url_credential,
  issue_date: row.issue_date,
  image: row.image,
  is_show: row.is_show,
});

interface GetAchievementsDataProps {
  category?: string;
  search?: string;
  type?: string;
}

export const getAchievementsData = async ({ category, search, type }: GetAchievementsDataProps) => {
  const { data, error } = await supabase.from("achievements").select("*").eq("is_show", true).order("issue_date", { ascending: false });

  let result: AchievementItem[] = data?.map(transform) ?? [];

  if (category) result = result.filter(i => i.category.en === category || i.category.id === category);
  if (type) result = result.filter(i => i.type.en === type || i.type.id === type);
  if (search) {
    const s = search.toLowerCase();
    result = result.filter(i =>
      i.name.en.toLowerCase().includes(s) || i.name.id.toLowerCase().includes(s) ||
      i.issuing_organization.en.toLowerCase().includes(s)
    );
  }
  return result;
};

export const getAchivementTypes = async () => {
  const { data } = await supabase.from("achievements").select("type_en, type_id").eq("is_show", true);
  return Array.from(new Map((data ?? []).map(r => [r.type_en, { en: r.type_en, id: r.type_id }])).values());
};

export const getAchivementCategories = async () => {
  const { data } = await supabase.from("achievements").select("category_en, category_id").eq("is_show", true);
  return Array.from(new Map((data ?? []).map(r => [r.category_en, { en: r.category_en, id: r.category_id }])).values());
};
