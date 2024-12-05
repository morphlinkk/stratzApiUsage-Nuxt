import { useAuthStore } from "~/store/auth";
import type { DocumentNode } from 'graphql';

type GraphQLResponse<T> = {
    data: T;
    errors?: Array<{ message: string }>;
};

export const StratzAPI = async <T>(
    query: DocumentNode | string,
    variables: Record<string, any> = {}
  ): Promise<T> => {
    const auth = useAuthStore();
  
    // Если передается DocumentNode, конвертируем его в строку
    const queryString = typeof query === 'string' ? query : query.loc?.source.body;
  
    const response = await $fetch<GraphQLResponse<T>>('https://api.stratz.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth.getToken}`,
        'User-Agent': 'STRATZ-API',
      },
      body: JSON.stringify({ query: queryString, variables }),
    });
  
    if (response.errors) {
      throw new Error(response.errors.map(e => e.message).join('\n'));
    }
  
    if (!response.data) {
      throw new Error('Response body is empty');
    }
  
    return response.data;
  };
  