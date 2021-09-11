export default {
    name: "project",
    title: "Project",
    type: "document",
    fields: [
        {
            name: 'mainImage',
            title: 'Main image',
            type: 'image',
            options: {
              hotspot: true,
            },
          },
        {
            name: "slugRoute",
            title: "Slug Route",
            type: "slug"
        },
        {
            name: "projectTitle",
            title: "Project Title",
            type: "string"
        },
        {
            name: "sectionTitle",
            title: "Section Title",
            type: "string"
        },
        {
            name: "companyName",
            title: "Company Name",
            type: "string"
        },
        {
            name: "projectOverview",
            title: "Project Overview",
            type: "blockContent"
        },
        {
            title: 'Role',
            name: 'role',
            type: 'array',
            of: [{type: 'string'}]
        },
        {
            title: 'Tools',
            name: 'tools',
            type: "array",
            of: [{type: "string"}]
        },
    ]
}