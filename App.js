import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StripeProvider } from '@stripe/stripe-react-native'; // ✅ Add this

// Screens
import SplashScreen from './screens/SplashScreen';
import FeatureScreen from './screens/FeatureScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import OtpVerificationScreen from './screens/OtpVerificationScreen';
import OtpInputScreen from './screens/OtpInputScreen';
import HomeHelpScreen from './screens/HomeHelpScreen';
import ProfileScreen from './screens/ProfileScreen';
import EditProfileScreen from './screens/EditProfileScreen';
import PreviousChatScreen from './screens/PreviousChatScreen';
import NewPasswordScreen from "./screens/NewPasswordScreen";
import MenuScreen from './screens/MenuScreen';
import UploadChecklistScreen from './screens/UploadChecklistScreen';
import SpecialInstructionScreen from './screens/SpecialInstructionScreen';
import ChecklistPreview from './screens/ChecklistPreview';
import SubscriptionScreen from './screens/SubscriptionScreen';
import PaymentScreen from './screens/PaymentScreen';
import ConfirmPaymentScreen from './screens/ConfirmPaymentScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <StripeProvider publishableKey="pk_test_51S2nIRPqI1h6KQX6aC4P4Tgyl5HkJmyTsV7pC6Tn9GT8iW4IhVC4f3UD2PztnA23FNyNzuC3k88mDGGLxWQYSSKt00XWd7tmgM"> 
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Feature" component={FeatureScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
          <Stack.Screen name="OtpInput" component={OtpInputScreen} />
          <Stack.Screen name="OTPVerification" component={OtpVerificationScreen} />
          <Stack.Screen name="HomeHelp" component={HomeHelpScreen} />
          <Stack.Screen name="Menu" component={MenuScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="EditProfile" component={EditProfileScreen} />
          <Stack.Screen name="PreviousChat" component={PreviousChatScreen} />
          <Stack.Screen name="NewPassword" component={NewPasswordScreen} />
          <Stack.Screen name="UploadChecklist" component={UploadChecklistScreen} />
          <Stack.Screen name="SpecialInstruction" component={SpecialInstructionScreen} />
          <Stack.Screen name="ChecklistPreview" component={ChecklistPreview} />
          <Stack.Screen name="Subscription" component={SubscriptionScreen} />
          <Stack.Screen name="Payment" component={PaymentScreen} />
          <Stack.Screen name="ConfirmPayment" component={ConfirmPaymentScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </StripeProvider>
  );
}
