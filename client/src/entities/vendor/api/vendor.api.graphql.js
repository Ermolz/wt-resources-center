import { apolloClient } from '@shared/lib/apollo';
import { GET_VENDORS } from '@shared/lib/graphql/queries';

export const vendorApiGraphQL = {
  getAll: async () => {
    const { data } = await apolloClient.query({
      query: GET_VENDORS,
      fetchPolicy: 'network-only',
    });
    
    return {
      data: data.getVendors,
    };
  },
};

