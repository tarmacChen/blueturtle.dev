import { HamburgerMenuIcon } from '@radix-ui/react-icons';

export const MenuButton = ({ clickHandler }: { clickHandler: () => void }) => {
  const iconSize = 24;

  return (
    <div>
      <HamburgerMenuIcon
        width={iconSize}
        height={iconSize}
        onClick={() => clickHandler()}
      />
    </div>
  );
};
