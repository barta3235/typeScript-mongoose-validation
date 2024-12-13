import mongoose from 'mongoose';
import config from './app/config/index';
import app from './app';

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    app.listen(config.port, () => {
      console.log('Server Working');
    });
  } catch (err) {
    console.log(err);
  }
}

main();
