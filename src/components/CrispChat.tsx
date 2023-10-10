"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("0e5e87ef-ac86-4420-8785-d4f00813c072");
  }, []);

  return null;
};

export default CrispChat;
