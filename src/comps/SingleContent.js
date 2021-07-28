import { Badge } from "@material-ui/core";
import { unavailable } from "../config/Config";
import TransitionsModal from "./Modal";

const SingleContent = ({
  medium_cover_image,
  title,
  year,
  rating,
  genres,
  runtime,
  id,
}) => {
  const runtimeHandler = (r) => {
    if (r === 0) {
      return "unknown";
    } else if (r < 60) {
      return r;
    } else {
      const hours = Math.floor(r / 60) + "h";
      const minutes = (r % 60) + "min";
      return hours + minutes;
    }
  };

  return (
    <TransitionsModal id={id} runtimeHandler={runtimeHandler}>
      <Badge
        badgeContent={`${rating === 0 ? "unrated" : rating}`}
        color={`${rating > 7.5 ? "secondary" : "primary"}`}
        overlap="circular"
      />
      <img
        src={medium_cover_image}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = unavailable;
        }}
        alt={title}
        style={{ height: "100%", width: "100%", objectFit: "cover" }}
      />

      <span className="title" style={{ zIndex: "2" }}>
        {` ${
          title && title.length > 25 ? title.substring(0, 24) + "..." : title
        }`}
      </span>
      <span className="date" style={{ zIndex: "2" }}>
        {year}
      </span>

      <div className="overlay">
        <span className="genre_container">
          {genres &&
            genres
              .map((p, i) => (
                <span key={i} className="genre">
                  {p}
                </span>
              ))
              .slice(0, 3)}
        </span>
        <span className="rate">Rating: {rating}/10</span>
        <span className="runtime">Running Time: {runtimeHandler(runtime)}</span>
        <span type="button" className="view_btn">
          View Detail
        </span>
      </div>
    </TransitionsModal>
  );
};

export default SingleContent;
