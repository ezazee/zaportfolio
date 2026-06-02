import Link from "next/link";
import { BsStarFill as StarIcon } from "react-icons/bs";
import { BiGitRepoForked as ForkIcon } from "react-icons/bi";
import { useTranslations } from "next-intl";

interface Repo {
  name: string;
  description?: string;
  url: string;
  stargazerCount: number;
  forkCount: number;
  primaryLanguage?: {
    name: string;
    color: string;
  };
}

interface PinnedReposProps {
  repos: Repo[];
}

const PinnedRepos = ({ repos }: PinnedReposProps) => {
  const t = useTranslations("DashboardPage.github");

  if (!repos?.length) return null;

  return (
    <div className="space-y-3">
      <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
        {t("title_pinned_repos")}
      </span>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {repos.map((repo) => (
          <Link
            key={repo.name}
            href={repo.url}
            target="_blank"
            className="group flex flex-col justify-between gap-3 rounded-2xl border border-neutral-200 bg-neutral-100 p-4 transition-all duration-300 hover:border-neutral-400 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-600"
          >
            <div className="space-y-1.5">
              <span className="font-semibold text-neutral-900 transition-colors group-hover:text-accent dark:text-neutral-100">
                {repo.name}
              </span>
              {repo.description && (
                <p className="line-clamp-2 text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
                  {repo.description}
                </p>
              )}
            </div>

            <div className="flex items-center gap-4 text-xs text-neutral-500 dark:text-neutral-400">
              {repo.primaryLanguage && (
                <span className="flex items-center gap-1.5">
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: repo.primaryLanguage.color }}
                  />
                  {repo.primaryLanguage.name}
                </span>
              )}
              <span className="flex items-center gap-1">
                <StarIcon size={11} />
                {repo.stargazerCount}
              </span>
              <span className="flex items-center gap-1">
                <ForkIcon size={13} />
                {repo.forkCount}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PinnedRepos;
