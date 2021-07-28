import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import "../comps/comps_styles.css";
import axios from "axios";
import { unavailable } from "../config/Config";
import Carousel from "./Carousel";
import Downloads from "./Downloads";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    width: "90%",
    height: "80%",
    backgroundColor: "#39445a",
    border: "1px solid #282c34",
    borderRadius: 10,
    color: "white",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(1, 1, 3),
  },
}));

export default function TransitionsModal({ children, id }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [myId, setMyId] = React.useState(id);
  const [modalContent, setModalContent] = React.useState([]);
  const [movieSuggestion, setMovieSuggestion] = React.useState([]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setMyId(id);
  };

  useEffect(() => {
    handleClose();
  }, []);

  // primary fetch
  const fetchModal = async () => {
    const {
      data: {
        data: { movie },
      },
    } = await axios.get(
      ` https://yts.mx/api/v2/movie_details.json?movie_id=${myId}&with_images=true&with_cast=true`
    );
    // console.log(movie);

    setModalContent(movie);
  };

  // secondary fetch
  const fetchSuggestions = async () => {
    const {
      data: {
        data: { movies },
      },
    } = await axios.get(
      ` https://yts.mx/api/v2/movie_suggestions.json?movie_id=${myId}`
    );
    // console.log(movie);

    setMovieSuggestion(movies);
  };

  useEffect(() => {
    fetchSuggestions();
    fetchModal();

    return () => {
      setModalContent([]);
      setMovieSuggestion([]);
    };
  }, [myId]);

  return (
    <>
      <div type="button" onClick={handleOpen} className="singleContent">
        {children}
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          {modalContent && (
            <div className={classes.paper}>
              <div className="contentModal">
                <div className="contentModal_img">
                  <img
                    className="modal_img"
                    src={modalContent.medium_cover_image}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = unavailable;
                    }}
                    alt="err"
                  />
                  <span className="similar_movies">Similar Movies</span>

                  <div className="movie_suggestions">
                    {movieSuggestion.map((m, i) => (
                      <div className="single_suggestion" key={i}>
                        <div className="sug_img" onClick={() => setMyId(m.id)}>
                          <img
                            src={m.medium_cover_image}
                            alt=""
                            className="main_sug_img"
                          />
                        </div>
                        <span className="sug_title">
                          {` ${
                            m.title && m.title.length > 25
                              ? m.title.substring(0, 24) + "..."
                              : m.title
                          }`}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="ContentModal_about">
                  <span className="ContentModal_title">
                    {modalContent.title} ({modalContent.year})
                  </span>
                  <span style={{ textAlign: "center", fontSize: "13px" }}>
                    Rating: {modalContent.rating}/10
                  </span>
                  <span className="ContentModal_desc">
                    {`${
                      modalContent.description_intro
                        ? modalContent.description_intro
                        : "Description Not Available..."
                    }`}
                  </span>
                  <div className="cast_section">
                    <iframe
                      title={modalContent.title}
                      className="u_iframe"
                      src={`https://www.youtube.com/embed/${modalContent.yt_trailer_code}?autoplay=1&mute=1`}
                      allowFullScreen
                    ></iframe>
                    <div className="cast">
                      <Carousel cast={modalContent.cast} />
                    </div>
                  </div>
                  <div
                    className="downloads_main"
                    style={{ textAlign: "center" }}
                  >
                    <Downloads
                      torrents={modalContent.torrents}
                      title={modalContent.title}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </Fade>
      </Modal>
    </>
  );
}
