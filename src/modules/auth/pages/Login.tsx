import React, { useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonInput,
  IonItem,
  IonText,
  IonToast,
} from "@ionic/react";
import { useForm } from "react-hook-form";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { login as loginService } from "../services/auth.service";

// Define the type for the form inputs
interface LoginFormInputs {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const auth = useAuthContext();
  const { handleSubmit, register } = useForm<LoginFormInputs>();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const onSubmit = async (data: { email: string; password: string }) => {
    try {
      const response = await loginService(data.email, data.password); // Now returns { token }
      console.log("Token:", response.token);
      auth?.login(response.token); // Pass the token to the AuthContext's login method
      setToastMessage("Login successful!");
      setShowToast(true);
    } catch (error: any) {
      console.log("Error:", error);
      setToastMessage(
        error?.response?.data?.message || "Failed to login. Please try again."
      );
      setShowToast(true);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <form onSubmit={handleSubmit(onSubmit)}>
          <IonItem>
            <IonInput
              {...register("email")}
              type="email"
              placeholder="Email"
              required
            />
          </IonItem>
          <IonItem>
            <IonInput
              {...register("password")}
              type="password"
              placeholder="Password"
              required
            />
          </IonItem>
          <IonButton expand="full" type="submit">
            Login
          </IonButton>
        </form>
        <IonToast
          isOpen={showToast}
          message={toastMessage}
          duration={3000}
          onDidDismiss={() => setShowToast(false)}
        />
      </IonContent>
    </IonPage>
  );
};
export default Login;
