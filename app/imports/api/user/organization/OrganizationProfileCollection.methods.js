import { Meteor } from 'meteor/meteor';
import { CallPromiseMixin } from 'meteor/didericis:callpromise-mixin';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { OrganizationProfiles } from './OrganizationProfileCollection';

export const signUpNewUserMethod = new ValidatedMethod({
  name: 'OrganizationProfiles.SignupNewUser',
  mixins: [CallPromiseMixin],
  validate: null,
  run({ email, name, password }) {
    if (Meteor.isServer) {
      OrganizationProfiles.define({ email, name, password });
    }
  },
});
