import dotenv from 'dotenv';
import { connect } from 'amqplib';

import Listener from './listener.js';
import MailSender from './MailSender.js';
import NotesService from './NotesService.js';

dotenv.config();

const init = async () => {
  const notesService = new NotesService();
  const mailSender = new MailSender();
  const listener = new Listener(notesService, mailSender);
  const connection = await connect(process.env.RABBITMQ_SERVER);
  const channel = await connection.createChannel();

  await channel.assertQueue('export:notes', { durable: true });

  channel.consume('export:notes', listener.listen, { noAck: true });
};

init();
