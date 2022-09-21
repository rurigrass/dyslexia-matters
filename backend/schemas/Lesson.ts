import { list } from '@keystone-next/keystone/schema';
import { integer, select, text } from '@keystone-next/fields';

export const Lesson = list({
  // TODO
  // access:
  fields: {
    // link to name of tutor
    // tutor: relationship({
    //   ref: 'User.name',
    // }),
    subject: text({ isRequired: true }),
    level: select({
      options: [
        { label: 'GCSE', value: 'GCSE' },
        { label: 'A-Level', value: 'A-Level' },
      ],
      // isRequired: true
    }),
    description: text({
      isRequired: true,
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
