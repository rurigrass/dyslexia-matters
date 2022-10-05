import { list } from '@keystone-6/core';
import { integer, select, text } from '@keystone-6/core/fields';

export const Lesson = list({
  // TODO
  // access:
  fields: {
    // link to name of tutor
    // tutor: relationship({
    //   ref: 'User.name',
    // }),
    subject: text({ validation: { isRequired: true } }),
    level: select({
      options: [
        { label: 'GCSE', value: 'GCSE' },
        { label: 'A-Level', value: 'A-Level' },
      ],
      // isRequired: true
    }),
    description: text({
      validation: { isRequired: true },
      ui: {
        displayMode: 'textarea',
      },
    }),
    price: integer(),
    status: select({
      options: [
        { label: 'Draft', value: 'DRAFT' },
        { label: 'Available', value: 'AVAILABLE' },
        { label: 'Unavailable', value: 'UNAVAILABLE' },
      ],
      defaultValue: 'DRAFT',
      ui: {
        displayMode: 'segmented-control',
        createView: { fieldMode: 'hidden' },
      },
    }),
    // TODO availability, photo etc
  },
  ui: {
    listView: {
      initialColumns: ['subject', 'level'],
    },
  },
});
