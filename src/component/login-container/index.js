import Image from "next/image";
import { Container, Form, Wrapper } from "./styles";
import AppLogo from "assets/images/logo.png";
import styles from "./login.module.css";
import TextInput from "component/common/TextInput";
import Button from "component/common/Button";
import { Formik } from "formik";
import { loginInitialValues, loginSchema } from "./login-schema";
import { useRouter } from "next/router";

const LoginContainer = () => {
  const router = useRouter();

  const onLogin = (e) => {
    router.push("/home");
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
                />
                <Button
                  type="submit"
                  disabled={isSubmitting}
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
