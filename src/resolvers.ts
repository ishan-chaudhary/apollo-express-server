import { IResolvers } from 'graphql-tools';
import _ from 'lodash';
import { resolver as HelloResolver } from './components/hello/hello.graphql';

const resolverMap: IResolvers = _.merge(HelloResolver);

export default resolverMap;
