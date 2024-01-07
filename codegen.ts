import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema:
    'https://raw.githubusercontent.com/AgricolaDevJP/agricoladb-server/main/graph/ent.graphqls',
  documents: 'src/libs/api/documents/**/*.graphql',
  generates: {
    'src/libs/api/generated.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-graphql-request'],
      config: {
        useTypeImports: true,
      },
    },
  },
  hooks: {
    afterAllFileWrite: [],
  },
}

export default config
