import { Meteor } from 'meteor/meteor';
import { expect } from 'chai';
import faker from 'faker';
import fc from 'fast-check';
import { Stuffs } from './StuffCollection';
import { removeAllEntities } from '../base/BaseUtilities';
import { MATPCollections } from '../matp/MATPCollections';
import { testDefine, testDumpRestore, testUpdate } from '../utilities/test-helpers';

/* eslint prefer-arrow-callback: "off",  no-unused-expressions: "off" */
/* eslint-env mocha */

const collectionName = Stuffs.getCollectionName();

if (Meteor.isServer) {
  describe(collectionName, function testSuite() {
    const collection = MATPCollections.getCollection(collectionName);

    before(function setup() {
      removeAllEntities();
    });

    after(function teardown() {
      removeAllEntities();
    });

    it('Can define and removeIt', function test1(done) {
      fc.assert(
        fc.property(
          fc.lorem({ maxCount: 2 }),
          fc.lorem({ maxCount: 1 }),
          (title, organizer, eventDate, location, description, startTime, endTime, volunteersNeeded, status, tags) => {
            const definitionData = { title, organizer, eventDate, location, description, startTime, endTime, volunteersNeeded, status, tags };
            testDefine(collection, definitionData);
          },
        ),
      );
      done();
    });

    it('Can define duplicates', function test2() {
      const title = faker.name.title();
      const startTime = faker.datatype.datetime({ min: 1});
      const endTime = faker.datatype.datetime({ max: 5 });
      const organizer = faker.internet.email();
      const location = faker.address.location();
      const docID1 = collection.define({ title, startTime, endTime, organizer, location });
      const docID2 = collection.define({ title, startTime, endTime, organizer, location });
      expect(docID1).to.not.equal(docID2);
    });

    it('Can update', function test3(done) {
      const title = faker.lorem.words();
      const startTime = faker.datatype.datetime({ min: 1});
      const endTime = faker.datatype.datetime({ max: 5 });
      const organizer = faker.lorem.words();
      const location = faker.lorem.words();
      const docID = collection.define({
        title,
        startTime,
        endTime,
        organizer,
        location,
      });
      // console.log(collection.findDoc(docID));
      fc.assert(
        fc.property(
          fc.lorem({ maxCount: 3 }),
          (newTitle, newStartTime, newEndTime, newOrganizer, newLocation ) => {
            // console.log('update', index, stuffConditions[index]);
            const updateData = { title: newTitle, startTime: newStartTime, endTime: newEndTime, organizer: newOrganizer, location: newLocation};
            testUpdate(collection, docID, updateData);
          },
        ),
      );
      done();
    });

    it('Can dumpOne, removeIt, and restoreOne', function test4() {
      testDumpRestore(collection);
    });
  });
}


