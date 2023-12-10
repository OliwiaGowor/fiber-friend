import { useEffect } from "react";
import { useTranslation } from "react-i18next";

interface UnsavedPromptProps {
  hasUnsavedChanges: boolean;
}

export const UnsavedPrompt = (props: UnsavedPromptProps) => {
  const { hasUnsavedChanges, ...other } = props;
  const { t } = useTranslation("UnsavedPrompt");

  useEffect(() => {
    const onBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = t("unsavedChanges");
        const message = e.returnValue;
        return message; // For some older browsers
      }
    };

    window.addEventListener("beforeunload", onBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", onBeforeUnload);
    };
  }, [hasUnsavedChanges]);

  return <></>;
};