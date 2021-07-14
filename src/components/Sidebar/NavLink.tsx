import { ElementType } from 'react';
import {
  Link as ChakraLink,
  Icon,
  Text,
  LinkProps as ChakraLinkProps,
  Flex,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { ActiveLink } from '../ActiveLink';

interface NavLinkProps extends ChakraLinkProps {
  icon: ElementType;
  children: string;
  href: string;
}

export function NavLink({
  icon,
  children,
  href = null,
  ...rest
}: NavLinkProps) {
  const { toggleColorMode } = useColorMode();

  const bgColor = useColorModeValue('gray.100', 'gray.700');

  if (href === null) {
    return (
      <Flex
        display="flex"
        align="center"
        cursor="pointer"
        onClick={toggleColorMode}
      >
        <Icon as={icon} fontSize="20" />
        <Text ml="4" fontWeight="medium">
          {children}
        </Text>
      </Flex>
    );
  }

  return (
    <ActiveLink href={href} passHref>
      <ChakraLink display="flex" align="center" {...rest}>
        <Icon as={icon} fontSize="20" />
        <Text ml="4" fontWeight="medium">
          {children}
        </Text>
      </ChakraLink>
    </ActiveLink>
  );
}
