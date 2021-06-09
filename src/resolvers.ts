import { IResolvers } from 'graphql-tools';
import _ from 'lodash';
import { resolver as HelloResolver } from './schema/hello';

const resolverMap: IResolvers = _.merge(HelloResolver);

export default resolverMap;
