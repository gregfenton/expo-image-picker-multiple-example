import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { ImageBrowser } from 'expo-image-picker-multiple';

const App = () => {
  const [chosenAssets, setChosenAssets] = useState([]);

  const imagesCallback = (callback) => {
    callback
      .then((photos) => {
        setChosenAssets(photos);
      })
      .catch((e) => console.log(e));
  };

  const updateHandler = (count, onSubmit) => {
    console.log(`count: ${count}  ::  onSubmit: ${JSON.stringify(onSubmit)}`);
  };

  const renderSelectedComponent = (number) => (
    <View style={styles.countBadge}>
      <Text style={styles.countBadgeText}>{number}</Text>
    </View>
  );

  const emptyStayComponent = <Text style={styles.emptyStay}>Empty =(</Text>;
  const noCameraPermissionComponent = (
    <Text style={styles.emptyStay}>No access to camera</Text>
  );

  const NameValueRow = ({ name, value }) => {
    return (
      <View style={styles.nameValueContainer}>
        <Text style={styles.textName}>{name}: </Text>
        <Text style={styles.textValue}>{value}</Text>
      </View>
    );
  };

  const AssetInfo = ({ assetInfo }) => {
    //
    // table of properties: https://docs.expo.io/versions/v39.0.0/sdk/media-library/#asset
    //
    return (
      <View key={`${assetInfo.id}`} style={{ borderBottomWidth: 1 }}>
        <NameValueRow name={'filename'} value={assetInfo.filename} />
        <NameValueRow name={'mediaType'} value={assetInfo.mediaType} />
        <NameValueRow name={'width'} value={assetInfo.width} />
        <NameValueRow name={'height'} value={assetInfo.height} />
      </View>
    );
  };

  return (
    <View style={[styles.flex, styles.container]}>
      <ImageBrowser
        max={4}
        onChange={updateHandler}
        callback={imagesCallback}
        renderSelectedComponent={renderSelectedComponent}
        emptyStayComponent={emptyStayComponent}
        noCameraPermissionComponent={noCameraPermissionComponent}
      />
      <View style={styles.divider} />
      {chosenAssets.length > 0 ?
        chosenAssets.map((asset) => <AssetInfo assetInfo={asset} />)
      : <Text style={styles.textNoSelection}>No images selected</Text>}
      <View style={styles.screenBottomPadding} />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    paddingTop: 50,
    position: 'relative',
  },
  emptyStay: {
    textAlign: 'center',
  },
  countBadge: {
    paddingHorizontal: 8.6,
    paddingVertical: 5,
    borderRadius: 50,
    position: 'absolute',
    right: 3,
    bottom: 3,
    justifyContent: 'center',
    backgroundColor: '#0580FF',
  },
  countBadgeText: {
    fontWeight: 'bold',
    alignSelf: 'center',
    padding: 'auto',
    color: '#ffffff',
  },
  divider: {
    height: 1,
    borderWidth: 3,
    borderColor: 'purple',
  },
  nameValueContainer: {
    flexDirection: 'row',
  },
  textName: {
    width: 100,
    textAlign: 'right',
    paddingRight: 10,
  },
  textValue: {
    fontWeight: 'bold',
  },
  screenBottomPadding: {
    height: 30,
  },
  textNoSelection: {
    fontSize: 20,
    fontStyle: 'italic',
    height: 50,
    paddingTop: 20,
    textAlign: 'center',
    width: '100%',
  },
});
