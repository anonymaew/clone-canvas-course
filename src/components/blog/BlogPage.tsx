import Markdown from 'markdown-to-jsx';
import { useEffect, useState } from 'react';

import EnrollBar from '../EnrollBar';
import TextSkeleton from '../skeleton/TextSkeleton';

interface BlogPageProps {
  title: string;
  created: Date;
  updated: Date;
  content: string;
}

const BlogPage = (props: {
  data: BlogPageProps | undefined | null;
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
              <h1>{props.data.title}</h1>
              <div className="text-sm">
                <time>{props.data.updated.toLocaleDateString()}</time>
              </div>
            </header>
            <article>
              <Markdown>{props.data.content}</Markdown>
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
