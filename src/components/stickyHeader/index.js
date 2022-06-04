import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { Card, CardItem, Left, Body, Thumbnail } from "native-base";
import style from "./style";


const StickyHeader = ({ name, img, onImgTap }) => {
  return (
    <Card style={style.cardStyle} transparent>
      <CardItem style={style.cardItemStyle}>
        <Left>
          <TouchableOpacity style={[style.logoContainer]} onPress={onImgTap}>
            {img ? (
              <Thumbnail source={{ uri: img }} resizeMode="cover" />
            ) : (
              <Text style={style.thumbnailName}>{name.charAt(0)}</Text>
            )}
          </TouchableOpacity>

          <Body>
            <Text style={style.profileName}>{name}</Text>
          </Body>
        </Left>
      </CardItem>
    </Card>
  );
};

export default StickyHeader;