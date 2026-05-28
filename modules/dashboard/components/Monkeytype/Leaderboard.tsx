import { useTranslations } from "next-intl";

import SpotlightCard from "@/common/components/elements/SpotlightCard";
import { convertToOrdinal } from "@/common/helpers";
import { MonkeytypeData } from "@/common/types/monkeytype";

interface LeaderboardProps {
  data: MonkeytypeData;
}

interface ItemProps {
  label: string;
  value: string;
  percent?: string;
}

const Leaderboard = ({ data }: LeaderboardProps) => {
  const t = useTranslations("DashboardPage.monkeytype");

  const datas = data?.allTimeLbs?.time ? Object.values(data.allTimeLbs.time) : [];

  const Item = ({ label, value, percent }: ItemProps) => {
    const number = value.replace("th", "");
    return (
      <div className="flex items-center gap-4">
        <div className="flex flex-col items-end gap-y-0.5">
          <span className="text-sm text-neutral-600 dark:text-neutral-400">
            {label} {t("unit_seconds")}
          </span>
          {percent ? (
            <span className="text-xs text-neutral-600 dark:text-neutral-400">
              {t("top")} {percent}%
            </span>
          ) : null}
        </div>
        <div className="flex gap-1">
          <span className="text-2xl text-primary dark:text-neutral-100">{number}</span>
          <span className="text-neutral-400">th</span>
        </div>
      </div>
    );
  };

  return (
    <SpotlightCard className="flex flex-col items-center justify-between gap-y-3 p-4 sm:flex-row sm:gap-y-1">
      <span className="text-sm text-neutral-600 dark:text-neutral-400">
        {t("title_leaderboard")}
      </span>
      {datas.map((data, index) => {
        const rank = data?.english?.rank;
        const count = data?.english?.count;
        const percent = rank && count ? ((rank / count) * 100).toFixed(2) : undefined;
        return (
          <Item
            key={index}
            label={index == 0 ? "15" : "60"}
            value={rank ? convertToOrdinal(rank) : "-"}
            percent={percent}
          />
        );
      })}
    </SpotlightCard>
  );
};

export default Leaderboard;
