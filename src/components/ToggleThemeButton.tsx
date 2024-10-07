import { MoonIcon, SunIcon, GearIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { useEffect } from "react";
import { createActor, createMachine } from "xstate";

export const ToggleThemeButton = () => {
  const { theme, setTheme } = useTheme();
  const themeName = theme || "system";

  const themeControllerMachine = createMachine({
    id: "change",
    initial: themeName,
    states: {
      system: { on: { change: "light" } },
      light: { on: { change: "dark" } },
      dark: { on: { change: "system" } },
    },
  });

  const themeControllerActor = createActor(themeControllerMachine);

  useEffect(() => {
    themeControllerActor.subscribe((snapshot) => {
      const updatedTheme = snapshot.value.toString();
      setTheme(updatedTheme);
    });
  });

  themeControllerActor.start();

  const ThemeIcon = ({ iconSize = "24" }: { iconSize?: string }) => {
    const DarkIcon = () => (
      <MoonIcon
        width={iconSize}
        height={iconSize}
      />
    );

    const LightIcon = () => (
      <SunIcon
        width={iconSize}
        height={iconSize}
      />
    );

    const SystemIcon = () => (
      <GearIcon
        width={iconSize}
        height={iconSize}
      />
    );

    return theme == "dark" ? (
      <DarkIcon />
    ) : theme == "light" ? (
      <LightIcon />
    ) : (
      <SystemIcon />
    );
  };

  return (
    <div
      onClick={() => themeControllerActor.send({ type: "change" })}
      className="hover:cursor-pointer">
      <div className="text-foreground dark:text-yellow-300">
        <ThemeIcon />
      </div>
    </div>
  );
};
