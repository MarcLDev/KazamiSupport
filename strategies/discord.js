const passport = require('passport');
const { Profile, Strategy } = require('passport-discord');
const { VerifyCallback } = require('passport-oauth2');

const clientId = process.env['DISCORD_CLIENT_ID']
const callbackUrl = process.env['DISCORD_CALLBACK_URL']
const clientSecret = process.env['DISCORD_CLIENT_SECRET']

passport.use(
    new Strategy(
        {
            clientID: clientId,
            clientSecret: clientSecret,
            callbackURL: callbackUrl,
            scope: ['identify', 'guilds'],
        },
        async( accessToken, refreshToken, profile, done ) => {
            const { id, username, discriminator, avatar, guilds } = profile;
            console.log(id);
        }
    )
)