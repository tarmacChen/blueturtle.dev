import { HamburgerMenuIcon } from '@radix-ui/react-icons';

export const HamburgerMenu = () => {
  const iconSize = 24;

  return (
    <div>
      <HamburgerMenuIcon
        width={iconSize}
        height={iconSize}
      />
    </div>
  );
};
