import autoBind from 'auto-bind';

class Listener {
  constructor(playlistsService, playlistSongsService, mailSender) {
    this._playlistsService = playlistsService;
    this._playlistSongsService = playlistSongsService;
    this._mailSender = mailSender;

    autoBind(this);
  }

  async listen(message) {
    try {
      const { userId, playlistId, targetEmail } = JSON.parse(
        message.content.toString()
      );
      const playlist = await this._playlistsService.getPlaylistById(
        playlistId,
        userId
      );
      playlist.songs = await this._playlistSongsService.getPlaylistSongs(
        playlistId
      );

      const result = await this._mailSender.sendEmail(
        targetEmail,
        JSON.stringify({ playlist })
      );

      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
}

export default Listener;
