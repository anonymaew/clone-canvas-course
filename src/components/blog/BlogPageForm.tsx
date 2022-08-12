import { useEffect, useState } from 'react';
import { UseMutationResult } from 'react-query';
import { registerClass } from 'superjson';

import BlogPage from './BlogPage';

interface BlogPageProps {
  title: string;
  created: Date;
  updated: Date;
  content: string;
}

const BlogPageForm = (props: {
  data: BlogPageProps | undefined | null;
  loading: boolean;
  enrollLink: string;
  enrolled: boolean;
  handleUpdate: (title: string, content: string) => void;
}) => {
  const [blogData, setBlogData] = useState(props.data);
  useEffect(() => {
    if (!props.loading) setBlogData(props.data);
  }, [props.loading]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (blogData) props.handleUpdate(blogData.title, blogData.content);
  };

  return (
    <div className="flex flex-row">
      <div className="flex-1">
        <BlogPage
          data={blogData}
          loading={props.loading}
          enrollLink={props.enrollLink}
          enrolled={props.enrolled}
        />
      </div>
      {props.data && (
        <div className="flex-1">
          <form className="h-screen" onSubmit={handleSubmit}>
            <label htmlFor="title">Title</label>
            <br />
            <input
              type="text"
              id="title"
              defaultValue={props.data.title}
              onChange={(e) => {
                if (blogData)
                  setBlogData({ ...blogData, title: e.target.value });
              }}
            />
            <br />
            <label htmlFor="content">Content</label>
            <br />
            <textarea
              className="w-full h-96"
              id="content"
              defaultValue={props.data.content}
              onChange={(e) => {
                if (blogData)
                  setBlogData({ ...blogData, content: e.target.value });
              }}
            ></textarea>
            <br />
            <button type="submit">save</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default BlogPageForm;
