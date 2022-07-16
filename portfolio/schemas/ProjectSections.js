export default {
    name: "projectSection",
    title: "Project Sections",
    type: "document",
    fields: [
          {
            name: "slugRouteProjSection",
            title: "Slug Route Project Section",
            type: "slug"
        },
        {
          name: "section1",
          title: "section 1",
          type: "blockContent"
        },
        {
            name: 'images',
            type: 'array',
            title: 'Images',
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
        {
            name: 'section1Thumbnail',
            title: 'Section 1 Thumbnail',
            type: 'image',
            options: {
              hotspot: true,
            },
          },
        
    ]
}