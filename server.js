import Koa from 'koa';
import Router from 'koa-router';
import graphqlHTTP from 'koa-graphql';
import cors from 'koa-cors';

import Schema from './schemas';
import Resolvers from './resolvers'

const app = new Koa();
const router = new Router();

router.all('/gql', graphqlHTTP({
	schema: Schema,
	rootValue: Resolvers,
  graphiql: true
}));

app.use(cors())
app.use(router.routes()).use(router.allowedMethods());

app.listen(4000);
console.log('Running a FPL GQL API server at port 4000/gql');