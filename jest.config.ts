// module.exports = {
//   testEnvironment: 'jsdom',
//   // Add any other necessary Jest configurations here
// };

import type { Config } from 'jest';

export default async (): Promise<Config> => {
  return {
    verbose: true,
    testEnvironment: 'jsdom',
    transform: {
      '^.+\\.tsx?$': 'babel-jest',
    },
  };
};
