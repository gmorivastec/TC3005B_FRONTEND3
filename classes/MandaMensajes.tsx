import { Component } from 'react';
import { View, Button, Text, TextInput, FlatList } from 'react-native';

var W3CWebSocket = require('websocket').w3cwebsocket;

export default class MandaMensajes extends Component {

    // referencia al cliente de websocket que vamos a estar utilizando
    client: any;

    constructor(props:any){

        super(props);

        // declaramos variables de estado
        this.state = { mensajes: [], mensajeActual: ""};

        // código para conexión con websocket
        this.client = new W3CWebSocket('ws://localhost:8081', 'echo-protocol');

        // declarar un montón de callbacks
        this.client.onerror = () => {
            console.log("ERROR EN CREACIÓN DE SOCKET");
        }

        this.client.onopen = () => {
            console.log("SOCKET ABIERTO");
        }

        this.client.onclose = () => {
            console.log("SOCKET CERRADO");
        }

        this.client.onmessage = e => {

            // este callback se invoca al recibir un mensaje 
            // desde server 
            if(typeof e.data === 'string'){

                // actualizar lista de estado
                this.setState((state:any) => {
                    this.state.mensajes.push("RECIBIDO: " + e.data);
                    return {mensajes: this.state.mensajes};
                });
            }
        }
    }

    sendMessage(message:string){

        if(this.client != null && this.client.readyState === this.client.OPEN) {
            this.client.send(message);
        }
    }

    render() {
        return(
            <View>
                <Text>Websockets con React Native Web</Text>
                <FlatList 
                    data={this.state.mensajes}
                    renderItem={({item} : any) =>
                        <View><Text>{item}</Text></View>
                    }
                />
                <TextInput
                    onChangeText={text => {
                        this.setState((state:any) => {
                            return {mensajeActual: text};
                        });
                    }}
                    value={this.state.mensajeActual}
                />
                <Button
                    title="ENVIAR MENSAJE"
                    onPress={() => {

                        // actualizar lista de estado
                        this.setState((state:any) => {
                            this.state.mensajes.push("ENVIADO: " + this.state.mensajeActual);
                            return {mensajes: this.state.mensajes};
                        });

                        // enviar mensaje por medio de socket
                        this.sendMessage(this.state.mensajeActual);
                    }}
                />
            </View>
        );
    }
}