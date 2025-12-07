export const getHashnodePosts = async () => {
    const query = `
    query {
      publication(id: "69086b38b72ed24db2c31280") {
        posts(first: 10) {
          edges {
            node {
              id
              title
              brief
              url
              slug
              publishedAt
              readTimeInMinutes
              coverImage {
                url
              }
              tags {
                name
              }
            }
          }
        }
      }
    }
  `;

    try {
        const response = await fetch('https://gql.hashnode.com', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query }),
            next: { revalidate: 3600 } // Revalidate every hour
        });

        const { data } = await response.json();
        return data.publication.posts.edges.map((edge: any) => edge.node);
    } catch (error) {
        console.error('Error fetching Hashnode posts:', error);
        return [];
    }
};

export const getPostBySlug = async (slug: string) => {
    const query = `
    query {
      publication(id: "69086b38b72ed24db2c31280") {
        post(slug: "${slug}") {
          title
          subtitle
          publishedAt
          readTimeInMinutes
          coverImage {
            url
          }
          tags {
            name
          }
          content {
            html
          }
        }
      }
    }
  `;

    try {
        const response = await fetch('https://gql.hashnode.com', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query }),
            next: { revalidate: 3600 }
        });

        const { data } = await response.json();
        return data.publication.post;
    } catch (error) {
        console.error('Error fetching Hashnode post:', error);
        return null;
    }
};
