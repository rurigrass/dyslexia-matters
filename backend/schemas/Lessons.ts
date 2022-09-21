import { list } from '@keystone-next/keystone/schema';
import { integer, select, text } from '@keystone-next/fields';

export const Lesson = list({
    // TODO
    // access:
    fields: {
        subject: text({ isRequired: true }),
        description: text({
            isRequired: true,
            ui: {
                displayMode: 'textarea',
            },
        }),
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
        price: integer(),
        // TODO availability, photo etc
    },
});
