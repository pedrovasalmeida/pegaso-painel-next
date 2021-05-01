import { Stack } from '@chakra-ui/layout';
import {
  RiChatDeleteLine,
  RiContactsLine,
  RiDashboardLine,
  RiDeleteBin6Line,
  RiExchangeBoxLine,
  RiFileAddLine,
  RiFileEditLine,
  RiFileListLine,
  RiGitMergeLine,
  RiImageAddFill,
  RiInputMethodLine,
} from 'react-icons/ri';

import { NavLink } from './NavLink';
import { NavSection } from './NavSection';

export function SidebarNav() {
  return (
    <Stack spacing={['8', '10', '12']} align="flex-start">
      <NavSection title="Geral">
        <NavLink href="/dashboard" icon={RiDashboardLine}>
          Inicio
        </NavLink>
      </NavSection>
      <NavSection title="Obras">
        <NavLink href="/obras/create" icon={RiFileAddLine}>
          Adicionar nova obra
        </NavLink>
        {/* <NavLink href="/obras/remove" icon={RiDeleteBin6Line}>
          Remover obra
        </NavLink> */}
        {/* <NavLink href="/obras/edit" icon={RiFileEditLine}>
          Editar obra
        </NavLink> */}
        <NavLink href="/obras/list" icon={RiFileListLine}>
          Listar obras
        </NavLink>
      </NavSection>
      <NavSection title="Imagens">
        <NavLink href="#" icon={RiImageAddFill}>
          Adicionar imagens
        </NavLink>
        <NavLink href="#" icon={RiChatDeleteLine}>
          Remover imagens
        </NavLink>
      </NavSection>
      <NavSection title="Exibição">
        <NavLink href="#" icon={RiExchangeBoxLine}>
          Alterar ordem de exibição
        </NavLink>
      </NavSection>
    </Stack>
  );
}
