import './App.css'
import { Grid, GridItem, Heading } from "@chakra-ui/react";
import { CalculatorView } from "./pages/CalculatorView.tsx";

export const App = () => {

  return (
    <>
      <Grid>
        <GridItem bg='blue.300' p='4'>
          <Heading size='md' color='white'>Calculateur cuisine</Heading>
        </GridItem>
        <GridItem>
          <CalculatorView />
        </GridItem>
      </Grid>
    </>
  )
}

export default App
