import type { Config } from '@jest/types';
const config: Config.InitialOptions = {
  verbose: true,
  transform: {
    '^.+\\.svelte$': ['svelte-jester', { "preprocess": true }],
    '^.+\\.ts$': 'ts-jest',
    '^.+\\.js$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'svelte'],
  setupFilesAfterEnv: ['./jest-setup.ts']
};
export default config;