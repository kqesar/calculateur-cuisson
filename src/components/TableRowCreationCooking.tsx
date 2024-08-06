import {Button, Input, Td, Tr} from "@chakra-ui/react";
import {AddIcon, CloseIcon} from "@chakra-ui/icons";
import {useState} from "react";
import {useCookingList} from "@/store/useCookingList.ts";

type TableRowCreationCookingProps = {
  onAction(): void
}
export const TableRowCreationCooking = ({onAction}:TableRowCreationCookingProps) => {
  const { createCookingType } = useCookingList()
  const [cuissonState, setCuissonState] = useState({
    name: '',
    weight: '',
    duration: ''
  })
  return (
    <Tr>
      <Td><Input type="text"
        border="1px"
        value={cuissonState.name}
        onChange={(event) => setCuissonState({
          ...cuissonState,
          name: event.target.value
        })}/> </Td>
      <Td><Input type="text"
        border="1px"
        value={cuissonState.weight}
        onChange={(event) => setCuissonState(
          {...cuissonState, weight: event.target.value}
        )}/></Td>
      <Td><Input type="text"
        border="1px"
        value={cuissonState.duration}
        onChange={(event) => setCuissonState(
          {...cuissonState, duration: event.target.value}
        )}/></Td>
      <Td>
        <Button colorScheme='green'
          size="sm"
          width="fit-content"
          onClick={() => {
            createCookingType({
              name: cuissonState.name,
              weight: parseFloat(cuissonState.weight),
              duration: parseFloat(cuissonState.duration)
            });
            onAction();
          }}
        ><AddIcon/></Button>
        <Button colorScheme="red"
          size="sm"
          onClick={onAction}
          marginStart="1rem"
          width="fit-content">
          <CloseIcon/>
        </Button>
      </Td>
    </Tr>
  )
}
