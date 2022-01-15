import {
  Box,
  Flex,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@eicxv/ui';
export default function Folder({ name, children }) {
  return (
    <Collapsible>
      <CollapsibleTrigger>{name}</CollapsibleTrigger>
      <CollapsibleContent>
        <Flex>
          <Box
            css={(theme) => ({
              width: 2,
              margin: `0 ${theme.space[1]}`,
              backgroundColor: theme.colors.textFaded,
            })}
          ></Box>
          <Box
            css={(theme) => ({
              flexGrow: 1,
            })}
          >
            {children}
          </Box>
        </Flex>
      </CollapsibleContent>
    </Collapsible>
  );
}
