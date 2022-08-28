import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactComponentElement } from 'react';

import { BlogHeader, Course } from '@prisma/client';

import TextSkeleton from '../skeleton/TextSkeleton';

type Item = {
  id: string;
};

type BlogItemProps<T> = T & { blogHeader: BlogHeader };

const BlogList = (props: {
  data?: BlogItemProps<Item>[];
  loading: boolean;
  enrollLink: string;
  enrolled: boolean;
}) => {
  const router = useRouter();

  return (
    <>
      {!props.loading && props.data !== undefined ? (
        <div>
          {props.data.map((item, index) => (
            <Link href={`${router.asPath}/${item.id}`} key={index}>
              <div className="p-4 m-4 duration-300 ease-in-out border rounded-md shadow-md cursor-pointer hover:scale-105 hover:bg-slate-300 border-slate-300">
                <h2 className="text-2xl font-bold underline">
                  {item.blogHeader.title}
                </h2>
                <div className="text-sm text-slate-500">
                  <p>{item.blogHeader.createdAt.toLocaleDateString()}</p>
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
