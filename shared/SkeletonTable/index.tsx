import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const indexSkeleton = [1, 2, 3, 4];

export default function SkeletonTable() {
  return (
    <>
      {" "}
      {indexSkeleton.map((el) => (
        <div key={el}>
          <Skeleton height={"5rem"} />
        </div>
      ))}
    </>
  );
}
