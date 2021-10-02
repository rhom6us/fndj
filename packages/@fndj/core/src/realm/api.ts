import { ObjectId } from '.pnpm/bson@4.5.1/node_modules/bson';
import { youtube_v3 } from 'googleapis';
import * as Realm from "realm-web";
import { EditsField } from '.';
import { loginAnonymous } from './auth';
import { MongoEdit, MongoTrack } from './models';



class Api {
  private readonly tracks: globalThis.Realm.Services.MongoDB.MongoDBCollection<MongoTrack & EditsField>;
  private readonly currentTracks: globalThis.Realm.Services.MongoDB.MongoDBCollection<MongoTrack & MongoEdit>;
  // _mongodb: globalThis.Realm.Services.MongoDB | undefined;
  // _db: MongoDBDatabase;
  constructor([app, user]: [Realm.App, Realm.User]) {

    const mongodb = app.currentUser!.mongoClient("mongodb-atlas");
    const db = mongodb!.db('fndj');


    this.tracks = db.collection<MongoTrack & EditsField>("tracks");
    this.currentTracks = db.collection('CurrentTracks');

  }

  getTrack(_id: ObjectId) {
    return this.currentTracks.findOne({ _id });
  }
  editTrack(_id: ObjectId, edit: Partial<MongoEdit>) {
    edit.processed = new Date();
    return this.tracks.findOneAndUpdate(
      { _id },
      { $push: { edits: edit } }
    );
  }

  addTrack(track: youtube_v3.Schema$Video) {
    const mongoTrack = track as MongoTrack & EditsField;
    mongoTrack.edits ??= [];
    return this.tracks.insertOne(mongoTrack);
  }

}
export const api = new Api(await loginAnonymous());
