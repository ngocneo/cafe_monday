import { authApi } from '../auth/authApi'

export const blogApi = authApi.injectEndpoints({
  tagTypes: [
    'blogs',
    'blogs-details',
    'blogs-data',
    'blogs-by-searchAndFilter',
    'pin-to-top-blogs',
    'recent-blogs',
    'blogs-archives',
    'blogs-categories',
    'blogs-tags',
    'blog-collections',
    'blog-filter',
    'related-blogs',
  ],
  endpoints: (builder) => ({
    addBlog: builder.mutation({
      query: ({ post }) => ({
        url: `blogs/add/`,
        method: 'POST',
        body: post,
      }),
      invalidatesTags: ['blogs'],
    }),
    getBlogForAdmin: builder.query({
      query: ({ blogId }) => {
        return `blogs/${blogId}/admin`
      },
      providesTags: ['blogs-data'],
    }),
    getBlogDetails: builder.query({
      query: ({ blogSlug }) => `blogs/${blogSlug}`,
      providesTags: ['blogs-details'],
    }),
    getAdminBlogDetails: builder.query({
      query: ({ blogSlug }) => `blogs/${blogSlug}/admin`,
      providesTags: ['blogs-details'],
    }),
    getRelatedBlogs: builder.query({
      query: ({ blogSlug }) => `blogs/${blogSlug}/related/`,
      providesTags: ['related-blogs'],
    }),
    uploadBlogImage: builder.mutation({
      query: ({ post }) => ({
        url: `blogs/images/upload/`,
        method: 'POST',
        body: post,
      }),
      invalidatesTags: ['blogs'],
    }),
    addBlogComment: builder.mutation({
      query: ({ post, blogSlug }) => ({
        url: `blogs/${blogSlug}/comment/add/`,
        method: 'POST',
        body: post,
      }),
      invalidatesTags: ['blogs-details'],
    }),
    getRatings: builder.query({
      query: () => 'blogs/ratings/',
    }),

    getAllBlogs: builder.query({
      query: () => `blogs/`,
      providesTags: ['blogs'],
    }),
    getAllAdminBlogs: builder.query({
      query: () => `blogs/admin`,
      providesTags: ['blogs'],
    }),
    searchAndFilterBlogs: builder.query({
      query: ({ searchAndFilter }) =>
        `blogs/search-and-filter/?${searchAndFilter}`,
      providesTags: ['blogs-by-searchAndFilter'],
    }),
    getBlogCollections: builder.query({
      query: () => `blogs/collections/`,
      providesTags: ['blog-collections'],
    }),
    getPinToTopBlogs: builder.query({
      query: () => `blogs/pin/`,
      providesTags: ['pin-to-top-blogs'],
    }),
    getLastBlogs: builder.query({
      query: () => `blogs/last/`,
      providesTags: ['last-blogs'],
    }),
    getRecentBlogs: builder.query({
      query: () => `blogs/recent/`,
      providesTags: ['recent-blogs'],
    }),

    getBlogFilter: builder.query({
      query: () => `blogs/filter/`,
      providesTags: ['blog-filter'],
    }),
    getArchives: builder.query({
      query: () => `blogs/archives/`,
      providesTags: ['blogs-archives'],
    }),
    getAllCategory: builder.query({
      query: () => `blogs/categories/`,
      providesTags: ['blogs-categories'],
    }),
    getAllTags: builder.query({
      query: () => `blogs/tags/`,
      providesTags: ['blogs-tags'],
    }),

    updateBlog: builder.mutation({
      query: ({ post, blogSlug }) => ({
        url: `blogs/${blogSlug}/update/`,
        method: 'PUT',
        body: post,
      }),
      invalidatesTags: [
        'blogs',
        'blogs-details',
        'blogs-data',
        'blogs-by-searchAndFilter',
        'pin-to-top-blogs',
        'recent-blogs',
        'blogs-archives',
        'blogs-categories',
        'blogs-tags',
        'blog-collections',
        'blog-filter',
        'related-blogs',
      ],
    }),
    deleteBlog: builder.mutation({
      query: ({ post }) => ({
        url: `blogs/delete/`,
        method: 'DELETE',
        body: post,
      }),
      invalidatesTags: [
        'blogs',
        'blogs-details',
        'blogs-data',
        'blogs-by-searchAndFilter',
        'pin-to-top-blogs',
        'recent-blogs',
        'blogs-archives',
        'blogs-categories',
        'blogs-tags',
        'blog-collections',
        'blog-filter',
        'related-blogs',
      ],
    }),
    changeBlogStatus: builder.mutation({
      query: ({ post }) => ({
        url: `blogs/status/`,
        method: 'PUT',
        body: post,
      }),
      invalidatesTags: [
        'blogs',
        'blogs-details',
        'blogs-data',
        'blogs-by-searchAndFilter',
        'pin-to-top-blogs',
        'recent-blogs',
        'blogs-archives',
        'blogs-categories',
        'blogs-tags',
        'blog-collections',
        'blog-filter',
        'related-blogs',
      ],
    }),
    deleteMultiBlogs: builder.mutation({
      query: ({ post }) => ({
        url: `product/multi-delete/`,
        method: 'DELETE',
        body: post,
      }),
      invalidatesTags: [
        'blogs',
        'blogs-details',
        'blogs-data',
        'blogs-by-searchAndFilter',
        'pin-to-top-blogs',
        'recent-blogs',
        'blogs-archives',
        'blogs-categories',
        'blogs-tags',
        'blog-collections',
        'blog-filter',
        'related-blogs',
      ],
    }),
    changeMultiBlogStatus: builder.mutation({
      query: ({ post }) => ({
        url: `blogs/status/multi-change/`,
        method: 'POST',
        body: post,
      }),
      invalidatesTags: [
        'blogs',
        'blogs-details',
        'blogs-data',
        'blogs-by-searchAndFilter',
        'pin-to-top-blogs',
        'recent-blogs',
        'blogs-archives',
        'blogs-categories',
        'blogs-tags',
        'blog-collections',
        'blog-filter',
        'related-blogs',
      ],
    }),
    toggleBlogPin: builder.mutation({
      query: ({ post }) => ({
        url: `blogs/pin/toggle/`,
        method: 'PUT',
        body: post,
      }),
      invalidatesTags: [
        'blogs',
        'blogs-details',
        'blogs-data',
        'blogs-by-searchAndFilter',
        'pin-to-top-blogs',
        'recent-blogs',
        'blogs-archives',
        'blogs-categories',
        'blogs-tags',
        'blog-collections',
        'blog-filter',
        'related-blogs',
      ],
    }),
    toggleBlogPublish: builder.mutation({
      query: ({ post }) => ({
        url: `blogs/publish/toggle/`,
        method: 'PUT',
        body: post,
      }),
      invalidatesTags: [
        'blogs',
        'blogs-details',
        'blogs-data',
        'blogs-by-searchAndFilter',
        'pin-to-top-blogs',
        'recent-blogs',
        'blogs-archives',
        'blogs-categories',
        'blogs-tags',
        'blog-collections',
        'blog-filter',
        'related-blogs',
      ],
    }),
    removeBlogThumbnail: builder.mutation({
      query: ({ post }) => ({
        url: `blogs/thumbnail/remove/`,
        method: 'DELETE',
        body: post,
        invalidatesTags: [
          'blogs',
          'blogs-details',
          'blogs-data',
          'blogs-by-searchAndFilter',
          'pin-to-top-blogs',
          'recent-blogs',
          'blogs-archives',
          'blogs-categories',
          'blogs-tags',
          'blog-collections',
          'blog-filter',
          'related-blogs',
        ],
      }),
    }),
  }),
})

export const {
  useGetAllBlogsQuery,
  useGetAllAdminBlogsQuery,
  useRemoveBlogThumbnailMutation,
  useSearchAndFilterBlogsQuery,
  useGetPinToTopBlogsQuery,
  useGetBlogCollectionsQuery,
  useGetLastBlogsQuery,
  useGetRecentBlogsQuery,
  useGetArchivesQuery,
  useGetBlogFilterQuery,
  useGetAllCategoryQuery,
  useGetAllTagsQuery,

  useAddBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
  useChangeBlogStatusMutation,
  useChangeMultiBlogStatusMutation,
  useDeleteMultiBlogsMutation,
  useToggleBlogPinMutation,
  useToggleBlogPublishMutation,
  useUploadBlogImageMutation,
  useAddBlogCommentMutation,
  useGetRatingsQuery,
  useGetBlogDetailsQuery,
  useGetBlogForAdminQuery,
  useGetAdminBlogDetailsQuery,
  useGetRelatedBlogsQuery,
} = blogApi
