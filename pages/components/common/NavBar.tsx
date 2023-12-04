import React from 'react';
import {
  Flex,
  Text,
  Icon,
  Link,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorModeValue
} from '@chakra-ui/react';
// Here we have used react-icons package for the icons
import { BiChevronDown } from 'react-icons/bi';

const MenuContainer = () => {
  return (
    <Flex
      w="full"
      h="230px"
      justifyContent="center"
      alignItems="flex-start"
      p={{ base: 5, sm: 10 }}
    >
      <DropDownMenu />
    </Flex>
  );
};

const dropdownLinks = [
  {
    name: 'Blog',
    path: '#'
  },
  {
    name: 'Documentation',
    path: '#'
  },
  {
    name: 'Github Repo',
    path: '#'
  }
];

// Ideally, only the DropDownMenu component should be used. The MenuContainer component is used to style the preview.
const DropDownMenu = () => {
  return (
    <Menu autoSelect={false} isLazy>
      {({ isOpen, onClose }) => (
        <>
          <MenuButton _hover={{ color: 'blue.400' }}>
            <Flex alignItems="center" fontWeight="bold">
              <Text>Community</Text>
              <Icon
                as={BiChevronDown}
                h={5}
                w={5}
                ml={1}
                transition="all .25s ease-in-out"
                transform={isOpen ? 'rotate(180deg)' : ''}
              />
            </Flex>
          </MenuButton>
          <MenuList
            bgColor={"gray.200"}
            border="none"
            boxShadow={"2xl"}
          >
            {dropdownLinks.map((link, index) => (
              <MenuLink key={index} name={link.name} path={link.path} onClose={onClose} />
            ))}
          </MenuList>
        </>
      )}
    </Menu>
  );
};

interface MenuLinkProps {
  name: string;
  path: string;
  onClose: () => void;
}

const MenuLink = ({ name, path, onClose }: MenuLinkProps) => {
  return (
    <Link href={path} onClick={() => onClose()}>
      <MenuItem _hover={{ color: 'blue.400', bg: useColorModeValue('gray.200', 'gray.700') }}>
        <Text>{name}</Text>
      </MenuItem>
    </Link>
  );
};

export default MenuContainer;