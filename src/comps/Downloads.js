import { Button } from "@material-ui/core";

import React from "react";

const Downloads = ({ torrents, title }) => {
  return (
    <>
      {torrents?.map((c, i) => (
        <Button
          className="downloads"
          key={i}
          variant="contained"
          color="secondary"
          size="small"
          href={`magnet:?xt=urn:btih:${c.hash}&dn=${title}&tr=http://track.one:1234/announce&tr=udp://track.two:80&tr=udp://open.demonii.com:1337/announce&tr= udp://tracker.openbittorrent.com:80&tr=udp://tracker.coppersurfer.tk:6969&tr=udp://glotorrents.pw:6969/announce&tr=udp://tracker.opentrackr.org:1337/announce&tr=udp://torrent.gresille.org:80/announce&tr=udp://p4p.arenabg.com:1337&tr=udp://tracker.leechers-paradise.org:6969`}
        >
          {c.quality} ({c.size})
        </Button>
      ))}
    </>
  );
};

export default Downloads;
