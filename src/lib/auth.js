import {
    CognitoIdentityProviderClient,
    SignUpCommand,
    ConfirmSignUpCommand,
    InitiateAuthCommand,
    ForgotPasswordCommand,
    ConfirmForgotPasswordCommand,
    GetUserCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import { setCookie, getCookie } from "@/utlis/cookies";
import { jwtDecode } from "jwt-decode";
  
  const REGION = process.env.NEXT_PUBLIC_COGNITO_REGION;
  const DOMAIN = process.env.NEXT_PUBLIC_COGNITO_DOMAIN;
  const CLIENT_ID = process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID;
  const REDIRECT_URI = process.env.NEXT_PUBLIC_COGNITO_REDIRECT_URI;

  
  const client = new CognitoIdentityProviderClient({
    region: REGION,
  });
  
  /// --------------------
  /// SIGN UP FUNCTION
  /// --------------------
  export async function signUp({ username, password, email }) {
    const input = {
      ClientId: CLIENT_ID,
      Username: username,
      Password: password,
      UserAttributes: [{ Name: "email", Value: email }],
    };
  
    try {
      const command = new SignUpCommand(input);
      const response = await client.send(command);
      return { success: true, data: response };
    } catch (err) {
      return { success: false, message: err.message };
    }
  }
  
  /// ------------------------
  /// CONFIRM SIGNUP FUNCTION
  /// ------------------------
  export async function confirmSignUp(username, code) {
    const input = {
      ClientId: CLIENT_ID,
      Username: username,
      ConfirmationCode: code,
    };
  
    try {
      const command = new ConfirmSignUpCommand(input);
      const response = await client.send(command);
      return { success: true, data: response };
    } catch (err) {
      return { success: false, message: err.message };
    }
  }
  
  /// --------------------
  /// LOGIN FUNCTION
  /// --------------------
  export async function signIn(username, password) {
    const input = {
      AuthFlow: "USER_PASSWORD_AUTH",
      ClientId: CLIENT_ID,
      AuthParameters: {
        USERNAME: username,
        PASSWORD: password,
      },
    };
  
    try {
      const command = new InitiateAuthCommand(input);
      const response = await client.send(command);
      const token = response.AuthenticationResult.AccessToken;
      setCookie('accessToken', token, 3600)
      return { 
        success: true,
      };
    } catch (err) {
      return { success: false, message: err.message };
    }
  }
  
  /// ----------------------------
  /// FORGOT PASSWORD FUNCTION
  /// ----------------------------
  export async function forgotPassword(username) {
    const input = {
      ClientId: CLIENT_ID,
      Username: username,
    };
  
    try {
      const command = new ForgotPasswordCommand(input);
      const response = await client.send(command);
      return { success: true, data: response };
    } catch (err) {
      return { success: false, message: err.message };
    }
  }
  
  /// ---------------------------------
  /// CONFIRM NEW PASSWORD (RESET FLOW)
  /// ---------------------------------
  export async function confirmNewPassword(username, code, newPassword) {
    const input = {
      ClientId: CLIENT_ID,
      Username: username,
      ConfirmationCode: code,
      Password: newPassword,
    };
  
    try {
      const command = new ConfirmForgotPasswordCommand(input);
      const response = await client.send(command);
      return { success: true, data: response };
    } catch (err) {
      return { success: false, message: err.message };
    }
  }

  /// ------------------
  /// GET USER DATA
  /// ------------------

  export async function getCurrentUser() {
  const token = getCookie("accessToken");
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);

    if (decoded["token_use"] === "access") {
      const command = new GetUserCommand({ AccessToken: token });
      const response = await client.send(command);
      return response;
    } else if (decoded["token_use"] === "id") {
      return {
        username: decoded["cognito:username"],
        email: decoded["email"],
        provider: decoded["iss"],
      };
    }
    return null;
  } catch {
    return null;
  }
}
  
// ──────────────────────────────────────────────────────────────────────────
// Redirect into the Cognito Hosted UI Google flow
// ──────────────────────────────────────────────────────────────────────────
export function signInWithBrowser(path) {
  const params = new URLSearchParams({
    identity_provider: path,
    redirect_uri: REDIRECT_URI,
    response_type: "CODE",
    client_id: CLIENT_ID,
    scope: "email openid profile",
  });

  window.location.href = `https://${DOMAIN}/oauth2/authorize?${params.toString()}`;
}