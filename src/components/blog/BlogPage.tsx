import Markdown from 'markdown-to-jsx';
import { useEffect, useState } from 'react';

import { BlogContent, BlogHeader } from '@prisma/client';

import EnrollBar from '../EnrollBar';
import TextSkeleton from '../skeleton/TextSkeleton';

type Item = {};

type BlogPageProps<T> = T & {
  blogHeader: BlogHeader & {
    blogContent: BlogContent;
  };
};

const BlogPage = (props: {
  data: BlogPageProps<Item> | undefined | null;
  loading: boolean;
  enrollLink: string;
  enrolled: boolean;
}) => {
  return (
    <>
      {!props.loading && props.data !== undefined && props.data !== null ? (
        <>
          {!props.enrolled && <EnrollBar enrollLink={props.enrollLink} />}
          <div className="prose prose-h1:text-violet-600 prose-code:leading-6 prose-code:font-normal prose-code:bg-zinc-700 prose-code:p-1 prose-code:rounded-md prose-code:before:content-[''] prose-code:after:content-[''] prose-pre:bg-transparent prose-pre:p-0">
            <header className="text-center">
              <h1>{props.data.blogHeader.title}</h1>
              <div className="text-sm">
                <time>
                  {props.data.blogHeader.updatedAt.toLocaleDateString()}
                </time>
              </div>
            </header>
            <article>
              <Markdown>{props.data.blogHeader.blogContent.content}</Markdown>
            </article>
          </div>
        </>
      ) : (
        <TextSkeleton />
      )}
    </>
  );
};

export default BlogPage;
