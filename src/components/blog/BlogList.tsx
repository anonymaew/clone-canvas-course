import Link from 'next/link';
import { useRouter } from 'next/router';

import TextSkeleton from '../skeleton/TextSkeleton';

interface BlogListProps {
  list: {
    id: string;
    title: string;
    created: Date;
    updated: Date;
  }[];
}

const BlogList = (props: {
  data: BlogListProps | null;
  loading: boolean;
  enrollLink: string;
  enrolled: boolean;
}) => {
  const router = useRouter();

  return (
    <>
      {!props.loading && props.data !== undefined && props.data !== null ? (
        <div>
          {props.data.list.map((item, index) => (
            <Link href={`${router.asPath}/${item.id}`} key={index}>
              <div className="p-4 m-4 duration-300 ease-in-out border rounded-md shadow-md cursor-pointer hover:scale-105 hover:bg-slate-300 border-slate-300">
                <h2 className="text-2xl font-bold underline">{item.title}</h2>
                <div className="text-sm text-slate-500">
                  <p>{item.created.toLocaleDateString()}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <TextSkeleton />
      )}
    </>
  );
};

export default BlogList;
