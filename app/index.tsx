import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import Animated, {
  CurvedTransition,
  FadeIn,
  FadeInDown,
  LinearTransition,
  SlideInDown,
  useAnimatedRef,
} from "react-native-reanimated";

const userId = 1;

const baseMessages = [
  {
    userId: 1,
    id: 1,
    text: "Teste mensagem",
  },
  {
    userId: 2,
    id: 2,
    text: "Teste mensagem",
  },
  {
    userId: 2,
    id: 3,
    text: "Teste mensagem",
  },
  {
    userId: 1,
    id: 4,
    text: "Teste mensagem",
  },
  {
    userId: 1,
    id: 5,
    text: "Teste mensagem",
  },
  {
    userId: 2,
    id: 6,
    text: "Teste mensagem",
  },
  {
    userId: 2,
    id: 7,
    text: "Teste mensagem",
  },
  {
    userId: 1,
    id: 8,
    text: "Teste mensagem",
  },
];

export default function Chat() {
  const [messageIndex, setMessageIndex] = useState(0);
  const [messages, setMessages] = useState<typeof baseMessages>([]);

  const flatlistRef = useAnimatedRef<FlatList>();

  useEffect(() => {
    const interval = setInterval(() => {
      if (messageIndex < baseMessages.length) {
        setMessages(baseMessages.slice(0, messageIndex + 1));
        setMessageIndex((i) => i + 1);
        flatlistRef.current?.scrollToEnd();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [messageIndex]);

  return (
    <View style={styles.container}>
      <Animated.FlatList
        inverted
        ref={flatlistRef}
        data={messages.reverse()}
        contentContainerStyle={{
          padding: 12,
          paddingTop: 48,
          rowGap: 16,
        }}
        itemLayoutAnimation={LinearTransition.springify()
          .damping(80)
          .stiffness(200)}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => {
          const isMe = userId === item.userId;

          return (
            <Animated.View
              entering={FadeInDown}
              style={[
                styles.message,
                isMe
                  ? {
                      backgroundColor: "#2e6b35",
                      alignSelf: "flex-end",
                    }
                  : {
                      backgroundColor: "#35383b",
                      alignSelf: "flex-start",
                    },
              ]}
            >
              <Text style={[styles.messageText]}>{item.text}</Text>
            </Animated.View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  message: {
    padding: 12,
    borderRadius: 12,
  },
  messageText: {
    color: "white",
  },
});
