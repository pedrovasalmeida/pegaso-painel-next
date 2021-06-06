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
} from '@chakra-ui/react';
import { useAuth } from '../../contexts/AuthContext';

interface ProfileProps {
  showProfileData: boolean;
}

export function Profile({ showProfileData = true }: ProfileProps) {
  const { signOut } = useAuth();

  return (
    <Menu>
      {showProfileData && (
        <>
          <MenuButton textAlign="right" bg="white" p="4" borderRadius="8">
            <Text color="gray.300" fontSize="14">
              pedrovasalmeida@gmail.com
            </Text>
          </MenuButton>
          <MenuList bg="gray.50">
            <MenuItem onClick={signOut}>Sair</MenuItem>
          </MenuList>
        </>
      )}
    </Menu>
  );
}
