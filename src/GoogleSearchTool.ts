import axios from 'axios';
import { Tool } from './types';
import dotenv from 'dotenv';
import { GoogleSearchResponse, SearchParams } from './types/GoogleSearchTool';

dotenv.config({ override: true });

const URL = 'https://serpapi.com/search';

async function _googleSearchResults(
  params: SearchParams,
): Promise<GoogleSearchResponse['organic_results']> {
  try {
    const response = await axios.get<GoogleSearchResponse>(URL, { params });
    return response.data.organic_results;
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}

async function search(query: string): Promise<string> {
  const params: SearchParams = {
    q: query,
    engine: 'google',
    api_key: process.env.SEARCH_API_KEY || '',
  };

  const res = await _googleSearchResults(params);

  const snippets: string[] = [];

  if (res.length === 0) {
    return 'No good Google Search Result was found';
  }

  for (const result of res) {
    if (result.snippet) {
      snippets.push(result.snippet);
    }
  }

  return snippets.join(' ');
}
