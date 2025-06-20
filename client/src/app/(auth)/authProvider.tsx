"use client";

import React, { useEffect } from "react";
import { Amplify } from "aws-amplify";

import {
  Authenticator,
  Heading,
  Radio,
  RadioGroupField,
  TextField,
  useAuthenticator,
  View,
} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { usePathname, useRouter } from "next/navigation";

// https://docs.amplify.aws/gen1/react/tools/libraries/configure-categories/?
Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_ID!,
      userPoolClientId:
        process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_CLIENT_ID!,
    },
  },
});

const components = {
  Header() {
    return (
      <View className="mt-4 mb-7">
        <Heading level={3} className="!text-2xl !font-bold ">
          Find
          <span className="text-secondary-500 font-light hover:!text-primary-300 ml-1 ">
            - RealEst
          </span>
        </Heading>
        <p className="text-muted-foreground mt-2">
          <span className="font-bold mr-1 ">Welcome!</span>
          Please sign in to continue.
        </p>
      </View>
    );
  },
  SignIn: {
    Footer() {
      const { toSignUp } = useAuthenticator();
      return (
        <View className="mt-4 text-center">
          <p className="text-muted-foreground mt-2">
            Don&apos;t have an account?
          </p>
          <button
            onClick={toSignUp}
            className="text-primary-800 hover:underline bg-transparent border-none p-0"
          >
            Sign up here
          </button>
        </View>
      );
    },
  },

  SignUp: {
    FormFields() {
      const { validationErrors } = useAuthenticator();

      return (
        <>
          {/* <Authenticator.SignUp.FormFields /> */}
          <TextField
            name="username"
            label="Username"
            placeholder="Choose a username"
            isRequired={true}
            hasError={!!validationErrors?.username}
            errorMessage={validationErrors?.username}
          />
          <TextField
            name="email"
            label="Email"
            placeholder="Enter your email"
            isRequired={true}
            hasError={!!validationErrors?.email}
            errorMessage={validationErrors?.email}
          />
          <TextField
            name="password"
            label="Password"
            placeholder="Create a password"
            type="password"
            isRequired={true}
            hasError={!!validationErrors?.password}
            errorMessage={validationErrors?.password}
          />
          <TextField
            name="confirm_password"
            label="Confirm Password"
            placeholder="Confirm your password"
            type="password"
            isRequired={true}
            hasError={!!validationErrors?.confirm_password}
            errorMessage={validationErrors?.confirm_password}
          />
          <RadioGroupField
            legend="Role"
            name="custom:Role"
            errorMessage={validationErrors?.["custom:role"]}
            hasError={!!validationErrors?.["custom:role"]}
            isRequired
          >
            <Radio value="tenant">Tenant</Radio>
            <Radio value="manager">Manager</Radio>
          </RadioGroupField>
        </>
      );
    },
    Footer() {
      const { toSignIn } = useAuthenticator();
      return (
        <View className="mt-4 text-center">
          <p className="text-muted-foreground mt-2">Already have an account?</p>
          <button
            onClick={toSignIn}
            className="text-primary-800 hover:underline bg-transparent border-none p-0"
          >
            Sign in
          </button>
        </View>
      );
    },
  },
};

const formFields = {
  signIn: {
    userName: {
      placeholder: "Enter your email",
      label: "Email",
      isRequired: true,
    },
    password: {
      placeholder: "Enter your password",
      label: "Password",
      isRequired: true,
    },
  },
  signUp: {
    userName: {
      order: 1,
      placeholder: "Choose a username",
      label: "Username",
      isRequired: true,
    },
    email: {
      order: 2,
      placeholder: "Enter your email",
      label: "Email",
      isRequired: true,
    },
    password: {
      order: 3,
      placeholder: "Create a password",
      label: "Password",
      isRequired: true,
    },
    confirm_Password: {
      order: 4,
      placeholder: "Confirm your password",
      label: "Confirm Password",
      isRequired: true,
    },
  },
};

const Auth = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuthenticator((context) => [context.user]);

  const router = useRouter();
  const pathname = usePathname();

  const isAuthPage = pathname.match(/^\/(signin|signup)$/);
  const isDashboard =
    pathname.startsWith("/manager") || pathname.startsWith("/tenant");

  // redirecting the authenticated user to other page
  useEffect(() => {
    if (user && isAuthPage) {
      router.push("/");
    }
  }, [user, isAuthPage, router]);

  // allow access to public pages without authentication
  if (!isAuthPage && !isDashboard) {
    return <> {children} </>;
  }

  return (
    <div className="h-full">
      <Authenticator 
        initialState = {pathname.includes('signup') ? "signUp" : "signIn" }
        components={components} 
        formFields={formFields}>
        {() => <> {children} </>}
      </Authenticator>
    </div>
  );
};
export default Auth;
