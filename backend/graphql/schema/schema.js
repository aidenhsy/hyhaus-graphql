const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
} = require('graphql');

const Company = require('../../models/Company');
const User = require('../../models/User');

const CompanyType = new GraphQLObjectType({
  name: 'Company',
  fields: () => ({
    _id: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    users: {
      type: new GraphQLList(UserType),
      resolve(parentValue, args) {
        return User.find((_id = parentValue._id));
      },
    },
  }),
});

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    _id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt },
    company: {
      type: CompanyType,
      resolve(parentValue, args) {
        return Company.findById(parentValue.company).catch((err) =>
          console.log(err)
        );
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    users: {
      type: new GraphQLList(UserType),
      resolve() {
        return User.find();
      },
    },
    companies: {
      type: new GraphQLList(CompanyType),
      resolve() {
        return Company.find();
      },
    },
    user: {
      type: UserType,
      args: { _id: { type: GraphQLString } },
      resolve(parentValue, args) {
        return User.findById(args._id);
      },
    },
    company: {
      type: CompanyType,
      args: { _id: { type: GraphQLString } },
      resolve(parentValue, args) {
        return Company.findById(args._id);
      },
    },
  },
});

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser: {
      type: CompanyType,
      args: {
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
        company: { type: GraphQLString },
      },
      resolve(parentValue, { firstName, age, company }) {
        return User.create({ firstName, age, company });
      },
    },
    addCompany: {
      type: CompanyType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLString },
      },
      resolve(parentValue, { name, description }) {
        return Company.create({ name, description });
      },
    },
    deleteCompany: {
      type: CompanyType,
      args: { _id: { type: new GraphQLNonNull(GraphQLString) } },
      resolve(parentValue, { _id }) {
        return Company.remove({ _id });
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: mutation,
});
