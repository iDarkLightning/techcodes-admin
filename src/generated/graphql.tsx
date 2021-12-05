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

export type DisablePoints = {
  id: Scalars['String'];
  value: Scalars['Boolean'];
};

export type ManualPointsUpdate = {
  name: Scalars['String'];
  userId: Scalars['String'];
  value: Scalars['Float'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createPoints: Points;
  disablePoints: Points;
  manualPointAward: User;
  register: User;
};


export type MutationCreatePointsArgs = {
  createInput: CreatePoints;
};


export type MutationDisablePointsArgs = {
  disableInput: DisablePoints;
};


export type MutationManualPointAwardArgs = {
  manualPointInput: ManualPointsUpdate;
};


export type MutationRegisterArgs = {
  osis: Scalars['String'];
};

export type Points = {
  __typename?: 'Points';
  enabled: Scalars['Boolean'];
  id: Scalars['String'];
  linkCode?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  type: PointsType;
  value: Scalars['Int'];
};

export enum PointsType {
  Link = 'LINK',
  Manual = 'MANUAL'
}

export type Query = {
  __typename?: 'Query';
  points: Array<Points>;
  redeemedPoints: Array<User>;
};


export type QueryRedeemedPointsArgs = {
  id: Scalars['String'];
};

export enum Role {
  Exec = 'EXEC',
  Member = 'MEMBER'
}

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
export const namedOperations = {
  Mutation: {
    Register: 'Register'
  }
}