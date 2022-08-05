import Link from "next/link";

const Navbar = () => {
  return (
    <div>
      <Link href="/">
        <a>Home</a>
      </Link>
      <Link href="/course">
        <a>My course</a>
      </Link>
      <Link href="/teacher-dashboard">
        <a>Teacher dashboard</a>
      </Link>
      <Link href="/admin-dashboard">
        <a>Admin dashboard</a>
      </Link>
    </div>
  );
};

export default Navbar;
