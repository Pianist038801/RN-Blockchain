import React, { Component } from 'react'
import { Text, View } from 'react-native'
import _ from 'underscore'
import AwardCpd from '../AwardCpd'
import Award from '../Award'
import AwardProficiency from '../AwardProficiency'
import styles from '../../../../style.js'

class Awards extends Component {
  sortByProfieciency(array, type) {
    return array.sort((a, b) => {
      if (a.hasOwnProperty('proficiency')) {
        return parseInt(b.proficiency, 10) - parseInt(a.proficiency, 10)
      }
    }).map((award) => {
      const range = (type === 'language') ? 11 : 5
      return (
        <AwardProficiency
          key={award.id}
          type={type}
          award={award}
          range={range}
        />
      )
    })
  }

  render() {
    let awardData = this.props.awards

    if (awardData === null) {
      return (
        <Text>Loading...</Text>
      )
    }

    const empty = (
      <View key={0}>
        <Text style={styles.entityEmptyText}></Text>
      </View>
    )

    if (awardData.length == 0) {
      return empty
    }

    const awards = []
    const cpds = []
    const certificates = []
    const achievements = []
    const projects = []
    let languages = []
    let skills = []

    _.each(awardData, (award) => {
      switch (award.type) {
        case 'award':
          awards.push(
            <Award
              key={award.id}
              name={award.name}
              line2={award.organisation}
              date={award.date}
              award={award}
            />
          )
          break
        case 'cpd':
          cpds.push(
            <AwardCpd
              key={award.id}
              award={award}
              name={award.name}
              line2={award.organisation}
            />
          )
          break
        case 'certificate':
          certificates.push(
            <Award
              key={award.id}
              name={award.name}
              line2={`${award.organisation} - ${award.grade}`}
              date={award.date}
              award={award}
            />
          )
          break
        case 'achievement':
          achievements.push(
            <Award
              key={award.id}
              name={award.name}
              line2={award.grade}
              date={award.date}
              award={award}
            />
          )
          break
        case 'project':
          projects.push(
            <AwardCpd
              key={award.id}
              award={award}
              name={award.name}
              line2={award.organisation}
            />
          )
          break
        case 'language':
          languages.push(award)
          break
        case 'skill':
          skills.push(award)
      }
    })

    if (languages.length) {
      languages = this.sortByProfieciency(languages, 'language')
    }

    if (skills.length) {
      skills = this.sortByProfieciency(skills, 'skill')
    }

    return (
      <View style={styles.profileEntitySection}>
        {awards.length > 0 &&
        <View style={styles.profileEntitySubSection}>
          <Text style={styles.profileEntityHeader}>Awards</Text>
          {awards}
        </View>
        }

        {cpds.length > 0 &&
        <View style={styles.profileEntitySubSection}>
          <Text style={styles.profileEntityHeader}>CPD</Text>
          {cpds}
        </View>
        }

        {certificates.length > 0 &&
        <View style={styles.profileEntitySubSection}>
          <Text style={styles.profileEntityHeader}>Certificates</Text>
          {certificates}
        </View>
        }

        {achievements.length > 0 &&
        <View style={styles.profileEntitySubSection}>
          <Text style={styles.profileEntityHeader}>Achievements</Text>
          {achievements}
        </View>
        }

        {projects.length > 0 &&
        <View style={styles.profileEntitySubSection}>
          <Text style={styles.profileEntityHeader}>Projects</Text>
          {projects}
        </View>
        }

        {languages.length > 0 &&
        <View style={styles.profileEntitySubSection}>
          <Text style={styles.profileEntityHeader}>Languages</Text>
          {languages}
        </View>
        }

        {skills.length > 0 &&
        <View style={styles.profileEntitySubSection}>
          <Text style={styles.profileEntityHeader}>Skills</Text>
          {skills}
        </View>
        }
      </View>
    )
  }
}

export default Awards
