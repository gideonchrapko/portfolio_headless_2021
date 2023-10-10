import sanityClient from '@sanity/client'

export default sanityClient({
  projectId: 'kjeh3i1n',
  dataset: 'production',
  apiVersion: '2021-03-25',
  useCdn: true,
})
