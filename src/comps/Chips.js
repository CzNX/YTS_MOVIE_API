import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5),
    },
    position: "static",
    paddingTop: "80px",
  },
}));

export default function Chips({ setSort, sort }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Chip
        label="Latest"
        value={sort}
        onClick={(e) => setSort("year")}
        color="primary"
      />
      <Chip
        label="Most Downloaded"
        value={sort}
        onClick={(e) => setSort("download_count")}
        color="primary"
      />
      <Chip
        label="High Rated"
        value={sort}
        color="primary"
        onClick={(e) => setSort("rating")}
      />
    </div>
  );
}
