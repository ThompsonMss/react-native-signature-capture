import React, { useRef, useState } from 'react';
import { View, Text, TouchableHighlight, StyleSheet, Image } from 'react-native';
import SignatureCapture from 'react-native-signature-capture';

export default function App() {

  const [image, setImage] = useState(null);

  let sign = useRef();

  function saveSign() {
    sign.saveImage();
  }

  function resetSign() {
    sign.resetImage();
  }

  function _onSaveEvent(result) {
    //result.encoded - for the base64 encoded png
    //result.pathName - for the file path name
    console.log(result);
    setImage(result.encoded);
  }

  function _onDragEvent() {
    // This callback will be called when the user enters signature
    console.log("dragged");
  }

  return (
    <>
      <View style={{ flex: 1, flexDirection: "column" }}>
        <Text style={{ alignItems: "center", justifyContent: "center" }}>Assinatura </Text>
        <SignatureCapture
          style={[{ flex: 1 }, styles.signature]}
          ref={ref => sign = ref}
          onSaveEvent={_onSaveEvent}
          onDragEvent={_onDragEvent}
          saveImageFileInExtStorage={false}
          showNativeButtons={false}
          showTitleLabel={false}
          viewMode={"portrait"} />

        <View style={{ flex: 1, backgroundColor: '#999' }}>
          {image && (
            <Image style={{ height: 50, width: 50 }} source={image} />
          )}
        </View>

        <View style={{ flexDirection: "row" }}>
          <TouchableHighlight style={styles.buttonStyle}
            onPress={() => { saveSign() }} >
            <Text>Save</Text>
          </TouchableHighlight>

          <TouchableHighlight style={styles.buttonStyle}
            onPress={() => { resetSign() }} >
            <Text>Reset</Text>
          </TouchableHighlight>

        </View>

      </View>
    </>
  );
}

const styles = StyleSheet.create({
  signature: {
    flex: 1,
    borderColor: '#000033',
    borderWidth: 1,
  },
  buttonStyle: {
    flex: 1, justifyContent: "center", alignItems: "center", height: 50,
    backgroundColor: "#eeeeee",
    margin: 10
  }
});