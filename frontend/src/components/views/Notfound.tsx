import React from "react";
import "../../styles/notfound.css";
import { useTranslation } from "../../useTranslation";

const NotFound: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="not-found">
      <h1>{t("404_title")}</h1>
      <p>{t("404_message")}</p>
    </div>
  );
};

export default NotFound;
