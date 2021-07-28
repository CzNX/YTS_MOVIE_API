import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "../comps/Loader";
import SingleContent from "../comps/SingleContent";
import Header from "../comps/Header";
import "./pages_styles.css";
import InfiniteScroll from "react-infinite-scroll-component";
import Chips from "../comps/Chips";

const Home = () => {
  const [content, setContent] = useState([]);
  const [searchContent, setSearchContent] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [value, setValue] = useState("");
  const [sort, setSort] = useState("year");
  const [genreState, setGenreState] = React.useState("");

  // latest
  const fetchLatest = async () => {
    const {
      data: {
        data: { movies },
      },
    } = await axios.get(
      `https://yts.mx/api/v2/list_movies.json?sort_by=${sort}&page=${page}&genre=${genreState}`
    );

    movies && setContent([...content, ...movies]);

    setIsLoading(false);
  };

  // by tags rating,most downloaded & high rated
  const fetchTags = async () => {
    const {
      data: {
        data: { movies },
      },
    } = await axios.get(
      `https://yts.mx/api/v2/list_movies.json?sort_by=${sort}`
    );
    movies && setContent(movies);

    setIsLoading(false);
  };

  // genre
  const fetchGenre = async () => {
    const {
      data: {
        data: { movies },
      },
    } = await axios.get(
      `https://yts.mx/api/v2/list_movies.json?genre=${genreState}&sort_by=rating`
    );
    movies && setContent(movies);

    setIsLoading(false);
  };

  //user input
  const fetchSearch = async () => {
    const {
      data: {
        data: { movies },
      },
    } = await axios.get(
      `https://yts.mx/api/v2/list_movies.json?query_term=${value}&sort_by=rating`
    );

    movies && setSearchContent(movies);

    setIsLoading(false);
  };
  // main
  useEffect(() => {
    fetchLatest();
    // eslint-disable-next-line
  }, [page]);

  // sort by tags
  useEffect(() => {
    setIsLoading(true);
    setContent([]);
    setPage(1);
    fetchTags();

    // eslint-disable-next-line
  }, [sort]);

  // genre
  useEffect(() => {
    setIsLoading(true);
    setContent([]);
    setPage(1);
    fetchGenre();
    // eslint-disable-next-line
  }, [genreState]);

  // search
  useEffect(() => {
    if (value) {
      setIsLoading(true);
      setContent([]);
      fetchSearch();
    } else {
      setIsLoading(true);
      setPage(1);
      setSearchContent([]);
      fetchLatest();
    }
    // eslint-disable-next-line
  }, [value]);

  return (
    <>
      <Header
        value={value}
        setValue={setValue}
        genreState={genreState}
        setGenreState={setGenreState}
      />
      <Chips setSort={setSort} sort={sort} />
      <div className="trending">
        <div className="trending_contents">
          {isLoading && (
            <h4 style={{ flexBasis: "100%" }}>
              <Loader />
            </h4>
          )}
          {content.length > 1 ? (
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
                <p style={{ textAlign: "center", paddingBottom: "20px" }}>
                  <b>Yay! You have seen it all</b>
                </p>
              }
            >
              {content &&
                content.map((s) => <SingleContent key={s.id} {...s} />)}
            </InfiniteScroll>
          ) : (
            searchContent &&
            searchContent.map((s) => <SingleContent key={s.id} {...s} />)
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
