// eslint-disable-next-line import/no-extraneous-dependencies
import { PrismaRepoConfig } from 'prisma-repo';

const config: PrismaRepoConfig = {
  overwrite: {
    baseRepository: false,
    repository: false,
  },
  repositoryPath: 'src/repository',
  prismaLogger: true,
};

export default config;
