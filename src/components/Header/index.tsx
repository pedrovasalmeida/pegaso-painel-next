import {
  Flex,
  Icon,
  IconButton,
  Text,
  useBreakpointValue,
  useColorMode,
} from '@chakra-ui/react';
import { RiMenuLine } from 'react-icons/ri';
import { BsSun, BsMoon } from 'react-icons/bs';
import { useSidebarDrawer } from '../../contexts/SidebarDrawerContext';

import { Logo } from './Logo';
import { NotificationsNav } from './NotificationsNav';
import { Profile } from './Profile';
import { SeachBox } from './SearchBox';

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
      maxWidth={1480}
      mx="auto"
      mt="4"
      px="6"
      align="center"
    >
      {!isWideVersion && (
        <IconButton
          aria-label="Open navigation"
          icon={<Icon as={RiMenuLine} />}
          fontSize="24"
          mr="2"
          variant="unstyled"
          onClick={onOpen}
        ></IconButton>
      )}

      <Logo />

      {/* {isWideVersion && <SeachBox />} */}

      <Flex align="center" ml="auto">
        {/* <NotificationsNav /> */}

        <Flex
          align="center"
          justify="center"
          onClick={toggleColorMode}
          cursor="pointer"
          bgColor="blue.700"
          borderRadius={8}
        >
          <IconButton
            aria-label="Change theme"
            icon={<Icon as={colorMode === 'dark' ? BsMoon : BsSun} />}
            fontSize="20"
            mr="4"
            variant="unstyled"
          />

          {isWideVersion ? (
            <Text fontSize="14">
              Modo {colorMode === 'dark' ? 'claro' : 'escuro'}
            </Text>
          ) : (
            <Text fontSize="14">
              Alternar para modo {colorMode === 'dark' ? 'claro' : 'escuro'}
            </Text>
          )}
        </Flex>

        <Profile showProfileData={isWideVersion} />
      </Flex>
    </Flex>
  );
}
