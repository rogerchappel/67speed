export function parseOptions(argv, allowed, usage) {
  const options = new Map();

  for (let index = 0; index < argv.length; index += 2) {
    const flag = argv[index];
    const value = argv[index + 1];
    if (!allowed.has(flag)) fail(`unknown option: ${flag}`, usage);
    if (value === undefined || value.startsWith('--')) fail(`missing value for ${flag}`, usage);
    if (options.has(flag)) fail(`duplicate option: ${flag}`, usage);
    options.set(flag, value);
  }

  return options;
}

export function fail(message, usage) {
  console.error(`Error: ${message}\n${usage}`);
  process.exit(2);
}
