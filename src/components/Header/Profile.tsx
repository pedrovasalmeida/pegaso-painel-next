import {
  Flex,
  Box,
  Text,
  Avatar,
  Menu,
  MenuList,
  MenuGroup,
  MenuItem,
  MenuDivider,
  MenuButton,
  useColorModeValue,
  Icon,
} from '@chakra-ui/react';

import { FiUser } from 'react-icons/fi';

import { useAuth } from '../../contexts/AuthContext';

interface ProfileProps {
  showProfileData: boolean;
}

export function Profile({ showProfileData = true }: ProfileProps) {
  const { signOut } = useAuth();

  const iconColor = useColorModeValue('gray.500', 'gray.100');
  const iconBgColor = useColorModeValue('gray.100', 'gray.600');
  const menuBgColor = useColorModeValue('gray.100', 'gray.600');
  const menuTextColor = useColorModeValue('gray.800', 'gray.50');

  return (
    <Menu>
      {showProfileData && (
        <>
          <MenuButton
            textAlign="right"
            bg={iconBgColor}
            p="4"
            borderRadius="full"
          >
            <Icon as={FiUser} fontSize="26" color={iconColor} />
          </MenuButton>
          <MenuList bgColor={menuBgColor}>
            <MenuItem
              onClick={signOut}
              fontWeight="medium"
              fontSize="18"
              color={menuTextColor}
            >
              Sair
            </MenuItem>
          </MenuList>
        </>
      )}
    </Menu>
  );
}
