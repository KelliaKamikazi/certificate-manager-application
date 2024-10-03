import React from "react";
import "../../styles/home.css";
import { useTranslation } from "../../useTranslation";

const Home: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="start">
      <h1>{t("start")}</h1>
    </div>
  );
};

export default Home;
