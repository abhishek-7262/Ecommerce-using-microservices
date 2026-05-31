import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

const LoadingScreen: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <CircularProgress />
    </div>
  );
};

export default LoadingScreen;
