import { list } from '@keystone-6/core';
import {
  text,
  password,
  relationship,
  select,
  // multiselect,
} from '@keystone-6/core/fields';

export const User = list({
  // access:
  // ui
  fields: {
    // name: text({ isRequired: true, isUnique: true }),
    userName: text({ validation: { isRequired: true }, isIndexed: 'unique' }),
    // firstName: text({ validation: { isRequired: true } }),
    // lastName: text({ validation: { isRequired: true } }),
    email: text({ validation: { isRequired: true }, isIndexed: 'unique' }),
    userType: select({
      validation: { isRequired: true },
      options: [
        { label: 'Tutor', value: 'Tutor' },
        { label: 'Student', value: 'Student' },
      ],
    }),
    // description: text({
    //   ui: {
    //     displayMode: 'textarea',
    //   },
    // }),
    photo: relationship({
      ref: 'UserImage.user',
      ui: {
        displayMode: 'cards',
        cardFields: ['image', 'altText'],
        inlineCreate: { fields: ['image', 'altText'] },
        inlineEdit: { fields: ['image', 'altText'] },
      },
    }),
    //
    // lessons: relationship({
    //   ref: 'Lesson.subject',
    // }),
    password: password(),
    // TODO add (roles, cart and orders) subject, days etc , photo too
    // subjects: multiselect(),
  },
  ui: {
    listView: {
      initialColumns: ['userName'],
    },
  },
});
