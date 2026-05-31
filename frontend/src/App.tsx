import React, { Suspense } from "react";
import { LoginPage } from "./components/lazy/users.pages";
import LoadingScreen from "./components/loading-screen/LoadingScreen";
import { Routes, Route } from "react-router-dom";

const App: React.FC = () => {
  return (
    <Suspense fallback={<LoadingScreen></LoadingScreen>}>
      <Routes>
        <Route path="/" element={<LoginPage />}></Route>
      </Routes>
    </Suspense>
  );
};

export default App;
