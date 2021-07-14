import {
  useBreakpointValue,
  Flex,
  Icon,
  IconButton,
  Text,
  useColorMode,
} from '@chakra-ui/react';
import { RiMenuLine } from 'react-icons/ri';
import { BsSun, BsMoon } from 'react-icons/bs';

import { useSidebarDrawer } from '../../contexts/SidebarDrawerContext';

import { Logo } from './Logo';
import { Profile } from './Profile';

export function Header() {
  const { onOpen } = useSidebarDrawer();
  const { colorMode, toggleColorMode } = useColorMode();

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  return (
    <Flex
      as="header"
      w="100%"
      h="20"
      maxWidth={1600}
      mt="1"
      mx="auto"
      px="2"
      align="center"
      p={isWideVersion ? '4' : '2'}
    >
      {!isWideVersion && (
        <IconButton
          aria-label="Open navigation"
          icon={<Icon as={RiMenuLine} />}
          fontSize="24"
          mr="2"
          variant="unstyled"
          onClick={onOpen}
        />
      )}

      <Logo />

      {/* <NotificationsNav /> */}
      <Flex align="center" ml="auto">
        <Profile showProfileData={isWideVersion} />
      </Flex>
    </Flex>
  );
}
