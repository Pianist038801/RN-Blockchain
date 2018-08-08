import React from 'react'
import renderer from 'react-test-renderer'
import SettingsIcon from './SettingsIcon'

describe('containers/Profile/components/SettingsIcon', () => {
  describe('when user is verified', () => {
    it('renders correctly', () => {
      const props = {
        profile: {
          first_name: 'John',
          biometrics_status: 'complete'
        }
      }

      const tree = renderer.create(
        <SettingsIcon {...props} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })

  describe('when user is in review', () => {
    it('renders correctly', () => {
      const props = {
        profile: {
          first_name: 'John',
          biometrics_status: 'needs_review'
        }
      }

      const tree = renderer.create(
        <SettingsIcon {...props} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })

  describe('when state is loading', () => {
    it('renders correctly', () => {
      const props = {
        profile: {
          first_name: null,
          biometrics_status: null
        }
      }

      const tree = renderer.create(
        <SettingsIcon {...props} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })

  describe('when user is not verified', () => {
    it('renders correctly', () => {
      const props = {
        profile: {
          first_name: 'John',
          biometrics_status: null
        }
      }

      const tree = renderer.create(
        <SettingsIcon {...props} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })

  describe('when verification has failed', () => {
    it('renders correctly', () => {
      const props = {
        profile: {
          first_name: 'John',
          biometrics_status: 'failed'
        }
      }

      const tree = renderer.create(
        <SettingsIcon {...props} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })
})
