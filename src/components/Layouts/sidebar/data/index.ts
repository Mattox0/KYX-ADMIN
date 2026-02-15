import * as Icons from "../icons";
import { FlagIcon } from "../icons";

export const NAV_DATA = [
  {
    label: "APPLICATION",
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
      },
      {
        title: "Signalements",
        url: "/reports",
        icon: Icons.FlagIcon,
        items: [],
      }
    ],
  },
  {
    label: "UTILISATEURS",
    items: [
      {
        title: "Administrateurs",
        url: "/users/administrators",
        icon: Icons.UsersAdmin,
        items: [],
      },
      {
        title: "Joueurs",
        url: "/users/players",
        icon: Icons.Users,
        items: [],
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
