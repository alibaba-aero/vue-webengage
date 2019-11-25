module.exports = {
    moduleFileExtensions: ['js', 'vue'],

    transform: {
        '^.+\\.(js|jsx)?$': 'babel-jest',
        '^.+\\.vue$': 'vue-jest'
    },
    transformIgnorePatterns: ['<rootDir>/node_modules/'],

    testPathIgnorePatterns: [
        '<rootDir>/build/',
        '_utils.js'
    ],

    testMatch: [
        '<rootDir>/(tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx))'
    ],

    collectCoverageFrom: [
        '**/*.vue',
        '**/*.js'
    ],

    coveragePathIgnorePatterns: [
        '/node_modules/',
        '/__test__/',
        '/__mocks__/',
        '/dist/',
        '/cypress/'
    ],

    setupFilesAfterEnv: [
        'jest-extended',
        'jest-plugin-context/setup'
    ]
};
