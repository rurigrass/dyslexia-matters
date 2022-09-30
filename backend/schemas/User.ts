/* eslint-disable indent */

import { list } from '@keystone-next/keystone/schema';
import { text, password, relationship, select } from '@keystone-next/fields';

export const User = list({
  // access:
  // ui
  fields: {
    name: text({ isRequired: true, isUnique: true }),
    // userName: text({ isRequired: true, isUnique: true }),
    // firstName: text({ isRequired: true }),
    // lastName: text({ isRequired: true }),
    email: text({ isRequired: true, isUnique: true }),
    userType: select({
      isRequired: true,
      options: [
        { label: 'Tutor', value: 'Tutor' },
        { label: 'Student', value: 'Student' },
      ],
    }),
    description: text({
      ui: {
        displayMode: 'textarea',
      },
    }),
    photo: relationship({
      ref: 'UserImage.user',
      ui: {
        displayMode: 'cards',
        cardFields: ['image', 'altText'],
        inlineCreate: { fields: ['image', 'altText'] },
        inlineEdit: { fields: ['image', 'altText'] },
      },
    }),
    // lessons: relationship({
    //   ref: 'Lesson.subject',
    // }),
    password: password(),
    // TODO add (roles, cart and orders) subject, days etc , photo too
  },
  ui: {
    listView: {
      initialColumns: ['name'],
    },
  },
});
