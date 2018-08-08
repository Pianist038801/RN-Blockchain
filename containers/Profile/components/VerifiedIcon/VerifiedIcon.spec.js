import React from 'react'
import renderer from 'react-test-renderer'
import VerifiedIcon from './index'

describe('containers/Profile/components/VerifiedIcon', () => {
  describe('when pending_verification and verified are false', () => {
    it('renders correctly', () => {
      const props = {
        entity: {
          id: 1,
          pending_verification: false,
          verified: false
        }
      }

      const tree = renderer.create(
        <VerifiedIcon {...props} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })

  describe('when verified is true', () => {
    it('renders correctly', () => {
      const props = {
        entity: {
          id: 1,
          verified: true
        }
      }

      const tree = renderer.create(
        <VerifiedIcon {...props} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })

  describe('when pending_verification is true and verified is false', () => {
    it('renders correctly', () => {
      const props = {
        entity: {
          id: 1,
          pending_verification: true,
          verified: false
        }
      }

      const tree = renderer.create(
        <VerifiedIcon {...props} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })
})
