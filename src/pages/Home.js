import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "../comps/Loader";
import SingleContent from "../comps/SingleContent";
import "./pages_styles.css";
import InfiniteScroll from "react-infinite-scroll-component";

const Home = ({ value }) => {
  // const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState([]);
  const [contentnew, setContentnew] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);

  const fetchTrending = async () => {
    const {
      data: {
        data: { movies },
      },
    } = await axios.get(
      // ` https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API}`
      `https://yts.mx/api/v2/list_movies.json?sort_by=year&page=${page}`
    );
    movies ? setContent([...content, ...movies]) : setContent([...content]);

    setIsLoading(false);

    console.log(value);
  };
  const fetchnew = async () => {
    const {
      data: {
        data: { movies },
      },
    } = await axios.get(
      // ` https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API}`
      `https://yts.mx/api/v2/list_movies.json?sort_by=rating&query_term=${value}`
    );

    setContentnew(movies);

    // setContentnew([...contentnew, ...movies]);
    // setContent(movies);
    // console.log(content);
    // console.log(value);

    // setIsLoading(false);
  };

  useEffect(() => {
    fetchTrending();
  }, [page]);

  useEffect(() => {
    fetchnew();
  }, [value]);

  return (
    <div className="trending">
      {/* {isLoading && <Loader />} */}
      <div className="trending_contents">
        <InfiniteScroll
          loader={
            <h4 style={{ flexBasis: "100%" }}>
              <Loader />
            </h4>
          }
          dataLength={content.length}
          next={() => setPage((prev) => prev + 1)}
          hasMore={true}
          className="trending_contents"
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          {content &&
            content.map((s) => (
              <SingleContent contentnew={contentnew} key={s.id} {...s} />
            ))}
        </InfiniteScroll>

        {/* {contentnew.map((s) => (
          <SingleContent key={s.id} {...s} contentnew={contentnew} />
        ))} */}
      </div>
    </div>
  );
};

export default Home;
