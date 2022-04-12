import React, { useState } from "react";
import { Grid } from "@material-ui/core";

import { SearchBar, VideoList, VideoDetail } from "./components";

import youtube from "./api/youtube";

let App = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  //Handling when user searches something
  async function handleSubmit(searchTerm) {
    const { data: { items: videos } } = await youtube.get("search", {
      params: {
        part: "snippet",
        maxResults: 5,
        key: 'AIzaSyBpzxqcXtjn1OwOuoR3FbMU8Rx5QYekcc0',
        q: searchTerm,
      }
    });
    setVideos(videos);
    setSelectedVideo(videos[0]);
  }

  return (
      <Grid style={{ justifyContent: "center" }}>
        <Grid item xs={11}>
          <Grid container spacing={10}>

            <Grid item xs={8}>
              <SearchBar onSubmit={handleSubmit} />
            </Grid>

            <Grid item xs={8}>
              <VideoDetail video={selectedVideo} />
            </Grid>

            <Grid item xs={4}>
              <VideoList videos={videos} onVideoSelect={setSelectedVideo} />
            </Grid>

          </Grid>
        </Grid>
      </Grid>
  );
};

export default App;