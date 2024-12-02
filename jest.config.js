module.exports = {
  preset: 'react-native',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testPathIgnorePatterns: ['/node_modules/', '/build/'],
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  testEnvironment: 'node',
  collectCoverage: true, 
  collectCoverageFrom: [
    'src/**/*.{js,ts,tsx}', // Which files to include for coverage
    '!src/**/*.d.ts', 
  ],
  coverageDirectory: 'coverage', 
  coverageReporters: ['json', 'html', 'text'],
};
