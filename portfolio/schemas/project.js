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
            name: 'thumbImage',
            title: 'thumb Image',
            type: 'image',
            options: {
              hotspot: true,
            },
          },
        {
          name: 'tldrClip',
          title: 'TLDR Clip',
          type: 'image',
          options: {
            hotspot: true,
           },
        },
        {
          name: 'tldrLink',
          title: 'TLDR Link',
          type: 'image',
           type: 'string'
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
            type: "array",
            of: [{type: "string"}]
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

        {
          name: 'sectionContent',
          title: 'Section Content',
          type: 'array',
          of: [
            {
              title: 'object',
              name: 'Object',
              type: 'object',
              fields: [
                {
                  title: 'Section Block',
                  name: 'sectionBlock',
                  type: 'blockContent'
                },
                {
                  name: 'sectionImages',
                  type: 'array',
                  title: 'Section Images',
                  of: [
                    {
                      name: 'image',
                      type: 'image',
                      title: 'Image',
                      options: {
                        hotspot: true,
                      },
                    },
                  ],
                },
              ]
            }
          ]
        },
    ]
}