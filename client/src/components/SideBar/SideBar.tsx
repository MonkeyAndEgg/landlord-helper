import { Box } from "@chakra-ui/react";
import SideBarContent from "./SideBarContent/SideBarContent";

export default function SideBar() {

  return (
    <Box bgColor='#f2ed88' h='100%' w={{ base: '100px', md: '350px' }} p={5}>
      <SideBarContent />
    </Box>
  );
}