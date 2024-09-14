/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
    testEnvironment: 'jest-environment-jsdom',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    transform: {
        '^.+.tsx?$': ['ts-jest', {}],
    },
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
};
