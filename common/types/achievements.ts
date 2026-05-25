export interface AchievementItem {
  id: number;
  credential_id?: string;
  slug?: string;
  name: { en: string; id: string };
  issuing_organization: { en: string; id: string };
  type: { en: string; id: string };
  category: { en: string; id: string };
  url_credential?: string;
  issue_date: string;
  expiration_date?: string;
  image: string;
  is_show?: boolean;
}