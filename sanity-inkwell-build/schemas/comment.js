export default {
    name: 'comment',
    type: 'document',
    title: 'Comment',
    fields: [
        {
            name: 'name',
            type: 'string',
        },
        {
            name: 'email',
            type: 'string',
        },
        {
            title: 'Approved',
            name: 'approved',
            type: 'boolean',
            description: 'Comments must be approved before they are displayed on the site.',
        },
        {
            name: 'comment',
            type: 'text',
        }, {
            name: 'post',
            type: 'reference',
            to: [{ type: 'post' }],
        },
    ],
};