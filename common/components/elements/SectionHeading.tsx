interface SectionHeadingProps {
  title: string;
  icon?: React.ReactNode;
  className?: string;
}

const SectionHeading = ({
  title,
  icon,
  className = "",
}: SectionHeadingProps) => {
  const parts = title.trim().split(" ");
  const lastWord = parts.length > 1 ? parts.pop() : title;
  const firstPart = parts.length > 1 ? parts.join(" ") : parts[0] === lastWord ? "" : parts.join(" ");

  return (
    <div
      className={`flex items-center gap-2.5 text-2xl font-medium text-neutral-800 dark:text-neutral-100 ${className}`}
    >
      {icon ? <i>{icon}</i> : null}
      <h2 className="flex gap-2">
        {firstPart && (
          <span className="font-normal text-neutral-600 dark:text-neutral-400">
            {firstPart}
          </span>
        )}
        <span className="font-bold">{lastWord}</span>
      </h2>
    </div>
  );
};

export default SectionHeading;
