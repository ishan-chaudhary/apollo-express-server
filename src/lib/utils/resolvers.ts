import { IResolvers } from 'graphql-tools';
import _ from 'lodash';
import { resolver as HelloResolver } from '../../components/hello/hello.graphql';
import { resolver as UserResolver } from '../../components/user/user.graphql';
import { resolver as Taskresolver } from '../../components/task/task.graphql';

const resolverMap: IResolvers = _.merge(HelloResolver, UserResolver, Taskresolver);

export default resolverMap;
