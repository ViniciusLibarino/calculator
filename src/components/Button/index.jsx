import React from "react";
import {Num, Text} from './style'

export default function Button(props) {
  const color = props.color
  const style = props.style
  return (
    <Num onPress={e => props.click && props.click(props.label)} style={style}>
      <Text style={color}>{props.label}</Text>
    </Num>
  );
}