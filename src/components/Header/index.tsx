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

        {isWideVersion ? (
          <Flex
            align="center"
            justify="center"
            onClick={toggleColorMode}
            cursor="pointer"
            bgColor="blue.700"
            px="4"
            pl="2"
            py="1"
            mr="4"
            borderRadius={8}
            color="whiteAlpha.900"
          >
            <IconButton
              aria-label="Change theme"
              icon={<Icon as={colorMode === 'dark' ? BsMoon : BsSun} />}
              fontSize="20"
              mr="1"
              my="auto"
              variant="unstyled"
            />

            <Text fontSize="14" fontWeight="bold">
              Alternar para modo {colorMode === 'dark' ? 'claro' : 'escuro'}
            </Text>
          </Flex>
        ) : (
          <Flex
            align="center"
            justify="center"
            onClick={toggleColorMode}
            cursor="pointer"
            bgColor="blue.700"
            pl="1"
            pr="3"
            mr="2"
            borderRadius={8}
            color="whiteAlpha.900"
          >
            <IconButton
              aria-label="Change theme"
              icon={<Icon as={colorMode === 'dark' ? BsMoon : BsSun} />}
              fontSize="16"
              mr="1"
              my="auto"
              variant="unstyled"
            />

            <Text fontSize="12" fontWeight="bold">
              {colorMode === 'dark' ? 'Claro' : 'Escuro'}
            </Text>
          </Flex>
        )}

        <Profile showProfileData={isWideVersion} />
      </Flex>
    </Flex>
  );
}
