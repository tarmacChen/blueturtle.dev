import clsx from "clsx";
import { FaGithub, FaRegCopyright } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";

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
    <div
      className={clsx(
        hrefIsNotEmpty && "cursor-pointer hover:bg-blue-100 hover:underline",
      )}>
      <a
        className={clsx(className, "flex flex-row items-center gap-1 text-sm")}
        href={href}
        target="_blank">
        {children}
      </a>
    </div>
  );
};

const Copyright = ({ className }: { className?: string }) => {
  return (
    <ProfileButton className={className}>
      <span>Copyright </span>
      <FaRegCopyright />
      <span>2024 - tarmac&apos;s blog - blueturtle</span>
    </ProfileButton>
  );
};

export const Footer = () => {
  const Separator = () => <span>|</span>;

  return (
    <div className="mb-8 flex flex-col items-center justify-center">
      <div className="flex flex-row items-center gap-2">
        <ProfileButton href="https://github.com/tarmacChen">
          <FaGithub />
          GitHub
        </ProfileButton>
        <Separator />
        <ProfileButton>
          <MdOutlineEmail />
          tarmac.chen@gmail.com
        </ProfileButton>
      </div>
      <Copyright className="text-sm" />
    </div>
  );
};
