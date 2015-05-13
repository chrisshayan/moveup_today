ServiceConfiguration.configurations.remove({
    service: Meteor.settings.private.socialProviders.linkedIn.name
});

ServiceConfiguration.configurations.insert({
    service: Meteor.settings.private.socialProviders.linkedIn.name,
    clientId:  Meteor.settings.private.socialProviders.linkedIn.clientId,
    secret: Meteor.settings.private.socialProviders.linkedIn.secret
});