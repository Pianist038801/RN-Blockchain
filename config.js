module.exports = {
  // api_url: 'https://a99a3467.ngrok.io',
  api_url: 'https://api.appii.io',
  webapp_pubkey: '043c938643cb16382c21807e113af3148550277ae0ca23552eec1f8b3ee303419dc44b7f49648fbb4e0f064a896e8343d0d5c73e84d9d73e4fa20ed8e2dee5ebb4',
  latestKeyVersion: 2,
  defaultEnv: 'production',
  environments: {
    local: {
      label: 'Local',
      url: 'https://9f3e3cae.ngrok.io'
    },
    test: {
      label: 'Testing',
      url: 'https://api-test-jdc9nn.appii.io'
    },
    staging: {
      label: 'Staging',
      url: 'https://staging.appii.io/be'
    },
    production: {
      label: 'Production',
      url: 'https://api.appii.io'
    }
  }
}
