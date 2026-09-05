export interface News {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  image: string;
  author: string;
  authorId: string;
  published: boolean;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface NewsForm {
  title: string;
  slug: string;
  summary: string;
  content: string;
  image: string;
  published: boolean;
  publishedAt: string;
}

export interface NewsPagination {
  currentPage: number;
  limit: number;
  totalNews: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface NewsResponse {
  success: boolean;
  data: News[];
  pagination: NewsPagination;
}

export interface NewsStats {
  totalNews: number;
  totalPublished: number;
  totalDrafts: number;
  totalViews: number;
}
