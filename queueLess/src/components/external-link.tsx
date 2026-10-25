
import { Linking, Pressable } from 'react-native';

export function ExternalLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Pressable onPress={() => Linking.openURL(href)}>
      {children}
    </Pressable>
  );
}
