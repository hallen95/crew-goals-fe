import React from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
} from "@ionic/react";

const GoalBoard: React.FC = () => {
  console.log("goal board");
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>My Goals</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <h2>Track Your Goals</h2>
        <IonButton routerLink="/friends">See Friends</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default GoalBoard;
