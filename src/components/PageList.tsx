import Link from "next/link";

interface PageListProps {
  header: string;
  list: {
    header: string;
    url: string;
  }[];
}

const PageList = (props: PageListProps) => {
  return (
    <div>
      <h1>{props.header}</h1>
      {props.list.length === 0 ? (
        <p>No items</p>
      ) : (
        <ul>
          {props.list.map((item, index) => {
            return (
              <li key={index}>
                <Link href={item.url}>
                  <a>{item.header}</a>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default PageList;
