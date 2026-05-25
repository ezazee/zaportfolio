import SkeletonLoader from "@/common/components/elements/SkeletonLoader";
import Skeleton from "react-loading-skeleton";

const ProjectSkeleton = () => {
  return (
    <SkeletonLoader>
      <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-neutral-200 dark:border-neutral-800">
        <Skeleton
          containerClassName="block leading-none"
          className="aspect-video !rounded-b-none !rounded-t-3xl"
        />
        <div className="flex flex-col gap-4 p-5">
          <Skeleton containerClassName="block leading-none w-3/4" className="h-6" />
          <div className="space-y-2">
            <Skeleton containerClassName="block leading-none" className="h-4" />
            <Skeleton containerClassName="block leading-none w-5/6" className="h-4" />
          </div>
          <div className="flex gap-3">
            {[...Array(3)].map((_, i) => (
              <Skeleton
                containerClassName="block leading-none"
                key={i}
                circle
                className="h-6 w-6"
              />
            ))}
          </div>
          <div className="flex gap-4 border-t border-neutral-100 pt-4 dark:border-neutral-800">
             <Skeleton containerClassName="block leading-none" className="h-4 w-10" />
             <Skeleton containerClassName="block leading-none" className="h-4 w-10" />
          </div>
        </div>
      </div>
    </SkeletonLoader>
  );
};

export default ProjectSkeleton;
