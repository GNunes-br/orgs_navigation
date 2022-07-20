import React, { useEffect, useState } from 'react';
import { FlatList, Text, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native'

import Produtor from './componentes/Produtor';
import Topo from './componentes/Topo';
import useProdutores from '../../hooks/useProdutores';
import useTextos from '../../hooks/useTextos';

export default function Produtores({ melhoresProdutores }) {
  const navigation = useNavigation();
  const { params } = useRoute();

  const [exibeMensagem, setExibeMensagem] = useState(false);

  const nomeCompra = params?.compra.nome;
  const timestamp = params?.compra.timestamp;

  useEffect(() => {
    setExibeMensagem(!!nomeCompra);
    
    let timeout;

    if(nomeCompra){
      timeout = setTimeout(() => {
        setExibeMensagem(false);
      }, 3000)
    }

    return () => clearTimeout(timeout);
  }, [timestamp])


  const lista = useProdutores(melhoresProdutores);
  const { tituloProdutores, mensagemCompra } = useTextos();

  const TopoLista = () => {
    return <>
      <Topo melhoresProdutores={melhoresProdutores} />
      { exibeMensagem && <Text style={estilos.compra}>{mensagemCompra?.replace('$NOME', nomeCompra)}</Text> }
      <Text style={estilos.titulo}>{tituloProdutores}</Text>
    </>
  }

  return <FlatList
    data={lista}
    renderItem={
      ({ item }) => <Produtor 
      {...item} 
      aoPressionar={() => {
        navigation.navigate('Produtor', item)
      }} />
    }
    keyExtractor={({ nome }) => nome}
    ListHeaderComponent={TopoLista}
    style={estilos.lista} />
}

const estilos = StyleSheet.create({
  lista: {
    backgroundColor: '#ffffff',
  },
  titulo: {
    fontSize: 20,
    lineHeight: 32,
    marginHorizontal: 16,
    marginTop: 16,
    fontWeight: 'bold',
    color: '#464646',
  },
  compra: {
    backgroundColor: '#EAF5F3',
    padding: 16,
    color: '#464646',
    fontSize: 16,
    lineHeight: 26,
  }
})
