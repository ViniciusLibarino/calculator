import React from "react";
import {Label, Text} from './style'

export default function Display(props) {
  return (
    <Label>
        <Text>{props.value}</Text>
    </Label>
  );
}