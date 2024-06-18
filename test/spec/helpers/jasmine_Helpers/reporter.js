const { SpecReporter } = require('jasmine-spec-reporter');
const JasmineReporters = require('jasmine-reporters');

jasmine.getEnv().clearReporters(); 
jasmine.getEnv().addReporter(new SpecReporter({ 
  spec: {
    displayPending: true,
  },
}));

jasmine.getEnv().addReporter(new JasmineReporters.JUnitXmlReporter({ 
  savePath: './reports/',
  consolidateAll: false,
}));