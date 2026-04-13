import { Link, useLocalSearchParams } from "expo-router";
import { usePostHog } from "posthog-react-native";
import { useEffect } from "react";
import { Text, View } from "react-native";

const SubscriptionDetails = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const posthog = usePostHog();

  useEffect(() => {
    posthog.capture("subscription_details_viewed", { subscription_id: id });
  }, [id, posthog]);

  return (
    <View>
      <Text>Subscription Details</Text>
      <Link href="/">Go back</Link>
    </View>
  );
};
export default SubscriptionDetails;
