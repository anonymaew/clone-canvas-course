import Link from 'next/link';
import { useRef } from 'react';

import TextSkeleton from '../skeleton/TextSkeleton';
import BlogList from './BlogList';

interface BlogListProps {
  list: {
    id: string;
    title: string;
    link: string;
    created: Date;
    updated: Date;
  }[];
}

const BlogListForm = (props: {
  data: BlogListProps | null;
  loading: boolean;
  enrollLink: string;
  enrolled: boolean;
  handleCreate: (title: string) => void;
  handleDelete: (id: string) => void;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const optionRef = useRef<HTMLSelectElement>(null);

  const handleSubmitCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputRef.current) props.handleCreate(inputRef.current.value);
  };
  const handleSubmitDelete = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (optionRef.current) {
      props.handleDelete(optionRef.current.value);
    }
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmitCreate}>
          <label htmlFor="createCourseName">course name:</label>
          <input
            ref={inputRef}
            type="text"
            id="createCourseName"
            placeholder="title"
          />
          <button type="submit">create a new course</button>
        </form>
        <form onSubmit={handleSubmitDelete}>
          <label htmlFor="deleteCourseName">course name:</label>
          <select name="" id="deleteCourseName">
            <option disabled selected>
              select an option
            </option>
            {props.data?.list.map((course) => (
              <option key={course.id} value={course.id}>
                {course.title}
              </option>
            ))}
          </select>
          <button type="submit">delete</button>
        </form>
      </div>
      <BlogList
        data={props.data}
        loading={props.loading}
        enrollLink={props.enrollLink}
        enrolled={props.enrolled}
      />
    </div>
  );
};

export default BlogListForm;
