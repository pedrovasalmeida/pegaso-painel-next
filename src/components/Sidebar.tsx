import { Box, Stack, Text, Link, Icon } from '@chakra-ui/react';
import {
  RiContactsLine,
  RiDashboardLine,
  RiGitMergeLine,
  RiInputMethodLine,
} from 'react-icons/ri';

export function Sidebar() {
  return (
    <Box as="aside" w="64" mr="8">
      <Stack spacing="12" align="flex-start">
        <Box>
          <Text fontWeight="bold" fontSize="small" color="gray.400">
            Obras
          </Text>
          <Stack spacing="4" mt="8" align="stretch">
            <Link display="flex" align="center">
              <Icon as={RiDashboardLine} fontSize="20" />
              <Text ml="4" fontWeight="medium">
                Adicionar obra
              </Text>
            </Link>
            <Link display="flex" align="center">
              <Icon as={RiContactsLine} fontSize="20" />
              <Text ml="4" fontWeight="medium">
                Atualizar obra
              </Text>
            </Link>
            <Link display="flex" align="center">
              <Icon as={RiContactsLine} fontSize="20" />
              <Text ml="4" fontWeight="medium">
                Remover obra
              </Text>
            </Link>
            <Link display="flex" align="center">
              <Icon as={RiContactsLine} fontSize="20" />
              <Text ml="4" fontWeight="medium">
                Listar obra
              </Text>
            </Link>
            <Link display="flex" align="center">
              <Icon as={RiContactsLine} fontSize="20" />
              <Text ml="4" fontWeight="medium">
                Ordem de exibição das obras
              </Text>
            </Link>
          </Stack>
        </Box>
        <Box>
          <Text fontWeight="bold" fontSize="small" color="gray.400">
            Imagens
          </Text>
          <Stack spacing="4" mt="8" align="stretch">
            <Link display="flex" align="center">
              <Icon as={RiInputMethodLine} fontSize="20" />
              <Text ml="4" fontWeight="medium">
                Adicionar imagens
              </Text>
            </Link>
            <Link display="flex" align="center">
              <Icon as={RiGitMergeLine} fontSize="20" />
              <Text ml="4" fontWeight="medium">
                Remover imagens
              </Text>
            </Link>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}
