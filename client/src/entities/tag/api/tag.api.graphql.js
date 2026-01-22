import { apolloClient } from '@shared/lib/apollo';
import { GET_TAGS } from '@shared/lib/graphql/queries';

export const tagApiGraphQL = {
  getAll: async () => {
    const { data } = await apolloClient.query({
      query: GET_TAGS,
      fetchPolicy: 'network-only',
    });
    
    return {
      data: data.getTags,
    };
  },
};

