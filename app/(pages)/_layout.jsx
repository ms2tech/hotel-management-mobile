import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

// import { useGlobalContext } from "../../context/GlobalProvider";

const PagesLayout = () => {
//   const { loading, isLogged } = useGlobalContext()

//   if (!loading && isLogged) return <Redirect href="/home" />

  return (
    <>
      <Stack>
        <Stack.Screen
          name="home"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="modal"
          options={{
            headerShown: false,
            presentation: 'transparentModal',
            animation: 'fade',
            headerShown: false,
          }}
        />
       
      </Stack>
      
      <StatusBar backgroundColor="#161622" style="light" />
    </>
  );
};

export default PagesLayout;