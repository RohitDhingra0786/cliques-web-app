import Image from "next/image";
import { Container, Form, Wrapper } from "./styles";
import AppLogo from "assets/images/logo.png";
import styles from "./login.module.css";
import TextInput from "component/common/TextInput";
import Button from "component/common/Button";
import { Formik } from "formik";
import { loginInitialValues, loginSchema } from "./login-schema";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { setUser } from "redux/auth-reducer";
import { login } from "services/auth";
import { showError } from "utils";

const LoginContainer = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const onLogin = async ({ email, password }) => {
    try {
      const response = await login({ email, password });
      console.log({ response });

      if (response?.success === "false") {
        showError(response?.msg?.[0]);
      } else {
        dispatch(setUser(response));
        router.replace("/home");
      }
    } catch (error) {}
  };

  return (
    <Wrapper>
      <Container>
        <Image
          loading="eager"
          priority={true}
          alt="logo"
          className={styles.applogo}
          src={AppLogo}
        />

        <Formik
          initialValues={loginInitialValues}
          validationSchema={loginSchema}
          onSubmit={onLogin}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => {
            console.log({ values });
            return (
              <Form onSubmit={handleSubmit}>
                <TextInput
                  value={values.email || ""}
                  type="email"
                  placeholder="Email"
                  name="email"
                  onChange={handleChange}
                  error={errors.email && touched.email && errors.email}
                  onBlur={handleBlur}
                />
                <TextInput
                  type="password"
                  name="password"
                  value={values.password || ""}
                  placeholder="Password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.password && touched.password && errors.password}
                />
                <Button
                  type="submit"
                  // disabled={isSubmitting}
                  margin="40px 0"
                  title={"Login"}
                />
              </Form>
            );
          }}
        </Formik>
      </Container>
    </Wrapper>
  );
};

export default LoginContainer;
