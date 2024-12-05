import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

// import { useGlobalContext } from "../../context/GlobalProvider";

const AuthLayout = () => {
//   const { loading, isLogged } = useGlobalContext()

//   if (!loading && isLogged) return <Redirect href="/home" />

  return (
    <>
      <Stack>
        <Stack.Screen
          name="welcome"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="register"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="login"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="modal"
          options={{
            presentation: 'modal',
          }}
      />
        {/* <Stack.Screen
          name="sign-up"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="forgot-password"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="reset-password"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="verification"
          options={{
            headerShown: false,
          }}
        /> */}
      </Stack>
      
      <StatusBar backgroundColor="#161622" style="light" />
    </>
  );
};

export default AuthLayout;