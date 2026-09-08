import type React from "react";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        alt?: string;
        "auto-rotate"?: boolean;
        "auto-rotate-delay"?: string;
        "camera-controls"?: boolean;
        "camera-orbit"?: string;
        "environment-image"?: string;
        exposure?: string;
        "field-of-view"?: string;
        "interaction-prompt"?: "auto" | "none";
        loading?: "auto" | "lazy" | "eager";
        ref?: React.Ref<HTMLElement>;
        "rotation-per-second"?: string;
        "shadow-intensity"?: string;
        "shadow-softness"?: string;
        src?: string;
        "touch-action"?: string;
      };
    }
  }
}
