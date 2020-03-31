export const googleStrategyOptions = {
  clientID: '359845712596-o54ph9hd0657brr9b4j0q72cdl7h6neb.apps.googleusercontent.com',
  clientSecret: 'Yrw85UaiCOOgxPrFR1q0lD8Q',
  scope: [
    'email',
    'profile',
  ],
  callbackURL: 'http://localhost:3000/auth/redirect',
  passReqToCallback: true,
};

export const jwtConstants = {
  secret: 'secretKey',
  signOptions: { expiresIn: '100h' },
};
