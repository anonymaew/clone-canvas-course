import { trpc } from "../../../utils/trpc";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";

export default () => {
  const router = useRouter();
  const courseId = router.query.courseId as string;
  const { data: session, status } = useSession();
  const { data: courseData, isLoading } = trpc.useQuery([
    "course.read.teach.one",
    courseId,
  ]);

  if (isLoading || !courseData) {
    return <p>Loading...</p>;
  }

  if (status !== "loading" && !session) {
    router.push("/login");
  }

  return (
    <div>
      <div>
        <h1>{courseData.title || "Untitled"}</h1>
        <p>
          {courseData.content || "Instructors have not put any content yet."}
        </p>
      </div>
    </div>
  );
};
