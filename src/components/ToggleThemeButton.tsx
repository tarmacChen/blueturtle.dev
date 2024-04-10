import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useTheme } from 'next-themes';

export const ToggleThemeButton = () => {
  const { setTheme, theme, systemTheme } = useTheme();

  const handleToggle = () => {
    if (theme == 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  const iconSize = '24';

  const Dark = () => (
    <MoonIcon
      width={iconSize}
      height={iconSize}
      className="text-yellow-300"
    />
  );

  const Sun = () => (
    <SunIcon
      width={iconSize}
      height={iconSize}
    />
  );

  return (
    <div
      onClick={handleToggle}
      className="hover:cursor-pointer">
      {theme == 'light' ? <Sun /> : <Dark />}
    </div>
  );
};
