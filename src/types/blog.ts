export interface BlogPost {

    id: string;
  
    title: string;
  
    excerpt: string;
  
    content: string;
  
    date: string;
  
    category: string;
  
    image: string;
  
    slug: string;
  
    author: {
  
      name: string;
  
      avatar: string;
  
    };
  
  }