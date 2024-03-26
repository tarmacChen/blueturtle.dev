import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import React from "react"
import { useMobile } from "@/hooks/useMobile"

export function DesktopNavbar() {
  const { isMobile } = useMobile()

  const Navbar = () => {
    return (
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink
              href="/posts"
              className={navigationMenuTriggerStyle()}
            >
              Posts
            </NavigationMenuLink>
            <NavigationMenuLink
              href="/snippets"
              className={navigationMenuTriggerStyle()}
            >
              Snippets
            </NavigationMenuLink>
            <NavigationMenuLink
              href="/projects"
              className={navigationMenuTriggerStyle()}
            >
              Projects
            </NavigationMenuLink>
            <NavigationMenuLink
              href="/contact"
              className={navigationMenuTriggerStyle()}
            >
              Contact
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    )
  }

  return isMobile ? <></> : <Navbar />
}
