import { ImgurClient } from 'imgur';

let client;

client = new ImgurClient({ accessToken: process.env.CLEINT_SECRET });
client = new ImgurClient({ clientId: process.env.CLIENT_ID });

export default client;
