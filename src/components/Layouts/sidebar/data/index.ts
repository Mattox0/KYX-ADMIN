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
];
