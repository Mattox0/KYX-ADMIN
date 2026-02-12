import * as Icons from "../icons";

export const NAV_DATA = [
  {
    label: "MAIN MENU",
    items: [
      {
        title: "Dashboard",
        url: "/",
        icon: Icons.HomeIcon,
        items: [],
      },
      {
        title: "Modes",
        url: "/modes",
        icon: Icons.GamepadIcon,
        items: [],
      },
      {
        title: "Questions",
        icon: Icons.QuestionIcon,
        items: [
          {
            title: "Je n'ai jamais",
            url: "/questions/never-have",
          },
          {
            title: "Tu préfères",
            url: "/questions/prefer",
          },
          {
            title: "Action ou vérité",
            url: "/questions/truth-dare",
          }
        ],
      }
    ],
  },
  {
    label: "OTHERS",
    items: [
      {
        title: "UI Elements",
        icon: Icons.FourCircle,
        items: [
          {
            title: "Alerts",
            url: "/ui-elements/alerts",
          },
          {
            title: "Buttons",
            url: "/ui-elements/buttons",
          },
        ],
      },
      {
        title: "Forms",
        icon: Icons.Alphabet,
        items: [
          {
            title: "Form Elements",
            url: "/forms/form-elements",
          },
          {
            title: "Form Layout",
            url: "/forms/form-layout",
          },
        ],
      },
      {
        title: "Authentication",
        icon: Icons.Authentication,
        items: [
          {
            title: "Sign In",
            url: "/auth/sign-in",
          },
        ],
      },
    ],
  },
];
