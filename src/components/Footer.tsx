import clsx from 'clsx';
import { FaGithub, FaRegCopyright } from 'react-icons/fa';
import { MdOutlineEmail } from 'react-icons/md';

const ProfileButton = ({
  className,
  href,
  children,
}: {
  className?: string;
  href?: string;
  children: React.ReactNode;
}) => {
  const hrefIsNotEmpty = href != undefined;

  return (
    <div className={clsx(hrefIsNotEmpty && 'cursor-pointer hover:bg-gray-100')}>
      <a
        className={clsx(className, 'flex flex-row items-center gap-1 text-sm')}
        href={href}
        target="_blank">
        {children}
      </a>
    </div>
  );
};

const buttons: React.ReactNode[] = [
  <ProfileButton href="https://github.com/tarmacChen">
    <FaGithub />
    GitHub
  </ProfileButton>,
  <ProfileButton>
    <MdOutlineEmail />
    tarmac.chen@gmail.com
  </ProfileButton>,
];

const Copyright = ({ className }: { className?: string }) => {
  return (
    <ProfileButton className={className}>
      <span>Copyright </span>
      <FaRegCopyright />
      <span>2024 - tarmac's blog - blueturtle</span>
    </ProfileButton>
  );
};

export const Footer = () => {
  const Separator = () => <span>|</span>;

  return (
    <div className="mb-8 flex flex-col items-center justify-center">
      <div className="flex flex-row items-center gap-2">
        {buttons.map((button, index) => {
          const isLastItem = index == buttons.length - 1;

          return (
            <>
              {button}
              {!isLastItem && <Separator />}
            </>
          );
        })}
      </div>
      <Copyright className="text-sm" />
    </div>
  );
};
