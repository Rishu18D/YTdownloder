const express = require('express');
const cors = require('cors');
const ytdl = require('ytdl-core');
const app = express();
const PORT = 4000;

app.use(cors());

app.listen(PORT, () => {
  console.log(`Server Works !!! At port ${PORT}`);
});

app.get('/download', async (req, res, next) => {
  try {
    const url = req.query.url;
    if(!ytdl.validateURL(url)) {
      return res.sendStatus(400);
    }
    const format = req.query.format;
    let title = 'video';

    await ytdl.getBasicInfo(url, {
      format: 'mp4'
    }, (err, info) => {
      if (err) {
        console.error(err);
        throw err;
      }
      title = info.player_response.videoDetails.title.replace(/[^\x00-\x7F]/g, "");
    });

    if (format === 'mp3') {
      res.header('Content-Disposition', `attachment; filename="${title}.mp3"`);
      ytdl(url, {
        format: 'mp3',
        filter: 'audioonly',
      }).on('error', (err) => {
        console.error(err);
        res.sendStatus(500);
      }).pipe(res);
    } else {
      res.header('Content-Disposition', `attachment; filename="${title}.mp4"`);
      ytdl(url, {
        format: 'mp4',
      }).on('error', (err) => {
        console.error(err);
        res.sendStatus(500);
      }).pipe(res);
    }

  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});
