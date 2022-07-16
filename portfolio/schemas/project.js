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
          name: "projectOverviewShort",
          title: "Project Overview Short",
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
          name: "section1",
          title: "section 1",
          type: "blockContent"
        },
        {
          name: 'section1Images',
          type: 'array',
          title: 'Section 1 Images',
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
          name: "section2",
          title: "section 2",
          type: "blockContent"
        },
        {
          name: 'section2Images',
          type: 'array',
          title: 'Section 2 Images',
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
          name: "section3",
          title: "section 3",
          type: "blockContent"
        },
        {
          name: 'section3Images',
          type: 'array',
          title: 'Section 3 Images',
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
          name: "section4",
          title: "section 4",
          type: "blockContent"
        },
        {
          name: 'section4Images',
          type: 'array',
          title: 'Section 4 Images',
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
          name: "section5",
          title: "section 5",
          type: "blockContent"
        },
        {
          name: 'section5Images',
          type: 'array',
          title: 'Section 5 Images',
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
          name: "section6",
          title: "section 6",
          type: "blockContent"
        },
        {
          name: 'section6Images',
          type: 'array',
          title: 'Section 6 Images',
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
          name: "section7",
          title: "section 7",
          type: "blockContent"
        },
        {
          name: 'section7Images',
          type: 'array',
          title: 'Section 7 Images',
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
          name: "section8",
          title: "section 8",
          type: "blockContent"
        },
        {
          name: 'section8Images',
          type: 'array',
          title: 'Section 8 Images',
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
          {
            name: 'experienceMap1',
            title: 'Experience Map 1',
            type: 'image',
            options: {
              hotspot: true,
            },
          },
          {
            name: 'experienceMap2',
            title: 'Experience Map 2',
            type: 'image',
            options: {
              hotspot: true,
            },
          },
          {
            name: "informationHierarchy",
            title: "Information Hierarchy",
            type: "blockContent"
        },
        {
          name: 'informationHierarchyImg',
          title: 'Information Hierarchy Image',
          type: 'image',
          options: {
            hotspot: true,
          },
        },
        {
          name: 'informationHierarchyImg1',
          title: 'Information Hierarchy Image 1',
          type: 'image',
          options: {
            hotspot: true,
          },
        },
        {
          name: 'informationHierarchyImg2',
          title: 'Information Hierarchy Image 2',
          type: 'image',
          options: {
            hotspot: true,
          },
        },
        {
          name: 'informationHierarchyImg3',
          title: 'Information Hierarchy Image 3',
          type: 'image',
          options: {
            hotspot: true,
          },
        },
        {
          name: "lowFidelityMockups",
          title: "Low Fidelity Mockups",
          type: "blockContent"
      },
      {
        name: 'lowFidelityMockupsImg',
        title: 'Low Fidelity Mockups Image',
        type: 'image',
        options: {
          hotspot: true,
        },
      },
      {
        name: 'lowFidelityMockupsImg2',
        title: 'Low Fidelity Mockups Image 2',
        type: 'image',
        options: {
          hotspot: true,
        },
      },
      {
        name: 'lowFidelityMockupsImg3',
        title: 'Low Fidelity Mockups Image 3',
        type: 'image',
        options: {
          hotspot: true,
        },
      },
      {
        name: "uiKit",
        title: "UI Kit",
        type: "blockContent"
      },
      {
        name: 'UIKitImage',
        title: 'UI Kit Image',
        type: 'image',
        options: {
          hotspot: true,
        },
      },
      {
        name: "ThreeDDesign",
        title: "3D Design",
        type: "blockContent"
      },
      {
        name: 'ThreeDDesignImage',
        title: '3D Design Image',
        type: 'image',
        options: {
          hotspot: true,
        },
      },
      {
        name: 'ThreeDDesignImage2',
        title: '3D Design Image 2',
        type: 'image',
        options: {
          hotspot: true,
        },
      },
      {
        name: 'ThreeDDesignImage3',
        title: '3D Design Image 3',
        type: 'image',
        options: {
          hotspot: true,
        },
      },
      {
        name: 'ThreeDDesignImage4',
        title: '3D Design Image 4',
        type: 'image',
        options: {
          hotspot: true,
        },
      },
      {
        name: "Conclusion",
        title: "Conclusion",
        type: "blockContent"
      },
    ]
}