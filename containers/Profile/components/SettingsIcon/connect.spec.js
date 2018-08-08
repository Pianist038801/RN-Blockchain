import { mapState } from './index'

describe('containers/Profile/components/SettingsIcon/connect', () => {
  describe('mapState', () => {
    let state
    beforeEach(() => {
      state = {
        profile: 'profileObject'
      }
    })

    it('returns a correctly mapped state', () => {
      expect(mapState(state)).toEqual({
        profile: 'profileObject'
      })
    })
  })
})
