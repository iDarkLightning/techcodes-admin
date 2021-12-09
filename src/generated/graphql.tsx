import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type CreatePoints = {
  name: Scalars['String'];
  value: Scalars['Float'];
};

export type ManualPointsUpdate = {
  name: Scalars['String'];
  userId: Scalars['String'];
  value: Scalars['Float'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createPoints: Points;
  manualPointAward: User;
  register: User;
  togglePoints: Points;
};


export type MutationCreatePointsArgs = {
  createInput: CreatePoints;
};


export type MutationManualPointAwardArgs = {
  manualPointInput: ManualPointsUpdate;
};


export type MutationRegisterArgs = {
  osis: Scalars['String'];
};


export type MutationTogglePointsArgs = {
  toggleInput: TogglePoints;
};

export type Points = {
  __typename?: 'Points';
  enabled: Scalars['Boolean'];
  id: Scalars['String'];
  linkCode?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  type: PointsType;
  value: Scalars['Float'];
};

export enum PointsType {
  Link = 'LINK',
  Manual = 'MANUAL'
}

export type Query = {
  __typename?: 'Query';
  points: Array<Points>;
  redeemedPoints: Array<User>;
  users: Array<User>;
};


export type QueryRedeemedPointsArgs = {
  id: Scalars['String'];
};

export enum Role {
  Exec = 'EXEC',
  Member = 'MEMBER'
}

export type TogglePoints = {
  id: Scalars['String'];
  value: Scalars['Boolean'];
};

export type User = {
  __typename?: 'User';
  email?: Maybe<Scalars['String']>;
  emailVerified?: Maybe<Scalars['DateTime']>;
  id: Scalars['String'];
  image?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  osis?: Maybe<Scalars['String']>;
  points: Scalars['Int'];
  redeemedPoints: Array<Scalars['String']>;
  role: Role;
};

export type RegisterMutationVariables = Exact<{
  osis: Scalars['String'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'User', id: string } };

export type CreatePointsMutationVariables = Exact<{
  input: CreatePoints;
}>;


export type CreatePointsMutation = { __typename?: 'Mutation', createPoints: { __typename?: 'Points', id: string } };

export type EditPointsMutationVariables = Exact<{
  input: ManualPointsUpdate;
}>;


export type EditPointsMutation = { __typename?: 'Mutation', manualPointAward: { __typename?: 'User', id: string } };

export type PointsQueryVariables = Exact<{ [key: string]: never; }>;


export type PointsQuery = { __typename?: 'Query', points: Array<{ __typename?: 'Points', id: string, linkCode?: string | null | undefined, value: number, name: string, enabled: boolean, type: PointsType }> };

export type PointsReturnFragment = { __typename?: 'Points', id: string, linkCode?: string | null | undefined, value: number, name: string, enabled: boolean, type: PointsType };

export type RedeemedPointsQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type RedeemedPointsQuery = { __typename?: 'Query', redeemedPoints: Array<{ __typename?: 'User', name?: string | null | undefined, image?: string | null | undefined }> };

export type TogglePointsMutationVariables = Exact<{
  input: TogglePoints;
}>;


export type TogglePointsMutation = { __typename?: 'Mutation', togglePoints: { __typename?: 'Points', id: string, type: PointsType, name: string, value: number } };

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: string, image?: string | null | undefined, osis?: string | null | undefined, name?: string | null | undefined, email?: string | null | undefined, points: number, role: Role }> };

export type UsersReturnFragment = { __typename?: 'User', id: string, image?: string | null | undefined, osis?: string | null | undefined, name?: string | null | undefined, email?: string | null | undefined, points: number, role: Role };

export const PointsReturnFragmentDoc = gql`
    fragment PointsReturn on Points {
  id
  linkCode
  value
  name
  enabled
  type
}
    `;
export const UsersReturnFragmentDoc = gql`
    fragment UsersReturn on User {
  id
  image
  osis
  name
  email
  points
  role
}
    `;
export const RegisterDocument = gql`
    mutation Register($osis: String!) {
  register(osis: $osis) {
    id
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      osis: // value for 'osis'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const CreatePointsDocument = gql`
    mutation CreatePoints($input: CreatePoints!) {
  createPoints(createInput: $input) {
    id
  }
}
    `;
export type CreatePointsMutationFn = Apollo.MutationFunction<CreatePointsMutation, CreatePointsMutationVariables>;

/**
 * __useCreatePointsMutation__
 *
 * To run a mutation, you first call `useCreatePointsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePointsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPointsMutation, { data, loading, error }] = useCreatePointsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreatePointsMutation(baseOptions?: Apollo.MutationHookOptions<CreatePointsMutation, CreatePointsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePointsMutation, CreatePointsMutationVariables>(CreatePointsDocument, options);
      }
