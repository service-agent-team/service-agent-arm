import {
	Box,
	Button,
	Flex,
	HStack,
	Icon,
	IconButton,
	Link,
	useColorMode,
	useColorModeValue
} from '@chakra-ui/react';
import { BiMenuAltLeft, BiUserCircle } from 'react-icons/bi';
import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs';
import { MdOutlineContactSupport } from 'react-icons/md';
import { HeaderProps } from './header.props';

const Header = ({ onToggle }: HeaderProps) => {
	const { toggleColorMode, colorMode } = useColorMode();

	return (
		<Box
			w={'full'}
			h={'10vh'}
			px={10}
			borderBottom={'1px'}
			pos={'fixed'}
			top={0}
			left={0}
			right={0}
			borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
		>
			<Flex h={'full'} justify={'space-between'} align={'center'}>
				<HStack>
					<Icon as={BiMenuAltLeft} onClick={onToggle} w={6} h={6} cursor={'pointer'} />
					<Link href={'/'}>Service Agent</Link>
				</HStack>
				<HStack>
					<IconButton aria-label='support' icon={<MdOutlineContactSupport />} colorScheme={'facebook'} variant={'ghost'} />
					<IconButton
						aria-label='color-mode'
						onClick={toggleColorMode}
						icon={colorMode == 'light' ? <BsFillMoonFill /> : <BsFillSunFill />}
						colorScheme={'facebook'}
						variant={'outline'}
					/>
					<Button rightIcon={<BiUserCircle />} colorScheme={'facebook'}>
						LOGIN
					</Button>
				</HStack>
			</Flex>
		</Box>
	);
};

export default Header;