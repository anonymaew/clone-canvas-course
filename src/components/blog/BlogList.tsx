import Link from 'next/link';

import TextSkeleton from '../skeleton/TextSkeleton';

interface BlogListProps {
  list: {
    title: string;
    link: string;
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
  return (
    <div>
      {!props.loading && props.data !== undefined && props.data !== null ? (
        <>
          <h1>List</h1>
          <div>
            {props.data.list.map((item, index) => (
              <Link href={item.link} key={index}>
                <div key={item.link}>
                  <h2>{item.title}</h2>
                  <p>{item.created.toLocaleString()}</p>
                  <p>{item.updated.toLocaleString()}</p>
                </div>
              </Link>
            ))}
          </div>
        </>
      ) : (
        <TextSkeleton />
      )}
    </div>
  );
};

export default BlogList;
