const posts = [
  { id: 1, 
    title: 'Learn JS', 
    content: 'JS is good', 
    author: 'Alina', 
    category: 'programming' },

  { id: 2, 
    title: 'Learn Node.js', 
    content: 'Node.js is good', 
    author: 'Max', 
    category: 'programming' },

  { id: 3, 
    title: 'Egypt Trip', 
    content: 'Swimming in the Red Sea', 
    author: 'Emma', 
    category: 'travel' },
  { id: 4, 
    title: '67', 
    content: 'U67', 
    author: '67', 
    category: '67' }
];

export const postRepository = {
  getAll(category, take) {
    let filteredPosts = [...posts];

    if (category) {
      filteredPosts = filteredPosts.filter(post => post.category === category);
    }

    if (take) {
      filteredPosts = filteredPosts.slice(0, parseInt(take, 10));
    }

    return filteredPosts;
  },

  getById(id) {
    return posts.find(post => post.id === parseInt(id, 10));
  },

  addPost(postData) {
    return new Promise((resolve) => {
      const newPost = {
        id: posts.length > 0 ? Math.max(...posts.map(p => p.id)) + 1 : 1,
        ...postData
      };
      posts.push(newPost);
      resolve(newPost);
    });
  }
};
