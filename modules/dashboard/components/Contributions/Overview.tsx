import { useTranslations } from "next-intl";

import OverviewItem from "./OverviewItem";

interface OverviewProps {
  data: {
    totalContributions?: number;
    weeks?: {
      contributionDays: {
        contributionCount: number;
      }[];
    }[];
  };
  profile?: {
    followers?: { totalCount: number };
    following?: { totalCount: number };
    repositories?: { totalCount: number };
  };
}

const Overview = ({ data, profile }: OverviewProps) => {
  const totalContributions = data?.totalContributions || 0;
  const weeks = data?.weeks || [];

  const totalThisWeekContribution =
    weeks[weeks.length - 1]?.contributionDays
      ?.map((item) => item.contributionCount)
      ?.reduce((prev, curr) => prev + curr, 0) || 0;

  const totalContributionList = weeks
    .map((week) => week.contributionDays.map((d) => d.contributionCount))
    .flat();

  const bestContribution = Math.max(...totalContributionList) || 0;
  const averageContribution = Math.round(totalContributions / totalContributionList.length);

  const t = useTranslations("DashboardPage.github");

  return (
    <div className="space-y-3 py-2">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.75rem" }}>
        <OverviewItem
          label={t("title_followers")}
          value={profile?.followers?.totalCount ?? 0}
        />
        <OverviewItem
          label={t("title_following")}
          value={profile?.following?.totalCount ?? 0}
        />
        <OverviewItem
          label={t("title_repositories")}
          value={profile?.repositories?.totalCount ?? 0}
        />
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <OverviewItem
          label={t("title_total_contribution")}
          value={totalContributions}
        />
        <OverviewItem
          label={t("title_total_this_week_contribution")}
          value={totalThisWeekContribution}
        />
        <OverviewItem
          label={t("title_best_contribution")}
          value={bestContribution}
        />
        <OverviewItem
          label={t("title_average_contribution")}
          value={averageContribution}
          unit={"/ " + t("unit")}
        />
      </div>
    </div>
  );
};

export default Overview;
