import { StyleSheet, Switch, TouchableOpacity } from "react-native";
import { useColorScheme } from "nativewind";
import { Text, View } from "@/components/Themed";
import { AuthContextProps } from "@/services/providers/AuthProvider";
import { useAuth } from "@/hooks/useAuth";
import { GlobalContextProps } from "@/services/providers/GlobalProvider";
import { useGlobal } from "@/hooks/useGlobal";
import UIButton from "@/components/ui/UIButton";
import { getFormattedDate } from "@/utils/dateHelperFn";

export default function TabTwoScreen() {
  const { logout } = useAuth() as AuthContextProps;
  const {
    userData,
    setUserData,
    transactions,
    currency,
    language,
    addUserDocument,
    getDocument,
    getAllDocuments,
    addTransactionDoc,
  } = useGlobal() as GlobalContextProps;

  /* console.log("stats: ", transactions); */

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab Two</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <View>
        <Text>{language.value}</Text>
      </View>
      <View>
        <Text>{currency.value}</Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          console.log(getFormattedDate());
        }}
      >
        <Text>Get date</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          getAllDocuments({
            collectionName: `users/${userData?.uid}/transactions`,
          })
        }
      >
        <Text>get all docs</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity onPress={() => retrieveDocument(props)}> */}
      {/*   <Text>addTransactionDoc</Text> */}
      {/* </TouchableOpacity> */}
      {/* <TouchableOpacity onPress={() => addTransactionDoc()}> */}
      {/*   <Text>addTransactionDoc</Text> */}
      {/* </TouchableOpacity> */}
      <UIButton onPress={logout}>Log out</UIButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
