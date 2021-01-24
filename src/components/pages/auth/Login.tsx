import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import AuthTemplate from "@components/templates/AuthTemplate";
import Caution from "@components/organisms/auth/Caution";
import LoginForm from "@components/organisms/auth/LoginForm";

const Login: React.FunctionComponent<RouteComponentProps> = ({ history }) => (
  <AuthTemplate>
    <Caution />
    <LoginForm history={history} />
  </AuthTemplate>
);

export default Login;
