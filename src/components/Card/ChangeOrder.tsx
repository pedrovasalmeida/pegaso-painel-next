import {
  useColorModeValue,
  Image,
  Flex,
  Text,
  Icon,
  useBreakpointValue,
  Tooltip,
  Button,
} from '@chakra-ui/react';

import { IEnterprise } from '../../types/IEnterprise';

import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai';
import { memo } from 'react';

interface SortCardProps {
  enterprise: IEnterprise;
  enterpriseLength: number;
  handleChangeDisplayOrder: (direction: string, enterpriseId: string) => void;
}

export function SortCard({
  enterprise,
  enterpriseLength,
  handleChangeDisplayOrder,
}: SortCardProps) {
  const boxBgColor = useColorModeValue('gray.100', 'gray.700');
  const arrowsColor = useColorModeValue('gray.600', 'gray.50');

  const isWideVersion = useBreakpointValue({
    base: false,
    md: true,
  });

  return (
    <Flex
      align="center"
      justify="center"
      minW="280px"
      maxW={isWideVersion ? '500px' : '100%'}
      width="100%"
      minH="auto"
      bg={boxBgColor}
      borderRadius="8"
      py="4"
    >
      <Flex align="center" maxW="700px" justify="center" alignSelf="center">
        <Image
          src="/images/image.jpeg"
          alt="alguma imagem"
          maxH={!isWideVersion ? '60px' : '100px'}
          maxW={!isWideVersion ? '60px' : '100px'}
          borderRadius="8"
          objectFit="cover"
          mx={!isWideVersion ? '3' : '4'}
        />
        <Flex direction="column">
          <Text
            fontSize={!isWideVersion ? '16' : '18'}
            fontWeight="bold"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
            overflow="hidden"
          >
            {enterprise.name}
          </Text>
          <Text fontSize={!isWideVersion ? '14' : '16'}>
            <strong>{enterprise.displayOrder}º</strong>{' '}
            {isWideVersion ? 'à ser exibido' : 'posição'}
          </Text>
        </Flex>
        <Flex justify="space-between" ml="8" mr="2">
          <Tooltip
            hasArrow
            label="Mover para cima"
            bg="blue.800"
            color="gray.50"
          >
            <Button
              w="20px"
              disabled={enterprise.displayOrder <= 1}
              onClick={() => handleChangeDisplayOrder('up', enterprise.id)}
            >
              <Icon
                as={AiOutlineArrowUp}
                fontSize={!isWideVersion ? '24' : '28'}
                cursor="pointer"
                color={arrowsColor}
                borderRadius="8"
              />
            </Button>
          </Tooltip>
          <Tooltip
            hasArrow
            label="Mover para baixo"
            bg="blue.800"
            color="gray.50"
          >
            <Button
              ml={!isWideVersion ? '3' : '4'}
              w="20px"
              disabled={enterprise.displayOrder >= enterpriseLength}
              onClick={() => handleChangeDisplayOrder('down', enterprise.id)}
            >
              <Icon
                as={AiOutlineArrowDown}
                fontSize={!isWideVersion ? '24' : '28'}
                cursor="pointer"
                color={arrowsColor}
                borderRadius="8"
              />
            </Button>
          </Tooltip>
        </Flex>
      </Flex>
    </Flex>
  );
}
