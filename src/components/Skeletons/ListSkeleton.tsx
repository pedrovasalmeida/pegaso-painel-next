import { useColorModeValue } from '@chakra-ui/color-mode';
import { Image } from '@chakra-ui/image';
import { Flex, Text } from '@chakra-ui/layout';
import { Skeleton, SkeletonText } from '@chakra-ui/skeleton';

export function CardSkeleton() {
  const color = useColorModeValue('gray.900', 'gray.50');
  const boxBgColor = useColorModeValue('gray.100', 'gray.700');

  return (
    <Flex direction="column" width="100%" p="4">
      <Skeleton
        startColor="gray.300"
        endColor="gray.900"
        width="100%"
        height="150px"
        mb="1"
        borderRadius="8"
      />
      <SkeletonText my="4" />
      <Skeleton width="100%" height="40px" mt="4" borderRadius="8" />
    </Flex>
  );
}
