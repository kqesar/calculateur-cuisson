import {ICooking} from "@/interfaces";
import {Button, Input, Td, Text, Tr} from "@chakra-ui/react";
import {CheckIcon, DeleteIcon, EditIcon} from "@chakra-ui/icons";
import {useCookingList} from "@/store/useCookingList.ts";
import {useState} from "react";

type InformationRowProps = {
  cuisson: ICooking,
  index: number
}
export const InformationRow = ({cuisson, index}: InformationRowProps) => {
  const {deleteCooking, updateCooking} = useCookingList()
  const [editableMode, setEditableMode] = useState(false)
  const [cuissonState, setCuissonState] = useState({
    name: cuisson.name,
    weight: cuisson.weight.toString(),
    duration: cuisson.duration.toString()
  })

  const updateRow = () => {
    setEditableMode(!editableMode)
    updateCooking({
      cuisson: {
        name: cuissonState.name,
        duration: parseFloat(cuissonState.duration),
        weight: parseInt(cuissonState.weight)
      }, index
    })
  }

  return editableMode ? (<Tr>
    <Td width="30%"><Input type="text"
      border="1px"
      value={cuissonState.name}
      onChange={(event) => setCuissonState({
        ...cuissonState,
        name: event.target.value
      })}/> </Td>
    <Td width="30%"><Input type="text"
      border="1px"
      value={cuissonState.weight}
      onChange={(event) => setCuissonState(
        {...cuissonState, weight: event.target.value}
      )}/></Td>
    <Td width="30%"><Input type="text"
      border="1px"
      value={cuissonState.duration}
      onChange={(event) => setCuissonState(
        {...cuissonState, duration: event.target.value}
      )}/></Td>
    <Td>
      <Button colorScheme='green'
        size="sm"
        width="fit-content"
        onClick={updateRow}
      ><CheckIcon/></Button>
    </Td>
  </Tr>) : (
    <Tr>
      <Td width="30%">
        <Text>{cuisson.name}</Text></Td>
      <Td width="30%">{cuisson.weight}</Td>
      <Td width="30%">{cuisson.duration}</Td>
      <Td>
        <Button colorScheme='green'
          size="sm"
          width="fit-content"
          onClick={()=>setEditableMode(!editableMode)}
        ><EditIcon/></Button>
        <Button colorScheme='red'
          size="sm"
          width="fit-content"
          marginStart="1rem"
          onClick={() =>deleteCooking(index)}><DeleteIcon/></Button>
      </Td>
    </Tr>
  )
}
