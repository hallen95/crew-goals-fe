import React from "react";
import { IonReactRouter } from "@ionic/react-router";
import { AuthProvider } from "./hooks/useAuthContext";
import Router from "./router";

const App: React.FC = () => (
  <IonReactRouter>
    <AuthProvider>
      <Router />
    </AuthProvider>
  </IonReactRouter>
);

export default App;
