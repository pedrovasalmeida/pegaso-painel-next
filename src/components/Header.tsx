import { Flex, Text, Input, Icon, HStack, Box, Avatar } from '@chakra-ui/react';

import {
  RiNotificationLine,
  RiSearchLine,
  RiUserAddLine,
} from 'react-icons/ri';

export function Header() {
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
      <Text fontSize="3xl" fontWeight="bold" letterSpacing="tight" w="64">
        Pégaso
        <Text as="span" ml="1" color="blue.500">
          .
        </Text>
      </Text>

      <Flex align="center" ml="auto">
        <Flex align="center">
          <Box mr="4" textAlign="right">
            <Text>Pedro Vasconcellos</Text>
            <Text color="gray.300" fontSize="small">
              pedrovasalmeida@gmail.com
            </Text>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
}
