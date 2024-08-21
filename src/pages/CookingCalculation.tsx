import {HStack, Input, Select, Text} from "@chakra-ui/react";
import {useEffect, useMemo, useState} from "react";
import {ICooking} from "@/interfaces";
import {getTextCookingDuration} from "@/lib/duration";

type CookingCalculationProps = {
  cookingTypeList: string[],
  cookingList: ICooking[]
}
export const CookingCalculation = ({cookingTypeList, cookingList}: CookingCalculationProps) => {
  const [cookingType, setCookingType] = useState('');
  const [cookingWeight, setCookingWeight] = useState(0);
  const [cookingDuration, setCookingDuration] = useState(0);

  useEffect(() => {
    const cuisson = cookingList.find((cuisson: ICooking) => cuisson.name === cookingType);
    if (cuisson) {
      const poidsCuisson = parseFloat(cookingWeight.toString().replace(",", "."));
      setCookingDuration(() => (poidsCuisson * cuisson.duration) / cuisson.weight);
    }
  }, [cookingWeight, cookingList, cookingType]);

  const displayCookingDuration = useMemo(() => getTextCookingDuration(cookingDuration), [cookingDuration])

  return (
    <>
      <HStack px="2rem">
        <Text fontSize="sm"
          w="20%"
          as="label"
          htmlFor="cooking-type">Type de viande:</Text>
        <Select size="sm"
          id="cooking-type"
          placeholder="Sélectionner type de viande"
          onChange={(event) => {
            setCookingType(event.target.value);
          }}>
          {cookingTypeList.map((cookingType, index) => (
            <option value={cookingType}
              key={index}>{cookingType}</option>
          ))}
        </Select>
      </HStack>
      {(cookingType != "") && (
        <HStack mt="2rem"
          mb="2rem"
          px="2rem">
          <Text fontSize="sm"
            w="20%"
            as="label"
            htmlFor="weight">Poids de la cuisson:</Text>
          <Input size="sm"
            id="weight"
            onChange={(event) => {
              const weight = parseFloat(event.target.value.replace(",", "."))
              setCookingWeight(weight);
            }} />
        </HStack>
      )}
      {(cookingWeight > 0 && cookingDuration > 0) && (
        <Text px="2rem">{displayCookingDuration}</Text>
      )}
    </>
  );
}

