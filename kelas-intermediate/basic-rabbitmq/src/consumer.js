import { connect } from 'amqplib';

const init = async () => {
  const connection = await connect('amqp://endeavour');
  const channel = await connection.createChannel();

  const queue = 'dicoding';

  await channel.assertQueue(queue, { durable: true });

  channel.consume(
    queue,
    (message) => {
      console.log(
        `Menerima pesan dari queue ${queue}: ${message.content.toString()}`
      );
    },
    { noAck: true }
  );
};

init();
