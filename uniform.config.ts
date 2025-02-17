import { uniformConfig } from "@uniformdev/cli/config";

module.exports = uniformConfig({
  preset: "all",
  overrides: { serializationConfig: { allowEmptySource: true } },
});
