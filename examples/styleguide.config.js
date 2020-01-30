module.exports = {
  usageMode: 'expand',
  // exampleMode: 'expand',
  skipComponentsWithoutExample: true,
  components: 'src/**/*.tsx',
  propsParser: require('react-docgen-typescript').parse,
  resolver: require('react-docgen').resolver.findExportedComponentDefinition,
};
