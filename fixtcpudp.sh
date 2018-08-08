#!/usr/bin/env bash
react-native unlink react-native-udp &&\
react-native unlink react-native-tcp &&\
npm uninstall react-native-udp react-native-tcp --save &&\
npm install --save PeelTechnologies/react-native-tcp &&\
npm install tradle/react-native-udp --save &&\
react-native link