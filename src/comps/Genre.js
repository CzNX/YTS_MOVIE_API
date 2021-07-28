import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { GenreData } from "../assets/GenreData";

const useStyles = makeStyles((theme) => ({
  root: {
    Width: "100%",
    maxWidth: "150px",
    backgroundColor: "black",
    height: "34px",
    justifyContent: "center",
    borderRadius: "15px",
  },
  nested: {
    paddingLeft: theme.spacing(4),
    backgroundColor: "black",
    color: "white",
    padding: "0px 4px",
    margin: "0 0",
    "&:hover": {
      backgroundColor: "green",
    },
  },

  list_main: {
    display: "grid",
    gridTemplateColumns: "repeat(2,1fr)",
  },
  text: {
    display: "flex",
    justifyContent: "start",
    alignItems: "start",
  },
}));

export default function Genre({ genreState, setGenreState }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleChange = (e) => {
    const value = e.target.innerText;
    setGenreState(value);
  };

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={classes.root}
    >
      <ListItem
        button
        onClick={handleClick}
        style={{
          textAlign: "center",
          paddingTop: "0px",
        }}
        className={classes.text}
      >
        <ListItemText
          primary={`${genreState ? genreState : "Genre"}`}
          style={{ alignSelf: "start" }}
        />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding className={classes.list_main}>
          {GenreData.map((item, i) => (
            <ListItem
              button
              className={classes.nested}
              key={i}
              onClick={handleClick}
            >
              <ListItemText
                primary={item}
                name={item}
                value={item}
                onClick={handleChange}
              />
            </ListItem>
          ))}
        </List>
      </Collapse>
    </List>
  );
}
