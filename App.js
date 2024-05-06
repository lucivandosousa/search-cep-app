import { useState } from 'react';

import { StatusBar } from 'expo-status-bar';
import { Alert, Image, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { styles } from './style';

export default function App() {

  const [cep, setCep] = useState("")
  const [address, setAddress] = useState({})

  function handleInputCep(texto) {
    setCep(texto)
  }

  async function consultarCep() {

    const regexCep = /^[0-9]{8}$/.test(cep)

    if (cep.length < 8 || !regexCep) {
      Alert.alert("CEP", "Digite um CEP válido!")
      return
    }

    const request = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
    const json = await request.json()

    setAddress({ ...json })

    setCep("")
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />

      <Image
        source={require("./assets/logo_correios.png")}
      />

      <View style={styles.viewResult}>

        <Text style={styles.title}>Consulta CEP</Text>

        <TextInput
          placeholder='Digite o CEP...'
          style={styles.textInput}
          onChangeText={handleInputCep}
          value={cep}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={consultarCep}
        >
          <Text style={styles.textButton}>Consultar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => setAddress({})}
        >
          <Text style={styles.textButton}>Limpar Resultado</Text>
        </TouchableOpacity>

        <View >
          <Text style={styles.resultTextTitle}>Resultado da Busca</Text>
          <Text style={styles.resultText}>{address.logradouro}</Text>
          <Text style={styles.resultText}>{address.bairro}</Text>
          <Text style={styles.resultText}>{address.localidade} - {address.uf}</Text>
        </View>

      </View>

    </SafeAreaView>
  );
}

