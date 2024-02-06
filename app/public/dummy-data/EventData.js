const UpcomingEvents = [
  { id: 'tree-planting', title: 'Tree Planting Day', email: 'test@foo.com',
    description: 'Join us in making our community greener by planting trees in local parks. Learn about environmental conservation and contribute to a sustainable future.',
    tags: ['Community', 'Environment', 'Conservation'],
    eventLogo: 'https://media.istockphoto.com/id/668214842/photo/voluteer-group-of-people-for-charity-donation-in-the-park.jpg?s=2048x2048&w=is&k=20&c=XdTRKKNCDLlsKkmlqHafGmCAhhefU85BTJ20O8jpv6E=' },
  { id: 'coding-workshop', title: 'Coding Workshop for Kids', email: 'test@foo.com',
    description: 'Help teach coding to underprivileged kids. Make a positive impact on their future by introducing them to the world of technology and programming.',
    tags: ['Education', 'Technology', 'Youth'], eventLogo: 'https://media.istockphoto.com/id/668214842/photo/voluteer-group-of-people-for-charity-donation-in-the-park.jpg?s=2048x2048&w=is&k=20&c=XdTRKKNCDLlsKkmlqHafGmCAhhefU85BTJ20O8jpv6E=' },
  { id: 'health-wellness', title: 'Health and Wellness Fair', email: 'test@foo.com',
    description: 'Contribute to a healthier community by participating in our Health and Wellness Fair. Provide health screenings, fitness tips, and promote overall well-being.',
    tags: ['Community', 'Health', 'Wellness'], eventLogo: 'https://media.istockphoto.com/id/668214842/photo/voluteer-group-of-people-for-charity-donation-in-the-park.jpg?s=2048x2048&w=is&k=20&c=XdTRKKNCDLlsKkmlqHafGmCAhhefU85BTJ20O8jpv6E=' },
  { id: 'mural-painting', title: 'Mural Painting Project', email: 'test@foo.com',
    description: 'Express your creativity and beautify public spaces through our Mural Painting Project. Join local artists in transforming blank walls into vibrant works of art.',
    tags: ['Arts', 'Creativity', 'Community'], eventLogo: 'https://media.istockphoto.com/id/668214842/photo/voluteer-group-of-people-for-charity-donation-in-the-park.jpg?s=2048x2048&w=is&k=20&c=XdTRKKNCDLlsKkmlqHafGmCAhhefU85BTJ20O8jpv6E=' },
  { id: 'pet-adoption', title: 'Shelter Pet Adoption Day', email: 'test@foo.com',
    description: 'Help find loving homes for shelter animals by volunteering at our Pet Adoption Day. Spend time with adorable pets and assist potential adopters in finding their perfect match.',
    tags: ['Animals', 'Adoption', 'Community'], eventLogo: 'https://media.istockphoto.com/id/668214842/photo/voluteer-group-of-people-for-charity-donation-in-the-park.jpg?s=2048x2048&w=is&k=20&c=XdTRKKNCDLlsKkmlqHafGmCAhhefU85BTJ20O8jpv6E=' },
  { id: 'cultural-exchange', title: 'Cultural Exchange Festival', email: 'test@foo.com',
    description: 'Embrace diversity and foster cultural understanding at our Cultural Exchange Festival. Engage in activities, performances, and discussions that celebrate our global community.',
    tags: ['Diversity', 'Culture', 'Community'], eventLogo: 'https://media.istockphoto.com/id/668214842/photo/voluteer-group-of-people-for-charity-donation-in-the-park.jpg?s=2048x2048&w=is&k=20&c=XdTRKKNCDLlsKkmlqHafGmCAhhefU85BTJ20O8jpv6E=' },
];

const getEventById = (id) => UpcomingEvents.find(event => event.id === id);

export { UpcomingEvents, getEventById };
