import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Input } from 'nachos-ui'


import BaseComp from './base_component.js'
import styles from '../style.js'

const SearchResultRow = props => (
  <TouchableOpacity
    style={styles.searchOrgRowContainer}
    onPress={props.onPress}
  >
    <Text style={styles.searchOrgRowText}>
      {props.name}
    </Text>
  </TouchableOpacity>
);

export default class extends BaseComp {

  constructor(props, ctx) {
    super(props);
    this.state = {
      list: ctx.store.getState().searchOrg,
      searchValue: props.search,
    }
  }

  componentDidMount() {
    this.unsubscribe = this.context.store.subscribe(() => {
      this.setState({ list: this.context.store.getState().searchOrg });
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onInputChange = searchValue => {
    this.setState({ searchValue });
    this.context.store.dispatch({
      type: 'SEARCH_ORGANIZATION',
      payload: searchValue,
    })
  };

  onSelectOrg = org => {
    Alert.alert(
      'Confirm selection',
      `Are you sure you want to select ${org.text}`,
      [
        { text: 'Cancel' },
        { text: 'OK', onPress: () => this.requestVerification(org) },
      ]
    )
  };

  requestVerification = org => {
    const { signingRequest: { type, id } } = this.props;
    this.context.store.dispatch({
      type: 'EXECUTE_VERIFICATION_REQUEST',
      payload: { id, type, organisation_id: org.id }
    });
  };

  render() {
    return(
      <ScrollView style={styles.searchOrgContainer}>
        <Input
          autoCorrect={false}
          autoCapitalize='none'
          style={styles.input}
          inputStyle={styles.inputText}
          textAlign='center'
          placeholder='Organization name'
          underlineColorAndroid='transparent'
          onChangeText={this.onInputChange}
          value={this.state.searchValue}
        />
        <View>
          {
            this.state.list.length &&
            <View style={styles.searchOrgTitleWrapper}>
              <Text style={styles.searchOrgTitleText}>Please select organization</Text>
            </View> || null

          }
          {
            this.state.list.map((org, idx) => (
              <SearchResultRow
                key={idx}
                name={org.name}
                onPress={() => this.onSelectOrg(org)}
              />
            ))
          }
        </View>
      </ScrollView>
    )
  }
}