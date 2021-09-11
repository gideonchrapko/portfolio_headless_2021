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
            name: "companyName",
            title: "Company Name",
            type: "string"
        },
        {
            name: "projectOverview",
            title: "Project Overview",
            type: "blockContent"
        },
    ]
}


//     name: "project",
//     title: "Project",
//     type: "document",
//     fields: [
//         {
//             name: "title",
//             type: "string",
//         },
//         {
//             name: "date",
//             type: "datetime",
//         },
//         {
//             name: "place",
//             type: "string",
//         },
//         {
//             name: "description",
//             type: "text",
//         },
//         {
//             name: "projectType",
//             title: "Project type",
//             type: "string",
//             options: {
//                 list: [
//                     { value: "personal", title: "Personal" },
//                     { value: "client", title: "client" },
//                     { value: "school", title: "School"}
//                 ]
//             }
//         },
//     ]
// }