export type CreatePointsMutationHookResult = ReturnType<typeof useCreatePointsMutation>;
export type CreatePointsMutationResult = Apollo.MutationResult<CreatePointsMutation>;
export type CreatePointsMutationOptions = Apollo.BaseMutationOptions<CreatePointsMutation, CreatePointsMutationVariables>;
export const EditPointsDocument = gql`
    mutation EditPoints($input: ManualPointsUpdate!) {
  manualPointAward(manualPointInput: $input) {
    id
  }
}
    `;
export type EditPointsMutationFn = Apollo.MutationFunction<EditPointsMutation, EditPointsMutationVariables>;

/**
 * __useEditPointsMutation__
 *
 * To run a mutation, you first call `useEditPointsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditPointsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editPointsMutation, { data, loading, error }] = useEditPointsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useEditPointsMutation(baseOptions?: Apollo.MutationHookOptions<EditPointsMutation, EditPointsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditPointsMutation, EditPointsMutationVariables>(EditPointsDocument, options);
      }
export type EditPointsMutationHookResult = ReturnType<typeof useEditPointsMutation>;
export type EditPointsMutationResult = Apollo.MutationResult<EditPointsMutation>;
export type EditPointsMutationOptions = Apollo.BaseMutationOptions<EditPointsMutation, EditPointsMutationVariables>;
export const PointsDocument = gql`
    query Points {
  points {
    ...PointsReturn
  }
}
    ${PointsReturnFragmentDoc}`;

/**
 * __usePointsQuery__
 *
 * To run a query within a React component, call `usePointsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePointsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePointsQuery({
 *   variables: {
 *   },
 * });
 */
export function usePointsQuery(baseOptions?: Apollo.QueryHookOptions<PointsQuery, PointsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PointsQuery, PointsQueryVariables>(PointsDocument, options);
      }
export function usePointsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PointsQuery, PointsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PointsQuery, PointsQueryVariables>(PointsDocument, options);
        }
export type PointsQueryHookResult = ReturnType<typeof usePointsQuery>;
export type PointsLazyQueryHookResult = ReturnType<typeof usePointsLazyQuery>;
export type PointsQueryResult = Apollo.QueryResult<PointsQuery, PointsQueryVariables>;
export const RedeemedPointsDocument = gql`
    query RedeemedPoints($id: String!) {
  redeemedPoints(id: $id) {
    name
    image
  }
}
    `;

/**
 * __useRedeemedPointsQuery__
 *
 * To run a query within a React component, call `useRedeemedPointsQuery` and pass it any options that fit your needs.
 * When your component renders, `useRedeemedPointsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRedeemedPointsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRedeemedPointsQuery(baseOptions: Apollo.QueryHookOptions<RedeemedPointsQuery, RedeemedPointsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RedeemedPointsQuery, RedeemedPointsQueryVariables>(RedeemedPointsDocument, options);
      }
export function useRedeemedPointsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RedeemedPointsQuery, RedeemedPointsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RedeemedPointsQuery, RedeemedPointsQueryVariables>(RedeemedPointsDocument, options);
        }
export type RedeemedPointsQueryHookResult = ReturnType<typeof useRedeemedPointsQuery>;
export type RedeemedPointsLazyQueryHookResult = ReturnType<typeof useRedeemedPointsLazyQuery>;
export type RedeemedPointsQueryResult = Apollo.QueryResult<RedeemedPointsQuery, RedeemedPointsQueryVariables>;
export const TogglePointsDocument = gql`
    mutation TogglePoints($input: TogglePoints!) {
  togglePoints(toggleInput: $input) {
    id
    type
    name
    value
  }
}
    `;
export type TogglePointsMutationFn = Apollo.MutationFunction<TogglePointsMutation, TogglePointsMutationVariables>;

/**
 * __useTogglePointsMutation__
 *
 * To run a mutation, you first call `useTogglePointsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTogglePointsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [togglePointsMutation, { data, loading, error }] = useTogglePointsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTogglePointsMutation(baseOptions?: Apollo.MutationHookOptions<TogglePointsMutation, TogglePointsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TogglePointsMutation, TogglePointsMutationVariables>(TogglePointsDocument, options);
      }
export type TogglePointsMutationHookResult = ReturnType<typeof useTogglePointsMutation>;
export type TogglePointsMutationResult = Apollo.MutationResult<TogglePointsMutation>;
export type TogglePointsMutationOptions = Apollo.BaseMutationOptions<TogglePointsMutation, TogglePointsMutationVariables>;
export const UsersDocument = gql`
    query Users {
  users {
    ...UsersReturn
  }
}
    ${UsersReturnFragmentDoc}`;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useUsersQuery(baseOptions?: Apollo.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
      }
export function useUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
        }
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = Apollo.QueryResult<UsersQuery, UsersQueryVariables>;
export const namedOperations = {
  Query: {
    Points: 'Points',
    RedeemedPoints: 'RedeemedPoints',
    Users: 'Users'
  },
  Mutation: {
    Register: 'Register',
    CreatePoints: 'CreatePoints',
    EditPoints: 'EditPoints',
    TogglePoints: 'TogglePoints'
  },
  Fragment: {
    PointsReturn: 'PointsReturn',
    UsersReturn: 'UsersReturn'
  }
}