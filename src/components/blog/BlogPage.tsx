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
    <div>
      {!props.enrolled && <EnrollBar enrollLink={props.enrollLink} />}
      {!props.loading && props.data !== undefined && props.data !== null ? (
        <>
          <h1>{props.data.title}</h1>
          <p>{props.data.created.toLocaleString()}</p>
          <p>{props.data.updated.toLocaleString()}</p>
          <p>{props.data.content}</p>
        </>
      ) : (
        <TextSkeleton />
      )}
    </div>
  );
};

export default BlogPage;
