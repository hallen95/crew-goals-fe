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
  IonToast,
} from "@ionic/react";
import { useForm } from "react-hook-form";
import { register as registerService } from "../services/auth.service";

type LoginFormInputs = {
  email: string;
  password: string;
  name: string;
};
const Register: React.FC = () => {
  const { handleSubmit, register } = useForm<LoginFormInputs>();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const onSubmit = async (data: {
    name: string;
    email: string;
    password: string;
  }) => {
    try {
      await registerService(data);
      setToastMessage("Registration successful! Please log in.");
      setShowToast(true);
    } catch (error: any) {
      setToastMessage(
        error?.response?.data?.message ||
          "Registration failed. Please try again."
      );
      setShowToast(true);
    }
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Register</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <form onSubmit={handleSubmit(onSubmit)}>
          <IonItem>
            <IonInput
              {...register("name")}
              type="text"
              placeholder="Name"
              required
            />
          </IonItem>
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
            Register
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

export default Register;
