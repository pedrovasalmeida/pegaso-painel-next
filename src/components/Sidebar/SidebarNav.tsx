import {
  Stack,
  useBreakpointValue,
  Flex,
  Icon,
  IconButton,
  Text,
  useColorMode,
} from '@chakra-ui/react';
import {
  RiDashboardLine,
  RiFileAddLine,
  RiFileListLine,
  RiImageAddFill,
} from 'react-icons/ri';

import { BsSun, BsMoon } from 'react-icons/bs';

import { AiOutlineSortAscending } from 'react-icons/ai';

import { NavLink } from './NavLink';
import { NavSection } from './NavSection';

export function SidebarNav() {
  const { colorMode } = useColorMode();

  return (
    <Stack spacing={['8', '10', '12']} align="flex-start">
      <NavSection title="Geral">
        <NavLink href="/dashboard" icon={RiDashboardLine}>
          Inicio
        </NavLink>
      </NavSection>
      <NavSection title="Tema">
        <NavLink href={null} icon={colorMode === 'dark' ? BsMoon : BsSun}>
          {colorMode === 'dark' ? 'Escuro' : 'Claro'}
        </NavLink>
      </NavSection>
      <NavSection title="Obras">
        <NavLink href="/obras/create" icon={RiFileAddLine}>
          Adicionar obra
        </NavLink>
        <NavLink href="/obras/list" icon={RiFileListLine}>
          Gerenciar obras
        </NavLink>
        <NavLink href="/obras/changeOrder" icon={AiOutlineSortAscending}>
          Ordenar obras
        </NavLink>
      </NavSection>
      <NavSection title="Imagens">
        <NavLink href="/images" icon={RiImageAddFill}>
          Gerenciar imagens
        </NavLink>
      </NavSection>
    </Stack>
  );
}
