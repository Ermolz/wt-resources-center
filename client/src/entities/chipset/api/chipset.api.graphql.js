import { apolloClient } from '@shared/lib/apollo';
import { GET_CHIPSETS } from '@shared/lib/graphql/queries';

export const chipsetApiGraphQL = {
  getAll: async () => {
    const { data } = await apolloClient.query({
      query: GET_CHIPSETS,
      fetchPolicy: 'network-only',
    });
    
    return {
      data: data.getChipsets,
    };
  },
};

