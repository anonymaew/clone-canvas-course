import Link from 'next/link';

const EnrollBar = (props: { enrollLink: string }) => {
  return (
    <div className="absolute top-0 w-full p-2 bg-violet-600 text-center text-slate-100">
      <p>
        You are not enroll in this course yet. Please{" "}
        <Link href={props.enrollLink}>
          <a className="underline">click here</a>
        </Link>{" "}
        to enroll first.
      </p>
    </div>
  );
};

export default EnrollBar;
