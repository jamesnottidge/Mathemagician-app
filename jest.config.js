module.exports = {
    'setupFilesAfterEnv': ['./setupJest.js'],
    "transform": {"^.+\\.(js|jsx)$": "babel-jest"},
    // The pattern or patterns Jest uses to detect test files
    "testRegex": "./test/.*.js$",
  
    // Automatically clear mock calls, instances and results before every test
    "clearMocks": true,
    "moduleNameMapper": {
      "\\.(css|less|scss|sass)$": "identity-obj-proxy"
    },
  
    // Indicates whether the coverage information should be collected while executing the test
    "collectCoverage": true,
  
    // The directory where Jest should output its coverage files
    "coverageDirectory": "coverage",
  
    // The test environment that will be used for testing
    "testEnvironment": "jsdom",
   // "setupFilesAfterEnv": ['<rootDir>/jest-setup.js']
  };


