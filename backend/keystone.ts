import { createAuth } from '@keystone-next/auth';
import { config, createSchema } from '@keystone-next/keystone/schema';
import {
    withItemData,
    statelessSessions,
} from '@keystone-next/keystone/session';
import 'dotenv/config';
import { User } from './schemas/User';
import { Lesson } from './schemas/Lessons';

const databaseURL =
    process.env.DATABASE_URL || 'mongodb://localhost/keystone-dyslexia-matters';

const sessionConfig = {
    maxAge: 60 * 60 * 24 * 360, // How long should they stay signed in
    secret: process.env.COOKIE_SECRET,
};

const { withAuth } = createAuth({
    listKey: 'User',
    identityField: 'email',
    secretField: 'password',
    initFirstItem: {
        fields: ['name', 'email', 'password'],
    },
    // TODO: Add in initial roles here
});

export default withAuth(
    config({
        // @ts-ignore
        server: {
            cores: {
                origin: [process.env.FRONTEND_URL],
                credentials: true,
            },
        },
        db: {
            adapter: 'mongoose',
            url: databaseURL,
            // TODO add data seeding here
        },
        lists: createSchema({
            User,
            Lesson,
        }),
        ui: {
            // Show the ui only for people who pass this test
            isAccessAllowed: ({ session }) => {
                console.log(session);
                return !!session?.data;
            },
        },
        session: withItemData(statelessSessions(sessionConfig), {
            User: 'id name email',
        }),
        // TODO add session values
    })
);
