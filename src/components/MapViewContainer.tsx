import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Parada } from "../types/types";
import { Ionicons } from "@expo/vector-icons";

const MapViewContainer = ({ position, paradas, handleSelectParada, mapRegion }: any) => (
  <View style={styles.mapContainer}>
    {position ? (
      <MapView style={styles.map} initialRegion={mapRegion} zoomEnabled>
        {paradas.map((parada: Parada) => (
          <Marker
            key={parada.cp}
            coordinate={{ latitude: parada.py, longitude: parada.px }}
            title={`${parada.np} - ${parada.cp}`}
            onPress={() => handleSelectParada(parada)}
          >
            <Ionicons name="home-sharp" size={24} color="black" />
          </Marker>
        ))}
        {position.vs.map((bus: any) => (
          <Marker
            key={bus.p}
            coordinate={{ latitude: bus.py, longitude: bus.px }}
            title={`Ônibus ${bus.p}`}
            description={`Atualizado às ${position.hr}`}
          >
            <Ionicons name="bus-sharp" size={24} color="brown" />
          </Marker>
        ))}
      </MapView>
    ) : (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Carregando...</Text>
      </View>
    )}
  </View>
);

const styles = StyleSheet.create({
  mapContainer: {
    width: '100%',
    height: 350,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 16,
  },
  map: {
    flex: 1,
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
})

export default MapViewContainer