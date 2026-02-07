import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";

const useAuth = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // searching URL
  const mode = searchParams.get("auth");
  const step = parseInt(searchParams.get("step") || "1");
  const isOpen = !!mode;

  // open auth preserving current URL
  const openAuth = useCallback(
    (newMode, newStep = 1) => {
      setSearchParams(
        (prev) => {
          prev.set("auth", newMode);
          prev.set("step", newStep.toString());
          return prev;
        },
        { replace: true },
      );
    },
    [setSearchParams],
  );

  // close auth (remove auth params)
  const closeAuth = useCallback(() => {
    setSearchParams(
      (prev) => {
        prev.delete("auth");
        prev.delete("step");
        return prev;
      },
      { replace: true },
    );
  }, [setSearchParams]);

  // navigation
  const nextStep = useCallback(() => {
    if (mode) openAuth(mode, step + 1);
  }, [mode, step, openAuth]);

  const prevStep = useCallback(() => {
    if (mode && step > 1) openAuth(mode, step - 1);
  }, [mode, step, openAuth]);

  const switchAuthMode = useCallback(
    (newMode) => {
      // switching to newMode step 1
      setSearchParams(
        (prev) => {
          prev.set("auth", newMode);
          prev.set("step", "1");
          return prev;
        },
        { replace: true },
      );
    },
    [setSearchParams],
  );

  return {
    // state
    mode,
    step,
    isOpen,
    getAuthState: () => ({ mode, step, isOpen }), // helper just in case

    // actions
    openAuth,
    closeAuth,
    nextStep,
    prevStep,
    switchAuthMode,
  };
};

export default useAuth;
