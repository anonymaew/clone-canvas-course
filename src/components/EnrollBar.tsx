import Link from 'next/link';

const EnrollBar = (props: { enrollLink: string }) => {
  return (
    <div>
      <Link href={props.enrollLink}>
        <a>Click here to enroll</a>
      </Link>
    </div>
  );
};

export default EnrollBar;
