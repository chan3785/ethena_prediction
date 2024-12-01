import { ApolloClient, InMemoryCache } from '@apollo/client';

// GraphQL API 엔드포인트 설정
const client = new ApolloClient({
  uri: 'https://api.goldsky.com/api/public/project_cm3sn8j50guvv01xl88hndxcg/subgraphs/FACTORY3-sepolia/1.0.0/gn', 
  cache: new InMemoryCache(),
});

export default client;
