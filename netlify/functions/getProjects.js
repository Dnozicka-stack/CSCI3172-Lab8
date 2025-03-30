import { projects } from '../../src/data/projects.js';

export const handler = async (event, context) => {
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(projects),
  };
}; 