import { createTransport } from 'nodemailer';

class MailSender {
  constructor() {
    this._transporter = createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      auth: {
        user: process.env.MAIL_ADDRESS,
        pass: process.env.MAIL_PASSWORD,
      },
    });
  }

  sendEmail(targetEmail, content) {
    const message = {
      from: 'Open Music',
      to: targetEmail,
      subject: 'Ekspor playlist songs',
      text: 'Terlampir hasil dari ekspor playlist songs',
      attachments: [
        {
          filename: 'playlist_songs.json',
          content,
        },
      ],
    };

    return this._transporter.sendMail(message);
  }
}

export default MailSender;
