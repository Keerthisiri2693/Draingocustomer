declare module "@expo/vector-icons" {
  import * as React from "react";
  import { TextProps } from "react-native";

  export class MaterialIcons extends React.Component<TextProps> {
    name: string;
    size?: number;
    color?: string;
  }
}
