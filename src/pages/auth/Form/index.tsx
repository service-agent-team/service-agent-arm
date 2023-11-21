import { PrimaryBtn } from "@/components"
import { ROUTES } from "@/constants"
import { useTypedSelector } from "@/hooks"
import { Form, Row, Typography } from "antd"
import classnameBind from "classnames/bind"
import { Link } from "react-router-dom"
import styles from "../auth.module.scss"
import { authDictionary } from "../dictionary"
import { IFormProps } from "./form.props"

const cn = classnameBind.bind(styles)

export const AuthForm = ({ text, login, onFinish, children }: IFormProps) => {
  const { loading } = useTypedSelector((state) => state.auth)

  return (
    <Form className={cn("auth__form")} layout="vertical" onFinish={onFinish} autoComplete="off">
      {children}

      <PrimaryBtn
        type="primary"
        loading={loading.sign}
        htmlType="submit"
        className={cn("auth__form-btn")}
      >
        {text}
      </PrimaryBtn>

      <Row align="middle">
        {login ? (
          <Typography.Text>
            {authDictionary.forget}&nbsp;
            <Link to={ROUTES.resetEmail}>{authDictionary.recovery}</Link>
          </Typography.Text>
        ) : (
          <Typography.Text>
            <Link to={ROUTES.signIn}>{authDictionary.backToLoginPage}</Link>
          </Typography.Text>
        )}
      </Row>
    </Form>
  )
}
