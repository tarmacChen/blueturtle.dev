import { HamburgerMenuIcon } from '@radix-ui/react-icons';

export const MenuButton = ({ clickHandler }: { clickHandler: () => void }) => {
  const iconSize = 24;

  return (
    <div className='cursor-pointer'>
      <HamburgerMenuIcon
        width={iconSize}
        height={iconSize}
        onClick={() => clickHandler()}
      />
    </div>
  );
};
