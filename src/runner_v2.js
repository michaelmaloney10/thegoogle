#!/usr/bin/env node

const argv = require('yargs')
  .command({
    command: 'runner',
    desc: 'Load a CSV containing queries and scrape screenshots from Google',
    handler: (argv) => {
      console.log(`setting ${argv.key} to ${argv.value}`)
    }
  })
  .option('csv', {
    required: true,
    type: 'string',
    desc: 'Path to query CSV file'
  })
  .option('output', {
    alias: 'o',
    required: true,
    type: 'string',
    desc: 'Path to output screenshots'
  })
  .option('timeout', {
    alias: 't',
    desc: 'Seconds waiting for results to render',
    type: 'number',
    default: 1
  })
  .help()
  .version('v2.0')
  .argv;

console.log(`CSV: "${argv.csv}"`);
console.log(`Output Path: ${argv.output}`);
console.log(`Timeout: ${argv.timeout} seconds`);
