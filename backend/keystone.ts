import { createAuth } from '@keystone-6/auth';
import { config } from '@keystone-6/core';
import { statelessSessions } from '@keystone-6/core/session';
// import { permissionsList } from './schemas/fields';
import { User } from './schemas/User';
import { Lesson } from './schemas/Lesson';
import { UserImage } from './schemas/UserImage';
import { Product } from './schemas/Product';
import { ProductImage } from './schemas/ProductImage';
import 'dotenv/config';
import { insertSeedData } from './seed-data';
import { sendPasswordResetEmail } from './lib/mail';
// import { extendGraphqlSchema } from './mutations';
// import { addCompatibilityForQueries } from './compat';

// const databaseURL =
//   process.env.DATABASE_URL || 'mongodb://localhost/keystone-dyslexia-matters';
const databaseURL = process.env.DATABASE_URL || 'file:./app.db';

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 360, // How long should they stay signed in 360days
  secret: process.env.COOKIE_SECRET,
};

const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',
  secretField: 'password',
  initFirstItem: {
    fields: ['userName', 'userType', 'email', 'password'],
  },
  sessionData: `id userName email`,
  // TODO: Add in initial roles here
  passwordResetLink: {
    async sendToken(args) {
      // send the email
      console.log(args);
      await sendPasswordResetEmail(args.token, args.identity);
    },
  },
});

export default withAuth(
  config({
    server: {
      cors: {
        origin: [process.env.FRONTEND_URL],
        credentials: true,
      },
    },
    db: {
      provider: 'sqlite',
      url: databaseURL,
      async onConnect(context) {
        console.log('Connected to the database!');
        if (process.argv.includes('--seed-data')) {
          await insertSeedData(context.prisma);
        }
      },
      // TODO add data seeding here
    },
    lists: {
      User,
      UserImage,
      Lesson,
      Product,
      ProductImage,
    },
    // extendGraphqlSchema: (schema) =>
    //   addCompatibilityForQueries(extendGraphqlSchema(schema)),
    ui: {
      // Show the ui only for people who pass this test
      isAccessAllowed: ({ session }) =>
        // console.log(session);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        !!session?.data,
    },
    session: statelessSessions(sessionConfig),
    // TODO add session values
  })
);
