import 'dotenv/config';
import { relationship, text } from '@keystone-6/core/fields';
import { list } from '@keystone-6/core';
import { cloudinaryImage } from '@keystone-6/cloudinary';

export const cloudinary = {
  cloudName: process.env.CLOUDINARY_CLOUD_NAME,
  apiKey: process.env.CLOUDINARY_KEY,
  apiSecret: process.env.CLOUDINARY_SECRET,
  folder: 'dyslexia-matters',
};

export const UserImage = list({
  fields: {
    image: cloudinaryImage({
      cloudinary,
      label: 'Source',
    }),
    altText: text(),
    user: relationship({ ref: 'User.photo' }),
  },
  ui: {
    listView: {
      initialColumns: ['image', 'altText', 'user'],
    },
  },
});
