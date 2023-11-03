import { useEffect } from "react";

interface UnsavedPromptProps {
    hasUnsavedChanges: boolean;
}

export const UnsavedPrompt = ( props: UnsavedPromptProps) => {
    const { hasUnsavedChanges, ...other } = props;

  useEffect(() => {
    const onBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = "You have unsaved changes. Are you sure you want to leave?";
      }
    };
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", onBeforeUnload);
    };
  }, [hasUnsavedChanges]);

  return <></>;
};