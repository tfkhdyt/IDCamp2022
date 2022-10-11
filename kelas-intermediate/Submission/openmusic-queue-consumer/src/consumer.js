import dotenv from 'dotenv';
import { connect } from 'amqplib';

import Listener from './listener.js';
import MailSender from './MailSender.js';
import PlaylistSongsService from './PlaylistSongsService.js';
import PlaylistsService from './PlaylistsService.js';

dotenv.config();

const init = async () => {
  const playlistsService = new PlaylistsService();
  const playlistSongsService = new PlaylistSongsService();
  const mailSender = new MailSender();
  const listener = new Listener(
    playlistsService,
    playlistSongsService,
    mailSender
  );
  const connection = await connect(process.env.RABBITMQ_SERVER);
  const channel = await connection.createChannel();

  await channel.assertQueue('export:playlist', { durable: true });

  channel.consume('export:playlist', listener.listen, { noAck: true });
};

init();
