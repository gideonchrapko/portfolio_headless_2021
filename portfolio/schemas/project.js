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
            name: 'personaImage1',
            title: 'Person Image 1',
            type: 'image',
            options: {
              hotspot: true,
            },
          },
          {
            name: 'personaImage2',
            title: 'Person Image 2',
            type: 'image',
            options: {
              hotspot: true,
            },
          },
          {
            name: 'personaImage3',
            title: 'Person Image 3',
            type: 'image',
            options: {
              hotspot: true,
            },
          },
          {
            name: "experienceMapOverview",
            title: "Experience Map Overview",
            type: "blockContent"
        },
          {
            name: 'experienceMap',
            title: 'Experience Map',
            type: 'image',
            options: {
              hotspot: true,
            },
          },
    ]
}