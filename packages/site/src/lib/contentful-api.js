import { gql, GraphQLClient } from 'graphql-request';

const endpoint = `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`;

const client = {
  _client: new GraphQLClient(endpoint),
  _preview: null,
  _header: {
    published: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
    preview: `Bearer ${process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN}`,
  },
  usePreview(preview) {
    if (this._preview === preview) {
      return;
    }
    this._preview = preview;
    const header = preview ? this._header.preview : this._header.published;
    this._client.setHeader('authorization', header);
  },
  request(...args) {
    return this._client.request(...args);
  },
};

const getAllPostsQuery = gql`
  query getAllPostsWithSlug($preview: Boolean!) {
    postCollection(
      where: { slug_exists: true }
      preview: $preview
      order: date_DESC
    ) {
      items {
        slug
        content
      }
    }
  }
`;

export async function getAllPosts(preview = false) {
  const variables = { preview };
  client.usePreview(preview);
  const entries = await client.request(getAllPostsQuery, variables);
  return entries.postCollection?.items;
}

const getPostQuery = gql`
  query getPost($slug: String, $preview: Boolean) {
    postCollection(where: { slug: $slug }, preview: $preview, limit: 1) {
      items {
        slug
        content
      }
    }
  }
`;

export async function getPost(slug, preview = false) {
  const variables = { slug, preview };
  client.usePreview(preview);
  const entry = await client.request(getPostQuery, variables);
  return entry.postCollection?.items?.[0];
}

const getAssetsQuery = gql`
  query getAssets($preview: Boolean) {
    assetCollection(preview: $preview) {
      items {
        url
        title
        width
        height
      }
    }
  }
`;

export async function getAllAssets(preview = false) {
  const variables = { preview };
  client.usePreview(preview);
  const assets = await client.request(getAssetsQuery, variables);
  return assets.assetCollection?.items;
}

// export async function getAssetsByTitle(assetTitles, preview = false) {
//   const fragments = assetTitles
//     .map((title) => `{ title: "${title}" }`)
//     .join(',');
//   const query = `
//   getAsset($preview: Boolean) {
//     assetCollection(
//       preview: $preview
//       where: { OR: [
//         ${fragments}
//       ] }
//     ) {
//       items {
//         title
//         url
//       }
//     }
//   }
//   `;
//   const variables = { preview };
//   client.usePreview(preview);
//   const assets = await client.request(getAssetsQuery, variables);
//   return assets.assetCollection?.items;
// }
