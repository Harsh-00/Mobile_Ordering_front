import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Input,
  Radio,
  RadioGroup,
  Stack,
} from '@chakra-ui/react'
import React from 'react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import Sidebar from './Sidebar'

export default function LeftDrawer() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()
  
    return (
      <div className="absolute">
        <Button ref={btnRef} colorScheme='teal' onClick={onOpen}>
          Open
        </Button>
        
        <Drawer
          isOpen={isOpen}
          placement='left'
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent display="flex" alignItems="center" justifyContent="space-between">
            <DrawerCloseButton />
            <DrawerHeader>Filter</DrawerHeader>
  
            <DrawerBody>
              <Sidebar/>
            </DrawerBody>
  
            <DrawerFooter>
              <Button variant='outline' mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='blue'>Save</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    )
  }
