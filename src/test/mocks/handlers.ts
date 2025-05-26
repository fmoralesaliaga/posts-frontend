import { http, HttpResponse } from 'msw';

const posts = [
  { id: 1, name: 'Test Post 1', description: 'Test description 1', createdAt: new Date().toISOString() },
  { id: 2, name: 'Test Post 2', description: 'Test description 2', createdAt: new Date().toISOString() },
];

export const handlers = [
  // GET all posts
  http.get('http://localhost:3001/api/posts', ({ request }) => {
    const url = new URL(request.url);
    const nameFilter = url.searchParams.get('name');
    
    if (nameFilter) {
      const filtered = posts.filter(post => 
        post.name.toLowerCase().includes(nameFilter.toLowerCase())
      );
      return HttpResponse.json(filtered);
    }
    
    return HttpResponse.json(posts);
  }),
  
  // POST create a new post
  http.post('http://localhost:3001/api/posts', async ({ request }) => {
    const data = await request.json();
    const body = (typeof data === 'object' && data !== null) ? data as Record<string, any> : {};
    const newPost = {
      id: 3,
      name: body.name ?? '',
      description: body.description ?? '',
      createdAt: new Date().toISOString()
    };
    
    return HttpResponse.json(newPost, { status: 201 });
  }),
  
  // GET a specific post by ID
  http.get('http://localhost:3001/api/posts/:id', ({ params }) => {
    const { id } = params;
    const post = posts.find(p => p.id === Number(id));
    
    if (post) {
      return HttpResponse.json(post);
    }
    
    return new HttpResponse(null, { status: 404 });
  }),
  
  // PUT update a post
  http.put('http://localhost:3001/api/posts/:id', async ({ params, request }) => {
    const { id } = params;
    const data = await request.json();
    const postIndex = posts.findIndex(p => p.id === Number(id));
    
    if (postIndex !== -1) {
      const updatedPost = {
        ...posts[postIndex],
        ...(typeof data === 'object' && data !== null ? data : {})
      };
      
      return HttpResponse.json(updatedPost);
    }
    
    return new HttpResponse(null, { status: 404 });
  }),
  
  // DELETE a post
  http.delete('http://localhost:3001/api/posts/:id', ({ params }) => {
    return HttpResponse.json({}, { status: 200 });
  }),
];
